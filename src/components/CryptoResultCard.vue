<script setup lang="ts">
defineProps<{
  assetName: string
  symbol: 'BTC' | 'ETH'
  allocationPercentage: number
  formattedUsdAllocation: string
  formattedCryptoQuantity: string
  variant: 'btc' | 'eth'
}>()
</script>

<template>
  <div class="crypto-result-card" v-bind:class="`crypto-result-card--${variant}`">
    <h3>{{ assetName }} ({{ symbol }})</h3>
    <p>Allocation: {{ allocationPercentage }}%</p>
    <p>USD allocated: {{ formattedUsdAllocation }}</p>
    <p>Estimated quantity: {{ formattedCryptoQuantity }} {{ symbol }}</p>
  </div>
</template>
