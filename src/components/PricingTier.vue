<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PricingTier, BillingPeriod } from '../types/pricing';

const props = defineProps<{
  tier: PricingTier;
  period: BillingPeriod;
}>();

const selectedCreditIndex = ref(0);

const price = computed(() => {
  return props.tier[props.period][selectedCreditIndex.value];
});

const pricePerCredit = computed(() => {
  const credits = props.tier.credits[selectedCreditIndex.value];
  return (price.value / credits).toFixed(4);
});
</script>

<template>
  <div class="pricing-tier">
    <h3>{{ tier.name }}</h3>
    <div class="price">
      <span class="currency">$</span>
      <span class="amount">{{ price }}</span>
      <span class="period" v-if="period !== 'oneTime'">/{{ period=='monthly'?'month':period }}</span>
    </div>
    <div class="period-wrap">
        <span class="period" v-if="period !== 'oneTime'">{{ period=='monthly'?'month':period }}</span>
    </div>
    <div class="credits">
      <select v-model="selectedCreditIndex">
        <option v-for="(credit, index) in tier.credits" :key="credit" :value="index">
          {{ credit.toLocaleString() }} credits
        </option>
      </select>
    </div>
    <div class="price-per-credit">
      ${{ pricePerCredit }} per credit
    </div>
    <button class="cta">Join Waitlist</button>
  </div>
</template>

<style lang="scss" scoped>
.pricing-tier {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: start;
  border: 1px solid #e6e6e7;
  /*box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);*/
  transition: transform 300ms ease;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    margin: 0 0 1.5rem;
    color: #0f172a;
    font-size: 1.5rem;
  }

  .price {
    font-size: 3rem;
    font-weight: bold;
    color: #0f172a;

    text-align: start;

    .currency {
      font-size: 3rem;
      /*vertical-align: super*/;
    }

    .period {
      font-size: 1rem;
      color: #64748b;
    }
  }
  .period-wrap{
    margin-bottom: 1rem;
  }

  .credits {
    margin-bottom: 1rem;

    select {
      width: 100%;
      padding: 0.75rem;
      border-radius: 0;
      border: 1px solid transparent;
      border-bottom: 2px solid black;
      font-size: 1rem;
      color: #0f172a;
      background: white;
      cursor: pointer;
      transition: border-color 300ms ease;

      &:hover {
        border-bottom-color: #cbd5e1;
        outline: none;
      }
      &:focus{
        outline: none;
      }
      option{
        &:focus{

        }
      }
    }
  }

  .price-per-credit {
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 2rem;
  }

  .cta {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: #2563eb;
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 300ms ease;

    &:hover {
      background: #1d4ed8;
    }
  }
}
</style>