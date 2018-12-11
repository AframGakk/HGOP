## Day 11, answers
### Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.  
Because they are asynchronous and to know that the results have been retrieved and successfully is when they all call onSuccess. They are connected, if one fail they all fail. If the dont fail then we have all the information we need and send the res back.

### What does the done parameter do?  
Callback that you need to call once you are done with the test.    
The done parameter can either signal that the test is done with an error or sucess.    
