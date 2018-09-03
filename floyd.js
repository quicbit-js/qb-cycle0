// Loop detectors of Floyd and Gosper.

var X0_in, X1_in, X2_in

// Function f that generates the test sequence.

function cycle_fn (mu, lambda) {
    return function f(x) {
        if (x === lambda) return mu
        else return x + 1
    }
}

function nlz(x) {         // Number of leading zeros.
    if (x === 0) return(32)
    var n = 0
    if (x <= 0x0000FFFF) {n = n +16; x = x <<16}
    if (x <= 0x00FFFFFF) {n = n + 8; x = x << 8}
    if (x <= 0x0FFFFFFF) {n = n + 4; x = x << 4}
    if (x <= 0x3FFFFFFF) {n = n + 2; x = x << 2}
    if (x <= 0x7FFFFFFF) {n = n + 1}
    return n
}

function ntz(x) {         // Number of trailing zeros.
    if (x === 0) return(32)
    var n = 1
    if ((x & 0x0000FFFF) === 0) {n = n +16; x = x >>16}
    if ((x & 0x000000FF) === 0) {n = n + 8; x = x >> 8}
    if ((x & 0x0000000F) === 0) {n = n + 4; x = x >> 4}
    if ((x & 0x00000003) === 0) {n = n + 2; x = x >> 2}
    return n - (x & 1)
}

/* The loop detector below is given in Knuth Vol. 2, third
edition, section 3.1 problem 6, where it is attributed to
R. W. Floyd.  */

function cycle_floyd (fn, first_val) {

    // Search for a repeating element, i.e., one for which
    // X[n] = X[2n] with n >= 1.

    var lo_v = first_val
    var hi_v = first_val
    var i
    for (i = 1; ; i++) {
        lo_v = fn(lo_v)
        hi_v = fn(fn(hi_v))
        if (lo_v === hi_v) break
    }
    // var n = i                       // Set the position and
    // var Xn = Xi                     // value of X[n], the re-
    //                                 // peating element found.

    // Now find the first element of the repeating part.
    // by finding first place where X[i] = X[n+i].

    var Xnpi = lo_v
    lo_v = first_val
    for (i = 0; ; i++) {
        if (lo_v === Xnpi) break
        lo_v = fn(lo_v)
        Xnpi = fn(Xnpi)
    }

    var ret = {}
    ret.mu = i

    // Now find the period lambda by simply searching from
    // mu on to see where it first repeats.  (This is not
    // the method suggested by Knuth.)

    var Xmu = lo_v
    for (i = 1; ; i++) {
        lo_v = fn(lo_v)               // Really X[i+mu].
        if (lo_v === Xmu) break
    }
    ret.lambda = i                 // Give lambda to caller.
    return ret
}


/* User enters the starting number of a sequence, the
first value (not index) at which the repeated subsequence
begins, and the last value of the repeated subsequence.
*/

function generate_arr (fn, first_val, len) {
    var ret = [first_val]
    for (var i = 0, x = first_val; i < len; i++) {
        ret.push(x = fn(x))
    }
    return ret
}

function main (first_val, mu_v, lambda_v, len) {
    lambda_v >= mu_v || err('X1 must be greater than X2')
    var fn = cycle_fn(mu_v, lambda_v)

    var arr = generate_arr(fn, first_val, len)

    var ret = cycle_floyd(fn, first_val)
    return [ ret.mu, ret.lambda ]
}

function err (msg) { throw new Error(msg) }

module.exports = main
