import { RankingInfo, compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";

// add fuzzy filter to the filterFns
declare module "@tanstack/react-table" {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

/**
 * Filters the table rows based on fuzzy matching of the specified column value.
 *
 * @param row - The row object to be filtered.
 * @param columnId - The ID of the column to be filtered.
 * @param value - The value to be matched against the column value.
 * @param addMeta - A function to add metadata to the row.
 * @returns A boolean indicating whether the row should be filtered in/out.
 */
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // sore the ranking info
  addMeta({ itemRank });

  // return if the item should be filtered in/out
  return itemRank.passed;
};

/**
 * Sorts two rows based on the provided columnId using fuzzy sorting.
 *
 * @param rowA - The first row to compare.
 * @param rowB - The second row to compare.
 * @param columnId - The columnId to sort by.
 * @returns A number indicating the sort order (-1 for rowA < rowB, 0 for rowA = rowB, 1 for rowA > rowB).
 */
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]?.itemRank, rowB.columnFiltersMeta[columnId]?.itemRank);
  }

  // provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
