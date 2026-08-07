import re
import os

file_path = '/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Clean HTML indentation/blank lines
lines = text.splitlines()
cleaned_lines = []
for line in lines:
    # remove trailing whitespace
    line = line.rstrip()
    if not line:
        continue
    cleaned_lines.append(line)

text = '\n'.join(cleaned_lines)

# 2. Minify JS comments and multi-space indentation
script_match = re.search(r'<script>(.*?)</script>', text, re.DOTALL)
if script_match:
    old_js = script_match.group(1)
    js_lines = []
    for line in old_js.splitlines():
        line_strip = line.strip()
        if not line_strip or line_strip.startswith('//'):
            continue
        js_lines.append(line)
    new_js = '\n'.join(js_lines)
    text = text.replace(f'<script>{old_js}</script>', f'<script>\n{new_js}\n</script>')

# 3. Clean CSS whitespace
style_match = re.search(r'<style>(.*?)</style>', text, re.DOTALL)
if style_match:
    old_css = style_match.group(1)
    css_lines = []
    for line in old_css.splitlines():
        line_strip = line.strip()
        if not line_strip or line_strip.startswith('/*'):
            continue
        css_lines.append(line_strip)
    
    # join CSS lines smartly
    css_compact = '\n'.join(css_lines)
    # collapse consecutive spaces
    css_compact = re.sub(r' +', ' ', css_compact)
    css_compact = re.sub(r'\s*([\{\};:,])\s*', r'\1', css_compact)
    # put closing braces on newlines for readability or format block by block
    css_formatted = css_compact.replace('}', '}\n').replace('{', ' {\n  ').replace(';', ';\n  ')
    text = text.replace(f'<style>{old_css}</style>', f'<style>\n{css_formatted}\n</style>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

size = os.path.getsize(file_path)
print(f'Final optimized file size: {size} bytes ({size / 1024:.2f} KB)')
