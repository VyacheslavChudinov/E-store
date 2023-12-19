export interface PaginationDetails {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  items: T[];
  paginationDetails: PaginationDetails;

  constructor(items: T[], paginationDetails: PaginationDetails) {
    this.items = items;
    this.paginationDetails = paginationDetails;
  }
}
