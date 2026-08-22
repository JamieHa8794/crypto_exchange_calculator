<script setup lang="ts">
import { computed, ref } from 'vue'
import CryptoResultCard from '@/components/CryptoResultCard.vue'

import { useExchangeRates } from '@/composables/useExchangeRates'
import { formatCrypto, formatUsd, isPositiveFiniteNumber, parseUsdInput } from '@/utils'

import '@/styles/CryptoCalculator.css'

const { rates, isLoading, error } = useExchangeRates()

const usdHoldings = ref('')

const usdInput = computed(() => parseUsdInput(usdHoldings.value))

const validationMessage = computed(() => usdInput.value.message)

function prepareUsdInputForEditing(): void {
  if (usdInput.value.amount === null) {
    return
  }

  usdHoldings.value = usdHoldings.value.replace(/,/g, '')
}

function normalizeUsdInput(): void {
  const normalizedValue = usdInput.value.normalizedValue

  if (normalizedValue !== null) {
    usdHoldings.value = normalizedValue
  }
}

const allocation = computed(() => {
  const amount = usdInput.value.amount
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
  <div class="calculator-card">
    <div class="calculator-header">
      <p class="calculator-eyebrow">CRYPTO ALLOCATION</p>

      <h1 class="calculator-title">Split your crypto allocation</h1>

      <p class="calculator-description">
        Enter the USD amount you want to divide between Bitcoin and Ethereum.
      </p>
    </div>

    <div class="holdings-section">
      <div class="holdings-field">
        <label class="holdings-label" for="usd-holdings"> USD available to invest </label>

        <div class="holdings-input-wrapper">
          <input
            id="usd-holdings"
            class="holdings-input"
            v-model="usdHoldings"
            type="text"
            inputmode="decimal"
            placeholder="0.00"
            v-bind:aria-invalid="validationMessage ? 'true' : undefined"
            v-bind:aria-describedby="validationMessage ? 'usd-holdings-error' : undefined"
            v-on:focus="prepareUsdInputForEditing"
            v-on:blur="normalizeUsdInput"
          />

          <span class="holdings-currency" aria-hidden="true"> USD </span>
        </div>
        <p
          v-if="validationMessage"
          id="usd-holdings-error"
          class="holdings-validation-message"
          role="alert"
        >
          <span class="holdings-validation-icon" aria-hidden="true"> ! </span>

          {{ validationMessage }}
        </p>
      </div>

      <div class="allocation-summary">
        <div class="allocation-heading">
          <p class="allocation-label">Allocation</p>
          <p class="allocation-percentages">70% BTC · 30% ETH</p>
        </div>

        <div class="allocation-rail" aria-hidden="true">
          <div class="allocation-rail-btc"></div>
          <div class="allocation-rail-eth"></div>
        </div>
      </div>
    </div>

    <section
      v-if="isLoading"
      class="calculator-state calculator-state--loading"
      role="status"
      aria-live="polite"
    >
      <span class="calculator-state-spinner" aria-hidden="true"></span>

      <div>
        <p class="calculator-state-title">Loading exchange rates</p>

        <p class="calculator-state-message">Preparing the latest Bitcoin and Ethereum estimates.</p>
      </div>
    </section>

    <section v-else-if="error" class="calculator-state calculator-state--error" role="alert">
      <span class="calculator-state-icon" aria-hidden="true"> ! </span>

      <div>
        <p class="calculator-state-title">Unable to load exchange rates</p>

        <p class="calculator-state-message">
          Current Bitcoin and Ethereum estimates are unavailable. Please try again later.
        </p>
      </div>
    </section>

    <section v-else-if="allocation" class="allocation-results" aria-label="Estimated purchases">
      <div class="crypto-result-cards">
        <CryptoResultCard
          asset-mark="B"
          asset-name="Bitcoin"
          symbol="BTC"
          v-bind:allocation-percentage="70"
          v-bind:formatted-usd-allocation="formatUsd(allocation.btcUsdAmount)"
          v-bind:formatted-crypto-quantity="formatCrypto(allocation.btcQuantity)"
          variant="btc"
        />

        <CryptoResultCard
          asset-mark="E"
          asset-name="Ethereum"
          symbol="ETH"
          v-bind:allocation-percentage="30"
          v-bind:formatted-usd-allocation="formatUsd(allocation.ethUsdAmount)"
          v-bind:formatted-crypto-quantity="formatCrypto(allocation.ethQuantity)"
          variant="eth"
        />
      </div>

      <p class="allocation-disclaimer">
        Estimated quantities use the current exchange rates and may change.
      </p>
    </section>
  </div>
</template>
