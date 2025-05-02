<template>
  <div>
  <header class="nav-header bg-white shadow-md">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="#" class="text-xl font-bold text-gray-800">
          <img src="/lean-logo.png" alt="Leanlist" class="header-logo-img">
        </a>
      </div>

      <!-- Hamburger Button -->
      <div class="md:hidden">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Navigation Links (Desktop) -->
      <div class="nav-links hidden md:flex space-x-8">
        <div
            v-for="(item, index) in navItems"
            :key="index"
            class="link-block relative group"
        >
          <button class="text-gray-700 hover:text-gray-900 font-medium">{{ item.label }}</button>
          <div class="arrow-cont">
            <div class="arrow"></div>
          </div>
          <div
              class="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 ease-in-out z-10"
          >
            <ul class="sub-menu-ul p-4 space-y-3">
              <li
                  v-for="(sub, subIndex) in item.dropdown"
                  :key="subIndex"
                  class="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <a href="#" class="sub-menu-link">
                  <component :is="sub.icon" class="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p class="text-sm font-semibold text-gray-800">{{ sub.title }}</p>
                    <p class="text-xs text-gray-500">{{ sub.description }}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right Button -->
      <div class="hidden md:block">
        <button class="header-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm">
          Join Wishlist
        </button>
      </div>
    </nav>
  </header>
    <!-- Mobile Menu -->
    <Transition name="fade-slide">
      <div v-if="isMobileMenuOpen" class="nav-links-mobile md:hidden bg-white border-t border-gray-200 px-4 pb-4">
        <ul class="sub-menu-ul divide-y divide-gray-100">
          <li v-for="(item, index) in navItems" :key="item.label" class="py-2">
            <button
                class="w-full text-left text-gray-700 font-medium mb-2 flex justify-between items-center"
                @click="toggleMobileDropdown(index)"
            >
              {{ item.label }}
              <svg
                  class="w-4 h-4 transform transition-transform duration-300"
                  :class="{ 'rotate-180': mobileExpandedIndex === index }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Плавное раскрытие -->
            <Transition @enter="expandEnter" @leave="expandLeave">
              <div v-show="mobileExpandedIndex === index" class="overflow-hidden">
                <ul class="inner-menu-ul space-y-2 pl-4">
                  <li
                      v-for="(sub, subIndex) in item.dropdown"
                      :key="subIndex"
                      class="flex items-start space-x-2"
                  >
                    <a href="#" class="sub-menu-link">
                      <div class="sub-icon-wrap">
                        <component :is="sub.icon" class="sub-icon w-5 h-5 text-blue-500 mt-1" />
                      </div>
                      <div>
                        <p class="item-title text-sm font-semibold text-gray-800">{{ sub.title }}</p>
                        <p class="item-text text-xs text-gray-400">{{ sub.description }}</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </Transition>
          </li>
        </ul>
        <div class="mt-4">
          <button class="header-button w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm">
            Join Wishlist
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

// !!!!! lucide-vue-next

import { ref } from 'vue';
import { HomeIcon, BookIcon, UsersIcon, CogIcon, StarIcon } from 'lucide-vue-next';

const isMobileMenuOpen = ref(false);


//const mobileExpandedIndices = ref<number[]>([]);
const mobileExpandedIndex = ref<number>(null);
const expandedIndex = ref<number | null>(null);

function toggleDropdown(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}
function toggleMobileDropdown(index: number) {
  mobileExpandedIndex.value = mobileExpandedIndex.value === index ? null : index;
}
/*
function toggleMobileDropdown000(index: number) {
  if (mobileExpandedIndices.value.includes(index)) {
    mobileExpandedIndices.value = mobileExpandedIndices.value.filter(i => i !== index);
  } else {
    mobileExpandedIndices.value.push(index);
  }
}
*/

function expandEnter(el: Element) {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.opacity = '0';
  requestAnimationFrame(() => {
    element.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    element.style.height = element.scrollHeight + 'px';
    element.style.opacity = '1';
  });
}

