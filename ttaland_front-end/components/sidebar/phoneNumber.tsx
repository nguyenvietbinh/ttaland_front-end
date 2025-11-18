import { useState } from 'react';

const CopyPhoneButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const phoneNumber = '0343694403';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      
      setShowPopup(true);
      
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = phoneNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  return (
    <div className="relative">
      {/* Phone Button */}
      <div 
        className="border-gray-300 border-1 bg-blue-500 hover:bg-blue-500/90 rounded-lg p-2 flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 active:scale-95"
        onClick={copyToClipboard}
      >
        <img src="/img/icons/phone-call.png" className="h-6" alt="Phone icon" />
        <p className="text-xl text-black font-medium">{phoneNumber}</p>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg ">
          <div className="flex items-center gap-2">
            <span className="font-medium">Đã sao chép!</span>
          </div>
          {/* Arrow pointer */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default CopyPhoneButton;