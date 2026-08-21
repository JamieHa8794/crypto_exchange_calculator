const COINBASE_EXCHANGE_RATES_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=USD'

type CoinbaseExchangeRatesResponse = {
  data: {
    currency: string
    rates: Record<string, string | undefined>
  }
}

export type CryptoRates = {
  BTC: number
  ETH: number
}

function parseExchangeRate(value: string | undefined, currency: 'BTC' | 'ETH'): number {
  if (value === undefined) {
    throw new Error(`Missing ${currency} exchange rate`)
  }

  const rate = Number(value)

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error(`Invalid ${currency} exchange rate`)
  }

  return rate
}

export async function fetchExchangeRates(): Promise<CryptoRates> {
  const response = await fetch(COINBASE_EXCHANGE_RATES_URL)

  if (!response.ok) {
    throw new Error(`Coinbase request failed with status ${response.status}`)
  }

  const responseData = (await response.json()) as CoinbaseExchangeRatesResponse
  const rates = responseData.data?.rates

  return {
    BTC: parseExchangeRate(rates?.BTC, 'BTC'),
    ETH: parseExchangeRate(rates?.ETH, 'ETH'),
  }
}
