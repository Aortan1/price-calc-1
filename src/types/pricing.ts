export interface PricingTier {
  name: string;
  credits: number[];
  monthly: number[];
  yearly: number[];
  oneTime: number[];
  options: number[];
}

export interface PricingData {
  starter: PricingTier;
  pro: PricingTier;
  enterprise: PricingTier;
}

export type BillingPeriod = 'monthly' | 'yearly' | 'oneTime';

// ------

type TypeCR = {
  name: string
}

let cr : { name: string; lastname: string }
cr = {name: '123',lastname: '333'}


function getC(name: string):TypeCR{
   return {name}
}

type typeChannelFunction = (name: string) => TypeCR

const getC2 = (name: string):TypeCR => {
  return {name}
}

class Car {
  name: string
  price: number

  constructor(name: string, price:number){
    this.name = name
    this.price = price
  }
  getInfo():string {
    return `${this.name} - ${this.price}`
  }
}
