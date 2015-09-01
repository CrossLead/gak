## _gak_ (Graph Analysis ToolKit for NodeJS)

[![Build Status](https://travis-ci.org/CrossLead/gak.svg?branch=master)](https://travis-ci.org/CrossLead/gak)
[![Dependency Status](https://david-dm.org/crosslead/gak.svg)](https://david-dm.org/crosslead/gak)

Alorithm TODO:
  - Louvain Modularity for community detection
  - Weighted / Generalized HITS for node ranking

Reading Material:
  - (Vanilla HITS) http://www.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture4/lecture4.html
  - (Weighted HITS) http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4106762/
  - (Enron analysis) http://research.cs.queensu.ca/~skill/proceedings/yener.pdf
  - (Generalized HITS) http://www.cs.berkeley.edu/~jfc/papers/05/SIAM-DM/siam-linkana05.pdf
  - (Louvain Modularity) http://arxiv.org/pdf/0803.0476v2.pdf

Test Datasets:
  - *Enron email corpus*: Download the full dataset from https://www.cs.cmu.edu/~./enron/ (I got the May 7, 2015 Version of dataset). Move the tarball into `test/enron/`, unzip, and run `enron.py` to create a test csv dataset.
