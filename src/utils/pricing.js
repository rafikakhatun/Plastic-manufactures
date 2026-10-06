import { demoPricingData } from '../data/pricing.demo'

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100

function manualReview(reason, snapshot = {}) {
  return { status:'manual_review', isDemo:true, rate:null, total:null, reason, snapshot }
}

function findConfiguredValue(record, value) {
  const input = String(value ?? '').trim().toLowerCase()
  const key = Object.keys(record).find(item => item.toLowerCase() === input)
  return key ? record[key] : undefined
}

export function calculateQuotePricing({ material, grade, colour, pack, qty }) {
  const config = demoPricingData
  const pricingMode = import.meta.env.VITE_PRICING_MODE || config.mode
  const quantity = Number(qty)
  const materialKey = String(material ?? '').trim().toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')
  const baseRate = findConfiguredValue(config.baseRates, materialKey)
  const gradeAdjustment = findConfiguredValue(config.gradeAdjustments, grade)
  const colourAdjustment = findConfiguredValue(config.colourAdjustments, colour)
  const packAdjustment = findConfiguredValue(config.packAdjustments, pack)
  const snapshotBase = { mode:pricingMode, version:config.version, calculatedAt:new Date().toISOString() }

  if (pricingMode !== 'demo') return manualReview('Live pricing is awaiting an approved rate source.', snapshotBase)

  if (!Number.isFinite(quantity) || quantity <= 0) return manualReview('A valid quantity is required.', snapshotBase)
  if (quantity < config.minimumQuantityKg) return manualReview(`Minimum demo quantity is ${config.minimumQuantityKg} kg.`, snapshotBase)
  if (quantity > config.manualReviewAboveKg) return manualReview('This quantity requires commercial review.', snapshotBase)
  if (!Number.isFinite(baseRate)) return manualReview('No base rate is configured for this material.', snapshotBase)
  if (!Number.isFinite(gradeAdjustment)) return manualReview('This grade requires commercial review.', snapshotBase)
  if (!Number.isFinite(colourAdjustment)) return manualReview('This colour requires commercial review.', snapshotBase)
  if (!Number.isFinite(packAdjustment)) return manualReview('No packaging adjustment is configured.', snapshotBase)

  const costRate = baseRate + gradeAdjustment + colourAdjustment + packAdjustment
  const rate = roundMoney(costRate * (1 + config.marginPercent / 100))
  const materialSubtotal = roundMoney(rate * quantity)
  const freight = roundMoney(config.freightPerKg * quantity)
  const taxableSubtotal = roundMoney(materialSubtotal + freight)
  const tax = roundMoney(taxableSubtotal * config.taxPercent / 100)
  const total = roundMoney(taxableSubtotal + tax)
  const calculatedAt = new Date()
  const validUntilDate = new Date(calculatedAt.getTime() + config.validityDays * 86400000)

  return {
    status:'demo_priced', isDemo:true, currency:config.currency, locale:config.locale, unit:config.unit,
    quantity, rate, materialSubtotal, freight, taxableSubtotal, tax, total,
    marginPercent:config.marginPercent, taxPercent:config.taxPercent,
    calculatedAt:calculatedAt.toISOString(), validUntil:validUntilDate.toISOString(),
    snapshot:{ ...snapshotBase, baseRate, gradeAdjustment, colourAdjustment, packAdjustment, freightPerKg:config.freightPerKg, marginPercent:config.marginPercent, taxPercent:config.taxPercent },
  }
}

export function formatPrice(value, pricing) {
  if (!Number.isFinite(value)) return 'To be confirmed'
  return new Intl.NumberFormat(pricing?.locale || 'en-IN', { style:'currency', currency:pricing?.currency || 'INR', maximumFractionDigits:2 }).format(value)
}
