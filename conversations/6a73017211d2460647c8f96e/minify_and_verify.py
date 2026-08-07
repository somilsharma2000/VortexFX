import re
import os

file_path = '/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Minify CSS slightly: remove excess spaces around { } : ;
def clean_css(css):
    lines = []
    for line in css.splitlines():
        line = line.strip()
        if not line or line.startswith('/*'): continue
        lines.append(line)
    res = '\n'.join(lines)
    # reduce multiline rules slightly
    return res

style_match = re.search(r'<style>(.*?)</style>', text, re.DOTALL)
if style_match:
    old_css = style_match.group(1)
    new_css = clean_css(old_css)
    text = text.replace(f'<style>{old_css}</style>', f'<style>\n{new_css}\n</style>')

# Minify JS comments slightly
script_match = re.search(r'<script>(.*?)</script>', text, re.DOTALL)
if script_match:
    old_js = script_match.group(1)
    # remove single line comments that are just section headers
    js_lines = []
    for line in old_js.splitlines():
        trimmed = line.strip()
        if trimmed.startswith('// ====='):
            continue
        js_lines.append(line)
    new_js = '\n'.join(js_lines)
    text = text.replace(f'<script>{old_js}</script>', f'<script>\n{new_js}\n</script>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

size = os.path.getsize(file_path)
print(f'New file size: {size} bytes ({size / 1024:.2f} KB)')
