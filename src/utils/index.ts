/** Validates and narrows unknown values to positive finite numbers. */
export function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

const standardUsdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactUsdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
})

export function formatUsd(value: number): string {
  const formatter = Math.abs(value) >= 1_000_000 ? compactUsdFormatter : standardUsdFormatter

  return formatter.format(value)
}

const standardCryptoFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
})

const compactCryptoFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
})

export function formatCrypto(value: number): string {
  const formatter = Math.abs(value) >= 10_000 ? compactCryptoFormatter : standardCryptoFormatter

  return formatter.format(value)
}

export * from './usdInput'
