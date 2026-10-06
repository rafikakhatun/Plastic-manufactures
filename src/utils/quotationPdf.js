import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoImage from '../assets/Modern Teal Plastic Manufacturing Logo.png'

function formatPdfPrice(value, pricing) {
  if (!Number.isFinite(value)) return 'To be confirmed'
  const amount = new Intl.NumberFormat(pricing?.locale || 'en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  return `${pricing?.currency || 'INR'} ${amount}`
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = source
  })
}

export async function downloadQuotationPdf(quote) {
  const doc = new jsPDF()
  const logo = await loadImage(logoImage)
  doc.addImage(logo, 'PNG', 14, 12, 72, 24)
  doc.setTextColor(10, 31, 51)
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold')
  doc.text('QUOTATION', 196, 20, { align:'right' })
  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')
  doc.text(`No. ${quote.ref}`, 196, 28, { align:'right' })
  if (quote.pricing?.isDemo) {
    doc.setTextColor(180, 83, 9)
    doc.setFont(undefined, 'bold')
    doc.text('DEMO - NOT FOR COMMERCIAL USE', 105, 38, { align:'center' })
    doc.setTextColor(10, 31, 51)
  }
  doc.setDrawColor(10, 31, 51)
  doc.line(14, 42, 196, 42)
  doc.setFont(undefined, 'bold')
  doc.text('PREPARED FOR', 14, 52)
  doc.setFont(undefined, 'normal')
  doc.text(quote.company, 14, 59)
  doc.text(`Attn: ${quote.name}`, 14, 65)
  doc.text(quote.email, 14, 71)
  doc.setFont(undefined, 'bold')
  doc.text('QUOTATION DETAILS', 196, 52, { align:'right' })
  doc.setFont(undefined, 'normal')
  doc.text(`Date: ${quote.date}`, 196, 59, { align:'right' })
  doc.text(`Valid until: ${quote.validUntil}`, 196, 65, { align:'right' })
  doc.text(`Delivery: ${quote.location}`, 196, 71, { align:'right' })
  autoTable(doc, {
    startY:82,
    head:[['Material','Colour','Pack','Qty','Rate']],
    body:[[quote.material,quote.colour,quote.pack,`${quote.qty} kg`,quote.pricing?.status==='demo_priced'?`${formatPdfPrice(quote.pricing.rate,quote.pricing)} / kg`:quote.rate]],
    headStyles:{ fillColor:[10,31,51] },
    styles:{ cellPadding:3.5, fontSize:9 },
    columnStyles:{ 4:{ cellWidth:38 } },
  })

  let notesY = doc.lastAutoTable.finalY + 14
  if (quote.pricing?.status === 'demo_priced') {
    const pricing = quote.pricing
    const cardX = 105
    const cardY = notesY - 5
    const cardWidth = 91
    const valueX = cardX + cardWidth - 6
    doc.setFillColor(247, 249, 250)
    doc.setDrawColor(220, 226, 231)
    doc.roundedRect(cardX, cardY, cardWidth, 50, 3, 3, 'FD')
    doc.setTextColor(10, 31, 51)
    doc.setFontSize(10)
    doc.setFont(undefined, 'bold')
    doc.text('DEMO PRICING SUMMARY', cardX + 6, notesY + 2)
    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')
    doc.text('Materials subtotal', cardX + 6, notesY + 11)
    doc.text(formatPdfPrice(pricing.materialSubtotal,pricing), valueX, notesY + 11, { align:'right' })
    doc.text('Freight', cardX + 6, notesY + 18)
    doc.text(formatPdfPrice(pricing.freight,pricing), valueX, notesY + 18, { align:'right' })
    doc.text(`Tax (${pricing.taxPercent}%)`, cardX + 6, notesY + 25)
    doc.text(formatPdfPrice(pricing.tax,pricing), valueX, notesY + 25, { align:'right' })
    doc.setDrawColor(205, 213, 219)
    doc.line(cardX + 6, notesY + 30, valueX, notesY + 30)
    doc.setFontSize(10)
    doc.setFont(undefined, 'bold')
    doc.text('Demo total', cardX + 6, notesY + 38)
    doc.text(formatPdfPrice(pricing.total,pricing), valueX, notesY + 38, { align:'right' })
    notesY += 57
  }

  doc.setFont(undefined, 'bold')
  doc.text('Terms & notes', 14, notesY)
  doc.setFont(undefined, 'normal')
  doc.text('- Rates are subject to final confirmation and material availability.', 14, notesY+7)
  doc.text('- Delivery target is within seven days of order confirmation.', 14, notesY+13)
  doc.text('- Payment, freight and applicable taxes will be confirmed separately.', 14, notesY+19)
  const isDemo = Boolean(quote.pricing?.isDemo)
  doc.setFillColor(isDemo?255:217, isDemo?247:242, isDemo?237:238)
  doc.roundedRect(14, notesY+28, 182, 17, 3, 3, 'F')
  doc.setTextColor(isDemo?146:15, isDemo?64:118, isDemo?14:110)
  doc.setFont(undefined, 'bold')
  doc.text(isDemo?'Demo pricing:':'Manual review:', 20, notesY+38)
  doc.setFont(undefined, 'normal')
  doc.text(isDemo?'Sample frontend values only; not a valid commercial quotation.':'Our team will confirm the current material rate before the final quote.', isDemo?46:49, notesY+38)
  doc.setTextColor(62, 81, 99)
  doc.setFontSize(8)
  doc.text('Plastic Manufactures and Co. | Professional polymer material supply', 14, 286)
  doc.save(`${quote.ref}.pdf`)
}
