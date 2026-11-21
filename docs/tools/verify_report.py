import docx
import zipfile
import re

doc = docx.Document('StudyPilot_AI_Project_Report.docx')

print('=== 1. PARAGRAPHS & TABLES COUNT ===')
print('Paragraphs:', len(doc.paragraphs))
print('Tables:', len(doc.tables))

print('\n=== 2. STUDENT DETAILS & ACADEMIC YEAR ===')
all_text = []
for p in doc.paragraphs:
    all_text.append(p.text)
for t in doc.tables:
    for row in t.rows:
        for c in row.cells:
            all_text.append(c.text)

full_doc_text = '\n'.join(all_text)

students = [
    ('DEEPAK PANDEY', '2501660100055'),
    ('AVANI PATHAK', '2501660100047'),
    ('ELMA KHAN', '2501660100065'),
]

for name, roll in students:
    n_count = len(re.findall(re.escape(name), full_doc_text, re.IGNORECASE))
    r_count = len(re.findall(re.escape(roll), full_doc_text))
    print(f'Student: {name} (matches={n_count}), Roll: {roll} (matches={r_count})')

year_match = len(re.findall(r'2026[–-]2027', full_doc_text))
print(f'Academic Year 2026–2027 matches: {year_match}')

print('\n=== 3. OLD LEFTOVER SCAN ===')
old_keywords = [
    'simran', 'pallavi', 'vishnukant', 'tanu',
    '2401660100130', '2401660100084', '2401660100148', '250109009',
    '2025-2026', '2025–2026',
    'ai vs real', 'image detection'
]

leftovers = []
for idx, p in enumerate(doc.paragraphs):
    ptxt = p.text.lower()
    for kw in old_keywords:
        if kw in ptxt:
            leftovers.append((idx, kw, p.text[:80]))

for t_idx, t in enumerate(doc.tables):
    for r_idx, row in enumerate(t.rows):
        for c_idx, cell in enumerate(row.cells):
            ctxt = cell.text.lower()
            for kw in old_keywords:
                if kw in ctxt:
                    leftovers.append((f'Table{t_idx}[{r_idx},{c_idx}]', kw, cell.text[:80]))

print(f'Total leftover matches found: {len(leftovers)}')
for l in leftovers:
    print(f'  {l[0]}: keyword="{l[1]}" text="{l[2]}"')

print('\n=== 4. MEDIA FILES IN DOCX ===')
with zipfile.ZipFile('StudyPilot_AI_Project_Report.docx', 'r') as z:
    media = [f for f in z.namelist() if f.startswith('word/media/')]
    print(f'Media files count: {len(media)}')
    for m in sorted(media):
        info = z.getinfo(m)
        print(f'  {m}: size={info.file_size} bytes')
