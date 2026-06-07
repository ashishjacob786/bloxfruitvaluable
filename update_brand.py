import os
import re

dir_path = '/Users/ashishjacob/.gemini/antigravity/scratch/bloxfruitvaluable/src'

for root, _, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.ts') or f.endswith('.tsx'):
            file_path = os.path.join(root, f)
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # 1. Replace "Blox Fruit Valuable" -> "Blox Fruit Value"
            new_content = content.replace('Blox Fruit Valuable', 'Blox Fruit Value')
            
            # 2. Replace "BloxFruitValuable" -> "BloxFruitValue" (except in domains/emails)
            # Case-sensitive replace, excluding if followed by .com
            new_content = re.sub(r'BloxFruitValuable(?!\.com)', 'BloxFruitValue', new_content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Updated {file_path}")

