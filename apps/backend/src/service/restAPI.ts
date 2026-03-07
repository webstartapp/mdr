/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import * as mdrRestAPI from '@/gen/mdr';

// eslint-disable-next-line unused-imports/no-unused-vars
const allRestAPIs = {
  mdr: mdrRestAPI,
};

// 1. Helper type to extract only functions (API endpoints)

type FilterEndpoints<T> = {
   
  [K in keyof T as K extends `${infer _Path}Url` ? never : T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

type Endpoints = typeof allRestAPIs;

// 3. IRestAPI Interface wrapping only backend functions
type IRestAPI = {
  [K in keyof Endpoints]: FilterEndpoints<Endpoints[K]>;
};

// --- Type Extraction Magic ---
// Extracts the ReturnType of the fetcher promise, and specifically pulls out the 'data' payload
type ExtractData<T> = T extends { data: infer D } ? D : T;

type RestResponse<
  API extends keyof IRestAPI,
  PATH extends keyof IRestAPI[API],
> = IRestAPI[API][PATH] extends (...args: any[]) => Promise<infer R> ? ExtractData<R> : never;

// Extracts the Body from the Orval tuple arguments. 
// It looks for an object that is NOT RequestInit.
type ExtractBody<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends RequestInit | undefined
    ? any // Found options, no body found before it
    : First extends object
      ? First // Found a data object (Body or Query!)
      : ExtractBody<Rest> // Skip strings/numbers (which are path params)
  : any;

// The typesafe ApiRequest generic
export type ApiErrorResponse = { error: string };

type ApiRequest<
  API extends keyof IRestAPI,
  PATH extends keyof IRestAPI[API],
> = Request<
  any, // Route params (hard to infer automatically from tuple)
  RestResponse<API, PATH> | ApiErrorResponse, // Reponse type
  ExtractBody<Parameters<IRestAPI[API][PATH] extends (...args: any[]) => any ? IRestAPI[API][PATH] : never>>, // Body Type
  any // Query
>;

// Keeping the old `restAPI` helper function but strictly typed to endpoints
export const restAPICall = <
  API extends keyof IRestAPI,
  PATH extends keyof IRestAPI[API],
>(
    api: API,
    path: PATH,
    resolver: (req: ApiRequest<API, PATH>, res: Response<RestResponse<API, PATH> | ApiErrorResponse>) => Promise<void> | void,
  ) => {
  return async (req: ApiRequest<API, PATH>, res: Response<RestResponse<API, PATH> | ApiErrorResponse>) => {
    // Basic wrapper to execute the resolver
    await resolver(req, res);
  };
};