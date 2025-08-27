'use client'


import { useState, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  value?: string;
  min?: number;
  max?: number;
  name?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Input({
  label,
  type = 'text',
  min = -100000000,
  max = 100000000,
  placeholder = '',
  required = false,
  errorMessage = 'This field is required',
  name = '',
  value: externalValue,
  onChange: externalOnChange,
  className = ''
}: InputProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  // Handle controlled/uncontrolled component pattern
  const isControlled = externalValue !== undefined && externalOnChange !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (isControlled) {
      externalOnChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const isInvalid = required && isTouched && value.trim() === '';

  return (
    <div className={`fieldset ${className}`}>
      <label className="fieldset-legend font-light">{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        required={required}
        name={name}
        className={`input w-full ${isInvalid ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isInvalid && (
        <p className="mt-1 text-base text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}