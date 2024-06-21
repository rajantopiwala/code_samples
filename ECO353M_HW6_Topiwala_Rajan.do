//Part I

//enter the data
clear

input year district banks
1929 8 169
1930 8 165
1931 8 132
1932 8 120
1933 8 111
1934 8 108
1929 6 141
1930 6 135
1931 6 121
1932 6 113
1933 6 102
1934 6 102
end

//create treatment and post dummies
gen treatment = (district == 6)
gen post = (year >= 1931)


//run diff in diff
regress banks i.treatment i.post i.treatment#i.post


//Part II
replace banks = banks + 6 if district == 8

//run diff in diff 
regress banks i.treatment i.post i.treatment#i.post


//Q5
//enter the data again
clear

input year district banks
1929 8 169
1930 8 165
1931 8 132
1932 8 120
1933 8 111
1934 8 108
1929 6 141
1930 6 135
1931 6 121
1932 6 113
1933 6 102
1934 6 102
end

//create separate variables for to make the graph 
gen banks6 = banks if district == 6
gen banks8 = banks if district == 8

//replace the first value for 8th district banks to 180
replace banks8 = 180 in 1

//make the line plot
line banks6 banks8 year, legend(subtitle("Banks by District") order(1 "6th District" 2 "8th District"))

