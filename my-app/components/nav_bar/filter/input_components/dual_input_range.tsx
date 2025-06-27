"use client";

import { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  type: string;
  step?: number;
}

function roundToNearestThousand(number: number) {
    // Chia số cho 1000 và làm tròn đến 1 chữ số thập phân
    const rounded = Math.round(number / 100 * 10) / 10; // Làm tròn đến 1 chữ số thập phân
    return rounded.toFixed(1); // Đảm bảo luôn có 1 chữ số thập phân
}

const DualRangeSlider = ({
  min,
  max,
  type,
  step = 1,
}: DualRangeSliderProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = (value: number) =>
    Math.round(((value - min) / (max - min)) * 100);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (range.current) {
      let minPercent: number = getPercent(minVal);
      let maxPercent: number = getPercent(maxVal);
      minPercent = minPercent >= 50 ? minPercent - 2 : minPercent;
      maxPercent = maxPercent <= 50 ? maxPercent + 2 : maxPercent;
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal]);

  return (
    <div className="container px-2">
      <div className="flex flex-col w-full">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Từ: {(type === 'price' && minVal >= 1000) ? `${roundToNearestThousand(minVal)} Tỷ` : `${minVal} Triệu`}
          </span>
          <span className="text-sm font-medium">
            Đến: {(type === 'price' && maxVal >= 1000) ? `${roundToNearestThousand(maxVal)} Tỷ` : `${maxVal} Triệu`}
          </span>
        </div>
        
        <div className="relative h-8">
          {/* Background track */}
          <div className="absolute h-4 w-full rounded-full bg-gray-300"></div>
          
          {/* Colored range track */}
          <div
            ref={range}
            className="absolute h-4 rounded-full bg-gray-600"
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
            className={`absolute w-full pointer-events-none appearance-none h-4 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10`}
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
            className={`absolute w-full pointer-events-none appearance-none h-4 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10`}
            style={{ zIndex: 4 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;