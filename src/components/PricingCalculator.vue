<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BillingToggle from './BillingToggle.vue';
import PricingTier from './PricingTier.vue';
import HeaderNavMenu from './HeaderNavMenu.vue';
import type { PricingData, BillingPeriod } from '../types/pricing';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';

const PRICING_DATA: PricingData = {
  starter: {
    name: 'Starter',
    credits: [500, 1000, 1500],
    monthly: [29, 54, 79],
    yearly: [24, 45, 66],
    oneTime: [290, 540, 790],
    options: [1,2,3,4,5,6,7],
  },
  pro: {
    name: 'Pro',
    credits: [2000, 3500, 5000],
    monthly: [99, 169, 229],
    yearly: [83, 141, 191],
    oneTime: [990, 1690, 2290],
    options: [1,2,3,4,5,6,7],
  },
  enterprise: {
    name: 'Enterprise',
    credits: [10000, 20000, 50000],
    monthly: [449, 799, 1899],
    yearly: [374, 666, 1583],
    oneTime: [4490, 7990, 18990],
    options: [1,2,3,4,5,6,7,8],
  }
};
const featuredTearName = 'Pro'


const billingPeriod = ref<BillingPeriod>('monthly');
//--

const plans = [
  {
    name: 'Free Plan',
    price: 0,
  },
  {
    name: 'Basic Plan',
    price: 49,
  },
  {
    name: 'Growth Plan',
    price: 79,
  },
  {
    name: 'Business Plan',
    price: 109,
  }
]

const features_data_1 = [
  {
    name: 'Email Credits',
    cells: [30,300,1000,2500]
  },
  {
    name: 'Phone Number Credits',
    cells: [5,50,200,500]
  },
  {
    name: 'Scraping Credits',
    cells: [1000, 1000, 5000, 'Unlimited']
  },
  {
    name: 'Raw List Importing',
    cells: [true, true, true, true]
  },
  {
    name: 'Data Cleaning',
    cells: [true, true, true, true]
  },
  {
    name: 'Data Filtering',
    cells: [true, true, true, true]
  },
  {
    name: 'Email Validation',
    cells: [true, true, true, true]
  },
]
const features_data_2 = [
  {
    name: 'Live Chat Support',
    cells: [true,true,true,true],
  },
  {
    name: 'Email Support',
    cells: [true,true,true,true],
  },
  {
    name: 'Phone Support',
    cells: [null,null,true,true],
  },
  {
    name: 'Onboarding Specialist',
    cells: [null,null,null,true],
  },
  {
    name: 'Dedicated Success Manager',
    cells: [null,null,null,true],
  },
]

/* Splide options */
const options ={
  type   : 'loop',
  perPage: 2,
  rewind: true,
  gap: '1.5rem',
  breakpoints: {
    767:{
      //fixedWidth: '80rem',
      //fixedHeight: '80rem',
      //gap: '4rem',
      perPage: 1,
    }
  }
}

onMounted(() => {
  document.querySelector('.splide__arrow--prev').innerHTML = '<span class="rr"><span class="arrow-span">←</span> Previous</span>';
  document.querySelector('.splide__arrow--next').innerHTML = '<span>Next <span class="arrow-span">→</span></span>';
})




</script>

