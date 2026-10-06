import absSanImage from '../assets/ABS & SAN.png'
import engineeringPlasticsImage from '../assets/Engineering Plastics.png'
import nylonImage from '../assets/Nylon.png'
import petImage from '../assets/PET & rPET.png'
import polyethyleneImage from '../assets/Polyethylene.png'
import polypropyleneImage from '../assets/Polypropylene.png'
import polystyreneImage from '../assets/Polystyrene.png'
import pvcImage from '../assets/PVC.png'

export const materials = [
  { slug:'polyethylene', code:'PE-FAMILY', name:'Polyethylene', family:'Polyethylene', type:'Virgin', grade:'Film', colour:'Natural', pack:'25 kg bag', application:'Blown film', certification:'TDS available', image:polyethyleneImage, imageAlt:'Natural polyethylene plastic granules', tone:'mint', description:'Versatile polyethylene materials for film, moulding and industrial packaging applications.' },
  { slug:'polypropylene', code:'PP-FAMILY', name:'Polypropylene', family:'Polypropylene', type:'Virgin', grade:'Homopolymer', colour:'Natural', pack:'25 kg bag', application:'Injection moulding', certification:'TDS available', image:polypropyleneImage, imageAlt:'Natural polypropylene plastic granules', tone:'blue', description:'Reliable polypropylene grades with excellent processability and balanced performance.' },
  { slug:'pvc', code:'PVC-FAMILY', name:'PVC', family:'Polyvinyl Chloride', type:'Virgin', grade:'General purpose', colour:'Natural', pack:'25 kg bag', application:'Rigid packaging', certification:'COA available', image:pvcImage, imageAlt:'PVC plastic resin granules', tone:'peach', description:'PVC material options developed for consistent processing across rigid and flexible uses.' },
  { slug:'polystyrene', code:'PS-FAMILY', name:'Polystyrene', family:'Polystyrene', type:'Virgin', grade:'General purpose', colour:'Clear', pack:'25 kg bag', application:'Rigid packaging', certification:'TDS available', image:polystyreneImage, imageAlt:'Polystyrene plastic resin granules', tone:'violet', description:'General-purpose and impact-modified polystyrene for precise, dependable production.' },
  { slug:'abs-san', code:'ABS-SAN', name:'ABS & SAN', family:'Styrenics', type:'Virgin', grade:'Injection', colour:'Ivory', pack:'25 kg bag', application:'Automotive', certification:'TDS available', image:absSanImage, imageAlt:'ABS and SAN plastic granules', tone:'slate', description:'Tough, versatile ABS and SAN materials for housings, components and technical parts.' },
  { slug:'pet-rpet', code:'PET-RPET', name:'PET & rPET', family:'Polyester', type:'Recycled', grade:'Bottle grade', colour:'Clear', pack:'FIBC jumbo bag', application:'Sheet & fibre', certification:'COA available', image:petImage, imageAlt:'Clear PET and recycled PET granules', tone:'blue', description:'Virgin and recycled PET material options for sheet, fibre and packaging applications.' },
  { slug:'nylon', code:'PA-FAMILY', name:'Nylon', family:'Polyamide', type:'Virgin', grade:'Injection', colour:'Natural', pack:'25 kg bag', application:'Automotive', certification:'TDS available', image:nylonImage, imageAlt:'Natural nylon plastic granules', tone:'peach', description:'Engineering-grade nylon materials for durable, high-performance industrial parts.' },
  { slug:'engineering-plastics', code:'EP-FAMILY', name:'Engineering Plastics', family:'Engineering', type:'Virgin', grade:'Custom grade', colour:'Custom match', pack:'FIBC jumbo bag', application:'Automotive', certification:'On request', image:engineeringPlasticsImage, imageAlt:'Engineering plastic granules and manufactured components', tone:'violet', description:'Specialist engineering polymers selected for demanding mechanical and thermal performance.' },
]

// Representative catalogue facets. Replace the values/mappings with approved catalogue data.
export const catalogueFilterGroups = [
  { label:'Type', param:'type', field:'type', options:['Virgin','Recycled'] },
  { label:'Grade', param:'grade', field:'grade', options:['Injection','Homopolymer','Bottle grade','General purpose','Film','Custom grade'] },
  { label:'Colour', param:'colour', field:'colour', options:['Natural','Clear','Ivory','Custom match'] },
  { label:'Form / Size', param:'form', field:'pack', options:['25 kg bag','FIBC jumbo bag','Bulk tanker'] },
  { label:'Application / Use Case', param:'use', field:'application', options:['Rigid packaging','Injection moulding','Sheet & fibre','Automotive','Blown film'] },
  { label:'Certification', param:'certification', field:'certification', options:['TDS available','COA available','On request'] },
  { label:'Demo Price / kg', param:'price', field:'demoPrice', isDemo:true, options:['Up to INR 125','INR 125 - INR 175','Above INR 175','Price on request'] },
]
