import re


def count_keys(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    keys = re.findall(r'"([^"]+)":\s', content)
    return len(keys), set(keys)


en_count, en_keys = count_keys('src/lib/translations/en.ts')
fr_count, fr_keys = count_keys('src/lib/translations/fr.ts')
es_count, es_keys = count_keys('src/lib/translations/es.ts')

print(f'EN: {en_count}')
print(f'FR: {fr_count}')
print(f'ES: {es_count}')
print()

fr_missing = sorted(en_keys - fr_keys)
es_missing = sorted(en_keys - es_keys)

if fr_missing:
    print(f'FR manque ({len(fr_missing)} clés):')
    for key in fr_missing:
        print(f'  - {key}')
else:
    print('FR: OK (all keys present)')

print()

if es_missing:
    print(f'ES manque ({len(es_missing)} clés):')
    for key in es_missing:
        print(f'  - {key}')
else:
    print('ES: OK (all keys present)')
