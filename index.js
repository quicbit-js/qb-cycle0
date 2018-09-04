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
var PRIMES = [
    2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,
    101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,
    211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,
    307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,
    401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,
    503,509,521,523,541,547,557,563,569,571,577,587,593,599,
    601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,
    701,709,719,727,733,739,743,751,757,761,769,773,787,797,
    809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,
    907,911,919,929,937,941,947,953,967,971,977,983,991,997
]

// low value is better match.  zero is perfect.
function is_clean_repeat (a, lim, f) {
    for (var base = 0; base + f < lim; base += f) {
        for (var i = 0; i < f; i++) {
            if (a[base + i] !== a[base + i + f]) {
                return false
            }
        }
    }
    return true
}

function all_same (a, lim) {
    var a0 = a[0]
    for (var i=1; i<lim; i++) {
        if (a[i] !== a0) {
            return false
        }
    }
    return true
}

function subset_length (a, len, subset_lim) {
    switch (len) {
        // quick-checks
        case 0:     throw Error('unexpected subset length')
        case 1:     return 1
        case 2:     return a[0] === a[1] ? 1 : 2
        case 3:     return a[0] === a[1] && a[1] === a[2] ? 1 : 3
        case 4:
            if (a[0] === a[2] && a[1] === a[3]) { return a[0] === a[1] ? 1 : 2 }
            else { return 4 }
    }
    if (PRIMES[len]) {
        return all_same(a, len) ? 1 : len
    }
    // len > 5, non-prime
    var f = largest_factor(len, subset_lim)
    if (is_clean_repeat(a, len, f)) {
        return subset_length(a, len/f, subset_lim)
    } else {
        return subset_length(a, len, f - 1)
    }
    /*
    var lim = Math.min(~~(len/2), subset_lim)
    var scores = []
    for (var i=2; i<lim; i++) {     // todo: store popular factors for performance
        var f = len/i
        if (f === ~~f) {
            // len === i * f  (f is equal or larger factor)
            if (is_clean_repeat(a, f)) {
                return
            }
        }
    }
    scores.sort(function (a, b) { return a[0] - b[0] })
    return scores[0]
    */
}

function err (msg) { throw Error(msg) }

// a zero-offset cycle detection (including first values in the cycle, no skipping).  Returns array of smallest fitting cycle values
function cycle_next (cyc, idx, v, max_lambda) {
    switch (idx) {
        case 0:
            cyc.push(v)
            break
        case 1:
            if (v !== cyc[0]) { cyc.push(v) }
            break
        default:
            if (v !== (cyc[idx % cyc.length])) {
                cyc = adjust_cycle(cyc, idx, v, max_lambda)
            }
    }
    return cyc     // zero if we give up
}

// cyc.length > 1
function adjust_cycle (cyc, idx, v, max_lambda) {
    if (v === cyc[idx % cyc.length]) {
        return cyc
    }
    // extend cyc to count length
    var len = cyc.length
    for (var i = len; i < idx; i++) {
        cyc[i] = cyc[i % len]
    }
    cyc.push(v)
    return cyc
}

function cycle (a, max_lambda) {
    var cyc = []
    for (var i=0; i<a.length; i++) {
        cyc = cycle_next(cyc, i, a[i], max_lambda)
    }
    return cyc
}

module.exports = {
    _is_clean_repeat: is_clean_repeat,  // exposed for testing
    _best_match_len: subset_length,
    cycle_next: cycle_next,
    cycle: cycle,
    adjust_cycle: adjust_cycle,
}
