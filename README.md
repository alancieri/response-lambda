# Response for AWS Lambda Functions

Use this package as Lambda Layer to get a standard output for the API Request.<br />

### Install

```
npm i response-lambda --save
```

### Usage

```js
const { success, errors, paginate, Response } = require('./index')
success(items)

// Output 

{ 
  status: 'OK',
  statusCode: 200,
  headers: { 
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true,
     'Content-Type': 'application/json' 
  },
  body: [ 
     { id: 1, name: 'test1' },
     { id: 2, name: 'test2' },
     { id: 3, name: 'test3' },
     // ... 
   ] // body is a string (JSON.parse())
}
```

##### Success Response using pagination, custom statusCode, and add custom headers

```js
const options = {
  headers: {
    'Custom-Header1': 'value1',
    'Custom-Header2': 'value2'
  },
  stringify: false // default is true
}
const page = 1
const limit = 20

const paging = paginate(totItems, page, limit)
success(queryResult, 201, options, paging)

// Output 

{ 
  status: 'CREATED',
  statusCode: 201,
  headers: { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Custom-Header1': 'value1',
    'Custom-Header2': 'value2' 
  },
  body: {
    page: 1,
    results_per_page: 20,
    results_size: 20,
    total_results_size: 60,
    total_pages: 3,
    results: [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test3' },
      // ... 
    ] 
  } // body is an object
}
```
##### Error Response

```js
errors(['Error Message 1', 'Error Message 2'], 404, { stringify: false })

// Output

{ 
  status: 'NOT_FOUND',
  statusCode: 404,
  headers: { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Custom-Header1': 'value1',
    'Custom-Header2': 'value2' 
  },
  body: { 
    errors: [ 
      'Error Message 1', 
      'Error Message 2' 
    ]
  } 
}
```

##### Done Response using pagination
Using "done" function the response will not be wrapped in a API response

```js
const { done, paginate } = require('./index')
const page = 1
const limit = 20

const paging = paginate(totItems, page, limit)
console.log(done(queryResult, paging))

// Output 

{
  page: 1,
  results_per_page: 10,
  results_size: 10,
  total_results_size: 60,
  total_pages: 6,
  results: [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
    { id: 3, name: 'test3' },
    { id: 4, name: 'test4' },
    { id: 5, name: 'test5' },
    { id: 6, name: 'test6' },
    { id: 7, name: 'test7' },
    { id: 8, name: 'test8' },
    { id: 9, name: 'test9' },
    { id: 10, name: 'test10' }
  ]
}
```
