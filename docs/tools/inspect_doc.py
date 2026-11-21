import docx
import re
import os

doc = docx.Document('Project Report.docx')
print('=== IMAGES IN DOCUMENT ===')
for i, p in enumerate(doc.paragraphs):
    xml = p._p.xml
    if 'blip' in xml:
        embeds = re.findall(r'r:embed="([^"]+)"', xml)
        # get target from part relationships
        targets = []
        for e in embeds:
            if e in p.part.rels:
                targets.append(p.part.rels[e].target_ref)
            else:
                targets.append(e)
        print(f'P{i:03d} | text={p.text[:30]!r} | embeds={targets}')

print('\n=== TOTAL PARAGRAPHS ===', len(doc.paragraphs))
