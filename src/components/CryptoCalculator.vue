<script setup lang="ts">
import { computed, ref } from 'vue'
import { useExchangeRates } from '@/composables/useExchangeRates'
import { formatCrypto, formatUsd, isPositiveFiniteNumber } from '@/utils'

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
  <section v-if="allocation" aria-labelledby="estimated-purchases-heading">
    <h2 id="estimated-purchases-heading">Estimated purchases</h2>
    <p>Estimates based on current Coinbase exchange rates.</p>

    <article>
      <h3>Bitcoin (BTC)</h3>
      <p>Allocation: 70%</p>
      <p>USD allocated: {{ formatUsd(allocation.btcUsdAmount) }}</p>
      <p>
        Estimated quantity:
        {{ formatCrypto(allocation.btcQuantity) }} BTC
      </p>
    </article>

    <article>
      <h3>Ethereum (ETH)</h3>
      <p>Allocation: 30%</p>
      <p>USD allocated: {{ formatUsd(allocation.ethUsdAmount) }}</p>
      <p>
        Estimated quantity:
        {{ formatCrypto(allocation.ethQuantity) }} ETH
      </p>
    </article>
  </section>
</template>
