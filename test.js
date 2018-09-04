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

test('cycle', function (t) {
    t.table_assert([
        [ 'a',                     'max',    'exp' ],
        [ [0,1,0,0],                9,        3 ],
        '# 0 cycle',
        [ [],                       9,        0 ],
        '# 1 cycle',
        [ [ 1 ],                    9,        1 ],
        [ [ 1, 1 ],                 9,        1 ],
        [ [ 1, 1, 1 ],              9,        1 ],
        [ [ 1, 1, 1 ],              1,        1 ],
        '# 2 cycle 01',
        [ [ 0, 1 ],                 9,        2 ],
        [ [ 0, 1, 0 ],              9,        2 ],
        [ [ 0, 1, 0, 1 ],           9,        2 ],
        [ [ 0, 1, 0, 1, 0 ],        9,        2 ],
        '# 2 cycle 10',
        [ [ 1, 0 ],                 9,        2 ],
        [ [ 1, 0, 1 ],              9,        2 ],
        [ [ 1, 0, 1, 0 ],           9,        2 ],
        [ [ 1, 0, 1, 0, 1 ],        9,        2 ],
        '# 3 cycle 100',
        [ [1,0,0 ],                 9,        3 ],
        [ [1,0,0,1 ],               9,        3 ],
        [ [1,0,0,1,0,0,1,0],        9,        3 ],
        '# 3 cycle 001',
        [ [0,0,1 ],        9,        3 ],
        [ [0,0,1,0 ],        9,        3 ],
        [ [0,0,1,0,0,1,0,0],        9,        3 ],
        '# 3 cycle 010',
        [ [0,1,0],                  9,        2 ],
        [ [0,1,0,0,1],              9,        3 ],
        [ [0,1,0,0,1,0],            9,        3 ],
        [ [0,1,0,0,1,0,0],          9,        3 ],
        [ [0,1,0,0,1,0,0,1],        9,        3 ],
        '# 5 cycle',
        [ [1,1,0,0,0],        9,        5 ],
        '# 6 cycle',
        [ [0,1,0,0,1,1,0,1,0,0,1],        9,        6 ],
        [ [0,1,0,0,1,1,0,1,0,0,1,1],        9,        6 ],
        [ [0,1,0,0,1,1,0,1,0,0,1,1,0],        9,        6 ],
        '# max lambda',
        [ [0,1,0,0,1,1,0,1,0,0,1,1,0],        5,        0 ],

    ], cycle.cycle)
})

test('cycle many', function (t) {
    t.table_assert([
        [ 's',     'exp' ],
        [ '00',    { '00': 1 } ],
        [ '000',   { '000': 1 } ],
        [ '001',   { '100': 3, '001': 3, '010': 2 } ],
        [ '011',   { '101': 2, '110': 3, '011': 3 } ],
        [ '0001',  { '1000': 4, '0001': 4, '0010': 3, '0100': 3 } ],
        [ '0011',  { '1001': 3, '1010': 2, '1100': 4, '0011': 4, '0101': 2, '0110': 3 } ],
        [ '00001', { '10000': 5, '00001': 5, '00010': 4, '00100': 3, '01000': 4 } ],
        [ '00011', { '10001': 4, '10010': 3, '10100': 5, '11000': 5, '00011': 5, '00101': 5, '00110': 4, '01001': 3, '01010': 2, '01100': 4 } ],
    ], function (s) {
        var arr = t.permut(s.split('')).map(function (a) { return a.join('') })
        var obj = arr.reduce(function (o, s) { o[s] = 1; return o }, {})
        var uniq = Object.keys(obj)
        uniq.sort()
        return uniq.reduce(function (o, s) {
            var a = s.split('').map(function (d) { return parseInt(d) })
            o[s] = cycle.cycle(a)
            return o
        }, {})
    })
})