<template>
  <div class="main-wrapper">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    <header class="header">
      <HeaderNavMenu />
    </header>

    <div class="pricing-calculator">

      <div class="container">
        <h1 class="title main-title">
          It's Easy to <span>Get Started</span>
        </h1>
        <p class="subtitle main-subtitle">
          Connect directly with executives and their dedicated teams.
        </p>

        <BillingToggle v-model="billingPeriod" />
        <div class="pricing-grid">
          <PricingTier
            v-for="tier in PRICING_DATA"
            :key="tier.name"
            :tier="tier"
            :period="billingPeriod"
            :class="{ 'featured': tier.name === featuredTearName }"
          />
        </div>
      </div>
    </div>
    <section class="plans-section">
      <div class="container">
        <h2 class="title plans-title">Plan Comparison</h2>
        <p class="subtitle plan-text">Choose your CleanList plan: Free, Basic, Growth, or Business</p>
        <div class="plans">
          <div class="plan"
              v-for="plan in plans"
              :key="plan.name">

            <h3 class="plan-name">{{ plan.name }}</h3>
            <div class="plan-price">${{ plan.price }}<span> /mo </span></div>
            <button class="button plan-button"> Join Waitlist </button>

          </div>

        </div>

      </div>
    </section>
    <section class="features-section">
      <div class="container">

        <div class="features-table">
          <div class="feature-row">
            <div class="cell name-cell">
              <h4 class="table-name">Product Features</h4>
            </div>
            <template v-for="plan in plans"
                      :key="plan.name">
              <div class="cell">
                <span class="cell-span plan-name-span"> {{ plan.name }} </span>
              </div>
            </template>
          </div>
          <div class="feature-row"
               v-for="feature in features_data_1"
               :key="feature.name">
            <div class="cell name-cell">
              {{ feature.name }}
            </div>
            <template v-for="(cell, index) in feature.cells"
                      :index="index">
              <div class="cell">
                <span class="cell-span" v-if="cell != null && typeof cell != 'boolean'"> {{ cell.toString() }} </span>
                <img class="cell-check-img" src="/check-grey.png" v-else-if="cell === true" alt="true">
              </div>
            </template>
          </div>
        </div>

        <div class="features-table">
          <div class="feature-row">
            <div class="cell name-cell">
              <h4 class="table-name">Support Features</h4>
            </div>
            <template v-for="plan in plans"
                      :key="plan.name">
              <div class="cell">
                <span class="cell-span plan-name-span"> {{ plan.name }} </span>
              </div>
            </template>
          </div>
          <div class="feature-row"
               v-for="feature in features_data_2"
               :key="feature.name">
            <div class="cell name-cell">
              {{ feature.name }}
            </div>
            <template v-for="(cell, index) in feature.cells"
                      :index="index">
              <div class="cell">
                <span class="cell-span" v-if="cell != null && typeof cell != 'boolean'"> {{ cell.toString() }} </span>
                <img class="cell-check-img" src="/check-grey.png" v-else-if="cell === true" alt="true">
              </div>
            </template>
          </div>
          <div class="feature-row buttons-row">
            <div class="cell name-cell">
              <h4 class="table-name"></h4>
            </div>
            <template v-for="plan in plans"
                      :key="plan.name">
              <div class="cell">
                <button class="plan-button">Join Waitlist</button>
              </div>
            </template>
          </div>
        </div>

      </div>
    </section>

    <section class="section real-section">
      <div class="container">
        <div class="real-title-content">
          <h2 class="title real-title">
            Real Feedback From Our <span>1,000+ Users</span>
          </h2>
          <p class="subtitle real-text">Witness transformative experiences with CleanList, told by our enthusiastic users</p>
        </div>

        <div class="slider-wrapper">
          <Splide :has-track="false" :options="options" aria-label="My Favorite Images">
            <SplideTrack>
              <SplideSlide>
                <img src="/real-logo-1.png" alt="" class="slide-img slide-img-1">
                <p class="subtitle slide-text">
                  "CleanList's simplicity is a lifesaver. The reliable data and time saved are game-changers for our outbound campaigns."
                </p>
                <div class="slide-user-wrap">
                  <p class="slide-user">
                    Sales Manager at Uber
                  </p>
                  <div class="slide-stars">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <img src="/real-logo-2.png" alt="" class="slide-img slide-img-2">
                <p class="subtitle slide-text">"CleanList's simplicity is a game-changer. Our data is ready in a few clicks and the campaigns of our team have never been better."</p>
                <div class="slide-user-wrap">
                  <p class="slide-user">
                    Sales Director at Klaviyo
                  </p>
                  <div class="slide-stars">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <img src="/real-logo-3.png" alt="" class="slide-img slide-img-3">
                <p class="subtitle slide-text">"With CleanList, I trust the data I'm using. It's cut my prep time and significantly improved my open and bounce rates."</p>
                <div class="slide-user-wrap">
                  <p class="slide-user">
                    Account Executive at Google
                  </p>
                  <div class="slide-stars">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <img src="/real-logo-4.png" alt="" class="slide-img slide-img-4">
                <p class="subtitle slide-text">"CleanList has taken the guesswork out of data collection. The personalization it provides has made my outreach much more effective."</p>
                <div class="slide-user-wrap">
                  <p class="slide-user">
                    Sales Representative at Sezzle
                  </p>
                  <div class="slide-stars">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                    <img src="/star-full.svg" alt="" class="star">
                  </div>
                </div>
              </SplideSlide>
            </SplideTrack>

            <div class="splide__arrows">
              <button class="splide__arrow splide__arrow--prev">Prev</button>
              <button class="splide__arrow splide__arrow--next">Next</button>
            </div>
          </Splide>
        </div>
        <div class="button-wrapper">
          <button class="plan-button short-button">Join Waitlist</button>
        </div>
      </div>
    </section>
    <section class="section faq-section">
      <div class="container faq-container">
        <h2 class="title faq-title">Frequently Asked Questions</h2>
        <p class="subtitle faq-subtitle">
          Discover how our platform can streamline your sales process, enhance your data management, and improve your outbound campaigns. Your most pressing queries, resolved.
        </p>
        <div class="faq-ion">
          <div class="faq-ion-item">
            <div class="faq-ion-title">
              <p>How does CleanList improve data reliability?</p>
              <div class="ion-arrow">
                 <div class="ion-arrow-p p1"></div>
                 <div class="ion-arrow-p p2"></div>
              </div>
            </div>
            <div class="faq-ion-wrap">
              CleanList uses advanced AI to clean and verify data, eliminating inaccuracies and ensuring only the most reliable information for your sales team.
            </div>
          </div>
          <div class="faq-ion-item">
            <div class="faq-ion-title">
              <p>What makes CleanList data conversational?</p>
              <div class="ion-arrow">
                <div class="ion-arrow-p p1"></div>
                <div class="ion-arrow-p p2"></div>
              </div>
            </div>
            <div class="faq-ion-wrap">
              CleanList adjusts key data points to a more conversational format, allowing for more personalized and engaging interactions in your automated outbound campaigns.
            </div>
          </div>
          <div class="faq-ion-item">
            <div class="faq-ion-title">
              <p>How can CleanList save my sales team time?</p>
              <div class="ion-arrow">
                <div class="ion-arrow-p p1"></div>
                <div class="ion-arrow-p p2"></div>
              </div>
            </div>
            <div class="faq-ion-wrap">
              By automating the collection and cleaning of data, CleanList drastically cuts down on the time your team would spend sifting through and verifying data.
              </div>
          </div>
          <div class="faq-ion-item">
            <div class="faq-ion-title">
              <p>What do I do if my CRM is not compatible with CleanList?</p>
              <div class="ion-arrow">
                <div class="ion-arrow-p p1"></div>
                <div class="ion-arrow-p p2"></div>
              </div>
            </div>
            <div class="faq-ion-wrap">
              Don't worry if your CRM isn't listed on the integrations page. If your CRM currently isn't currently compatible, please contact us and we'll create a custom integration for your specific company needs.
            </div>
          </div>
        </div>

      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="logo-col">
            <img src="/lean-logo.png" alt="" class="footer-logo-img">
            <h2 class="footer-left-title">The New Era of Prospecting.</h2>
            <p class="footer-text">
              Cleanlist.ai is a tech startup with a focus on re-engineering how prospecting happens. Register today for more effective and efficient outbound campaigns.
            </p>
            <form action="#" class="footer-form">
              <input type="email" placeholder="Enter your email" class="form-input">
              <button class="button plan-button" type="submit">Join waitlist</button>
            </form>

          </div>
          <div class="links-col">
            <h3 class="footer-title">
              Product
            </h3>
            <ul class="footer-links">
              <li>
                <a href="#" class="footer-link">LinkedIn Extraction</a>
              </li>
              <li>
                <a href="#" class="footer-link">Contact Data Scraper</a>
              </li>
              <li>
                <a href="#" class="footer-link">Contact Data AI Cleaner</a>
              </li>
              <li>
                <a href="#" class="footer-link">Email/Phone Verifier</a>
              </li>
              <li>
                <a href="#" class="footer-link">CRM Integrations</a>
              </li>
            </ul>
          </div>
          <div class="links-col">
            <h3 class="footer-title">
              Company
            </h3>
            <ul class="footer-links">
              <li>
                <a href="#" class="footer-link">About Us</a>
              </li>
              <li>
                <a href="#" class="footer-link">Careers</a>
              </li>
              <li>
                <a href="#" class="footer-link">Contact Us</a>
              </li>
            </ul>
          </div>
          <div class="links-col">
            <h3 class="footer-title">
              Resources
            </h3>
            <ul class="footer-links">
              <li>
                <a href="#" class="footer-link">Blog</a>
              </li>
              <li>
                <a href="#" class="footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="footer-link">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="copyright-wrap">
          <p class="copyright">
            Copyright © CleanList.ai
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<style>

 @import "tailwindcss";
 @import '@splidejs/vue-splide/css/core';

 :root{
   --blue: #3e8aff;
   --dark-blue: #171663;
 }

 .arrow-span{
   padding-bottom: 0.2rem;
   font-size: 2rem;
   line-height: 0.5rem;
 }
 .faq-ion-wrap-{
   height: 0;
   min-height: 0;
   opacity: 0;
   transition: 0.3s;
 }

 .faq-ion-item{
   cursor: pointer;
   transform: scale(1);
   transition: 0.4s;
 }
 .faq-ion-item:hover{
   transform: scale(0.97);
   transition: 0.4s;
 }
 .ion-arrow{
   position: absolute;
   left: -2rem;
   top: 0.3rem;
   width: 12px;
   height: 12px;
   transform: rotateZ(45deg);
   transition: 0.3s;
 }
 .ion-arrow-p{
   position: absolute;
   background-color: var(--dark-blue);
 }
 .ion-arrow-p.p1{
   width: 100%;
   height: 2px;
   bottom: 0;
   left: 0;
 }
 .ion-arrow-p.p2{
   width: 2px;
   height: 100%;
   top: 0;
   right: 0;
 }

 .faq-ion-item .faq-ion-title{
   position: relative;
   color: var(--dark-blue);
   transition: 0.3s;
 }
 .faq-ion-item.active .faq-ion-title{
   color: var(--blue);
   padding-bottom: 1.8rem;
   transition: 0.3s;
 }
 .faq-ion-item.active .ion-arrow{
   top: 0.5rem;
   transform: rotateZ(-45deg);
   transition: 0.3s;
 }
 .faq-ion-item.active .ion-arrow-p{
   background-color: var(--blue);
   transition: 0.3s;
 }

 .faq-ion-wrap {
   height: 0;
   overflow: hidden;
   transition: height 0.3s ease;
 }
 .faq-ion{
   color: var(--dark-blue);
 }
 .faq-ion-item{
   margin-bottom: 1rem;
   border-radius: 2rem;
   background-color: #fff;
   padding: 2rem 3rem 2rem 4.5rem;
   text-align: start;

 }
 .faq-ion-title{
   font-size: 1.37rem;
   font-weight: 700;
 }
 .faq-ion-wrap{
   font-family: Lato, sans-serif;
   font-size: 1.13rem;
 }

