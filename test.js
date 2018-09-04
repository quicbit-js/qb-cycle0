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
var cycle = require('.')

test('adjust_cycle', function (t) {
    t.table_assert([
        [ 'a',                     'idx', 'lam', 'max',   'exp' ],
        '# 1 cycle',
        // [ [ 1, 1 ],                 1,     1,    9,   1 ],
        // [ [ 1, 1, 1 ],              2,     1,    9,   1 ],
        '# 2 cycle',
        [ [ 0, 1, 0, 1, 0 ],        1,     1,    9,   2 ],
        [ [ 0, 1, 0, 1, 0 ],        2,     2,    9,   2 ],
        [ [ 0, 1, 0, 1, 0 ],        3,     2,    9,   2 ],
        [ [ 0, 1, 0, 1, 0 ],        4,     2,    9,   2 ],
        '# 3 cycle',
        [ [0,1,0,0,1,0,0,1],        2,     2,    9,   2 ],
        [ [0,1,0,0,1,0,0,1],        3,     3,    9,   3 ],
        [ [0,1,0,0,1,0,0,1],        4,     3,    9,   3 ],
        [ [0,1,0,0,1,0,0,1],        5,     3,    9,   3 ],
        [ [0,1,0,0,1,0,0,1],        6,     3,    9,   3 ],
        [ [0,1,0,0,1,0,0,1],        7,     3,    9,   3 ],
    ], cycle.adjust_cycle)
})

test('cycle', function (t) {
    t.table_assert([
        [ 'a',                     'exp' ],
        [ [],                      0 ],
        [ [ 1 ],                   1 ],
        [ [ 1, 1 ],                1 ],
        [ [ 1, 2 ],                2 ],
        [ [ 1, 2, 1 ],             2 ],
        [ [ 1, 2, 1, 2 ],          2 ],
        [ [ 1, 2, 1, 2, 1, 1, 1 ], 6 ],
    ], cycle.cycle)
})