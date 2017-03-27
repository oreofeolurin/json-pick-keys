# BusForm [![npm version](https://badge.fury.io/js/busform.svg)](https://badge.fury.io/js/busform)
 
Multipart Middleware based on BusBoy


## Installation

```bash
$ npm install --save busform
```


## Usage

Busform provides you with a form `data` object containing the values of the fields in the multipart form.

Examples:

```javascript
var express = require('express')
var busform  = require('busform')
var app = express();


app.post('/posts', busform('photo'), function (req, res, next) {
  // the req.data will contain the a `photo` object which is the file uploaded
  // req.data wil also contain other text fields  which were included in the form
})

app.use(function (err, req, res, next) {
  //the `err` object contains possible errors from busform
  //include logic to catch necessary busform errors
})

```

## License

License under the MIT License (MIT)

Copyright © 2017 [Pinnacle Hardsoft Technologies LTD](https://www.pinnaclehardsoft.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
