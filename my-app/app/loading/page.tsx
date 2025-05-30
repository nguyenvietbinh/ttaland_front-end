

const Loading = () => {
  return (
    <div className="fixed  inset-0 bg-gray-400 z-50 flex flex-col items-center justify-center">
      <div>
      <span className="mt-4 text-black text-3xl">Đang tải trang, vui lòng chờ</span>
      <span className="loading mx-1 loading-dots loading-sm text-black"></span>
      </div>
    </div>
  );
};

export default Loading;