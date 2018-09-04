# qb-array-pattern

Find repeating series within an array (subseries of series)

There are two sub-problems to solve.  One is where the matching subset length is a factor
of the super set.
For the second case, the matching set can unevenly divide the superset, with a remainder less
than the subset length.

# Finding a subset which is a factor of the superset

We explore two approaches.  First approach is smallest factor first.

## Example 3 x 4 - smallest factor first

Find best ordered subsets (arrays) that cleanly divide an ordered set (array) with greatest
similarity to each other.

For example:

    [ 1 2 3 1 2 3 1 2 3 1 2 3 ]
    
Is evenly divisible by subsets of length 2, 3, 4, 6, but only subsets of length 3 and 6
have perfect similarity to each other.

The pattern of repetition is discoverable by first trying small factors or large factors.  If
we start factors 2 * 6 = 12 and use smallest first (2):

Try subsets length of 2:
    
    [ 1 2 ]
    [ 3 1 ]
    [ 2 3 ]
    ...         
    
We get dissimilar subsets.
    
try 6:
    
    [ 1 2 3 1 2 3 ]
    [ 1 2 3 1 2 3 ]   

... and we have perfect subsets.  Then we can try to find repetition within one of these
(finding one is finding both for perfect match).
    
new factors are 2 * 3.  2 was tried above so need not try again (it will "fold" into
the same dissimilar sets as initially tried).  So with 3:
    
    [ 1 2 3 ]
    [ 1 2 3 ]
    [ 1 2 3 ]
    [ 1 2 3 ]       
    
... we have perfect similarity.
    
   
## Example 3 x 4 - largest factor first

Again, starting with:

    [ 1 2 3 1 2 3 1 2 3 1 2 3 ]
    
Factors are 2, 3, 4, 6

Largest factor is 6.  Applying largest factor:
    
    [ 1 2 3 1 2 3 ]
    [ 1 2 3 1 2 3 ]
    
... a perfect match
    
new factors are 2 * 3.  start with largest (3)
    
    [ 1 2 3 ]
    [ 1 2 3 ]
    [ 1 2 3 ]
    [ 1 2 3 ]       
    
Perfect alignment found.
    
    
## Reasoning for and against largest factor

Largest factor will always equal or out-match smaller factor with fewer iterations
because small factor includes large factor allignment plus an extra iteration.

But largest factor is expensive if we have processing/storage overhead for tracking
a separate bucket for every position of the large factor.

Practical Solution:

Run "zero-overhead" checks on largest factors using neighbor compare instead of buckets.  
Look for simply for perfect match which is a commutative aggregate function rather than
a qualitative "how many mismatch and what mismatched". 
 
Then perform bucket checks on smaller factors.

## Object and Array Consolidation

Object and array consolidation should be performed on the entire array 
prior to zero-overhead checks to allow maximum consolidation of all possible candidates 
before applying the "zero-overhead largest factor checks" described above.



    
# Finding a subset that may or may not be a perfect factor of the superset (may have remainder)

This problem relates to very large arrays that have patterns that should be discovered 
prior to completion, and if finding no pattern, should be handled as 
