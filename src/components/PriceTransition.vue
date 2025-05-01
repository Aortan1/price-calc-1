<template>
  <div class="price-container">
    <div
        class="price-roller"
        :class="{ animate: animating }"
        @transitionend="handleTransitionEnd"
    >
      <div class="price-item">{{ formatPrice(newPrice) }}</div>
      <div class="price-item">{{ formatPrice(oldPrice) }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
})

const formatPrice = (val) => `$${val.toFixed(2)}`

const oldPrice = ref(props.price)
const newPrice = ref(props.price)
const animating = ref(false)

watch(
    () => props.price,
    (newVal) => {
      if (newVal === newPrice.value) return

      // Текущая старая цена становится нижним блоком
      oldPrice.value = newPrice.value
      newPrice.value = newVal

      // Сразу переместим барабан наверх (чтобы новая цена была вне поля зрения)
      requestAnimationFrame(() => {
        animating.value = true
      })
    }
)

function handleTransitionEnd() {
  animating.value = false
  oldPrice.value = newPrice.value
}
</script>

<style scoped>
.price-container {
  height: 4.5rem;
  overflow: hidden;
  width: fit-content;
  position: relative;
}

.price-roller {
  display: flex;
  flex-direction: column;
  transform: translateY(-50%);
}

.price-roller.animate {
  transition: transform 0.4s ease;
  transform: translateY(0%);
}

.price-item {
  height: 4rem;
  line-height: 4rem;
  /*font-size: 0.8em;*/
  font-size: 2.6rem;
  font-weight: 500;
  text-align: left;
  padding: 0.4rem 0;
  margin: 0.4rem 0;
}
</style>