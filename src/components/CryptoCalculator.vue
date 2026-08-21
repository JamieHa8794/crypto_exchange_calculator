<script setup lang="ts">
import { ref } from 'vue'
import { useExchangeRates } from '@/composables/useExchangeRates'

const { rates, isLoading, error } = useExchangeRates()

const usdHoldings = ref<number | ''>('')
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
</template>
