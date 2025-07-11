'use client'

const Loading = () => {
  return (
    <div className=" bg-gray-400 h-screen z-50 flex flex-col items-center justify-center">
      <div>
      <span className="loading mx-1 loading-dots loading-sm text-black"></span>
      </div>
    </div>
  );
};

export default Loading;