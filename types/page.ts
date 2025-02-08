export interface PagenationDTO<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[]; // 제네릭을 사용하여 다양한 타입 허용
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    pageNumber: number;
    paged: boolean;
    pageSize: number;
    unpaged: boolean;
  };
  empty: boolean;
}
