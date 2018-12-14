#!/bin/bash

JENKINS_URL=ec2-52-23-255-13.compute-1.amazonaws.com

scp -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ~/.aws/credentials ubuntu@${JENKINS_URL}:~/credentials
scp -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ~/.aws/GameKeyPair.pem ubuntu@${JENKINS_URL}:~/GameKeyPair.pem
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mv ~/credentials /var/lib/jenkins/.aws/credentials"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mv ~/GameKeyPair.pem /var/lib/jenkins/.aws/GameKeyPair.pem"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chmod a+r /var/lib/jenkins/.aws/GameKeyPair.pem"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chmod 600 /var/lib/jenkins/.aws/GameKeyPair.pem"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chmod a+r /var/lib/jenkins/.aws/credentials"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chown -R jenkins:jenkins /var/lib/jenkins/.aws/credentials"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chown -R jenkins:jenkins /var/lib/jenkins/.aws/GameKeyPair.pem"
