'use client'
import Search from "./search"
import loc from './location.json'
const Location_component = () => {

  return (
    <div className="flex space-x-10">
        <Search keywords={loc.don_vi_hanh_chinh_cap_tinh}/>
        
    </div>
  )
}


export default Location_component