---
title: "Digital Root"
date: '2022-05-19'
spoiler: "The limits of my language mean the limits of my world."
---

> What is a Digital root? if you have done little competitive programming or practice for Data Structure or anything else you have got a problem where you need to sum all digits of the number and do this process until the number becomes a single-digit number. so that is Digital Root, let's talk about it.

So you might have seen digital root, some Example

Examples: 123 =&gt; 1 + 2 + 3 =&gt; 6 455 =&gt; 4 + 5 + 5 =&gt; 14 =&gt; 1+4 = 5

> To solve this type of problem in competitive coding we can attempt brute force too. but that will be slow. Then how will you solve this problem?

Some points which we use in the digital root concept(properties),

* when you multiply any number(&gt;0) by 9 then the sum of all digits of that number will always be 9. Example :  345\*9 = 3105 =&gt; 3+1+0+5 =&gt; 9 , you can check yourself this condition (try different numbers)
    
* When we add 9 to any number(here add means concatenating ) sum of all digits won't get effected, Example : 345 =&gt; 3+4+5 =&gt; 12 =&gt; 1+2 =&gt; 3, now add 9 , 3459 =&gt; 21 =&gt; 2+1=&gt;3
    
* when we divide any number by 9, then what remainder we get is the same as the digital root of that number. Example : 15/9 =&gt; 6 and 15=&gt; 1+5=&gt;6
    
* Any Perfect Square's digital root will be 1,4,7,9 (16=&gt;1+6=&gt;7, 36=&gt;3+6=&gt;9 etc)
    

So conditions for digital root will be,

```js
Here n = number, b= base value (for decimal b=10)
if n==0 then  digital_root(n)  = 0 
if n!=0 && n%(b-1) ==0 then digital_root(n) = b-1
if n%(b-1) != 0  then digital_root(n) = n mod (b-1)
```

**OR**

```js
if n==0 then digital_root(n) = 0
else , 1 + ( (n-1)%9)
```

Let's put the above things in Code: C++

```cpp
#include <iostream>
using namespace std;
int digital_root(int n){
    if (n==0)return 0;
    else{
        return 1 + ((n-1)%9);
    }
}
int main() {
    int n;
    cout << "Enter Number: ";
    cin >> n;
    cout <<endl;
    cout << "Digital Root Value :"  << digital_root(n);
    return 0;
}
```

Python3

```python
def digital_root(n):
    if n==0:
        return 0
    else:
        return 1 + ((n-1)%9)
n = int(input("Enter Number: "))
print("Digital Root :",digital_root(n))
```

[Leetcode Question for Practicing digital root](https://leetcode.com/problems/add-digits/) Wanna know more about Digital Root [Click Here](https://en.wikipedia.org/wiki/Digital_root)
