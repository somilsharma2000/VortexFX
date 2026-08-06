import subprocess
import re

urls = {
    'FTMO': 'https://ftmo.com/en/',
    'FundedNext': 'https://fundednext.com/',
    'FundingPips': 'https://fundingpips.com/',
    'MyFundedFX': 'https://myfundedfx.com/',
    'SeacrestMarkets': 'https://seacrestmarkets.com/',
    'ThePropTrading': 'https://theproptrading.com.au/',
    'Topstep': 'https://topstep.com/',
    'E8Funding': 'https://e8funding.com/',
    'FundedTradingPlus': 'https://www.fundedtradingplus.com/',
    'ApexTraderFunding': 'https://apextraderfunding.com/',
    'The5ers': 'https://the5ers.com/'
}

for name, url in urls.items():
    cmd = ["curl", "-sL", "-A", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36", url]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    html = res.stdout
    title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    title_str = title.group(1).strip() if title else 'No Title'
    print(f"{name}: {len(html)} bytes | Title: {title_str[:60]}")
    # save first 100k of HTML for analysis
    with open(f"{name}.html", "w", encoding="utf-8") as f:
        f.write(html)

