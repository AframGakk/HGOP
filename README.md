# README  
# SC-T-542-HGOP  
# Week 1  
### Assignment  
This is the first weeks assignment in HGOP.  

## Team Members  
Ívar Kristinn Hallsson: ivar17@ru.is      
Vilhjálmur Rúnar Vilhjálmsson: vilhjalmur12@ru.is  

# Week 1  
## To build  
1. git clone the project  
    `git clone https://github.com/AframGakk/HGOP.git`  
2. Navigate to the root directory, and from there execute in terminal:
    `./scripts/verify_enviroment.sh`
    This gives you details on your environment and the dependacies needed for this project. If there are dependancies not installed on your system, you will get prompted whether to install them or not.
4. Make an AWS account
    [Sign up for AWS](https://aws.amazon.com/education/awseducate/)
    Note that this might take up to 2 days to be created.

5. AWS credential and where to put them.
    * Start by making a aws credential folder, execute in terminal:
        `mkdir ~/.aws`
    * create a credential file in this folder:
        `touch ~/.aws/credentials`
    * login to your aws account, go to AWS account > account details. Copy the credentials into your credential file created before. The credentials to the session gets updated in 1 hour so you might need to do this over and over again.
    * Set up your KeyPair file
        1. In your AWS account go to:
            AWS console > Services > EC2 > Network & Security > Key Pairs
        2. Create new Key pair called *GameKeyPair*
        3. Download the key pair file.
        4. Move the key pair file to the newly created credential folder ~/.aws/
6. To deploy your instance to AWS, navigate to root directory and execute in terminal:
    `./scripts/deploy.sh`
7. To check your running API instance execute in terminal:
    `curl $(terraform output public_ip):3000/status`  

## Week 1 solutions

### The running API instance  
To check the running instance enter in terminal:
`curl 52.91.84.153:3000/status`

### Extra things added
We decided to structure the repository like if a new programmer would be joining us. Therefore in this readme document you can find the steps of building and setting up the environment. In extra of verifying the environment with a script we also made an extra script which will install all dependancies needed for the project for you. The install script can be run separately or if the verify_enviroment script is ran, the script asks whether you want to run the install script if it did not found some dependancy. Note that the install script is modified for both OSX (darwin) and Linux.

# Week 2 & 3
## URL  
URL to jenkins instance
URL: http://52.91.141.183:8080

## Test folder    
All our unit-test are in a dedicated test folder /game_api/test  


