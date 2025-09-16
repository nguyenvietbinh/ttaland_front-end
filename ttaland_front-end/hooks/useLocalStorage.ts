import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  // Lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    if (typeof window === 'undefined') return; // Đảm bảo chạy client
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
  }, [key]);

  // Ghi dữ liệu vào localStorage mỗi khi value thay đổi
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error writing localStorage:', err);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
