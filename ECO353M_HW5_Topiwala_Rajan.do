//ECO353M: Empirical Public Economics HW 5
//Rajan Topiwala -- rrt687

//Q1: Running the regression of log(wage) on sibs
regress lwage sibs
ivregress 2sls lwage (educ = sibs)

//Q2: Is there negative correlation between educ and brthord
regress educ brthord


//Q3: Use brthord as an IV for educ from Q1
ivregress 2sls lwage (educ = brthord)

//Q4: Run the first stage regression
regress educ sibs brthord

//Q5
ivregress 2sls lwage sibs (educ = brthord)

//Q6:
//first stage
regress educ sibs brthord
predict educ_hat
//second
corr educ_hat sibs
