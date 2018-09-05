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

// a zero-offset cycle detection (including first values in the cycle, no skipping).  Returns array of smallest fitting cycle values
// max_lambda is ignored for short arrays (set above 4 to have consistent effect)
function cycle0 (a, max_lambda) {
    switch (a.length) {
        case 0: return 0
        case 1: return 1
        case 2: return a[0] === a[1] ? 1 : 2
        case 3: return a[0] === a[1] ? (a[1] === a[2] ? 1 : 3) : (a[2] === a[0] ? 2 : 3)
        default:
            var lam = a[0] === a[1] ? 1 : 2
            var len = a.length
            for (var i = 2; i < len; i++) {
                if (a[i] !== a[i%lam]) {
                    if (i < 2 * lam) {
                        // no pattern established.  increment lambda and try offset after lambda
                        i = lam++
                    } else {
                        // pattern established set to i
                        lam = i + 1
                    }
                    if (lam > max_lambda) {
                        return 0
                    }
                }
            }
            return lam
    }
}

function reduce(vals, max_lambda) {
    max_lambda = max_lambda || 300
    if (vals.length > 1) {
        var lambda = cycle0(vals, max_lambda)
        if (lambda !== 0 && lambda < vals.length) {
            vals = vals.slice(0, lambda)
        }
    }
    return vals
}

module.exports = {
    cycle0: cycle0,
    reduce: reduce,
}
