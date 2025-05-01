<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import PriceTransition from '../components/PriceTransition.vue'
import type { PricingTier, BillingPeriod } from '../types/pricing'

const props = defineProps<{
  tier: PricingTier
  period: BillingPeriod
}>()

// Getting list of options for credits select, options.value - array
// label - for option text, value - for getting option value


const optionComments = {
  monthly: 'credits / month',
  yearly: 'credits / year',
  oneTime: 'credits',
}

const optionComment = computed(() => optionComments[props.period])

const options = computed(() =>
    props.tier.credits.map((value, index) => ({
      label: `${value} ${optionComment.value}`,
      //label: `<div>${value} ${optionComment.value}</div><div></div><div>$ ${props.tier[props.period][index]}</div>`,
      value,
      index
    }))
)
console.log('options.value[0].value ', typeof options.value[0].value, options.value[0].value)

// Selected credit, its .value - number
const selectedCreditValue = ref<number | null>(options.value[0].value)


// When tier is comming, getting default value for select from options
watch(
    () => props.tier,
    () => {
      //console.log('!! watch ????')
      return selectedCreditValue.value = options.value[0].value
      //console.log('options.value[0].value ', typeof options.value[0].value, options.value[0].value)
      //console.log('props.tier.credits[0].value ', typeof props.tier.credits[0].value, props.tier.credits[0].value)
    }
)

// list of NUMBERS of credit values
const optionValues = options.value.map(option=>option.value)

// Вычисляем индекс выбранного значения
const selectedCreditIndex = computed(() => {
    //console.log('!! ',   selectedCreditValue.value, options.value)
    return selectedCreditValue.value ? optionValues.indexOf(selectedCreditValue.value) : -1 }
)


console.log(selectedCreditIndex.value)

// Вычисляем цену
const price = computed(() => {
  const index = selectedCreditIndex.value
  return index >= 0 ? props.tier[props.period][index] : 0
})

// Цена за один кредит
const pricePerCredit = computed(() => {
  const index = selectedCreditIndex.value
  //console.log('selectedCreditIndex: ', selectedCreditIndex)
  if (index === -1) return '0.0000'
  const credits = optionValues[index]
  return (price.value / credits).toFixed(4)
})

// Подписи к преимуществам
const PricingTierOptions = {
  1: 'Waterfall enrichment  – 15+ data sources',
  2: 'Bulk File & CSV enrichment',
  3: 'API, Zapier, Make & Clay',
  4: 'Triple email verification (incl. catch-alls)',
  5: 'Credits roll-over (3 months)',
  6: 'Unlimited Users',
  7: 'Live Company & Contact Enrichment',
  8: 'SSO'
}

// Текст периода
const period_texts_dict = {
  monthly: 'Per month, billed annually',
  yearly: 'Per month',
  oneTime: 'Billed once'
}
const periodText = computed(() => period_texts_dict[props.period])
</script>

<template>
  <div class="pricing-tier">
    <h3>{{ tier.name }}</h3>

    <div class="price">
      <PriceTransition :price="price" />
    </div>

    <div class="period-wrap">
      <span class="period">{{ periodText }}</span>
    </div>
    <div class="credits">
      <v-select
          :options="options"
          v-model="selectedCreditValue"
          :reduce="option => option.value"
      >
        <!-- Как отображается пункт в выпадающем списке -->
        <template #option="{ label, value, index }">
          <div class="option-credit">
            <div>{{value}} <span>{{optionComment}}</span></div><div></div><div>${{props.tier[props.period][index]}}</div>
          </div>
        </template>

        <!-- Как отображается выбранное значение -->
        <template #selected-option="{ label, value }">
          <div class="option-credit selected">
            <div>{{value}} <span>{{optionComment}}</span></div>
          </div>
        </template>
      </v-select>
    </div>



    <div class="price-per-credit">
      ${{ pricePerCredit }} per credit
    </div>

    <div class="options-list-wrap">
      <ul class="options-list">
        <li
            class="option-li"
            v-for="(option, index) in tier.options"
            :key="option"
            :value="index"
        >
          {{ PricingTierOptions[option] }}
        </li>
      </ul>
    </div>

    <button class="cta-button">Join Waitlist</button>
  </div>
</template>

<style lang="scss" scoped>

.option-credit{
  display: flex;
  justify-content: space-between;
  div{
    span{
      opacity: 0.6;
      font-size: 0.9em;
    }
  }
}
:deep(.vs__selected-options){
  padding-left: 0;
}
:deep(.vs__selected){
  border: none;
  margin-left: 0;
  padding-left: 0;
}

.pricing-tier {
  max-width: 360px;
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
    margin: 0 0 0.5rem;
    color: #231d4f;
    font-size: 1.5rem;
  }
  .price-item{
  }

  .price {
    font-size: 3rem;
    font-weight: bold;
    color: #231d4f;
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
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    .period{
      color: #848199;
      font-size: 1.0rem;
    }
  }

  .credits {
    margin-bottom: 0.5rem;
    select {
      width: 100%;
      padding: 0.75rem 0.1rem;
      border-radius: 0;
      border: 1px solid transparent;
      border-bottom: 2px solid black;
      font-size: 1rem;
      color: #0f172a;
      cursor: pointer;
      transition: border-color 300ms ease;
      background: transparent;

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
  .options-list-wrap{
    .options-list{
      list-style-type: none!important;
      line-height: 1.2;
      padding-inline-start: 0;
    }
    .option-li{
      margin-bottom: 1rem;
      padding-left: 30px;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        top: -0.1rem;
        left: -0.1rem;
        width: 0.8rem;
        height: 0.8rem;
        padding: 0.2rem;
        border-radius: 50%;
        background-color: #eeeffb;
        background-image: url('/check-blue.svg');
        background-size: 70% 70%;
        background-position: 50% 70%;
        background-repeat: no-repeat;
      }
    }

  }

  .cta-button {
    width: 100%;
    padding: 1rem;
    border-radius: 2rem;
    background: #efeffc;
    color: #3e8aff;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 300ms ease;
    min-width: 150px;
    min-height: 50px;

    &:hover {
      background: #1d4ed8;
    }
  }

  :deep(.vs__dropdown-toggle) {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #1f2123;
  }
  :deep(.vs__clear) {
    opacity: 0;
    display: none;
  }


  &.featured{
    background-color: #3e8aff;
    position: relative;
    top: -18px;
    background-image: url('/featured-tier-bg.svg');
    background-size: cover;
    background-position: center;

    :deep(.vs__dropdown-toggle) {
      border-bottom-color: #fff;
    }
    :deep(.vs__open-indicator) {
      --vs-controls-color: #fff;
    }
    :deep(.vs__selected) {
      color: #fff;
    }

    h3{
      color: #fff;
    }

    .price{
      color: #fff;
    }
    .period-wrap .period, .price-per-credit{
      color: #d4d3db;
    }
    .credits{
      select{
        color: #fff;
        border-bottom: 2px solid #fff;
        option{
          color: black;
        }
      }
    }
    .options-list-wrap{
      .option-li {
        color: #fff;
      }
    }
    .cta-button{
      background-color: #fff;
    }

  }

}


</style>