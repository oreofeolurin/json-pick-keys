# json-pick-keys [![npm version](https://badge.fury.io/js/json-pick-keys.svg)](https://badge.fury.io/js/json-pick-keys) [![Build Status](https://travis-ci.org/oreofeolurin/json-pick-keys.svg?branch=master)](https://travis-ci.org/oreofeolurin/json-pick-keys)

Select keys from JSON Object using space separated values.


## Installation

```bash
$ npm install --save json-pick-keys
```


## Usage

`json-pick-keys` helps you pick keys for inclusion and exclusion using space separated values.

Examples:

```javascript
var pickKeys = require('json-pick-keys');

var obj = {
        a: 'Hello',
        b: 'World!',
        c: {
            name: "welcome",
            text : "Welcome To",
            font : { family : 'Open Sans', style: 'bold'}
        },
        d: ['is', 'json', 'pick', 'keys']
    };
```

You can then use the API like this:

```javascript
pickKeys(obj, 'a b'); //  { a: 'Hello', b: 'World!'}
pickKeys(obj, 'c.name'); //   { c: { name: 'welcome' } }
pickKeys(obj, '-c'); //    { a: 'Hello', b: 'World!', d: [ 'is', 'json', 'pick', 'keys' ] }

```

## Note
Don't use inclusion and exclusion together, but really, why would you wanna do that?

However if you must do it, make sure that any nested key you want to exclude you include it first. Check this example:

```javascript
pickKeys(obj, 'a b c -c.font'); //  { a: 'Hello', b: 'World!', c: { name: 'welcome', text: 'Welcome To' } }

```

If you don't include the `c` first then, automatically `c` would be excluded


## License

License under the MIT License (MIT)

Copyright (c) 2018 Olurin O. Oreofe

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
