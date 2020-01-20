const { success, errors, paginate, Response } = require('./index')

// *** Test Configuration ***
const options = {
  headers: {
    'Custom-Header1': 'value1',
    'Custom-Header2': 'value2'
  },
  stringify: false // default true
}

let totItems = 60
let page = 1
let limit = 20
// *** End

let items = []
for (let i = 0; i < totItems; i++) {
  items.push({ id: i + 1, name: 'test' + (i + 1) })
}
const offset = limit * (page - 1)
const queryResult = items.slice(offset, offset + limit)

// Test success
const test1 = success(queryResult,200, { stringify: false })
console.log('\n\nTest success\n', test1)

// Test success using pagination
const paging = paginate(totItems, page, limit)
const test2 = success(queryResult, 204, options, paging)
console.log('\n\nTest success using pagination\n', test2)

// Test errors
const test3 = errors(['Text Error 1', 'Text Error 2'], 404, options)
console.log('\n\nTest errors\n', test3)

// Test using Response global object
const test4 = Response.errors(['Text Error 1', 'Text Error 2'], 404, options)
console.log('\n\nTest errors usign global object\n', test4)
