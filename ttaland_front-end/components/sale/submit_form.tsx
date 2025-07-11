'use client'
import { useState } from "react"
import { Input } from "../element/input"
interface Submit_form_props {
  tab: string
}

const Submit_form = ({tab = ''}: Submit_form_props) => {
  const [userName, setUserName] = useState('Nguyen Viet Binh')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);
    data.tab_name = tab
    console.log(JSON.stringify(data)); // This contains all your form data
    // You can now use this data for your API call or other processing
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
          <Input 
            label="1. Chủ Sở Hữu *"
            type="text"
            placeholder="Type here"
            name ='chu_so_huu'
            value={userName}
            onChange={(value) => {setUserName(value)}}
            required={true}
            errorMessage="Chủ Sở Hữu Không Được Để Trống"
            className="mb-4 w-full"
          />
          
          <Input 
            label="2. Tên Sản Phẩm *"
            type="text"
            name ='ten_san_pham'
            placeholder="Type here"
            required={true}
            errorMessage="Tên Sẩn Phẩm Không Được Để Trống"
            className="mb-4 w-full"
          />
          <Input 
            label='3. Địa Chỉ *'
            name ='dia_chi'
            type='text'  
            placeholder="Type here"
            required={true}
            errorMessage="Địa Chỉ Không Được Để Trống"
            className="mb-4"
          />
          
      </div>
      <div className="flex justify-between">
        <div className='w-[45%]'>
          <Input 
            label="4. Diện Tích (m²) *"
            type="number"
            name ='dien_tich'
            placeholder="Type here"
            required={true}
            min={1}
            errorMessage="Diện Tích Không Được Để Trống"
            className="mb-4"
          />
          <Input 
            label="6. Phòng Ngủ *"
            type="number"
            name ='phong_ngu'
            min={1}
            placeholder="Type here"
            required={true}
            errorMessage="Diện Tích Không Được Để Trống"
            className="mb-4"
          />
          <Input 
            label="8. Giá (VND) *"
            type="number"
            name ='gia'
            placeholder="Type here"
            required={true}
            min={1}
            errorMessage="Giá Không Được Để Trống"
            className="mb-4"
          />
        </div>
        <div className='w-[45%]'>
          <Input 
            label='5. Ga-ra'
            type='number'  
            name ='gara'
            min={0}
            placeholder="Type here"
            className="mb-4"
          />
          <Input 
            label='7. Phòng Tắm *'
            name ='phong_tam'
            type='number'  
            min={0}
            required
            placeholder="Type here"
            className="mb-4"
          />
        </div>
      </div>
      
      <button type="submit" className="btn mt-4 bg-gray-600 w-full">
        Đăng Sản Phẩm
      </button>
    </form>
  )
}


export default Submit_form