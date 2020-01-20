const httpStatus = require('http-status')

const Response = {
  paginate (total, page = 1, limit = 20) {
    let offset = limit * (page - 1)
    let paging = {
      page: page,
      results_per_page: limit,
      results_size: null, // data.length
      total_results_size: total,
      total_pages: (total > 0) ? Math.ceil(total / limit) : 1
    }
    const setResultsSize = (size) => { }
    return { paging, limit, offset }

  },

  errors (errors, code = 400, ...args) {
    if (!Array.isArray(errors)) { errors = [errors] }
    code = (code >= 400 && code < 500) ? code : 400
    return Response.response({ errors }, code, ...args)
  },

  success (data, ...args) {
    return Response.response(data, ...args)
  },

  response (data, ...args) {
    let config = {
      stringify: true
    }

    let statusCode = 200

    let headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
    const _buildBody = (data, paginate) => {
      paginate.paging.results_size = data.length
      return {
        ...paginate.paging,
        results: data
      }
    }
    const _buildOptions = (options) => {
      if (options.hasOwnProperty('headers')) {
        headers = { ...headers, ...options.headers }
      }
      if (options.hasOwnProperty('stringify')) {
        config.stringify = options.stringify
      }

    }

    let body = data
    args.map((element) => {
      if (typeof element === 'number') { statusCode = element }
      if (typeof element === 'object' && element.hasOwnProperty('paging')) { body = _buildBody(data, element)}
      if (typeof element === 'object') {_buildOptions(element)}
    })

    let response = {
      status: httpStatus[`${statusCode}_NAME`],
      statusCode,
      headers
    }

    if (statusCode !== 204) {
      response.body = (config.stringify) ? JSON.stringify(body) : body
    }

    return response
  }
}

module.exports = {
  Response,
  success: (data, ...args) => Response.success(data, ...args),
  errors: (errors, code, headers, stringify = true) => Response.errors(errors, code, headers, stringify),
  paginate: (total, page = 1, limit = 20) => Response.paginate(total, page, limit)
}