</style>

<style lang="scss" scoped>


.main-wrapper{
  color: var(--dark-blue);
}



.pricing-calculator {
  margin: 0 auto;
  padding: 1.8rem 0 4.5rem;
  font-family: Lato, sans-serif;
}
.header{
  position: sticky;
  top: 0;
  z-index: 99999;
}
.container{
  max-width: 100%;
  margin: 0 auto;
  padding-left: 7vw;
  padding-right: 7vw;
}

.pricing-grid {
  /*display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;*/
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 5rem auto 0;
}
.title{
  color: var(--dark-blue);
  font-size: 3.7rem;
  font-weight: 700;
  font-family: Inter, sans-serif;
  margin-bottom: 0.8rem;
}
.main-title{
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  span{
    color: var(--blue);
  }
}
.subtitle{
  color: var(--dark-blue);
  font-family: Poppins, sans-serif;
  margin-bottom: 2.1rem;
  font-size: 1.2rem;
}
.main-subtitle{

}

/* Others sections */


.section{
  padding: 2.5rem 0;
}
.plans-section{
  padding: 2.5rem 0;
  text-align: center;
  border-top: 1px solid rgba(0,0,0,0.08)
}
.plans-section .plans-title{
  font-size: 3.7rem;
  font-weight: 600;
}

