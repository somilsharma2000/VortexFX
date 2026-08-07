import re
import os

file_path = '/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Let's clean up style block comments and extra blank lines in <style>
def compress_css(css_text):
    # Remove CSS comments
    css_text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.DOTALL)
    # Remove multiple spaces/newlines
    lines = [line.strip() for line in css_text.splitlines() if line.strip()]
    return '\n'.join(lines)

style_match = re.search(r'<style>(.*?)</style>', text, re.DOTALL)
if style_match:
    old_css = style_match.group(1)
    new_css = compress_css(old_css)
    text = text.replace(f'<style>{old_css}</style>', f'<style>\n{new_css}\n</style>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

size = os.path.getsize(file_path)
print(f'Optimized file size: {size} bytes ({size / 1024:.2f} KB)')