function expandLeave(el: Element) {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + 'px';
  element.style.opacity = '1';
  requestAnimationFrame(() => {
    element.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    element.style.height = '0';
    element.style.opacity = '0';
  });
}


const navItems = ref([
  {
    label: 'Product',
    dropdown: [
      { icon: HomeIcon, title: 'Overview', description: 'Learn what we offer' },
      { icon: BookIcon, title: 'Documentation', description: 'How to use our product' },
    ],
  },
  {
    label: 'Solutions',
    dropdown: [
      { icon: UsersIcon, title: 'Teams', description: 'Built for collaboration' },
      { icon: StarIcon, title: 'Startups', description: 'Affordable and scalable' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { icon: BookIcon, title: 'Blog', description: 'Read our latest news' },
      { icon: StarIcon, title: 'Guides', description: 'Tips and tricks' },
    ],
  },
  {
    label: 'Pricing',
    dropdown: [
      { icon: StarIcon, title: 'Plans', description: 'Choose your plan' },
      { icon: CogIcon, title: 'Customization', description: 'Tailor to your needs' },
    ],
  },
  {
    label: 'Company',
    dropdown: [
      { icon: UsersIcon, title: 'About Us', description: 'Our mission and team' },
      { icon: BookIcon, title: 'Careers', description: 'Join our journey' },
    ],
  },
]);
</script>

<style lang="scss" scoped>

button{
  background-color: transparent;
  outline: none;
  border-color: transparent;
  &:focus, &:active{
    outline: none;
    border-color: transparent;
  }
}

.link-block{

}
.link-block:hover .arrow-cont .arrow{
  transform: rotateZ(180deg);
  top: calc(0.4rem - 3px);
  transition: 0.3s;
}
.link-block:hover button{
  color: #008df9;
  transition: 0.3s;
}
.link-block button{
    background: #fff;
    font-weight: 600;
    transition: 0.3s;
}
.link-block button:hover{
  border-color: transparent;
}
.link-block button:focus{
  outline: none
}
.nav-header{
  padding: 0.8rem 0;
}

.header-button{
   background: #008df9;
   color: #fff;
   font-weight: 600;
}

.arrow-cont{
  width: 15px;
  height: 15px;
  position: relative;
  display: inline-block;
  margin-left: -0.8rem;
}
.arrow-cont .arrow{
  position: absolute;
  top: 0.4rem;
  left: 0;
  width: 15px;
  height: 12px;
  background: url('/arrow-down.png') 0 0/contain no-repeat;
  transform: rotateZ(0);
  transition: 0.3s;
}

.icon {
  margin-right: 5px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
.header-logo-img{
  height: 1.8rem;
}
.sub-menu-ul{
  text-align: start;
}

.nav-links-mobile{
  position: absolute;
  width: 100%;
  padding: 0.5rem 1.5rem 1.5rem;
  text-align: start;
  font-family: Poppins, sans-serif;
  font-size: 1.13rem;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  p,a{
    font-family: Poppins, sans-serif;
  }
  p{
    font-weight: 600;
    font-size: 1.13rem;
  }
  a{
    font-weight: 400;
    font-size: 1rem;
  }
  .sub-menu-ul{
    margin: 0;
    padding-inline-start: 0;
    li{
      margin-bottom: 0;
    }
    button{
      padding: 0.2em 1.2em;
    }
  }
  .inner-menu-ul{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    li{
      margin-bottom: 1rem;
    }
  }
}
.sub-menu-link{
  display: flex;
  gap: 0.8rem;
  .item-text{
    margin-top: 0.5rem;
    font-weight: 400;
    font-size: 1rem;
  }
}


.sub-icon-wrap{
  display: inline-flex;
  padding: 12px;
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px 5px rgba(0,0,0,0.1);
  margin-right: 1.2rem;
}

@media (max-width: 991px) {
  .nav-links{
    display: none;
  }
}
</style>
