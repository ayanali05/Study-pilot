// ─── Supabase Edge Function: AI Proxy ───
// All AI API calls go through this function so API keys NEVER reach the browser.
// Supports Gemini, Groq, and OpenRouter with automatic failover.
//
// Deploy: supabase functions deploy ai-proxy
// Usage: POST /functions/v1/ai-proxy { provider, model, messages, schema? }

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIRequest {
  provider?: 'gemini' | 'groq' | 'openrouter';
  model?: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  schema?: Record<string, unknown>; // JSON schema for structured output
  temperature?: number;
  maxTokens?: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const body: AIRequest = await req.json();
    const { messages, schema, temperature = 0.7, maxTokens = 2048 } = body;

    // Try providers in order: Gemini → Groq → OpenRouter
    const providers = [
      { name: 'gemini', key: Deno.env.get('GEMINI_API_KEY') },
      { name: 'groq', key: Deno.env.get('GROQ_API_KEY') },
      { name: 'openrouter', key: Deno.env.get('OPENROUTER_API_KEY') },
    ].filter((p) => p.key);

    if (body.provider) {
      const specific = providers.find((p) => p.name === body.provider);
      if (specific) {
        providers.splice(0, providers.length, specific);
      }
    }

    let lastError = '';

    for (const provider of providers) {
      try {
        const result = await callProvider(provider.name, provider.key!, messages, {
          model: body.model,
          schema,
          temperature,
          maxTokens,
        });

        return new Response(JSON.stringify(result), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        lastError = `${provider.name}: ${(err as Error).message}`;
        console.error(`Provider ${provider.name} failed:`, lastError);
        continue;
      }
    }

    return new Response(
      JSON.stringify({ error: 'All AI providers failed', details: lastError }),
      { status: 503, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
    );
  }
});

async function callProvider(
  name: string,
  apiKey: string,
  messages: AIRequest['messages'],
  options: { model?: string; schema?: Record<string, unknown>; temperature: number; maxTokens: number },
) {
  if (name === 'gemini') {
    return callGemini(apiKey, messages, options);
  } else if (name === 'groq') {
    return callGroq(apiKey, messages, options);
  } else {
    return callOpenRouter(apiKey, messages, options);
  }
}

async function callGemini(
  apiKey: string,
  messages: AIRequest['messages'],
  options: { model?: string; schema?: Record<string, unknown>; temperature: number; maxTokens: number },
) {
  const model = options.model ?? 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  const systemInstruction = messages.find((m) => m.role === 'system');

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: options.temperature,
      maxOutputTokens: options.maxTokens,
      ...(options.schema ? { responseMimeType: 'application/json' } : {}),
    },
  };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction.content }] };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  return { text, provider: 'gemini', model };
}

async function callGroq(
  apiKey: string,
  messages: AIRequest['messages'],
  options: { model?: string; schema?: Record<string, unknown>; temperature: number; maxTokens: number },
) {
  const model = options.model ?? 'llama-3.3-70b-versatile';
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      ...(options.schema ? { response_format: { type: 'json_object' } } : {}),
    }),
  });

  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);

  const data = await res.json();
  return { text: data.choices[0].message.content, provider: 'groq', model };
}

async function callOpenRouter(
  apiKey: string,
  messages: AIRequest['messages'],
  options: { model?: string; schema?: Record<string, unknown>; temperature: number; maxTokens: number },
) {
  const model = options.model ?? 'meta-llama/llama-3.1-8b-instruct:free';
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://studytrack.vercel.app',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature,
      max_tokens: options.maxTokens,
    }),
  });

  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);

  const data = await res.json();
  return { text: data.choices[0].message.content, provider: 'openrouter', model };
}
