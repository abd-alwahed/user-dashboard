export interface Pagination {
    page?: number;
    perPage?: number;
    total?:number;
    totalPages?: number;
}
export interface Meta {
    pagination: Pagination
}
export interface Response {
    meta?: Meta;
    data: any
}

export interface TypedResponse <T>  extends Response{
    data: T;
}