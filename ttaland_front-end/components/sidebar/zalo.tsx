import { useState } from 'react';

interface ZaloContactProps {
  phoneNumber: string;
  agentName?: string;
  defaultMessage?: string;
  className?: string;
}

const ZaloContact = ({ 
  phoneNumber, 
  defaultMessage = "Tôi quan tâm đến bất động sản này. Xin vui lòng tư vấn thêm thông tin.",
}: ZaloContactProps) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleZaloContact = async () => {
    setIsChecking(true);
    
    try {
      // Format số điện thoại
      const formattedPhone = phoneNumber
        .replace(/\s+/g, '')
        .replace(/^\+84/, '0')
        .replace(/^84/, '0');

      // Zalo deep link
      const zaloDeepLink = `zalo://chat?phone=${formattedPhone}&text=${encodeURIComponent(defaultMessage)}`;
      
      // Web fallback
      const webUrl = `https://zalo.me/${formattedPhone}?text=${encodeURIComponent(defaultMessage)}`;
      
      // Thử mở app Zalo
      window.location.href = zaloDeepLink;
      
      // Kiểm tra xem app có được mở không
      let appOpened = false;
      const visibilityChangeHandler = () => {
        if (document.hidden) {
          appOpened = true;
        }
      };
      
      document.addEventListener('visibilitychange', visibilityChangeHandler);
      
      setTimeout(() => {
        document.removeEventListener('visibilitychange', visibilityChangeHandler);
        
        if (!appOpened) {
          window.open(webUrl, '_blank');
        }
        
        setIsChecking(false);
      }, 1000);
      
    } catch (error) {
      console.error('Lỗi khi mở Zalo:', error);
      setIsChecking(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleZaloContact}
        disabled={isChecking}
        className="w-full"
      >
        {isChecking ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
        <div className="border-gray-300 w-full border-1 hover:bg-gray-50 rounded-lg p-2 flex justify-center items-center gap-2 cursor-pointer">
          <img src="/img/icons/zalo.png" className="h-6" alt="" />
          Chat qua Zalo
        </div>
        )}
      </button>
    </div>
  );
};

export default ZaloContact;