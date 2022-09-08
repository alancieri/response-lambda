/* eslint-disable  @typescript-eslint/no-explicit-any */

type Paging = {
  page: number;
  results_per_page: number;
  results_size: number | null; // data.length
  total_results_size: number;
  total_pages: number;
};

type PagingObject = {
  paging: Paging;
};

type ResponseOutput = {
  statusCode: number;
  headers: Record<string, string | boolean>;
  body?: { [key: string]: any };
};

type OptionsObject = {
  headers?: { [key: string]: string };
  stringify?: boolean;
};

type Arguments = number | PagingObject | OptionsObject;

type ErrorsInput = string | string[];

export {
  Paging,
  PagingObject,
  ResponseOutput,
  ErrorsInput,
  OptionsObject,
  Arguments,
};
