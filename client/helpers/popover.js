import { Popover } from 'bootstrap'
export const popover = {
  mounted(el) {
    new Popover(el, { 
        //sanitize: false,
        html: true
     })    
  },
  //updated(el) {    
  //  try {
  //    const t = Popover.getInstance(el)
  //    if (t && el.attributes?.title?.value) {
  //      t.setContent({ '.tooltip-inner': el.attributes.title.value })
  //    }  
  //  } catch (error) {
  //    ////console.log(error)
  //  }   
  //},
}