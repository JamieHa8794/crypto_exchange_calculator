import { onMounted, ref } from 'vue'

import { fetchExchangeRates } from '@/services/coinbase'
import type { CryptoRates } from '@/services/coinbase'

export function useExchangeRates() {
  const rates = ref<CryptoRates | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  async function loadExchangeRates() {
    isLoading.value = true
    error.value = null

    try {
      rates.value = await fetchExchangeRates()
      console.log('Coinbase exchange rates:', rates.value)
    } catch (caughtError) {
      rates.value = null
      error.value =
        caughtError instanceof Error ? caughtError.message : 'Unable to load exchange rates'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadExchangeRates)

  return {
    rates,
    isLoading,
    error,
  }
}
