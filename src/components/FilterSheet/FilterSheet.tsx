import { useState } from 'react';
import './FilterSheet.css';
import resetIconUrl from '../../assets/icons/ResetIcon.svg';
import clearIconUrl from '../../assets/icons/ClearIcon.svg';
import { DEFAULT_SEARCH_KEYWORD } from '../../constants/defaultSearch';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (keyword: string) => void;
  defaultSearchKeyword?: string;
}

export default function FilterSheet({
  isOpen,
  onClose,
  onSearch,
  defaultSearchKeyword = DEFAULT_SEARCH_KEYWORD,
}: FilterSheetProps) {
  const [inputValue, setInputValue] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState<string | null>(null);

  useBodyScrollLock(isOpen);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed) setAppliedKeyword(trimmed);
    setInputValue('');
  };

  const handleRemoveKeyword = () => {
    setAppliedKeyword(null);
  };

  const handleReset = () => {
    setAppliedKeyword(null);
    setInputValue('');
  };

  const handleSearch = () => {
    onSearch(appliedKeyword ?? defaultSearchKeyword);
    onClose();
  };

  return (
    <>
      <div className={`filter-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />
      <div className={`filter-sheet${isOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="filter-sheet__search">
          <input
            className="filter-sheet__input"
            type="text"
            placeholder="검색어 입력"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className="filter-sheet__add-btn" type="button" onClick={handleAdd}>
            추가
          </button>
        </div>
        <div className="filter-sheet__divider" />
        <div className="filter-sheet__tags">
          {appliedKeyword && (
            <span className="filter-sheet__tag">
              "{appliedKeyword}" 포함
              <button
                className="filter-sheet__tag-remove"
                type="button"
                onClick={handleRemoveKeyword}
                aria-label={`${appliedKeyword} 필터 제거`}
              >
                <img src={clearIconUrl} alt="" aria-hidden="true" width={14} height={14} />
              </button>
            </span>
          )}
        </div>
        <div className="filter-sheet__footer">
          <button className="filter-sheet__reset-btn" type="button" onClick={handleReset}>
            <img src={resetIconUrl} alt="" aria-hidden="true" width={20} height={20} />
            <span>초기화</span>
          </button>
          <button className="filter-sheet__search-btn" type="button" onClick={handleSearch}>
            검색하기
          </button>
        </div>
      </div>
    </>
  );
}
