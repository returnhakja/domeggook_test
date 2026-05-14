import './FilterBar.css';
import filterIconUrl from '../../assets/icons/FilterIcon.svg';

interface FilterBarProps {
  totalCount: number;
  onFilterClick: () => void;
}

export default function FilterBar({ totalCount, onFilterClick }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <span className="filter-bar__count">
        총 {totalCount.toLocaleString()}건
      </span>
      <button className="filter-bar__btn" type="button" onClick={onFilterClick}>
        <span className="filter-bar__label">필터</span>
        <img src={filterIconUrl} alt="필터" width={26} height={18} />
      </button>
    </div>
  );
}
