# qb-cycle0

Find repeating series from the zeroth offset.

Useful for compression that scans files with fixed or semi-known patterns patterns.  

This algorithm shouldn't be confused with more popular pattern
searches which seek out the start of a pattern, "mu".  This algorithm just seeks the cycle from 
the zeroth position and is simpler and more efficient for that case.  

