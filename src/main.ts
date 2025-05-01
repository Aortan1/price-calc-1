import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')


import vSelect from "vue-select"
import "vue-select/dist/vue-select.css";
import VueSplide from '@splidejs/vue-splide';

createApp(App)
    .component("v-select", vSelect)
    .use( VueSplide )
    .mount("#app");


window.addEventListener('DOMContentLoaded', () => {
    /* Accordion for faq-section */
    const items = document.querySelectorAll('.faq-ion-item');

    items.forEach(item => {
        const title = item.querySelector('.faq-ion-title');
        const wrap = item.querySelector('.faq-ion-wrap');

        if (title && wrap) {
            wrap.style.overflow = 'hidden';
            wrap.style.transition = 'height 0.3s ease';

            // Hide by default
            wrap.style.height = '0px';

            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                /*items.forEach(i => {
                    i.classList.remove('active');
                    const w = i.querySelector('.faq-ion-wrap');
                    if (w) w.style.height = '0px';
                });*/

                if (!isActive) {
                    item.classList.add('active');
                    wrap.style.height = wrap.scrollHeight + 'px';
                }
                /* Not hide others adding */
                else {
                    item.classList.remove('active');
                    wrap.style.height = '0px';
                }
            });
        }
    });
});