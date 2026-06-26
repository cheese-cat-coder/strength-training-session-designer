'use client';

import styles from './components.module.css';

interface StatusProps {
  message: string;
  type: 'info' | 'error';
}

export function Status({ message, type }: StatusProps) {
  if (!message) return null;

  return (
    <div className={`${styles.status} ${styles[type]}`}>
      {message}
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
}

export function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button onClick={onPrevious} disabled={currentPage === 0}>
        ← Previous
      </button>
      <div className={styles.pageInfo}>
        Page {currentPage + 1} of {totalPages}
      </div>
      <button onClick={onNext} disabled={currentPage >= totalPages - 1}>
        Next →
      </button>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className={styles.filterGroup}>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
