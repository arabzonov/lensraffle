import { Tooltip } from 'bootstrap'
export const tooltip = {
  mounted(el) {
    new Tooltip(el, { trigger: 'hover' })    
  },
  updated(el) {    
    try {
      const t = Tooltip.getInstance(el)
      if (t && el.attributes?.title?.value) {
        t.setContent({ '.tooltip-inner': el.attributes.title.value })
      }  
    } catch (error) {
      ////console.log(error)
    }   
  },
}