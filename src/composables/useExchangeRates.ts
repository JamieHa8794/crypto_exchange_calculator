import { onMounted, ref } from 'vue'

import { fetchExchangeRates } from '@/services/coinbase'
import type { CryptoRates } from '@/services/coinbase'

export function useExchangeRates() {
  const rates = ref<CryptoRates | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  let requestInProgress = false

  async function loadExchangeRates(): Promise<void> {
    if (requestInProgress) {
      return
    }

    requestInProgress = true
    isLoading.value = true
    error.value = null
    rates.value = null

    try {
      rates.value = await fetchExchangeRates()
    } catch {
      error.value = 'Unable to load exchange rates. Please try again.'
    } finally {
      isLoading.value = false
      requestInProgress = false
    }
  }

  onMounted(loadExchangeRates)

  return {
    rates,
    isLoading,
    error,
    retryExchangeRates: loadExchangeRates,
  }
}
