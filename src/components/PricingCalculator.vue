<script setup lang="ts">
import { ref } from 'vue';
import BillingToggle from './BillingToggle.vue';
import PricingTier from './PricingTier.vue';
import type { PricingData, BillingPeriod } from '../types/pricing';

const PRICING_DATA: PricingData = {
  starter: {
    name: 'Starter',
    credits: [500, 1000, 1500],
    monthly: [29, 54, 79],
    yearly: [24, 45, 66],
    oneTime: [290, 540, 790]
  },
  pro: {
    name: 'Pro',
    credits: [2000, 3500, 5000],
    monthly: [99, 169, 229],
    yearly: [83, 141, 191],
    oneTime: [990, 1690, 2290]
  },
  enterprise: {
    name: 'Enterprise',
    credits: [10000, 20000, 50000],
    monthly: [449, 799, 1899],
    yearly: [374, 666, 1583],
    oneTime: [4490, 7990, 18990]
  }
};

const billingPeriod = ref<BillingPeriod>('monthly');
</script>

<template>
  <div class="pricing-calculator">
    <BillingToggle v-model="billingPeriod" />
    <div class="pricing-grid">
      <PricingTier
        v-for="tier in PRICING_DATA"
        :key="tier.name"
        :tier="tier"
        :period="billingPeriod"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pricing-calculator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>