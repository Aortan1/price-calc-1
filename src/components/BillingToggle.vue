<script setup lang="ts">
import { ref } from 'vue';
import type { BillingPeriod } from '../types/pricing';

const props = defineProps<{
  modelValue: BillingPeriod;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: BillingPeriod): void;
}>();


const periods: BillingPeriod[] = ['monthly', 'yearly', 'oneTime'];
//const periods: BillingPeriod[] = ['monthly', 'yearly'];

const handleClick = (period: BillingPeriod) => {
  emit('update:modelValue', period);
};
</script>

<template>
  <div class="billing-toggle">
    <div class="toggle-container">
      <div class="slider" :class="modelValue"></div>
      <button 
        v-for="period in periods" 
        :key="period"
        :class="{ active: modelValue === period }"
        @click="handleClick(period)"
      >
        {{ period === 'oneTime' ? 'One-time' : period.charAt(0).toUpperCase() + period.slice(1) }}
        <span v-if="period === 'yearly'" class="savings">Save 20%</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;

}

.toggle-container {
  position: relative;
  display: flex;
  background: #e2e8f0;
  border-radius: 1rem;
  /*padding: 0.75rem 1rem;*/
  padding: 0;
  gap: 0.25rem;
  width: 27.5rem;
  max-width: 100%;
  button {
    position: relative;
    flex: 1;
    padding: 0.75rem 0.5rem;
    border: none;
    background: transparent;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
    transition: color 300ms ease;
    z-index: 1;

    &.active {
      color: #0f172a;
    }
    &:focus{
      outline: none!important;
    }

    .savings {
      font-size: 0.75rem;
      background: #dbeafe;
      color: #2563eb;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      margin-left: 0.5rem;
    }
  }
}



.slider {
  position: absolute;
  line-height: 1;
  left: 0.25rem;
  top: 0.25rem;
  bottom: 0.25rem;
  width: calc(33.33% - 0.2rem);
  background: white;
  border-radius: 0.75rem;
  transition: transform 300ms ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);



  &.yearly {
    transform: translateX(100%);
  }

  &.oneTime {
    transform: translateX(200%);
  }
}

@media (max-width: 767px) {
  .toggle-container {
    button{
      padding: 0.75rem 0.25rem;
      white-space: nowrap;
      .savings{
        margin-left: 0.2rem;
        padding: 0.25rem 0.25rem;
      }
    }
  }
}
</style>