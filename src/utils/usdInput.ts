export type UsdInputResult = {
  amount: number | null
  message: string | null
  normalizedValue: string | null
}

const USD_AMOUNT_PATTERN = /^-?(?:(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?|\.\d+)$/

const usdInputFormatter = new Intl.NumberFormat('en-US', {
  useGrouping: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function removeGrouping(value: string): string {
  return value.replace(/,/g, '')
}

export function parseUsdInput(value: string): UsdInputResult {
  const rawAmount = value.trim()

  if (rawAmount === '') {
    return {
      amount: null,
      message: null,
      normalizedValue: null,
    }
  }

  if (!USD_AMOUNT_PATTERN.test(rawAmount)) {
    return {
      amount: null,
      message: 'Enter a valid USD amount.',
      normalizedValue: null,
    }
  }

  const amount = Number(removeGrouping(rawAmount))

  if (!Number.isFinite(amount)) {
    return {
      amount: null,
      message: 'Enter a valid USD amount.',
      normalizedValue: null,
    }
  }

  if (amount <= 0) {
    return {
      amount: null,
      message: 'Enter an amount greater than $0.',
      normalizedValue: null,
    }
  }

  const normalizedValue = usdInputFormatter.format(amount)
  const roundedAmount = Number(removeGrouping(normalizedValue))

  if (roundedAmount <= 0) {
    return {
      amount: null,
      message: 'Enter an amount greater than $0.',
      normalizedValue,
    }
  }

  return {
    amount: roundedAmount,
    message: null,
    normalizedValue,
  }
}
