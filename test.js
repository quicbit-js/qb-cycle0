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
        '# 6 cycle',
        [ [0,1,0,0,1,1,0,1,0,0,1],        9,        6 ],
        [ [0,1,0,0,1,1,0,1,0,0,1,1],        9,        6 ],
        [ [0,1,0,0,1,1,0,1,0,0,1,1,0],        9,        6 ],
        '# max lambda',
        [ [0,1,0,0,1,1,0,1,0,0,1,1,0],        5,        0 ],

    ], cycle.cycle)
})

function swap(arr, a, b)
{
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

function generate(n, p, arr) {
    if (n === 1) {
        p.push(arr.join());
    } else {
        for (var i = 0; i !== n; ++i) {
            generate(n - 1, p, arr);
            swap(arr, n % 2 ? 0 : i, n - 1);
        }
    }
}

function permutations(num)
{
    var arr = (num + '').split('')
    var p = [];


    generate(arr.length, p, arr);
    return p;
}

test.only('cycle many', function (t) {
    t.table_assert([
        [ 'v',  'len' ],
        [ '0111',   25 ],
    ], function (v, len) {
        permutations(v).forEach(function (p) {
            console.log(p)
            // var a = []
            // for (var i=0; i<clen; i++) {
            //     a[i] = sub[i % sub.length]
            // }
            // console.log(a)
            // console.log('-->', cycle(a, 100))
        })
    }, {assert: 'none'})
    t.end()
})