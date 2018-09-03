// Software License Agreement (ISC License)
//
// Copyright (c) 2018, Matthew Voss
//
// Permission to use, copy, modify, and/or distribute this software for
// any purpose with or without fee is hereby granted, provided that the
// above copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var test = require('test-kit').tape()
var floyd = require('./floyd')

test('floyd', function (t) {
    t.table_assert([
        [ 'start_v',    'mu_v',   'lamda_v',  'len',  'exp' ],
        [ 1,            3,        5,            17,     [2, 3] ],
        [ 1,            3,        7,            17,     [2, 5] ],
        [ 1,            4,        7,            17,     [3, 4] ],
        [ 1,            6,        7,            17,     [5, 2] ],
    ], floyd )
})

test('floyd', function (t) {
    t.table_assert([
        [ 'start_v',    'mu_v',   'lamda_v',  'len',  'exp' ],
        [ 1,            3,        5,            17,     [2, 3] ],
        [ 1,            3,        7,            17,     [2, 5] ],
        [ 1,            4,        7,            17,     [3, 4] ],
        [ 1,            6,        7,            17,     [5, 2] ],
    ], floyd )
})

