<script setup lang="ts">
import { ref } from 'vue';
import type { BillingPeriod } from '../types/pricing';

const props = defineProps<{
  modelValue: BillingPeriod;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: BillingPeriod): void;
}>();

const toggle = () => {
  emit('update:modelValue', props.modelValue === 'monthly' ? 'yearly' : 'monthly');
};
</script>

<template>
  <div class="billing-toggle">
    <span :class="{ active: modelValue === 'monthly' }">Monthly</span>
    <button @click="toggle" :class="{ 'is-yearly': modelValue === 'yearly' }">
      <span class="slider"></span>
    </button>
    <span :class="{ active: modelValue === 'yearly' }">
      Yearly
      <span class="savings">Save 20%</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  span {
    color: #64748b;
    transition: color 300ms ease;

    &.active {
      color: #0f172a;

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

  button {
    position: relative;
    width: 6rem;
    height: 1.8rem;
    border-radius: 1rem;
    background: #efeeed;
    transition: background-color 300ms ease;
    border: none;
    padding: 0;
    cursor: pointer;

    &:hover {
      background: #cbd5e1;
    }
    &:focus{
      outline: none!important;
    }

    .slider {
      position: absolute;
      left: 0.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      background: white;
      border-radius: 50%;
      transition: transform 300ms ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    &.is-yearly .slider {
      transform: translate(calc(6rem - 1.5rem), -50%);
    }
  }
}
</style>