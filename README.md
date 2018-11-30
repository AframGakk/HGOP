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

## Week 1 solutions

### The running API instance  
To check the running instance enter in terminal:
'curl 52.91.84.153:3000/status'

### Extra things added
We decided to structure the repository like if a new programmer would be joining us. Therefore in this readme document you can find the steps of building and setting up the environment. In extra of verifying the environment with a script we also made an extra script which will install all dependancies needed for the project for you. The install script can be run separately or if the verify_enviroment script is ran, the script asks whether you want to run the install script if it did not found some dependancy. Note that the install script is modified for both OSX (darwin) and Linux.
