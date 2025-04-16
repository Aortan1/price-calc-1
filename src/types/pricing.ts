export interface PricingTier {
  name: string;
  credits: number[];
  monthly: number[];
  yearly: number[];
  oneTime: number[];
}

export interface PricingData {
  starter: PricingTier;
  pro: PricingTier;
  enterprise: PricingTier;
}

export type BillingPeriod = 'monthly' | 'yearly' | 'oneTime';