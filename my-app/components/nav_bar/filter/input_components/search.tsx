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
    setShowSuggestions(false);
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
    <div className="relative w-full text-white">
      <div className="form-control">
        <label className="label">
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="input focus:outline-0 w-full"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disable}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-2 w-full bg-gray-900 border border-base-300 rounded-box shadow-lg max-h-60 overflow-auto"
        >
          <ul className="menu menu-compact w-full">
            {suggestions.map((suggestion, index) => (
              <li key={suggestion} className={`${index === activeSuggestionIndex ? 'bg-base-200' : ''}`} onClick={() => handleSuggestionClick(suggestion)}>
                <a className="py-2 px-4 hover:bg-base-200">
                  {suggestion}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;