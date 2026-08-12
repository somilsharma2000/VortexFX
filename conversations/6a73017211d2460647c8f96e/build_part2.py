part2 = """
  <!-- JAVASCRIPT CALCULATOR ENGINE -->
  <script>
    // --- 1. MARKET SPECS & CURRENCY RATES ---
    const PAIR_GROUPS = [
      {
        label: 'Major Forex (7)',
        pairs: [
          { symbol: 'EUR/USD', name: 'EUR/USD', base: 'EUR', quote: 'USD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.0850 },
          { symbol: 'GBP/USD', name: 'GBP/USD', base: 'GBP', quote: 'USD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.2700 },
          { symbol: 'USD/JPY', name: 'USD/JPY', base: 'USD', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 155.00 },
          { symbol: 'USD/CHF', name: 'USD/CHF', base: 'USD', quote: 'CHF', pip_size: 0.0001, contract_size: 100000, default_rate: 0.8850 },
          { symbol: 'USD/CAD', name: 'USD/CAD', base: 'USD', quote: 'CAD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.3600 },
          { symbol: 'AUD/USD', name: 'AUD/USD', base: 'AUD', quote: 'USD', pip_size: 0.0001, contract_size: 100000, default_rate: 0.6550 },
          { symbol: 'NZD/USD', name: 'NZD/USD', base: 'NZD', quote: 'USD', pip_size: 0.0001, contract_size: 100000, default_rate: 0.6000 }
        ]
      },
      {
        label: 'EUR Crosses (8)',
        pairs: [
          { symbol: 'EUR/GBP', name: 'EUR/GBP', base: 'EUR', quote: 'GBP', pip_size: 0.0001, contract_size: 100000, default_rate: 0.8543 },
          { symbol: 'EUR/JPY', name: 'EUR/JPY', base: 'EUR', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 168.18 },
          { symbol: 'EUR/CHF', name: 'EUR/CHF', base: 'EUR', quote: 'CHF', pip_size: 0.0001, contract_size: 100000, default_rate: 0.9602 },
          { symbol: 'EUR/CAD', name: 'EUR/CAD', base: 'EUR', quote: 'CAD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.4756 },
          { symbol: 'EUR/AUD', name: 'EUR/AUD', base: 'EUR', quote: 'AUD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.6565 },
          { symbol: 'EUR/NZD', name: 'EUR/NZD', base: 'EUR', quote: 'NZD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.8083 },
          { symbol: 'EUR/SEK', name: 'EUR/SEK', base: 'EUR', quote: 'SEK', pip_size: 0.0001, contract_size: 100000, default_rate: 11.5550 },
          { symbol: 'EUR/NOK', name: 'EUR/NOK', base: 'EUR', quote: 'NOK', pip_size: 0.0001, contract_size: 100000, default_rate: 11.8320 }
        ]
      },
      {
        label: 'GBP Crosses (5)',
        pairs: [
          { symbol: 'GBP/JPY', name: 'GBP/JPY', base: 'GBP', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 196.85 },
          { symbol: 'GBP/CHF', name: 'GBP/CHF', base: 'GBP', quote: 'CHF', pip_size: 0.0001, contract_size: 100000, default_rate: 1.1240 },
          { symbol: 'GBP/CAD', name: 'GBP/CAD', base: 'GBP', quote: 'CAD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.7272 },
          { symbol: 'GBP/AUD', name: 'GBP/AUD', base: 'GBP', quote: 'AUD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.9389 },
          { symbol: 'GBP/NZD', name: 'GBP/NZD', base: 'GBP', quote: 'NZD', pip_size: 0.0001, contract_size: 100000, default_rate: 2.1167 }
        ]
      },
      {
        label: 'AUD Crosses (4)',
        pairs: [
          { symbol: 'AUD/JPY', name: 'AUD/JPY', base: 'AUD', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 101.53 },
          { symbol: 'AUD/CHF', name: 'AUD/CHF', base: 'AUD', quote: 'CHF', pip_size: 0.0001, contract_size: 100000, default_rate: 0.5797 },
          { symbol: 'AUD/CAD', name: 'AUD/CAD', base: 'AUD', quote: 'CAD', pip_size: 0.0001, contract_size: 100000, default_rate: 0.8908 },
          { symbol: 'AUD/NZD', name: 'AUD/NZD', base: 'AUD', quote: 'NZD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.0917 }
        ]
      },
      {
        label: 'NZD Crosses (3)',
        pairs: [
          { symbol: 'NZD/JPY', name: 'NZD/JPY', base: 'NZD', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 93.00 },
          { symbol: 'NZD/CHF', name: 'NZD/CHF', base: 'NZD', quote: 'CHF', pip_size: 0.0001, contract_size: 100000, default_rate: 0.5310 },
          { symbol: 'NZD/CAD', name: 'NZD/CAD', base: 'NZD', quote: 'CAD', pip_size: 0.0001, contract_size: 100000, default_rate: 0.8160 }
        ]
      },
      {
        label: 'CAD Crosses (2)',
        pairs: [
          { symbol: 'CAD/JPY', name: 'CAD/JPY', base: 'CAD', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 113.97 },
          { symbol: 'CAD/CHF', name: 'CAD/CHF', base: 'CAD', quote: 'CHF', pip_size: 0.0001, contract_size: 100000, default_rate: 0.6507 }
        ]
      },
      {
        label: 'CHF Crosses (1)',
        pairs: [
          { symbol: 'CHF/JPY', name: 'CHF/JPY', base: 'CHF', quote: 'JPY', pip_size: 0.01,   contract_size: 100000, default_rate: 175.14 }
        ]
      },
      {
        label: 'Exotics (10)',
        pairs: [
          { symbol: 'USD/TRY', name: 'USD/TRY', base: 'USD', quote: 'TRY', pip_size: 0.0001, contract_size: 100000, default_rate: 32.50 },
          { symbol: 'USD/ZAR', name: 'USD/ZAR', base: 'USD', quote: 'ZAR', pip_size: 0.0001, contract_size: 100000, default_rate: 18.50 },
          { symbol: 'USD/MXN', name: 'USD/MXN', base: 'USD', quote: 'MXN', pip_size: 0.0001, contract_size: 100000, default_rate: 17.20 },
          { symbol: 'USD/SGD', name: 'USD/SGD', base: 'USD', quote: 'SGD', pip_size: 0.0001, contract_size: 100000, default_rate: 1.3500 },
          { symbol: 'USD/HKD', name: 'USD/HKD', base: 'USD', quote: 'HKD', pip_size: 0.0001, contract_size: 100000, default_rate: 7.8100 },
          { symbol: 'USD/SEK', name: 'USD/SEK', base: 'USD', quote: 'SEK', pip_size: 0.0001, contract_size: 100000, default_rate: 10.6500 },
          { symbol: 'USD/NOK', name: 'USD/NOK', base: 'USD', quote: 'NOK', pip_size: 0.0001, contract_size: 100000, default_rate: 10.9000 },
          { symbol: 'USD/DKK', name: 'USD/DKK', base: 'USD', quote: 'DKK', pip_size: 0.0001, contract_size: 100000, default_rate: 6.8800 },
          { symbol: 'USD/PLN', name: 'USD/PLN', base: 'USD', quote: 'PLN', pip_size: 0.0001, contract_size: 100000, default_rate: 3.9500 },
          { symbol: 'USD/CNH', name: 'USD/CNH', base: 'USD', quote: 'CNH', pip_size: 0.0001, contract_size: 100000, default_rate: 7.2500 }
        ]
      },
      {
        label: 'Precious Metals (2)',
        pairs: [
          { symbol: 'XAU/USD', name: 'XAU/USD (Gold)', base: 'XAU', quote: 'USD', pip_size: 0.01,  contract_size: 100,   default_rate: 2400.00 },
          { symbol: 'XAG/USD', name: 'XAG/USD (Silver)', base: 'XAG', quote: 'USD', pip_size: 0.001, contract_size: 5000,  default_rate: 28.50 }
        ]
      },
      {
        label: 'Cryptocurrency (2)',
        pairs: [
          { symbol: 'BTC/USD', name: 'BTC/USD (Bitcoin)', base: 'BTC', quote: 'USD', pip_size: 1.0, contract_size: 1, default_rate: 65000.00 },
          { symbol: 'ETH/USD', name: 'ETH/USD (Ethereum)', base: 'ETH', quote: 'USD', pip_size: 0.1, contract_size: 1, default_rate: 3200.00 }
        ]
      }
    ];

    const MARKET_SPECS = {};
    PAIR_GROUPS.forEach(g => {
      g.pairs.forEach(p => {
        MARKET_SPECS[p.symbol] = {
          pip_size: p.pip_size,
          contract_size: p.contract_size,
          default_rate: p.default_rate,
          base_ccy: p.base,
          quote_ccy: p.quote,
          name: p.name
        };
      });
    });

    const ACCOUNT_CURRENCIES = [
      { code: 'USD', label: 'USD ($)', symbol: '$' },
      { code: 'EUR', label: 'EUR (€)', symbol: '€' },
      { code: 'GBP', label: 'GBP (£)', symbol: '£' },
      { code: 'JPY', label: 'JPY (¥)', symbol: '¥' },
      { code: 'AUD', label: 'AUD (A$)', symbol: 'A$' },
      { code: 'CAD', label: 'CAD (C$)', symbol: 'C$' },
      { code: 'CHF', label: 'CHF (Fr)', symbol: 'CHF ' },
      { code: 'NZD', label: 'NZD (NZ$)', symbol: 'NZ$' },
      { code: 'INR', label: 'INR (₹)', symbol: '₹' },
      { code: 'NGN', label: 'NGN (₦)', symbol: '₦' },
      { code: 'IDR', label: 'IDR (Rp)', symbol: 'Rp ' }
    ];

    const CCY_SYMBOLS = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'AUD': 'A$',
      'CAD': 'C$',
      'CHF': 'CHF ',
      'NZD': 'NZ$',
      'INR': '₹',
      'NGN': '₦',
      'IDR': 'Rp '
    };

    const USD_RATES = {
      'USD': 1.0,
      'EUR': 1.085,
      'GBP': 1.27,
      'JPY': 0.00645,
      'CHF': 1.130,
      'CAD': 0.7353,
      'AUD': 0.655,
      'NZD': 0.60,
      'INR': 0.01193,
      'NGN': 0.000625,
      'IDR': 0.0000633,
      'ZAR': 0.0541,
      'TRY': 0.0308,
      'MXN': 0.0581,
      'SGD': 0.7407,
      'HKD': 0.128,
      'SEK': 0.0939,
      'NOK': 0.0917,
      'DKK': 0.1453,
      'PLN': 0.2532,
      'CNH': 0.1379,
      'XAU': 2400.0,
      'XAG': 28.50,
      'BTC': 65000.0,
      'ETH': 3200.0
    };

    // --- HELPER FUNCTIONS ---
    function formatCurrency(val, ccy) {
      const symbol = CCY_SYMBOLS[ccy] || (ccy + ' ');
      let decimals = 2;
      if (ccy === 'JPY' || ccy === 'IDR') {
        decimals = 0;
      } else if (Math.abs(val) > 0 && Math.abs(val) < 0.01) {
        decimals = 4;
      }
      const absFormatted = Math.abs(val).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      return (val < 0 ? '-' : '') + symbol + absFormatted;
    }

    function setQuickLot(inputId, lotValue, calcFn) {
      const el = document.getElementById(inputId);
      if (el) {
        el.value = lotValue;
        if (calcFn && typeof window[calcFn] === 'function') {
          window[calcFn]();
        }
      }
    }

    function handlePairChange(pairSelectId, rateInputId, calcFnName) {
      const pairSelect = document.getElementById(pairSelectId);
      const rateInput = document.getElementById(rateInputId);
      if (pairSelect && rateInput) {
        const pair = pairSelect.value;
        if (MARKET_SPECS[pair]) {
          rateInput.value = MARKET_SPECS[pair].default_rate;
        }
      }
      if (calcFnName && typeof window[calcFnName] === 'function') {
        window[calcFnName]();
      }
    }

    function populateDropdowns() {
      // Populate Pair Selects
      document.querySelectorAll('.pair-select').forEach(select => {
        select.innerHTML = '';
        PAIR_GROUPS.forEach(group => {
          const optgroup = document.createElement('optgroup');
          optgroup.label = group.label;
          group.pairs.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.symbol;
            opt.textContent = p.name;
            optgroup.appendChild(opt);
          });
          select.appendChild(optgroup);
        });
      });

      // Populate Account Currency Selects
      document.querySelectorAll('.acc-ccy-select').forEach(select => {
        select.innerHTML = '';
        ACCOUNT_CURRENCIES.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.code;
          opt.textContent = c.label;
          select.appendChild(opt);
        });
      });
    }

    // --- 1. PIP VALUE CALCULATOR ---
    function calculatePipValue() {
      const pair = document.getElementById('pip-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const lots = parseFloat(document.getElementById('pip-lots').value) || 0;
      const customPips = parseFloat(document.getElementById('pip-pips-custom').value) || 1;
      const accCcy = document.getElementById('pip-acc-ccy').value;
      const rate = parseFloat(document.getElementById('pip-rate').value) || spec.default_rate;

      const quoteRateUSD = USD_RATES[spec.quote_ccy] || 1.0;
      const accRateUSD = USD_RATES[accCcy] || 1.0;

      const pipValQuote = spec.pip_size * spec.contract_size * lots;
      const pipValUSD = pipValQuote * quoteRateUSD;
      const pipValAcc = pipValUSD / accRateUSD;

      const stdPipValAcc = (spec.pip_size * spec.contract_size * 1.0 * quoteRateUSD) / accRateUSD;
      const customPipsValAcc = pipValAcc * customPips;

      const notionalQuote = spec.contract_size * lots * rate;
      const notionalUSD = notionalQuote * quoteRateUSD;
      const notionalAcc = notionalUSD / accRateUSD;

      document.getElementById('pip-out-val').textContent = formatCurrency(pipValAcc, accCcy);
      document.getElementById('pip-out-std').textContent = formatCurrency(stdPipValAcc, accCcy);
      document.getElementById('pip-out-custom').textContent = formatCurrency(customPipsValAcc, accCcy);
      document.getElementById('pip-out-notional').textContent = formatCurrency(notionalAcc, accCcy);
    }

    function resetPipValue() {
      document.getElementById('pip-pair').value = 'EUR/USD';
      document.getElementById('pip-lots').value = '1.0';
      document.getElementById('pip-pips-custom').value = '10';
      document.getElementById('pip-acc-ccy').value = 'USD';
      document.getElementById('pip-rate').value = MARKET_SPECS['EUR/USD'].default_rate;
      calculatePipValue();
    }

    // --- 2. LOT SIZE CALCULATOR ---
    let currentLotRiskType = 'pct';

    function setLotRiskType(type) {
      currentLotRiskType = type;
      if (type === 'pct') {
        document.getElementById('lot-btn-pct').classList.add('active');
        document.getElementById('lot-btn-fixed').classList.remove('active');
        document.getElementById('lot-pct-group').style.display = 'block';
        document.getElementById('lot-fixed-group').style.display = 'none';
      } else {
        document.getElementById('lot-btn-fixed').classList.add('active');
        document.getElementById('lot-btn-pct').classList.remove('active');
        document.getElementById('lot-fixed-group').style.display = 'block';
        document.getElementById('lot-pct-group').style.display = 'none';
      }
      calculateLotSize();
    }

    function syncLotRiskPct() {
      const slider = document.getElementById('lot-risk-pct-slider');
      const disp = document.getElementById('lot-risk-pct-disp');
      disp.textContent = parseFloat(slider.value).toFixed(1) + '%';
      calculateLotSize();
    }

    function calculateLotSize() {
      const balance = parseFloat(document.getElementById('lot-balance').value) || 0;
      const accCcy = document.getElementById('lot-acc-ccy').value;
      const pair = document.getElementById('lot-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const slPips = parseFloat(document.getElementById('lot-sl').value) || 1;
      const rate = parseFloat(document.getElementById('lot-rate').value) || spec.default_rate;

      let riskAmount = 0;
      if (currentLotRiskType === 'pct') {
        const riskPct = parseFloat(document.getElementById('lot-risk-pct-slider').value) || 1;
        riskAmount = balance * (riskPct / 100);
      } else {
        riskAmount = parseFloat(document.getElementById('lot-risk-fixed').value) || 0;
      }

      const quoteRateUSD = USD_RATES[spec.quote_ccy] || 1.0;
      const accRateUSD = USD_RATES[accCcy] || 1.0;

      const pipValStdAcc = (spec.pip_size * spec.contract_size * 1.0 * quoteRateUSD) / accRateUSD;
      const lotSize = (slPips * pipValStdAcc > 0) ? (riskAmount / (slPips * pipValStdAcc)) : 0;
      const totalPipValAcc = pipValStdAcc * lotSize;

      const notionalQuote = spec.contract_size * lotSize * rate;
      const notionalUSD = notionalQuote * quoteRateUSD;
      const notionalAcc = notionalUSD / accRateUSD;

      const stdLots = lotSize.toFixed(2);
      const miniLots = (lotSize * 10).toFixed(1);
      const microLots = (lotSize * 100).toFixed(0);

      document.getElementById('lot-out-size').textContent = lotSize.toFixed(2) + ' Lots';
      document.getElementById('lot-out-breakdown').textContent = stdLots + ' Std | ' + miniLots + ' Mini | ' + microLots + ' Micro';
      document.getElementById('lot-out-risk').textContent = formatCurrency(riskAmount, accCcy);
      document.getElementById('lot-out-pipval').textContent = formatCurrency(totalPipValAcc, accCcy);
      document.getElementById('lot-out-notional').textContent = formatCurrency(notionalAcc, accCcy);
    }

    function resetLotSize() {
      document.getElementById('lot-balance').value = '10000';
      document.getElementById('lot-acc-ccy').value = 'USD';
      setLotRiskType('pct');
      document.getElementById('lot-risk-pct-slider').value = '1.0';
      syncLotRiskPct();
      document.getElementById('lot-risk-fixed').value = '100';
      document.getElementById('lot-pair').value = 'EUR/USD';
      document.getElementById('lot-sl').value = '20';
      document.getElementById('lot-rate').value = MARKET_SPECS['EUR/USD'].default_rate;
      calculateLotSize();
    }

    // --- 3. MARGIN CALCULATOR ---
    function calculateMargin() {
      const pair = document.getElementById('margin-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const lots = parseFloat(document.getElementById('margin-lots').value) || 0;
      const leverage = parseFloat(document.getElementById('margin-leverage').value) || 100;
      const accCcy = document.getElementById('margin-acc-ccy').value;
      const rate = parseFloat(document.getElementById('margin-rate').value) || spec.default_rate;

      const quoteRateUSD = USD_RATES[spec.quote_ccy] || 1.0;
      const accRateUSD = USD_RATES[accCcy] || 1.0;

      const notionalQuote = spec.contract_size * lots * rate;
      const notionalUSD = notionalQuote * quoteRateUSD;
      const notionalAcc = notionalUSD / accRateUSD;

      const marginUSD = notionalUSD / leverage;
      const marginAcc = marginUSD / accRateUSD;
      const marginPct = (1 / leverage) * 100;

      const pipValAcc = (spec.pip_size * spec.contract_size * lots * quoteRateUSD) / accRateUSD;

      document.getElementById('margin-out-req').textContent = formatCurrency(marginAcc, accCcy);
      document.getElementById('margin-out-notional').textContent = formatCurrency(notionalAcc, accCcy);
      document.getElementById('margin-out-pct').textContent = marginPct.toFixed(2) + '% (1:' + leverage + ')';
      document.getElementById('margin-out-pipval').textContent = formatCurrency(pipValAcc, accCcy);
    }

    function resetMargin() {
      document.getElementById('margin-pair').value = 'EUR/USD';
      document.getElementById('margin-lots').value = '1.0';
      document.getElementById('margin-leverage').value = '100';
      document.getElementById('margin-acc-ccy').value = 'USD';
      document.getElementById('margin-rate').value = MARKET_SPECS['EUR/USD'].default_rate;
      calculateMargin();
    }

    // --- 4. PROFIT/LOSS CALCULATOR ---
    let currentPLDirection = 'long';

    function setPLDirection(dir) {
      currentPLDirection = dir;
      if (dir === 'long') {
        document.getElementById('pl-btn-long').classList.add('active');
        document.getElementById('pl-btn-short').classList.remove('active');
      } else {
        document.getElementById('pl-btn-short').classList.add('active');
        document.getElementById('pl-btn-long').classList.remove('active');
      }
      calculatePL();
    }

    function handlePLPairChange() {
      const pair = document.getElementById('pl-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      document.getElementById('pl-entry').value = spec.default_rate;
      const offset = spec.pip_size * 20;
      document.getElementById('pl-exit').value = (currentPLDirection === 'long') ? (spec.default_rate + offset).toFixed(5) : (spec.default_rate - offset).toFixed(5);
      calculatePL();
    }

    function calculatePL() {
      const pair = document.getElementById('pl-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const lots = parseFloat(document.getElementById('pl-lots').value) || 0;
      const entry = parseFloat(document.getElementById('pl-entry').value) || 0;
      const exit = parseFloat(document.getElementById('pl-exit').value) || 0;
      const accCcy = document.getElementById('pl-acc-ccy').value;

      const priceDiff = (currentPLDirection === 'long') ? (exit - entry) : (entry - exit);
      const pipsGained = priceDiff / spec.pip_size;

      const quoteRateUSD = USD_RATES[spec.quote_ccy] || 1.0;
      const accRateUSD = USD_RATES[accCcy] || 1.0;

      const pnlQuote = priceDiff * spec.contract_size * lots;
      const pnlUSD = pnlQuote * quoteRateUSD;
      const pnlAcc = pnlUSD / accRateUSD;

      const notionalQuote = spec.contract_size * lots * entry;
      const notionalUSD = notionalQuote * quoteRateUSD;
      const notionalAcc = notionalUSD / accRateUSD;

      const retPct = notionalAcc > 0 ? (pnlAcc / notionalAcc) * 100 : 0;

      const pnlEl = document.getElementById('pl-out-pnl');
      pnlEl.textContent = (pnlAcc >= 0 ? '+' : '') + formatCurrency(pnlAcc, accCcy);
      pnlEl.className = 'output-val ' + (pnlAcc >= 0 ? 'green' : 'red');

      const pipsEl = document.getElementById('pl-out-pips');
      pipsEl.textContent = (pipsGained >= 0 ? '+' : '') + pipsGained.toFixed(1) + ' pips';

      document.getElementById('pl-out-ret').textContent = (retPct >= 0 ? '+' : '') + retPct.toFixed(2) + '%';
      document.getElementById('pl-out-notional').textContent = formatCurrency(notionalAcc, accCcy);
    }

    function resetPL() {
      document.getElementById('pl-pair').value = 'EUR/USD';
      setPLDirection('long');
      document.getElementById('pl-lots').value = '1.0';
      document.getElementById('pl-entry').value = '1.0850';
      document.getElementById('pl-exit').value = '1.0870';
      document.getElementById('pl-acc-ccy').value = 'USD';
      calculatePL();
    }

    // --- 5. POSITION SIZE CALCULATOR ---
    function syncPosRiskPct() {
      const slider = document.getElementById('pos-risk-pct-slider');
      document.getElementById('pos-risk-pct-disp').textContent = parseFloat(slider.value).toFixed(1) + '%';
      calculatePositionSize();
    }

    function calculatePositionSize() {
      const balance = parseFloat(document.getElementById('pos-balance').value) || 0;
      const accCcy = document.getElementById('pos-acc-ccy').value;
      const riskPct = parseFloat(document.getElementById('pos-risk-pct-slider').value) || 1;
      const pair = document.getElementById('pos-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const slPips = parseFloat(document.getElementById('pos-sl').value) || 1;
      const rate = parseFloat(document.getElementById('pos-rate').value) || spec.default_rate;

      const riskAmount = balance * (riskPct / 100);

      const quoteRateUSD = USD_RATES[spec.quote_ccy] || 1.0;
      const accRateUSD = USD_RATES[accCcy] || 1.0;

      const pipValStdAcc = (spec.pip_size * spec.contract_size * 1.0 * quoteRateUSD) / accRateUSD;
      const lots = (slPips * pipValStdAcc > 0) ? (riskAmount / (slPips * pipValStdAcc)) : 0;
      const units = lots * spec.contract_size;
      const miniLots = lots * 10;
      const microLots = lots * 100;

      const totalPipValAcc = pipValStdAcc * lots;

      document.getElementById('pos-out-lots').textContent = lots.toFixed(2) + ' Lots';
      document.getElementById('pos-out-units').textContent = Math.round(units).toLocaleString('en-US') + ' Units';
      document.getElementById('pos-out-breakdown').textContent = miniLots.toFixed(1) + ' Mini | ' + microLots.toFixed(0) + ' Micro';
      document.getElementById('pos-out-risk').textContent = formatCurrency(riskAmount, accCcy);
      document.getElementById('pos-out-pipval').textContent = formatCurrency(totalPipValAcc, accCcy);
    }

    function resetPositionSize() {
      document.getElementById('pos-balance').value = '10000';
      document.getElementById('pos-acc-ccy').value = 'USD';
      document.getElementById('pos-risk-pct-slider').value = '1.0';
      syncPosRiskPct();
      document.getElementById('pos-pair').value = 'EUR/USD';
      document.getElementById('pos-sl').value = '25';
      document.getElementById('pos-rate').value = MARKET_SPECS['EUR/USD'].default_rate;
      calculatePositionSize();
    }

    // --- 6. RISK/REWARD CALCULATOR ---
    let currentRRDirection = 'long';

    function setRRDirection(dir) {
      currentRRDirection = dir;
      if (dir === 'long') {
        document.getElementById('rr-btn-long').classList.add('active');
        document.getElementById('rr-btn-short').classList.remove('active');
      } else {
        document.getElementById('rr-btn-short').classList.add('active');
        document.getElementById('rr-btn-long').classList.remove('active');
      }
      calculateRR();
    }

    function handleRRPairChange() {
      const pair = document.getElementById('rr-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const entry = spec.default_rate;
      const slOffset = spec.pip_size * 20;
      const tpOffset = spec.pip_size * 50;

      document.getElementById('rr-entry').value = entry;
      if (currentRRDirection === 'long') {
        document.getElementById('rr-sl').value = (entry - slOffset).toFixed(5);
        document.getElementById('rr-tp').value = (entry + tpOffset).toFixed(5);
      } else {
        document.getElementById('rr-sl').value = (entry + slOffset).toFixed(5);
        document.getElementById('rr-tp').value = (entry - tpOffset).toFixed(5);
      }
      calculateRR();
    }

    function calculateRR() {
      const pair = document.getElementById('rr-pair').value;
      const spec = MARKET_SPECS[pair] || MARKET_SPECS['EUR/USD'];
      const entry = parseFloat(document.getElementById('rr-entry').value) || 0;
      const sl = parseFloat(document.getElementById('rr-sl').value) || 0;
      const tp = parseFloat(document.getElementById('rr-tp').value) || 0;
      const lots = parseFloat(document.getElementById('rr-lots').value) || 0;
      const accCcy = document.getElementById('rr-acc-ccy').value;

      let riskPips = 0;
      let rewardPips = 0;

      if (currentRRDirection === 'long') {
        riskPips = (entry - sl) / spec.pip_size;
        rewardPips = (tp - entry) / spec.pip_size;
      } else {
        riskPips = (sl - entry) / spec.pip_size;
        rewardPips = (entry - tp) / spec.pip_size;
      }

      const rrRatio = (riskPips > 0) ? (rewardPips / riskPips) : 0;

      const quoteRateUSD = USD_RATES[spec.quote_ccy] || 1.0;
      const accRateUSD = USD_RATES[accCcy] || 1.0;

      const pipValAcc = (spec.pip_size * spec.contract_size * lots * quoteRateUSD) / accRateUSD;

      const riskAmountAcc = riskPips * pipValAcc;
      const rewardAmountAcc = rewardPips * pipValAcc;

      const breakevenWinRate = rrRatio > 0 ? (1 / (1 + rrRatio)) * 100 : 0;

      document.getElementById('rr-out-ratio').textContent = '1 : ' + rrRatio.toFixed(2);
      document.getElementById('rr-out-risk').textContent = formatCurrency(riskAmountAcc, accCcy) + ' (' + Math.abs(riskPips).toFixed(1) + ' pips)';
      document.getElementById('rr-out-reward').textContent = formatCurrency(rewardAmountAcc, accCcy) + ' (' + Math.abs(rewardPips).toFixed(1) + ' pips)';
      document.getElementById('rr-out-breakeven').textContent = breakevenWinRate.toFixed(1) + '%';

      const verdictEl = document.getElementById('rr-out-verdict');
      if (rrRatio >= 2.0) {
        verdictEl.innerHTML = '<span class="verdict-badge" style="background: rgba(74, 222, 128, 0.15); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.4);">EXCELLENT</span>';
      } else if (rrRatio >= 1.5) {
        verdictEl.innerHTML = '<span class="verdict-badge" style="background: rgba(229, 193, 88, 0.15); color: #E5C158; border: 1px solid rgba(229, 193, 88, 0.4);">GOOD</span>';
      } else {
        verdictEl.innerHTML = '<span class="verdict-badge" style="background: rgba(248, 113, 113, 0.15); color: #F87171; border: 1px solid rgba(248, 113, 113, 0.4);">POOR / HIGH RISK</span>';
      }
    }

    function resetRR() {
      document.getElementById('rr-pair').value = 'EUR/USD';
      setRRDirection('long');
      document.getElementById('rr-entry').value = '1.0850';
      document.getElementById('rr-sl').value = '1.0830';
      document.getElementById('rr-tp').value = '1.0900';
      document.getElementById('rr-lots').value = '1.0';
      document.getElementById('rr-acc-ccy').value = 'USD';
      calculateRR();
    }

    // --- 7. COMPOUNDING SIMULATOR ---
    function calculateCompounding() {
      const startBalance = parseFloat(document.getElementById('comp-balance').value) || 0;
      const monthlyRate = (parseFloat(document.getElementById('comp-return').value) || 0) / 100;
      const months = parseInt(document.getElementById('comp-duration').value) || 12;
      const accCcy = document.getElementById('comp-acc-ccy').value;

      let currentBalance = startBalance;
      let tbodyHtml = '';

      for (let m = 1; m <= months; m++) {
        const profit = currentBalance * monthlyRate;
        const monthStart = currentBalance;
        currentBalance += profit;
        const cumGainPct = startBalance > 0 ? ((currentBalance - startBalance) / startBalance) * 100 : 0;

        tbodyHtml += '<tr>' +
          '<td style="color: #9A9A9A;">Month ' + m + '</td>' +
          '<td>' + formatCurrency(monthStart, accCcy) + '</td>' +
          '<td style="color: #4ADE80;">+' + formatCurrency(profit, accCcy) + '</td>' +
          '<td>' + formatCurrency(currentBalance, accCcy) + '</td>' +
          '<td style="color: #E5C158;">+' + cumGainPct.toFixed(1) + '%</td>' +
        '</tr>';
      }

      const finalBalance = currentBalance;
      const totalProfit = finalBalance - startBalance;
      const totalGrowthPct = startBalance > 0 ? (totalProfit / startBalance) * 100 : 0;
      const multiple = startBalance > 0 ? (finalBalance / startBalance) : 0;

      document.getElementById('comp-out-final').textContent = formatCurrency(finalBalance, accCcy);
      document.getElementById('comp-out-pct').textContent = '+' + totalGrowthPct.toFixed(1) + '%';
      document.getElementById('comp-out-mult').textContent = multiple.toFixed(2) + 'x';
      document.getElementById('comp-out-profit').textContent = '+' + formatCurrency(totalProfit, accCcy);

      document.querySelector('#comp-table tbody').innerHTML = tbodyHtml;
    }

    function resetCompounding() {
      document.getElementById('comp-balance').value = '10000';
      document.getElementById('comp-return').value = '5.0';
      document.getElementById('comp-duration').value = '12';
      document.getElementById('comp-acc-ccy').value = 'USD';
      calculateCompounding();
    }

    // --- 8. DRAWDOWN RECOVERY CALCULATOR ---
    function syncDrawdownPct() {
      const slider = document.getElementById('dd-pct-slider');
      document.getElementById('dd-pct-disp').textContent = slider.value + '%';
      calculateDrawdown();
    }

    function calculateDrawdown() {
      const balance = parseFloat(document.getElementById('dd-balance').value) || 0;
      const accCcy = document.getElementById('dd-acc-ccy').value;
      const ddPct = parseFloat(document.getElementById('dd-pct-slider').value) || 20;

      const lossAmount = balance * (ddPct / 100);
      const remaining = balance - lossAmount;
      const reqGainPct = remaining > 0 ? (lossAmount / remaining) * 100 : 0;

      document.getElementById('dd-out-lost').textContent = '-' + formatCurrency(lossAmount, accCcy);
      document.getElementById('dd-out-remaining').textContent = formatCurrency(remaining, accCcy);
      document.getElementById('dd-out-recovery').textContent = '+' + reqGainPct.toFixed(1) + '%';

      const warning = document.getElementById('dd-out-warning');
      if (ddPct >= 50) {
        warning.innerHTML = '⚠ A <strong>' + ddPct + '% drawdown</strong> requires a <strong>' + reqGainPct.toFixed(0) + '% gain</strong> just to recover! Total capital protection is at extreme risk.';
        warning.style.background = 'rgba(248, 113, 113, 0.12)';
        warning.style.borderColor = 'rgba(248, 113, 113, 0.3)';
        warning.style.color = '#F87171';
      } else if (ddPct >= 30) {
        warning.innerHTML = '⚠ A <strong>' + ddPct + '% drawdown</strong> requires a <strong>' + reqGainPct.toFixed(1) + '% gain</strong> to break even. Tighten your stop loss limits.';
        warning.style.background = 'rgba(229, 193, 88, 0.12)';
        warning.style.borderColor = 'rgba(229, 193, 88, 0.3)';
        warning.style.color = '#E5C158';
      } else {
        warning.innerHTML = 'A <strong>' + ddPct + '% drawdown</strong> requires a <strong>' + reqGainPct.toFixed(1) + '% gain</strong> to break even.';
        warning.style.background = 'rgba(248, 113, 113, 0.08)';
        warning.style.borderColor = 'rgba(248, 113, 113, 0.2)';
        warning.style.color = '#F87171';
      }
    }

    function resetDrawdown() {
      document.getElementById('dd-balance').value = '10000';
      document.getElementById('dd-acc-ccy').value = 'USD';
      document.getElementById('dd-pct-slider').value = '20';
      syncDrawdownPct();
    }

    // INITIALIZATION ON DOM LOAD
    document.addEventListener('DOMContentLoaded', () => {
      populateDropdowns();

      calculatePipValue();
      calculateLotSize();
      calculateMargin();
      calculatePL();
      calculatePositionSize();
      calculateRR();
      calculateCompounding();
      calculateDrawdown();
    });
  </script>

  <!-- AUTH & NAV LINK CHECK -->
  <script>
    (function() {
      const trader = localStorage.getItem('fortrex_trader');
      if (trader) document.body.classList.add('is-logged-in');
    })();
  </script>

  <!-- MOBILE HAMBURGER TOGGLE -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var hamburger = document.querySelector('.hamburger');
      var navLinks = document.querySelector('#nav-links-main');
      if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
          });
        });
      }
    });
  </script>

</body>
</html>
"""

with open('vortex-fx/tools.html', 'a', encoding='utf-8') as f:
    f.write(part2)
print("Part 2 appended successfully")
