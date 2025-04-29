'use client'


// app/components/SelectDropdown.js

import { useState } from 'react';

export default function SelectDropdown() {
  const [selectedValue, setSelectedValue] = useState('');

  const options = {
    option1: 'Lựa chọn 1',
    option2: 'Lựa chọn 2',
    option3: 'Lựa chọn 3',
    option4: 'Lựa chọn 4',
  };

  // Hàm xử lý khi chọn giá trị từ dropdown
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Chọn một lựa chọn</option>
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <p>Giá trị đã chọn: {selectedValue}</p>
    </div>
  );
}
