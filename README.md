# README  
# SC-T-542-HGOP  
# Week 1  
### Assignment  
This is the first weeks assignment in HGOP.  

## Team Members  
Ívar Kristinn Hallsson: ivar17@ru.is      
Vilhjálmur Rúnar Vilhjálmsson: vilhjalmur12@ru.is  

## To build  
1. git clone the project  
    `git clone https://github.com/AframGakk/HGOP.git`  
2. Navigate to the root directory, and from there execute ./scripts/verify_enviroment.sh.  
3. Install dependancies from verify_enviroment.  
4. Make an AWS account, [link](https://aws.amazon.com/education/awseducate/)
5. AWS credential and where to put them.
6. Then you should be able to execute ./scripts/deploy.sh
7. Url to instance curl $(terraform output public_ip):3000/status   

## Verify that the API is running  
curl $(terraform output public_ip):3000/status  

## TODO  
Write about the extra things we have here.
