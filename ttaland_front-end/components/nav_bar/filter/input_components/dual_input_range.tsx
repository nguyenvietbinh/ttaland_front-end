'use client'

import { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  type: string;
  step?: number;
  dual_input_range_name: string;
}



const DualRangeSlider = ({
  min,
  max,
  type,
  step = 1,
  dual_input_range_name,
}: DualRangeSliderProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef<HTMLDivElement>(null);
  const [isMinDown, setIsMinDown] = useState(false)
  const [isMinUp, setIsMinUp] = useState(false)
  const [isMaxDown, setIsMaxDown] = useState(false)
  const [isMaxUp, setIsMaxUp] = useState(false)


  // Convert to percentage
  const getPercent = (value: number) =>
    Math.round(((value - min) / (max - min)) * 100);

  const roundToNearestThousand = (number: number) => {
    // Chia số cho 1000 và làm tròn đến 1 chữ số thập phân
    const rounded = Math.round(number / 100 * 10) / 100; // Làm tròn đến 1 chữ số thập phân
    return rounded.toFixed(0); // Đảm bảo luôn có 1 chữ số thập phân
  }

  const setUnit = (type: string, value: number): string[] => {
    if (type === 'san_pham_ban_price') {
      if (value < 1000) {
        return [`${value}`, 'Triệu']
      } else {
        return [roundToNearestThousand(value), 'Tỷ']
      }
    } else if (type === 'san_pham_cho_thue_price') {
      if (value < 1000) {
        return [`${value}`, 'Triệu/Tháng']
      } else {
        return [roundToNearestThousand(value), 'Tỷ/Tháng']
      }
    } else if (type === 'du_an_price') {
      return [`${value}`, 'Triệu/m²']
    } else if (type === 'sqr') {
      return [`${value}`, 'm²']
    } else if (type === 'room') {
      return [`${value}`, 'Phòng']
    }
    return [`${value}`, '']
  }


  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (range.current) {
      let minPercent: number = getPercent(minVal);
      let maxPercent: number = getPercent(maxVal);
      minPercent -= (minPercent * 0.02)
      maxPercent += ((100 - maxPercent) * 0.02)
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal]);

useEffect(() => {
  const speed = 200; // Tốc độ ban đầu (ms)
  const acceleration = 0.95; // Hệ số tăng tốc
  const minSpeed = 5; // Tốc độ tối thiểu
  let timeoutId: number | null = null;

  const changeValue = (currentSpeed: number) => {
    if (isMinDown) {
      setMinVal(preVal => {
        if (preVal > min) {
          return preVal - step
        }
        return preVal
      });
      const newSpeed = Math.max(minSpeed, currentSpeed * acceleration);
      timeoutId = window.setTimeout(() => changeValue(newSpeed), newSpeed);
    } else if (isMinUp) {
      setMinVal(preVal => {
        if (preVal < maxVal - step) {
          return preVal + step
        }
        return preVal
      });
      const newSpeed = Math.max(minSpeed, currentSpeed * acceleration);
      timeoutId = window.setTimeout(() => changeValue(newSpeed), newSpeed);
    } else if (isMaxDown) {
      setMaxVal(preVal => {
        if (preVal > minVal + step) {
          return preVal - step
        }
        return preVal
      })
      const newSpeed = Math.max(minSpeed, currentSpeed * acceleration);
      timeoutId = window.setTimeout(() => changeValue(newSpeed), newSpeed);
    } else if (isMaxUp) {
      setMaxVal(preVal => {
        if (preVal < max) {
          return preVal + step
        }
        return preVal
      })
      const newSpeed = Math.max(minSpeed, currentSpeed * acceleration);
      timeoutId = window.setTimeout(() => changeValue(newSpeed), newSpeed);
    } else {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
  };

  timeoutId = window.setTimeout(() => changeValue(speed), speed);

  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  };
}, [isMinDown, isMinUp, isMaxDown, isMaxUp]);

  useEffect(() => {
    const handle_window_mouseup = () => {
      setIsMinUp(false)
      setIsMinDown(false)
      setIsMaxUp(false)
      setIsMaxDown(false)
    }

    window.addEventListener('mouseup', handle_window_mouseup)

    return() => {
      window.removeEventListener('mouseup', handle_window_mouseup)
    }
  })

  return (
    <div className="container px-2">
      <div className="flex flex-col w-full">
        <div className="flex justify-center gap-4 mb-2">
          <div className='flex gap-2'>
            <div className='flex gap-1 items-center'>
              <img src={(isMinDown) ? "/img/icons/gray_cirle_arrow.png" : "/img/icons/circle_arrow.png"} className='h-4 w-auto rotate-270 cursor-pointer select-none drag-none hover:h-5' style={(isMinDown) ? { height: '20px' } : {}} onMouseDown={() => setIsMinDown(true)} onMouseUp={() => setIsMinDown(false)} onMouseLeave={() => setIsMinDown} alt="" />
              <img src={(isMinUp) ? "/img/icons/gray_cirle_arrow.png" : "/img/icons/circle_arrow.png"} className='h-4 w-auto rotate-90 cursor-pointer select-none drag-none hover:h-5' style={(isMinUp) ? { height: '20px' } : {}} onMouseDown={() => setIsMinUp(true)} onMouseUp={() => setIsMinUp(false)} onMouseLeave={() => setIsMinUp} alt="" />
            </div>
            <span className={"text-base font-medium flex items-center gap-1" + ' ' + dual_input_range_name}>
              Từ: {setUnit(type, minVal)[0]} {setUnit(type, minVal)[1]}
            </span>
          </div>
          <div className='flex gap-2'>
            <span className={"text-base font-medium flex items-center gap-1" + ' ' + dual_input_range_name}>
              Đến: {setUnit(type, maxVal)[0]} {setUnit(type, maxVal)[1]}
            </span>
            <div className='flex gap-1 items-center'>
              <img src={(isMaxDown) ? "/img/icons/gray_cirle_arrow.png" : "/img/icons/circle_arrow.png"} className='h-4 w-auto rotate-270 cursor-pointer select-none drag-none hover:h-5' style={(isMaxDown) ? { height: '20px' } : {}} onMouseDown={() => setIsMaxDown(true)} onMouseUp={() => setIsMaxDown(false)} onMouseLeave={() => setIsMaxDown} alt="" />
              <img src={(isMaxUp) ? "/img/icons/gray_cirle_arrow.png" : "/img/icons/circle_arrow.png"} className='h-4 w-auto rotate-90 cursor-pointer select-none drag-none hover:h-5' style={(isMaxUp) ? { height: '20px' } : {}} onMouseDown={() => setIsMaxUp(true)} onMouseUp={() => setIsMaxUp(false)} onMouseLeave={() => setIsMaxUp} alt="" />
            </div>
          </div>
        </div>
        
        <div className="relative h-1">
          {/* Background track */}
          <div className="absolute h-1 w-full rounded-full bg-gray-900"></div>
          
          {/* Colored range track */}
          <div
            ref={range}
            className="absolute h-1 rounded-full bg-gray-300"
          ></div>
          
          {/* Min thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxVal - step);
              setMinVal(value);
            }}
            className={`absolute w-full pointer-events-none appearance-none h-1 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10`}
            style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
          />
          
          {/* Max thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minVal + step);
              setMaxVal(value);
            }}
            className={`absolute w-full pointer-events-none appearance-none h-1 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10`}
            style={{ zIndex: 4 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;