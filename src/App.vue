<script setup lang="ts">
import { useExchangeRates } from '@/composables/useExchangeRates'

const { rates, isLoading, error } = useExchangeRates()
</script>

<template>
  <main>
    <p v-if="isLoading">Loading exchange rates...</p>

    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="rates">
      <p>BTC: {{ rates.BTC }}</p>
      <p>ETH: {{ rates.ETH }}</p>
    </div>
  </main>
</template>
