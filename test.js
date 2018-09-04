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

/*
test('is_clean_repeat', function (t) {
    t.table_assert([
        [ 'a',                    'lim',    'f',    'exp' ],
        [ [1,0,1,0,1,0],          6,        2,      true ],
        [ [1,0,1,1,1,0],          6,        2,      false ],
        [ [1,0,1,1,0,1],          6,        3,      true ],
        [ [1,0,1,1,0,1],          3,        3,      true ],
        [ [1,0,1,1,0,1],          6,        2,      false ],
    ], tset._is_clean_repeat)
})
*/

test('adjust_cycle', function (t) {
    t.table_assert([
        [ 'cyc',          'idx', 'v', 'exp' ],
        '# 1 cycle',
        [ [],             0,     1,   [ 1 ] ],
        [ [ 1 ],          1,     1,   [ 1 ] ],
        [ [ 1 ],          2,     1,   [ 1 ] ],
        [ [ 1 ],          3,     1,   [ 1 ] ],
        '# 2 cycle',
        [ [ ],            0,     0,   [ 0 ] ],
        [ [ 0 ],          1,     1,   [ 0, 1 ] ],
        [ [ 0, 1 ],       2,     0,   [ 0, 1 ] ],
        [ [ 0, 1 ],       3,     1,   [ 0, 1 ] ],
        [ [ 0, 1 ],       4,     0,   [ 0, 1 ] ],
        [ [ 0, 1 ],       5,     1,   [ 0, 1 ] ],
        '# 4 cycle',
        [ [ 0 ],          1,     0,   [ 0 ] ],
        [ [ 0 ],          2,     1,   [ 0, 0, 1 ] ],
        [ [ 0, 0, 1 ],    3,     1,   [ 0, 0, 1, 1 ] ],
        [ [ 0, 0, 1, 1 ], 4,     0,   [ 0, 0, 1, 1 ] ],
        [ [ 0, 0, 1, 1 ], 5,     0,   [ 0, 0, 1, 1 ] ],
        [ [ 0, 0, 1, 1 ], 6,     1,   [ 0, 0, 1, 1 ] ],
        [ [ 0, 0, 1, 1 ], 7,     1,   [ 0, 0, 1, 1 ] ],
        [ [ 0, 0, 1, 1 ], 8,     0,   [ 0, 0, 1, 1 ] ],
        '# ... becomes 9, 10, 11...',
        [ [ 0, 0, 1, 1 ], 8,     1,   [ 0, 0, 1, 1, 0, 0, 1, 1, 1 ] ],
        [ [ 0, 0, 1, 1 ], 9,     1,   [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 1 ] ],
        [ [ 0, 0, 1, 1 ], 10,    0,   [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ] ],
        [ [ 0, 0, 1, 1 ], 11,    0,   [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0 ] ],
    ], function (cyc, idx, v, max_lambda) {
        // cyc is modified in the test, so clone it (preserve test input)
        return cycle.cycle_next(Array.prototype.slice.call(cyc), idx, v, max_lambda)
    })
})

test('cycle', function (t) {
    t.table_assert([
        [ 'a',                     'exp' ],
        [ [],                      [] ],
        [ [ 1 ],                   [ 1 ] ],
        [ [ 1, 1 ],                [ 1 ] ],
        [ [ 1, 2 ],                [ 1, 2 ] ],
        [ [ 1, 2, 1 ],             [ 1, 2 ] ],
        [ [ 1, 2, 1, 2 ],          [ 1, 2 ] ],
        [ [ 1, 2, 1, 2, 1, 1, 1 ], [ 1, 2, 1, 2, 1, 1 ] ],    ], cycle.cycle)
})