.plans{
  display: flex;
  justify-content: center;
}
.plans .plan{
  padding: 0 0.8rem;
  min-width: 20%;

}
.plans .plan-name{
  font-size: 1.25rem;
}
.plans .plan-price{
  font-size: 3.5rem;
  font-weight: 600;
  white-space: nowrap;
}
.plan .plan-price span{
  font-size: 1.25rem;

}
.plan-button{
  min-width: 8rem;
  width: 100%;
  padding: 15px 5px;
  color: white;
  background-color: var(--blue);
  border-radius: 30px;
  transition: 0.3s;
  &:hover{
    filter: brightness(1.2);
    transition: 0.3s;
  }
}

.features-section{
  padding: 5rem 0 2em;
}


.features-table{
  margin-bottom: 5rem;
}

.features-table .table-name{
  font-size: 1.3rem;
  font-weight: 600;
}

.feature-row{
  background-color: transparent;
  border-style: none;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  display: grid;
}
.feature-row:nth-child(2n){
  background-color: #dadae2;
}
.feature-row .name-cell{
  text-align: start;
  line-height: 1;
}
.feature-row .cell{
  padding: 1rem 1.5rem;
}
.feature-row .cell-span{
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
}
.feature-row .cell-span.plan-name-span{
  font-size: 1rem;
  font-weight: 400;
}

