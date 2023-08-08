export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}
