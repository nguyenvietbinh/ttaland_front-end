'use client'

const new_search_bar = () => {
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
  return (
    <div className="w-screen xl:w-[1280px] 2xl:w-[1536px] mx-auto h-auto my-20 text-white">
      <div className="w-[90%] p-10 bg-gray-700 mx-auto text-center">
      <p className="md:text-5xl text-2xl m-0 md:m-15">Property Searching Just Got So Easy</p>
        <p className="text-2xl hidden md:block mx-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quas, asperiores eveniet vel nostrum magnam voluptatum tempore! Consectetur, id commodi!</p>
        <div className="h-auto w-full mx-auto mt-10">
          <form className="form_a grid grid-cols-1 md:grid-cols-3 gap-2" action="">
            <input className="w-full h-10 bg-white text-black rounded-sm mt-2 p-3" type="text" name="keyword" placeholder="Keyword (Pool, Garage, etc)"/>
            <input className="w-full h-10 bg-white text-black rounded-sm mt-2 p-3" type="text" name="city" placeholder="City"/>
            <select className="w-full h-10 bg-white text-black rounded-sm mt-2" name="state" id="">
              <option key={'all'}>State (All)</option>
              {Object.entries(state_choices).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </form>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2" action="">
            <select className="w-full h-10 bg-white text-black rounded-sm mt-2" name="bedroom" id="">
              <option key={'all'}>Bedrooms (All)</option>
              {Object.entries(bedroom_choices).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <select className="w-full h-10 bg-white text-black rounded-sm mt-2" name="prize" id="">
              <option key={'all'}>Max Price (Any)</option>
              {Object.entries(price_choices).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </form>
          <button className="btn w-full my-12">Submit form</button>
        </div>
      </div>
    </div>
  )
}



export default new_search_bar