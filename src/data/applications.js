import automotiveImage from '../assets/Automotive parts.png'
import consumerGoodsImage from '../assets/Consumer Goods.png'
import packagingImage from '../assets/Packaging.png'
import pipesProfilesImage from '../assets/Pipes and profiles.png'

export const applications = [
  {
    title: 'Packaging',
    description: 'Materials for bottles, containers, trays, tubs and other rigid packaging applications.',
    image: packagingImage,
    imageAlt: 'Plastic bottles, containers, trays and packaging products',
    accent: 'bg-[#d9f2ee]',
  },
  {
    title: 'Pipes & Profiles',
    description: 'Polymer materials for pipes, conduits, channels and extruded profile applications.',
    image: pipesProfilesImage,
    imageAlt: 'Industrial plastic pipes and extruded profiles',
    accent: 'bg-[#fde9d9]',
  },
  {
    title: 'Automotive Parts',
    description: 'Materials for moulded interior components, housings, trims, ducts and other automotive applications.',
    image: automotiveImage,
    imageAlt: 'Moulded plastic automotive components and interior parts',
    accent: 'bg-[#ede7fa]',
  },
  {
    title: 'Consumer Goods',
    description: 'Materials used across household products, storage solutions, appliance housings and everyday moulded goods.',
    image: consumerGoodsImage,
    imageAlt: 'Household plastic products and appliance components',
    accent: 'bg-[#dcebf8]',
  },
]
