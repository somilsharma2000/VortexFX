with open('/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

checks = {
    '1. Parallax Scroll Layers (data-speed attributes)': 'data-speed=' in text,
    '2. Magnetic Buttons (.magnetic, .btn mousemove)': ('x * 0.28' in text or 'translate(${x' in text) and 'magnetic' in text,
    '3. Animated Counters (data-count attributes & countUp)': 'data-count=' in text and 'animateCounter' in text,
    '4. Staggered Card Reveals (.stagger-grid, --stagger-i)': 'stagger-grid' in text and '--stagger-i' in text,
    '5. Kinetic Typography (letter/word split spans)': 'title-char' in text and 'kinetic' in text,
    '6. Scroll-Driven Section Transitions (.section-active)': 'section-active' in text,
    '7. Floating Animation (@keyframes floatContinuous)': 'floatContinuous' in text and '--float-delay' in text,
    '8. Hover Glow Expansion & Cursor Spotlight': '--mouse-x' in text and 'radial-gradient' in text,
    '9. Number Tickers (periodic flicker / live terminal)': 'ticker-flash' in text and 'initLiveTicker' in text,
    '10. Scroll-Linked Progress Ring (SVG ring widget)': 'scroll-progress-ring-wrap' in text and 'stroke-dashoffset' in text,
    '11. Smooth Anchor Scrolling & Active Nav Highlighting': ('scroll-behavior' in text or 'behavior: "smooth"' in text or 'behavior: \'smooth\'' in text),
    '12. Ripple Enhancement (.ripple-span)': 'ripple-span' in text and 'ripple-anim' in text,
    '13. Card 3D Tilt Enhancement (perspective & tilt)': 'perspective(1000px)' in text and 'rotateX' in text,
    '14. Section Divider Draw Animations (.circuit-divider)': 'circuit-divider' in text and 'scaleX' in text,
    '15. Particle Constellation in Hero (mouse repulsion)': 'hero-constellation-canvas' in text and 'mdist < 120' in text,
    '16. Reveal on Scroll for ALL Elements (.reveal)': 'reveal' in text and 'IntersectionObserver' in text,
}

print('=== ANIMATION CHECKLIST VERIFICATION ===')
all_passed = True
for key, passed in checks.items():
    status = '✓ PASS' if passed else 'FAIL'
    if not passed: all_passed = False
    print(f'{status}: {key}')

if all_passed:
    print('\nALL 16 ANIMATION REQUIREMENTS PASSED VERIFICATION!')
