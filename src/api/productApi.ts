import type {
  ApiErrorResponse,
  FetchProductsParams,
  ProductListResponse,
} from "../types/product";

const API_KEY = import.meta.env.VITE_DOMEGGOOK_API_KEY as string;

export async function fetchProductList(
  params: FetchProductsParams,
): Promise<ProductListResponse> {
  const searchParams = new URLSearchParams({
    ver: "4.1",
    mode: "getItemList",
    aid: API_KEY,
    market: "dome",
    om: "json",
    sz: String(params.sz ?? 20),
    pg: String(params.pg ?? 1),
    so: params.so ?? (params.kw ? "se" : "rd"),
  });

  if (params.kw) searchParams.set("kw", params.kw);

  const res = await fetch(`/api/?${searchParams}`);
  if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error((json as ApiErrorResponse).errors.dmessage);
  return json as ProductListResponse;
}