.feature-row .cell-check-img{
  margin: 0 auto;
  width: 1.5rem;
  height: 1.5rem;
}
.real-section{
  padding: 3.5rem 0;
  text-align: start;
  .real-title-content{
    width: 48%;
    margin-bottom: 2rem;
  }
  .real-title{
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    span{
      color: var(--blue);
    }
  }
  .real-text{
    font-family: Lato,sans-serif;
  }
  .slider-wrapper{
    margin-top: 2.5rem;
  }
  .splide__slide{
    border-radius: 2rem;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 1px 6px #0d0c5405, 0 6px 22px #0d0c540a;
  }
  .slide-img{
    margin-bottom: 1.88rem;
    &.slide-img-1{
      width: 8.56rem;
    }
    &.slide-img-2{
      width: 11.5rem;
    }
    &.slide-img-3{
      width: 11.5rem;
    }
    &.slide-img-4{
      width: 9.75rem;
    }
  }
  .slide-text{
    font-family: Lato,sans-serif;
    text-align: start;
  }
  .slide-user-wrap{
    margin-top: 3rem;
  }
  .slide-user{
    color: #717194;
  }
  .slide-stars{
    display: flex;
    justify-content: start;
  }
  .splide__arrows{
    position: absolute;
    top: -10rem;
    right: 0;
  }
  .splide__arrow{
    border: 1px solid #3d4168;
    margin-right: 1rem;
    padding: 0.8rem 2rem;
  }
}
.arrow-span{
  padding-bottom: 0.2rem;
  font-size: 2rem;
  color: blue!important;
}
.button-wrapper{
  margin-top: 2rem;
  text-align: center;
}
.plan-button.short-button{
  width: auto;
  min-width: 12rem;
  border-radius: 1rem;
}

.faq-section{
  padding: 3.5rem 0;
  border-top: 1px solid rgba(0,0,0,0.08);
  border-bottom: 1px solid rgba(0,0,0,0.08);

  .faq-title{
    font-size: 2.25rem;
    padding: 0 1rem;
  }
  .faq-subtitle{
    font-size: 1.1rem;
    font-family: Lato, sans-serif;
    padding: 0 1rem;
  }
}
.faq-container{
  width: 43.5rem;
  padding: 0;
}
.footer{
  padding: 4rem 0;
  text-align: start;
  .footer-content{
    display: flex;
    gap: 3rem;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .logo-col{
    width: 35%;
  }
  .footer-logo-img{
    width: 15.0rem;
    margin-bottom: 2rem;
  }
  .footer-left-title{
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .footer-text{
    color: #6f7292;
  }
  .footer-form{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 400px;
    max-width: 100%;
    border: 1px solid rgba(111, 114, 146, 0.5);
    border-radius: 10px;
    padding: 10px 15px;
    margin: 2rem 0;
    background-color: #fff;
  }
  .form-input{
    width: 65%;
  }
  .footer-form button{
    width: 35%;
    border-radius: 10px;
    padding: 10px 5px;
  }
  .footer-title{
    font-size: 1.13rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .footer-links li{
    margin-bottom: 1rem;
  }

  .footer-link{
    font-size: 1.13rem;
    font-weight: 400;
    color: var(--dark-blue);
    transition: 0.3s;
    &:hover{
      color: var(--blue);
      transition: 0.3s;
    }
  }
  .copyright-wrap{
    padding: 2.5rem 0 1.5rem;
  }

}



@media (min-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .footer-content{
    .logo-col{
      min-width: 400px;
    }
  }
}
@media (max-width: 991px) {
  .features-section{
    .buttons-row{
      display: none;
    }
  }
  .footer-content{
    flex-direction: column;
  }
  .footer .logo-col, .footer .links-col{
    width: 100%;
  }
}
@media (max-width: 767px) {
  .pricing-grid{
    flex-direction: column;
    align-items: center;
    margin: 1rem auto 0;

  }
  .plans-section{
    .plans{
      flex-wrap: wrap;
    }
    .plan{
      padding-left: 2rem;
      padding-right: 2rem;
      width: 100%;
      max-width: 440px;
      margin-bottom: 3rem;
    }
  }
  .real-section{
    .real-title-content{
      width: 100%;
    }
    .splide__arrows{
      position: relative;
      top: auto;
      bottom: -1rem;
      right: 0;
    }
    .splide__arrow{
      padding: 0.8rem 1rem;
    }
  }
  .features-section{
    padding-top: 1rem;
    .feature-row .cell {
      padding: 0.8rem 0.5rem;
      .cell-span{
        font-size: 1rem;
        &.plan-name-span{
          font-size: 0.7rem;
        }
      }
    }

  }
}
</style>