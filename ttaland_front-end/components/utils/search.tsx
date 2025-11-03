'use client'

import { useState, useRef, useEffect } from 'react';

type Search_props = {
  keywords: string[],
  placeholder: string,
  setData?: (data: string) => void,
  disable: boolean,
}

const Search: React.FC<Search_props> = ({ keywords, placeholder, setData, disable }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (disable) {
      setInputValue('')
    }
  }, [disable])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setData?.(value)
    // Lọc keyword gợi ý dựa trên input
    if (value.length > 0) {
      setSuggestions(handleSuggestion(value, keywords))
    } else {
      setSuggestions(keywords);
    }
  };

  const handleSuggestion = (value: string, suggestions: string[]): string[] => {
    value = removeTones(value.toLowerCase())
    const keywords = [...suggestions]
    for (let i = 0; i < keywords.length; i ++) {
      keywords[i] = removeTones(keywords[i].toLowerCase())
    }
    return sortSuggestion(value, keywords)
  }

  const removeTones = (str: string): string => {
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
    str = str.replace(/[ìíịỉĩ]/g, "i");
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
    str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
    str = str.replace(/[ỳýỵỷỹ]/g, "y");
    str = str.replace(/đ/g, "d");
    return str
  }

  const sortSuggestion = (value: string, suggestion: string[]): string[] => {
    const sortedSuggestion = []
    for (let i = 0; i < suggestion.length; i ++) {
      if (value === suggestion[i].substring(0, value.length)) {
        sortedSuggestion.push(keywords[i])
      }
    }
    for (let i = 0; i < suggestion.length; i ++) {
      if ((value !== suggestion[i].substring(0, value.length)) && (suggestion[i].includes(value))) {
        sortedSuggestion.push(keywords[i])
      } 
    }
    return sortedSuggestion
  }


  const handleFocus = () => {
    setShowSuggestions(true);
    setSuggestions(keywords);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setData?.(suggestion)
    setTimeout(() => {
      inputRef.current?.blur();
      setShowSuggestions(false);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : 0
      );
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    }
  };

  return (
    <div className="w-full">
      <label className='flex gap-2 items-center'>
        <svg className="h-[1.5rem] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={"outline-0 w-full text-xl"}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disable}
        />
      </label>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="z-10 w-full mt-2 text-black max-h-50 overflow-auto border-t-1 border-gray-300"
        >
          <ul className="w-full gap-2 p-2 text-lg">
            {suggestions.map((suggestion, index) => (
              <li key={suggestion} className={`${index === activeSuggestionIndex ? 'bg-gray-200 rounded-sm' : ''}`} onClick={() => handleSuggestionClick(suggestion)}>
                <div className="p-2 rounded-sm cursor-pointer hover:bg-gray-300">
                  {suggestion}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;