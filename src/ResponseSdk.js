const ResponseSdk = {
  collect(total, page = 1, limit = 20) {
    page = page === null ? 1 : parseInt(page)
    limit = limit === null ? 1 : parseInt(limit)
    let offset = limit * (page - 1)
    let paging = {
      page: page,
      results_per_page: limit,
      results_size: null, // data.length
      total_results_size: total,
      total_pages: (total > 0) ? Math.ceil(total / limit) : 1
    }
    return { paging, limit, offset }
  },

  response(data, collection) {
    const _buildBody = (data, collection) => {
      collection.paging.results_size = data.length
      return {
        ...collection.paging,
        results: data
      }
    }
    let response = data
    if (collection)
      response = _buildBody(data, collection)
    return response
  }
}

module.exports = {
  response: (data, collection = null) => ResponseSdk.response(data, collection),
  collect: (total, page = 1, limit = 20) => ResponseSdk.collect(total, page, limit)
}
