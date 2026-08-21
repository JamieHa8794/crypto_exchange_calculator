/** Validates and narrows unknown values to positive finite numbers. */
export function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatUsd(value: number): string {
  return usdFormatter.format(value)
}

const cryptoFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
})

export function formatCrypto(value: number): string {
  return cryptoFormatter.format(value)
}
