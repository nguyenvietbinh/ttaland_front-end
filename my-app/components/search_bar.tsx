'use client'

import { useEffect } from "react"


const _search_bar = () => {
  const state_choices = {
    'AP': 'Andra Pradesh',
    'HYD' : 'Hyderabad' ,
    'AS':'Assam',
    'BH':'Bihar',
    'P':'Patna',
    'CHG':'Chhattisgarh',
    'Rp':'Raipur',
    'G': 'Goa',
    'GU':'Gujarat',
    'H': 'Haryana',
    'HP': 'Himachal Pradesh',
    'JAK'  : 'Jammu and Kashmir',
    'JK': 'Jharkhand',
    'RCH': 'Ranchi',
    'KR': 'Karnataka',
    'KRL' : 'Kerala',
    'MP' : 'Madya Pradesh',
    'BP' :  'Bhopal',
    'OD' :  'Orissa'
  }
  const price_choices = {
    '100000':'$100,000',
    '200000':'$200,000',
    '300000':'$300,000',
    '400000':'$400,000',
    '500000':'$500,000',
    '600000':'$600,000',
    '700000':'$700,000',
    '800000':'$800,000',
    '900000':'$900,000',
    '1000000':'$1M+',
  }
  const bedroom_choices = {
    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    '10':10
  }
  const handleChange = (event: any) => {
    const a: any = document.querySelector('.form_a')
    console.log(typeof a)
    const form = new FormData(a)
    console.log(form.get('state'))

  }
  return (
    <div className="w-full h-auto bg-white flex">
      <div className="w-full h-auto p-10 bg-gray-700 md:mx-[16vw] mx-[8vw] my-[15vh] text-center">
        <p className="md:text-6xl text-3xl m-[5vh]">Property Searching Just Got So Easy</p>
        <p className="text-2xl hidden md:block mx-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quas, asperiores eveniet vel nostrum magnam voluptatum tempore! Consectetur, id commodi!</p>
        <div className="h-auto w-full mx-auto mt-10">
          <form className="form_a grid grid-cols-1 md:grid-cols-3 gap-[1vw]" action="">
            <input className="w-full h-[4vh] bg-white text-black rounded-sm mt-2 p-3" type="text" name="keyword" placeholder="Keyword (Pool, Garage, etc)"/>
            <input className="w-full h-[4vh] bg-white text-black rounded-sm mt-2 p-3" type="text" name="city" placeholder="City"/>
            <select className="w-full h-[4vh] bg-white text-black rounded-sm mt-2" name="state" id="">
              <option key={'all'}>State (All)</option>
              {Object.entries(state_choices).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </form>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-[1vw] mt-[1vw]" action="">
            <select className="w-full h-[4vh] bg-white text-black rounded-sm mt-2" name="bedroom" id="">
              <option key={'all'}>Bedrooms (All)</option>
              {Object.entries(bedroom_choices).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <select className="w-full h-[4vh] bg-white text-black rounded-sm mt-2" name="prize" id="">
              <option key={'all'}>Max Price (Any)</option>
              {Object.entries(price_choices).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </form>
          <button className="btn w-full my-[5vh]" onClick={handleChange}>Submit form</button>
        </div>
      </div>
    </div>
  )
}


export default _search_bar