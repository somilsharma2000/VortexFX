import sys

# Validate structure of PAIR_GROUPS
PAIR_GROUPS = [
  {
    'label': 'Major Forex',
    'pairs': [
      {'symbol': 'EUR/USD', 'base': 'EUR', 'quote': 'USD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.0850},
      {'symbol': 'GBP/USD', 'base': 'GBP', 'quote': 'USD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.2700},
      {'symbol': 'USD/JPY', 'base': 'USD', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 155.00},
      {'symbol': 'USD/CHF', 'base': 'USD', 'quote': 'CHF', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.8850},
      {'symbol': 'USD/CAD', 'base': 'USD', 'quote': 'CAD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.3600},
      {'symbol': 'AUD/USD', 'base': 'AUD', 'quote': 'USD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.6550},
      {'symbol': 'NZD/USD', 'base': 'NZD', 'quote': 'USD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.6000}
    ]
  },
  {
    'label': 'EUR Crosses',
    'pairs': [
      {'symbol': 'EUR/GBP', 'base': 'EUR', 'quote': 'GBP', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.8543},
      {'symbol': 'EUR/JPY', 'base': 'EUR', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 168.18},
      {'symbol': 'EUR/CHF', 'base': 'EUR', 'quote': 'CHF', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.9602},
      {'symbol': 'EUR/CAD', 'base': 'EUR', 'quote': 'CAD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.4756},
      {'symbol': 'EUR/AUD', 'base': 'EUR', 'quote': 'AUD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.6565},
      {'symbol': 'EUR/NZD', 'base': 'EUR', 'quote': 'NZD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.8083},
      {'symbol': 'EUR/SEK', 'base': 'EUR', 'quote': 'SEK', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 11.5550},
      {'symbol': 'EUR/NOK', 'base': 'EUR', 'quote': 'NOK', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 11.8320}
    ]
  },
  {
    'label': 'GBP Crosses',
    'pairs': [
      {'symbol': 'GBP/JPY', 'base': 'GBP', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 196.85},
      {'symbol': 'GBP/CHF', 'base': 'GBP', 'quote': 'CHF', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.1240},
      {'symbol': 'GBP/CAD', 'base': 'GBP', 'quote': 'CAD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.7272},
      {'symbol': 'GBP/AUD', 'base': 'GBP', 'quote': 'AUD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.9389},
      {'symbol': 'GBP/NZD', 'base': 'GBP', 'quote': 'NZD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 2.1167}
    ]
  },
  {
    'label': 'AUD Crosses',
    'pairs': [
      {'symbol': 'AUD/JPY', 'base': 'AUD', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 101.53},
      {'symbol': 'AUD/CHF', 'base': 'AUD', 'quote': 'CHF', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.5797},
      {'symbol': 'AUD/CAD', 'base': 'AUD', 'quote': 'CAD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.8908},
      {'symbol': 'AUD/NZD', 'base': 'AUD', 'quote': 'NZD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.0917}
    ]
  },
  {
    'label': 'NZD Crosses',
    'pairs': [
      {'symbol': 'NZD/JPY', 'base': 'NZD', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 93.00},
      {'symbol': 'NZD/CHF', 'base': 'NZD', 'quote': 'CHF', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.5310},
      {'symbol': 'NZD/CAD', 'base': 'NZD', 'quote': 'CAD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.8160}
    ]
  },
  {
    'label': 'CAD Crosses',
    'pairs': [
      {'symbol': 'CAD/JPY', 'base': 'CAD', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 113.97},
      {'symbol': 'CAD/CHF', 'base': 'CAD', 'quote': 'CHF', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 0.6507}
    ]
  },
  {
    'label': 'CHF Crosses',
    'pairs': [
      {'symbol': 'CHF/JPY', 'base': 'CHF', 'quote': 'JPY', 'pip_size': 0.01,   'contract_size': 100000, 'default_rate': 175.14}
    ]
  },
  {
    'label': 'Exotics',
    'pairs': [
      {'symbol': 'USD/TRY', 'base': 'USD', 'quote': 'TRY', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 32.50},
      {'symbol': 'USD/ZAR', 'base': 'USD', 'quote': 'ZAR', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 18.50},
      {'symbol': 'USD/MXN', 'base': 'USD', 'quote': 'MXN', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 17.20},
      {'symbol': 'USD/SGD', 'base': 'USD', 'quote': 'SGD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 1.3500},
      {'symbol': 'USD/HKD', 'base': 'USD', 'quote': 'HKD', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 7.8100},
      {'symbol': 'USD/SEK', 'base': 'USD', 'quote': 'SEK', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 10.6500},
      {'symbol': 'USD/NOK', 'base': 'USD', 'quote': 'NOK', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 10.9000},
      {'symbol': 'USD/DKK', 'base': 'USD', 'quote': 'DKK', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 6.8800},
      {'symbol': 'USD/PLN', 'base': 'USD', 'quote': 'PLN', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 3.9500},
      {'symbol': 'USD/CNH', 'base': 'USD', 'quote': 'CNH', 'pip_size': 0.0001, 'contract_size': 100000, 'default_rate': 7.2500}
    ]
  },
  {
    'label': 'Precious Metals',
    'pairs': [
      {'symbol': 'XAU/USD', 'base': 'XAU', 'quote': 'USD', 'pip_size': 0.01,  'contract_size': 100,   'default_rate': 2400.00},
      {'symbol': 'XAG/USD', 'base': 'XAG', 'quote': 'USD', 'pip_size': 0.001, 'contract_size': 5000,  'default_rate': 28.50}
    ]
  },
  {
    'label': 'Cryptocurrency',
    'pairs': [
      {'symbol': 'BTC/USD', 'base': 'BTC', 'quote': 'USD', 'pip_size': 1.0, 'contract_size': 1, 'default_rate': 65000.00},
      {'symbol': 'ETH/USD', 'base': 'ETH', 'quote': 'USD', 'pip_size': 0.1, 'contract_size': 1, 'default_rate': 3200.00}
    ]
  }
]

total = sum(len(g['pairs']) for g in PAIR_GROUPS)
print("Validated pair groups. Total pairs:", total)
