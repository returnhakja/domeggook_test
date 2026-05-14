export interface ProductDeli {
  who: "S" | "P" | "B" | "C";
  fee: string;
}

export interface ProductItem {
  no: string;
  title: string;
  price: string;
  thumb: string;
  id: string;
  nick?: string;
  unitQty: string;
  deli: ProductDeli;
}

export interface ProductListHeader {
  numberOfItems: number;
  currentPage: number;
  numberOfPages: number;
}

export interface ProductListResponse {
  domeggook: {
    header: ProductListHeader;
    list: {
      item: ProductItem[];
    };
  };
}

export interface FetchProductsParams {
  kw?: string;
  pg?: number;
  sz?: number;
  so?: string;
}

export interface ApiErrorResponse {
  errors: {
    dmessage: string;
  };
}
