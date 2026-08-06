import requests
from bs4 import BeautifulSoup
import re
import json

urls = {
    "IC Markets": "https://www.icmarkets.com/en",
    "Exness": "https://www.exness.com",
    "Pepperstone": "https://pepperstone.com/en-au",
    "OANDA": "https://www.oanda.com/us-en/",
    "FXTM": "https://www.fxtm.com/en/",
    "RoboForex": "https://roboforex.com/",
    "FBS": "https://fbs.com/",
    "Octa": "https://octa.com/"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

results = {}

for name, url in urls.items():
    try:
        r = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            
            # Extract inline style hex colors & CSS variables
            styles = [style.string for style in soup.find_all('style') if style.string]
            all_styles = " ".join(styles) + " " + r.text
            
            hex_codes = list(set(re.findall(r'#(?:[0-9a-fA-F]{3,4}){1,2}\b', all_styles)))
            fonts = list(set(re.findall(r'font-family:\s*([^;}\n]+)', all_styles, re.IGNORECASE)))
            
            # Extract section tags / main wrappers
            sections = []
            for tag in soup.find_all(['section', 'div', 'header', 'footer']):
                classes = tag.get('class')
                tag_id = tag.get('id')
                if tag_id or classes:
                    s_info = f"<{tag.name}"
                    if tag_id: s_info += f" id='{tag_id}'"
                    if classes: s_info += f" class='{' '.join(classes)}'"
                    s_info += ">"
                    if len(sections) < 30 and tag.name == 'section':
                        sections.append(s_info)
            
            # Extract headings top to bottom
            h_tags = []
            for h in soup.find_all(['h1', 'h2', 'h3']):
                txt = h.get_text(strip=True)
                if txt and len(txt) > 2 and len(txt) < 100:
                    h_tags.append(f"{h.name}: {txt}")
            
            results[name] = {
                "final_url": r.url,
                "hex_codes": hex_codes[:15],
                "fonts": [f.strip('\'" ') for f in fonts[:8]],
                "sections": sections[:10],
                "headings": h_tags[:15]
            }
    except Exception as e:
        results[name] = {"error": str(e)}

print(json.dumps(results, indent=2))
