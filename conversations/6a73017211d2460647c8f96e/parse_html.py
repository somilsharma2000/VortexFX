from bs4 import BeautifulSoup
import re
import json

def analyze_html(filename, name):
    print(f"\n==================== ANALYZING {name} ====================")
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Fonts & Stylesheets
    font_links = []
    for link in soup.find_all('link', rel=lambda r: r and 'stylesheet' in r):
        href = link.get('href', '')
        if 'font' in href or 'type' in href:
            font_links.append(href)
    
    # Search font-family in inline styles or style tags
    styles = soup.find_all('style')
    style_text = " ".join([s.get_text() for s in styles])
    font_families = set(re.findall(r'font-family\s*:\s*([^;}]+)', style_text, re.IGNORECASE))
    
    # 2. Hex Colors
    hex_colors = set(re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', html))
    
    # 3. Headings & Page Sections
    headings = []
    for h in soup.find_all(['h1', 'h2', 'h3']):
        text = h.get_text().strip()
        if text and len(text) < 100:
            headings.append(f"<{h.name}> {text}")
            
    # 4. Frameworks / Tech Stack indicators
    tech = []
    if 'tailwind' in html.lower(): tech.append('Tailwind CSS')
    if 'bootstrap' in html.lower(): tech.append('Bootstrap')
    if 'next' in html.lower() or '__NEXT_DATA__' in html: tech.append('Next.js')
    if 'elementor' in html.lower(): tech.append('Elementor (WordPress)')
    if 'webflow' in html.lower(): tech.append('Webflow')
    if 'three' in html.lower() or 'webgl' in html.lower() or 'canvas' in html.lower(): tech.append('WebGL / Three.js / Canvas')
    if 'spline' in html.lower(): tech.append('Spline 3D')
    if 'swiper' in html.lower() or 'slick' in html.lower(): tech.append('Swiper / Slider')
    
    # 5. Calculators & Interactive inputs
    inputs = soup.find_all(['input', 'select', 'button'])
    
    print(f"Detected Tech: {tech}")
    print(f"Font Links / Google Fonts: {font_links[:5]}")
    print(f"Font Families in CSS: {list(font_families)[:10]}")
    print(f"Sample Hex Colors ({len(hex_colors)} found): {list(hex_colors)[:15]}")
    print(f"Headings Count: {len(headings)}")
    print("Top Headings / Structure:")
    for h in headings[:15]:
        print(f"  {h}")

for filename, name in [('FTMO.html', 'FTMO'), ('FundedNext.html', 'FundedNext'), ('Topstep.html', 'Topstep'), ('The5ers.html', 'The5ers')]:
    analyze_html(filename, name)

