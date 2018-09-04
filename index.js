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

// fast resolution of repeating ordered subsets (up to 1000)

function err (msg) { throw Error(msg) }

// for lam > 0
function adjust_cycle (a, idx, lam, max_lambda) {
    if (a[idx] === a[idx % lam]) {
        return lam
    }
    return ++idx > max_lambda ? 0 : idx
}

// a zero-offset cycle detection (including first values in the cycle, no skipping).  Returns array of smallest fitting cycle values
function cycle (a, max_lambda) {
    switch (a.length) {
        case 0: return 0
        case 1: return 1
        case 2: return a[0] === a[1] ? 1 : 2
        default:
            var lam = 1
            for (var i=0; i<a.length; i++) {
                if (a[i] !== a[i%lam]) {
                    lam = adjust_cycle(a, i, lam, max_lambda)
                }
            }
            return lam
    }
}

module.exports = {
    cycle: cycle,
    adjust_cycle: adjust_cycle,
}
