'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  parseSpreadsheet,
  getValidFilterOptions,
  getFilteredRows,
  getExerciseName,
  FILTER_COLUMNS_EXPORT,
  Exercise,
  normalizeValue,
} from '@/lib/spreadsheet';
import { Status, StatBox, Pagination, FilterSelect } from '@/components/ui/components';
import styles from './page.module.css';

type StatusType = 'info' | 'error' | null;

export default function Home() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Exercise[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [workout, setWorkout] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<StatusType>(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  // const [sourceLabel, setSourceLabel] = useState('—');

  const ROWS_PER_PAGE = 20;

  // Computed values
  const filteredRows = useMemo(() => {
    return getFilteredRows(rows, filters);
  }, [rows, filters]);

  const paginatedRows = useMemo(() => {
    const startIdx = currentPage * ROWS_PER_PAGE;
    return filteredRows.slice(startIdx, startIdx + ROWS_PER_PAGE);
  }, [filteredRows, currentPage]);

  const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE);

  // Utility functions
  const showStatus = useCallback((message: string, type: StatusType = 'info') => {
    setStatusMessage(message);
    setStatusType(type);
  }, []);

  // const handleFileUpload = useCallback(
  //   async (file: File) => {
  //     try {
  //       const text = await file.text();
  //       const data = parseSpreadsheet(text);
  //       setHeaders(data.headers);
  //       setRows(data.rows);
  //       setFilters({});
  //       setCurrentPage(0);
  //       setWorkout([]);
  //       setSourceLabel(file.name);
  //       showStatus(`Loaded ${data.rows.length} exercises from ${file.name}.`, 'info');
  //     } catch (error) {
  //       const message = error instanceof Error ? error.message : 'Unknown error';
  //       showStatus(message, 'error');
  //     }
  //   },
  //   [showStatus]
  // );

  const handleGoogleSheetsUrl = useCallback(
    async (url: string) => {
      const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!match) {
        showStatus('Invalid Google Sheets URL format.', 'error');
        return;
      }

      const sheetId = match[1];

      try {
        const response = await fetch(`/api/sheets?sheetId=${encodeURIComponent(sheetId)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sheet');
        }

        const data = await response.json();
        const parsed = parseSpreadsheet(data.csv);
        setHeaders(parsed.headers);
        setRows(parsed.rows);
        setFilters({});
        setCurrentPage(0);
        setWorkout([]);
        // setSourceLabel('Google Sheets');
        showStatus(`Loaded ${parsed.rows.length} exercises from Google Sheets.`, 'info');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        showStatus(`Could not load Google Sheet: ${message}`, 'error');
      }
    },
    [showStatus]
  );

  const handleImport = useCallback(() => {
    const url = googleSheetUrl.trim();
    if (!url) return;

    handleGoogleSheetsUrl(url);
    setGoogleSheetUrl('');
  }, [googleSheetUrl, handleGoogleSheetsUrl]);

  const handleFilterChange = useCallback(
    (column: string, value: string) => {
      const newFilters = { ...filters, [column]: value };

      // When a filter changes, reset filters that come after it
      const columnIndex = FILTER_COLUMNS_EXPORT.indexOf(column);
      if (columnIndex >= 0) {
        FILTER_COLUMNS_EXPORT.slice(columnIndex + 1).forEach((col) => {
          delete newFilters[col];
        });
      }

      setFilters(newFilters);
      setCurrentPage(0);
    },
    [filters]
  );

  const addExercise = useCallback(
    (row: Exercise) => {
      if (workout.length >= 15) {
        showStatus('Maximum 15 exercises allowed in a workout.', 'error');
        return;
      }

      const exercise = getExerciseName(row);
      if (!exercise) {
        showStatus('Could not find exercise name.', 'error');
        return;
      }

      setWorkout([...workout, exercise]);
      showStatus(`Added "${exercise}" to your workout.`, 'info');
    },
    [workout.length, showStatus]
  );

  const removeExercise = useCallback(
    (index: number) => {
      const removed = workout[index];
      setWorkout(workout.filter((_, i) => i !== index));
      showStatus(`Removed "${removed}" from your workout.`, 'info');
    },
    [workout, showStatus]
  );

  const copyWorkoutToClipboard = useCallback(() => {
    if (workout.length === 0) {
      showStatus('No exercises to copy.', 'error');
      return;
    }

    const text = workout.join('\n');
    navigator.clipboard.writeText(text).then(
      () => {
        showStatus(
          `Copied ${workout.length} exercise${workout.length !== 1 ? 's' : ''} to clipboard.`,
          'info'
        );
      },
      () => {
        showStatus('Could not copy to clipboard. Please try again.', 'error');
      }
    );
  }, [workout, showStatus]);

  const clearWorkout = useCallback(() => {
    if (confirm('Are you sure you want to clear your entire workout?')) {
      setWorkout([]);
      showStatus('Workout cleared.', 'info');
    }
  }, [showStatus]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Strength Training Session Designer</h1>
      </header>

      {/* Data Input Card */}
      <div className={styles.card}>
        <h2>Load Exercises</h2>
        <p>Paste a Google Sheets URL to get started.</p>
      
        <div className={styles.inputSection}>
          {/* <div className={styles.inputGroup}>
            <label htmlFor="fileInput">Upload Excel File (.xlsx, .xls, .csv)</label>
            <button
              className={styles.primaryButton}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Choose File
            </button>
            <input
              id="fileInput"
              type="file"
              accept=".xlsx,.xls,.csv"
              className={styles.hidden}
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) handleFileUpload(file);
                e.currentTarget.value = '';
              }}
            />
          </div> */}

         <div className={styles.inputGroup}>
            {/* <label htmlFor="googleSheetUrl"> Paste Google Sheets URL</label> */}
            <input
              id="googleSheetUrl"
              type="text"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={googleSheetUrl}
              onChange={(e) => setGoogleSheetUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleImport();
                }
              }}
            />
          </div>
          <button className={styles.primaryButton} onClick={handleImport}> 
              Import
          </button>
        
        </div>

        <Status message={statusMessage} type={statusType ?? 'info'} />

        <div className={styles.statsGrid}>
          {/* <StatBox label="Source" value={sourceLabel} /> */}
          <StatBox label="Exercises" value={rows.length} />
          <StatBox label="Selected" value={workout.length} />
        </div>
      </div>

      {/* Filters Card */}
      {rows.length > 0 && (
        <div className={styles.card}>
          <h2>Filter Exercises</h2>
          <p>Narrow down your choices to find the right exercises.</p>
          <div className={styles.filtersGrid}>
            {FILTER_COLUMNS_EXPORT.map((column) => {
              const options = getValidFilterOptions(rows, column, filters);
              return (
                <FilterSelect
                  key={column}
                  label={column}
                  value={filters[column] || ''}
                  options={options}
                  onChange={(value) => handleFilterChange(column, value)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Results Card */}
      {rows.length > 0 && (
        <div className={styles.card}>
          <h2>Available Exercises</h2>
          <p className={styles.textMuted}>
            {filteredRows.length} exercise{filteredRows.length !== 1 ? 's' : ''} found
          </p>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                  <th style={{ width: '60px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row, idx) => (
                  <tr key={idx}>
                    {headers.map((header) => (
                      <td key={header}>{normalizeValue(row[header])}</td>
                    ))}
                    <td>
                      <button
                        className={styles.addButton}
                        onClick={() => addExercise(row)}
                        title="Add exercise"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage(currentPage - 1)}
            onNext={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      )}

      {/* Workout Builder Card */}
      <div className={styles.card}>
        <h2>Your Workout</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.primaryButton} onClick={copyWorkoutToClipboard}>
            Copy to Clipboard
          </button>
          <button className={styles.dangerButton} onClick={clearWorkout}>
            Clear All
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Exercise</th>
                <th style={{ width: '60px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {workout.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <div className={styles.workoutEmpty}>
                      <p>No exercises selected yet. Click "+" on an exercise above to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                workout.map((exercise, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{exercise}</td>
                    <td>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeExercise(idx)}
                        title="Remove exercise"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
