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

export const Response = {
  paginate(total: number, page = 1, limit = 20) {
    page = page === null ? 1 : page;
    limit = limit === null ? 1 : limit;
    const offset = limit * (page - 1);
    const paging: Paging = {
      page: page,
      results_per_page: limit,
      results_size: null, // data.length
      total_results_size: total,
      total_pages: total > 0 ? Math.ceil(total / limit) : 1,
    };
    return { paging, limit, offset };
  },

  errors(errors: any, code = 400, ...args: any[]) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    code = code >= 400 && code < 500 ? code : 400;
    return Response.response({ errors }, code, ...args);
  },

  success(data: any, ...args: any[]) {
    return Response.response(data, ...args);
  },

  done(data: any, paginate: PagingObject | undefined | null = null) {
    const _buildBody = (data: any, paginate: PagingObject) => {
      paginate.paging.results_size = data.length;
      return {
        ...paginate.paging,
        results: data,
      };
    };
    let response = data;
    if (paginate) response = _buildBody(data, paginate);
    return response;
  },

  response(data: any, ...args: any[]) {
    const config = {
      stringify: true,
    };

    let statusCode = 200;

    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json; charset=utf-8",
    };
    const _buildBody = (data: any, paginate: PagingObject) => {
      paginate.paging.results_size = data.length;
      return {
        ...paginate.paging,
        results: data,
      };
    };

    const _buildOptions = (options: any | undefined) => {
      if (Object.prototype.hasOwnProperty.call(options, "headers")) {
        headers = { ...headers, ...options.headers };
      }

      if (Object.prototype.hasOwnProperty.call(options, "stringify")) {
        config.stringify = options.stringify;
      }
    };

    let body = data;

    args.map((element) => {
      if (typeof element === "number") {
        statusCode = element;
      }

      if (
        typeof element === "object" &&
        Object.prototype.hasOwnProperty.call(element, "paging")
      ) {
        body = _buildBody(data, element);
      }
      if (typeof element === "object") {
        _buildOptions(element);
      }
    });

    const response = {
      statusCode,
      headers,
      body,
    };

    if (statusCode !== 204) {
      response.body = config.stringify ? JSON.stringify(body) : body;
    }

    return response;
  },
};

export function success(data: any, ...args: any[]) {
  return Response.success(data, ...args);
}
export function done(data: any, paginate = null) {
  return Response.done(data, paginate);
}
export function errors(
  errors: any,
  code: number,
  headers: any,
  stringify = true
) {
  return Response.errors(errors, code, headers, stringify);
}
export function paginate(total: any, page = 1, limit = 20) {
  Response.paginate(total, page, limit);
}
