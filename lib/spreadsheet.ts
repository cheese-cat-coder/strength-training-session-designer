import * as XLSX from 'xlsx';

export interface Exercise {
  [key: string]: string;
}

export interface ParsedData {
  headers: string[];
  rows: Exercise[];
}

const REQUIRED_COLUMNS = ['Theme', 'Sub Theme', 'Implement', 'Position', 'Exercise'];
const FILTER_COLUMNS = ['Theme', 'Sub Theme', 'Implement', 'Position'];

export function normalizeValue(val: unknown): string {
  if (val == null) return '';
  return String(val).trim();
}

export function parseSpreadsheet(csv: string): ParsedData {
  try {
    const workbook = XLSX.read(csv, { type: 'string' });
    const ws = workbook.Sheets[workbook.SheetNames[0]];

    if (!ws) {
      throw new Error('No worksheet found');
    }

    const raw = XLSX.utils.sheet_to_json(ws, {
      header: 1,
      blankrows: false,
      defval: '',
    }) as unknown[][];

    const trimmed = raw
      .map((row) => row.map(normalizeValue))
      .filter((row) => row.some((cell) => cell !== ''));

    if (trimmed.length < 2) {
      throw new Error('Spreadsheet must have at least a header row and one data row');
    }

    const headers = trimmed[0];

    // Verify required columns exist
    const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
    if (missing.length > 0) {
      throw new Error(`Missing required columns: ${missing.join(', ')}`);
    }

    const rows: Exercise[] = trimmed.slice(1).map((row) => {
      const obj: Exercise = {};
      headers.forEach((header, idx) => {
        obj[header] = row[idx] || '';
      });
      return obj;
    });

    return { headers, rows };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown parsing error';
    throw new Error(`Failed to parse spreadsheet: ${message}`);
  }
}

export function getUniqueValues(
  rows: Exercise[],
  columnName: string
): string[] {
  const values = new Set<string>();
  rows.forEach((row) => {
    const val = normalizeValue(row[columnName]);
    if (val) values.add(val);
  });
  return Array.from(values).sort();
}

export function getFilteredRows(
  rows: Exercise[],
  filters: Record<string, string>
): Exercise[] {
  return rows.filter((row) => {
    for (const col of FILTER_COLUMNS) {
      const cellValue = normalizeValue(row[col]);
      const filterValue = normalizeValue(filters[col] || '');

      if (filterValue && cellValue !== filterValue) {
        return false;
      }
    }
    return true;
  });
}

export function getValidFilterOptions(
  rows: Exercise[],
  columnName: string,
  currentFilters: Record<string, string>
): string[] {
  // Filter rows based on current selections
  const filtered = getFilteredRows(rows, currentFilters);

  // Get unique values in the target column for filtered rows
  return getUniqueValues(filtered, columnName);
}

export function getExerciseName(row: Exercise): string {
  return normalizeValue(row['Exercise']);
}

export const FILTER_COLUMNS_EXPORT = FILTER_COLUMNS;
