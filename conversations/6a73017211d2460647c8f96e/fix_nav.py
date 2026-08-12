import os
import re

pages = [
    'index.html', 'contests.html', 'leaderboard.html', 'leaderboard-alt.html',
    'rex.html', 'tools.html', 'faq.html', 'community.html', 'journal.html',
    'signin.html', 'profile.html', 'checkin.html', 'invite.html', 'offers.html',
    'resources.html', 'dashboard.html', '404.html', 'privacy.html', 'terms.html',
    'tournaments.html'
]

# New nav CSS block — replaces the old nav CSS in each page
new_nav_css = """.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  max-width: 1280px; margin: 0 auto;
  background: rgba(6, 7, 10, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(234, 202, 122, 0.1);
  left: 50%; transform: translateX(-50%);
  width: 100%;
  box-sizing: border-box;
}
.nav-brand { display: flex; align-items: center; flex-shrink: 0; }
.nav-brand a { display: flex; align-items: center; text-decoration: none; }
.nav-logo img {
  width: 36px; height: 36px; object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(234, 202, 122, 0.35));
  transition: filter 0.3s;
}
.nav-logo img:hover {
  filter: drop-shadow(0 0 14px rgba(234, 202, 122, 0.6));
}
.nav-links {
  display: flex; list-style: none;
  gap: 28px; align-items: center;
  margin: 0 auto;
}
.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 13px; font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.2s, opacity 0.2s;
  white-space: nowrap;
}
.nav-link:hover, .nav-link.active { color: #EACA7A; }
.nav-cta {
  display: flex; align-items: center; gap: 20px;
  flex-shrink: 0;
}
.nav-cta .nav-link {
  font-size: 13px; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.05em;
  padding: 8px 4px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, color 0.2s;
}
.nav-cta .nav-link:hover {
  color: #EACA7A;
  border-bottom-color: rgba(234, 202, 122, 0.4);
}
.nav-cta .btn-primary {
  background: linear-gradient(135deg, #EACA7A, #D4AF37);
  color: #06070A;
  padding: 10px 24px;
  font-weight: 700; font-size: 13px;
  text-decoration: none;
  border-radius: 9999px;
  white-space: nowrap;
  transition: all 0.3s;
  box-shadow: 0 0 0 rgba(234, 202, 122, 0);
}
.nav-cta .btn-primary:hover {
  filter: brightness(1.08);
  box-shadow: 0 0 20px rgba(234, 202, 122, 0.35);
  transform: translateY(-1px);
}
.hamburger { display: none; flex-direction: column; gap: 4px; cursor: pointer; }
.hamburger span { width: 24px; height: 2px; background: #EACA7A; transition: 0.3s; }
.nav-internal { display: none; }
body.is-logged-in .nav-internal { display: block !important; }
@media (max-width: 768px) {
  .nav { padding: 12px 16px; }
  .nav-links {
    display: none; position: fixed; top: 0; right: 0;
    width: 280px; height: 100vh;
    background: #0A0B0F;
    flex-direction: column;
    padding: 100px 24px 24px; gap: 8px;
    z-index: 999;
    border-left: 1px solid rgba(234, 202, 122, 0.15);
    transform: translateX(100%); transition: transform 0.3s ease;
  }
  .nav-links.active { display: flex; transform: translateX(0); }
  .nav-cta > a:not(.hamburger) { display: none; }
  .hamburger { display: flex !important; cursor: pointer; }
  .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
}"""

# New nav HTML brand block — logo only, no wordmark
new_brand_html = """<div class="nav-brand">
      <a href="index.html" class="navbar-brand">
        <div class="nav-logo"><img src="assets/fortrex-icon-nav.png" alt="FORTREX" style="width: 36px; height: 36px; object-fit: contain;"></div>
      </a>
    </div>"""

fixed_count = 0

for page in pages:
    filepath = os.path.join('vortex-fx', page)
    if not os.path.exists(filepath):
        print(f"SKIP: {page} not found")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # 1. Replace the nav CSS block
    # Find the old nav CSS — from ".nav {" to the closing of the media query
    # Pattern: .nav { ... } through all nav-related CSS up to the next non-nav section

    # Try to find and replace the nav CSS
    # Look for the start of nav CSS
    nav_css_patterns = [
        # Pattern 1: index.html style — inline in <style> block
        (r'\.nav \{[^}]*\}.*?\.nav-internal \{[^}]*\}.*?@media \(max-width: 768px\) \{.*?\.hamburger\.active.*?\}', new_nav_css),
    ]

    for pattern, replacement in nav_css_patterns:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    # 2. Replace the nav-brand HTML — remove wordmark, keep logo only
    # Pattern: <div class="nav-brand"> ... <span class="nav-wordmark">FORTREX</span> ... </div>
    brand_pattern = r'<div class="nav-brand">\s*<a[^>]*>.*?<span class="nav-wordmark"[^>]*>FORTREX</span>\s*</a>\s*</div>'
    content = re.sub(brand_pattern, new_brand_html, content, flags=re.DOTALL)

    # Also handle variants where the brand link has different structure
    brand_pattern2 = r'<div class="nav-brand">\s*<a[^>]*style="display: flex; align-items: center; gap: 12px;[^"]*"[^>]*>\s*<div class="nav-logo">.*?</div>\s*<span class="nav-wordmark"[^>]*>FORTREX</span>\s*</a>\s*</div>'
    content = re.sub(brand_pattern2, new_brand_html, content, flags=re.DOTALL)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        fixed_count += 1
        print(f"  FIXED: {page}")
    else:
        print(f"  NO CHANGE: {page}")

print(f"\nTotal pages fixed: {fixed_count}")
