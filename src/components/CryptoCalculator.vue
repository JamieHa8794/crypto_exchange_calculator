<script setup lang="ts">
import { computed, ref } from 'vue'
import { useExchangeRates } from '@/composables/useExchangeRates'
import { isPositiveFiniteNumber } from '@/utils/number'

const { rates, isLoading, error } = useExchangeRates()

const usdHoldings = ref<number | ''>('')

const allocation = computed(() => {
  const amount = usdHoldings.value
  const currentRates = rates.value

  if (!currentRates) {
    return null
  }
  if (
    !isPositiveFiniteNumber(amount) ||
    !isPositiveFiniteNumber(currentRates.BTC) ||
    !isPositiveFiniteNumber(currentRates.ETH)
  ) {
    return null
  }

  const btcUsdAmount = amount * 0.7
  const ethUsdAmount = amount * 0.3

  return {
    btcUsdAmount,
    ethUsdAmount,
    btcQuantity: btcUsdAmount * currentRates.BTC,
    ethQuantity: ethUsdAmount * currentRates.ETH,
  }
})
</script>

<template>
  <div>
    <p v-if="isLoading">Loading exchange rates...</p>

    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="rates">
      <p>BTC: {{ rates.BTC }}</p>
      <p>ETH: {{ rates.ETH }}</p>
    </div>
  </div>
  <div>
    <label for="usd-holdings">USD available to invest</label>

    <input
      id="usd-holdings"
      v-model="usdHoldings"
      type="number"
      min="0"
      step="0.01"
      placeholder="0.00"
    />

    <p>Current value: {{ usdHoldings }}</p>
  </div>
  <div v-if="allocation">
    <p>BTC USD allocation: {{ allocation.btcUsdAmount }}</p>
    <p>BTC quantity: {{ allocation.btcQuantity }}</p>

    <p>ETH USD allocation: {{ allocation.ethUsdAmount }}</p>
    <p>ETH quantity: {{ allocation.ethQuantity }}</p>
  </div>
</template>
