import { ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { usePagination, DOTS } from '@/composables/usePagination';

describe('usePagination', () => {
  const createPaginationProps = (overrides = {}) => ({
    totalCount: 100,
    pageSize: 10,
    siblingCount: 1,
    currentPage: 1,
    ...overrides,
  });

  it('calculates pagination range correctly when total pages are less than totalPageNumbers', () => {
    const props = createPaginationProps({ totalCount: 30 }); // 3 pages
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, 2, 3]);
  });

  it('calculates pagination range with left dots', () => {
    const props = createPaginationProps({ currentPage: 4 });
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, DOTS, 3, 4, 5, DOTS, 10]);
  });

  it('calculates pagination range with right dots', () => {
    const props = createPaginationProps({ currentPage: 8 });
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, DOTS, 6, 7, 8, 9, 10]);
  });

  it('calculates pagination range with both left and right dots', () => {
    const props = createPaginationProps({ currentPage: 5 });
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, DOTS, 4, 5, 6, DOTS, 10]);
  });

  it('returns correct range when siblingCount is increased', () => {
    const props = createPaginationProps({ siblingCount: 2, currentPage: 5 });
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, DOTS, 3, 4, 5, 6, 7, DOTS, 10]);
  });

  it('returns correct range when currentPage is at the start', () => {
    const props = createPaginationProps({ currentPage: 1 });
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, 2, 3, 4, 5, DOTS, 10]);
  });

  it('returns correct range when currentPage is at the end', () => {
    const props = createPaginationProps({ currentPage: 10 });
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, DOTS, 6, 7, 8, 9, 10]);
  });

  it('returns full range when total pages are equal to totalPageNumbers', () => {
    const props = createPaginationProps({ totalCount: 50, pageSize: 10 }); // 5 pages
    const { paginationRange } = usePagination(props);

    expect(paginationRange.value).toEqual([1, 2, 3, 4, 5]);
  });
});
