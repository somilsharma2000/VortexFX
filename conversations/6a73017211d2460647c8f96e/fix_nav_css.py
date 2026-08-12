import os
import re

pages = [
    'leaderboard.html', 'leaderboard-alt.html', 'rex.html', 'tools.html',
    'faq.html', 'community.html', 'signin.html', 'profile.html', 'checkin.html',
    'invite.html', 'offers.html', 'resources.html', 'dashboard.html', '404.html',
    'privacy.html', 'terms.html', 'tournaments.html', 'journal.html'
]

new_nav_css = """    /* NAV */
    .nav {
      position: fixed; top: 0; left: 50%; transform: translateX(-50%);
      z-index: 1000; width: 100%; max-width: 1280px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 32px; box-sizing: border-box;
      background: rgba(6, 7, 10, 0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(234, 202, 122, 0.1);
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
        width: 280px; height: 100vh; background: #0A0B0F;
        flex-direction: column; padding: 100px 24px 24px; gap: 8px;
        z-index: 999; border-left: 1px solid rgba(234, 202, 122, 0.15);
        transform: translateX(100%); transition: transform 0.3s ease;
      }
      .nav-links.active { display: flex; transform: translateX(0); }
      .nav-cta > a:not(.hamburger) { display: none; }
      .hamburger { display: flex !important; cursor: pointer; }
      .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      .hamburger.active span:nth-child(2) { opacity: 0; }
      .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
    }
"""

# For journal.html which uses .navbar class instead of .nav
new_navbar_css = new_nav_css.replace('.nav {', '.navbar {').replace('.nav-brand', '.navbar-brand').replace('.nav-links', '.navbar-links').replace('.nav-cta', '.navbar-cta').replace('.nav-link', '.navbar-link').replace('.nav-internal', '.navbar-internal').replace('.nav-logo', '.navbar-logo').replace('.hamburger', '.hamburger').replace('body.is-logged-in .navbar-internal', 'body.is-logged-in .navbar-internal')

fixed = 0

for page in pages:
    filepath = os.path.join('vortex-fx', page)
    if not os.path.exists(filepath):
        print(f"SKIP: {page}")
        continue

    with open(filepath, 'r') as f:
        lines = f.readlines()

    # Find the nav CSS block
    nav_start = None
    for i, line in enumerate(lines):
        if '/* NAV */' in line or ('.nav {' in line and 'position' in line and 'fixed' in line):
            nav_start = i
            # Check if there's a /* NAV */ comment before it
            if i > 0 and '/* NAV */' in lines[i - 1]:
                nav_start = i - 1
            break

    if nav_start is None:
        # Try alternative patterns for journal.html
        for i, line in enumerate(lines):
            if '.navbar {' in line and 'position' in line:
                nav_start = i
                if i > 0 and ('/*' in lines[i-1] or 'NAV' in lines[i-1]):
                    nav_start = i - 1
                break

    if nav_start is None:
        print(f"  NO NAV CSS: {page}")
        continue

    # Find the end of the nav CSS block — the closing "}" of the media query
    nav_end = None
    for i in range(nav_start + 1, min(nav_start + 40, len(lines))):
        if lines[i].strip() == '}' and i + 1 < len(lines) and lines[i + 1].strip() == '':
            nav_end = i + 1
            break
        if '</style>' in lines[i]:
            nav_end = i
            break

    if nav_end is None:
        print(f"  NO END: {page}")
        continue

    # Determine which CSS to use
    css_to_use = new_nav_css
    if page == 'journal.html':
        css_to_use = new_navbar_css

    lines = lines[:nav_start] + [css_to_use] + lines[nav_end:]

    with open(filepath, 'w') as f:
        f.writelines(lines)

    fixed += 1
    print(f"  FIXED: {page} (lines {nav_start + 1}-{nav_end})")

print(f"\nTotal: {fixed} pages fixed")
