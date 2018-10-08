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

var qbfac = require('qb-factors')

// a zero-offset cycle detection (including first values in the cycle, no skipping).  Returns array of smallest fitting cycle values
// max_lambda is ignored for short arrays (set above 4 to have consistent effect)
// clean set to true will only return cycles that divide the array with no remainder
function cycle0 (a, max_lambda, clean) {
    switch (a.length) {
        case 0: return 0
        case 1: return 1
        case 2: return a[0] === a[1] ? 1 : 2
        case 3: return a[0] === a[1] ? (a[1] === a[2] ? 1 : 3) : (a[2] === a[0] && !clean ? 2 : 3)
    }
    if (a[0] === a[1] && a[1] === a[2]) {
        // check lambda == 1
        var len = a.length
        for (var i=3; i<len && a[i-1] === a[i]; i++) {}
        if (i === len) { return 1 }
    }
    max_lambda = max_lambda || 300
    return clean ? _cycle0clean(a, max_lambda) : _cycle0(a, max_lambda)
}

function _cycle0 (a, max_lambda) {
    var len = a.length
    var lam = a[0] === a[1] ? 1 : 2
    for (var i = 2; i < len;) {
        if (a[i] === a[i%lam]) {
            i++
        } else {
            i = ++lam
            if (lam > max_lambda) {
                return len
            }
        }
    }
    return lam
}

// return the lowest cycle of a that is a multiple of f, where f is a prime factor of a.lengths
function min_cycle (fac, a, max_lambda) {
    if (fac > max_lambda) {
        return a.length
    }
    var i = fac
    var len = a.length
    // m == 1
    while (i < len && a[i] === a[i%fac]) { i++ }
    if (i === len) {
        return fac
    }

    // we can optimize for i when there are 1 or more cycles of fac (i.e.  i > fac * 2)
    //                  xx  **                          xx    **
    //     [ab, ab, ab, ab, ba, ab, ab ]  means [ abab, abab, baab, ab ]  [ abababab, baabab ]
    //                               ***                       xxx     ***
    //     [aba, aba, aba, aba, aba, bba ]  means [ abaaba, abaaba, ababba ]  [ abaabaabaaba, ababba ]
    var lim = len/fac
    for (var m=2; m < lim; m++) {
        var lam = m * fac
        if (lam > max_lambda) {
            return len
        }
        var f = len/lam
        if (f === ~~f) {
            i = lam
            while (i < len && a[i] === a[i%lam]) { i++ }
            if (i === len) {
                return lam
            }
        }
    }
    return len
}

function _cycle0clean (a, max_lambda) {
    var ret = a.length
    var factors = qbfac.factors(a.length)    // factor other than len and 1
    if (factors.length === 0) {
        return ret
    }
    for (var i=0, fac = factors[i]; i<factors.length && fac < ret; i++) {
        ret = Math.min(ret, min_cycle(factors[i], a, max_lambda))
    }
    return ret
}

function reduce(vals, max_lambda, clean) {
    if (vals.length > 1) {
        var lambda = cycle0(vals, max_lambda, clean)
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
