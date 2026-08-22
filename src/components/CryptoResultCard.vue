<script setup lang="ts">
import '@/styles/CryptoResultCard.css'

defineProps<{
  assetMark: string
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
    <div class="crypto-result-card-header">
      <div class="crypto-result-card-asset">
        <div class="crypto-result-card-mark" aria-hidden="true">
          {{ assetMark }}
        </div>

        <div>
          <h3 class="crypto-result-card-name">
            {{ assetName }}
          </h3>

          <p class="crypto-result-card-symbol">
            {{ symbol }}
          </p>
        </div>
      </div>

      <div class="crypto-result-card-badge">{{ allocationPercentage }}%</div>
    </div>

    <div class="crypto-result-card-divider" aria-hidden="true"></div>

    <div class="crypto-result-card-values">
      <div class="crypto-result-card-detail">
        <p class="crypto-result-card-label">Allocated</p>

        <p class="crypto-result-card-usd">
          {{ formattedUsdAllocation }}
        </p>
      </div>

      <div class="crypto-result-card-detail">
        <p class="crypto-result-card-label">Estimated quantity</p>

        <p class="crypto-result-card-quantity">≈ {{ formattedCryptoQuantity }} {{ symbol }}</p>
      </div>
    </div>
  </div>
</template>
