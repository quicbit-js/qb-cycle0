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

function cycle_floyd (f, start) {

    // Search for a repeating element, i.e., one for which
    // X[n] = X[2n] with n >= 1.

    var Xi = start
    var X2i = start
    var i
    for (i = 1; ; i++) {
        Xi = f(Xi)
        X2i = f(f(X2i))
        console.log('Xi:', Xi, 'X2i', X2i )
        if (Xi === X2i) break
    }
    // var n = i                       // Set the position and
    // var Xn = Xi                     // value of X[n], the re-
    //                                 // peating element found.

    // Now find the first element of the repeating part.
    // by finding first place where X[i] = X[n+i].

    var Xnpi = Xi
    Xi = start
    for (i = 0; ; i++) {
        if (Xi === Xnpi) break
        Xi = f(Xi)
        Xnpi = f(Xnpi)
    }

    var ret = {}
    ret.mu = i

    // Now find the period lambda by simply searching from
    // mu on to see where it first repeats.  (This is not
    // the method suggested by Knuth.)

    var Xmu = Xi
    console.log('Xmu', Xmu)
    for (i = 1; ; i++) {
        Xi = f(Xi)               // Really X[i+mu].
        console.log('Xi:', Xi)
        if (Xi === Xmu) break
    }
    ret.lambda = i                 // Give lambda to caller.
    return ret
}


/* User enters the starting number of a sequence, the
first value (not index) at which the repeated subsequence
begins, and the last value of the repeated subsequence.
*/

function main (start, mu, lambda) {
    lambda >= mu || err('X1 must be greater than X2')

    var f = cycle_fn(mu, lambda)
    var series = [start]
    for (var i = 0, x = start; i < 17; i++) {
        series.push(x = f(x))
    }
    console.log(series)

    // Find the first repeated element and the period.


    console.log(cycle_floyd(f, start))
}

function err (msg) { throw new Error(msg) }

console.log(main (1, 1, 9))