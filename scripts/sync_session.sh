#!/bin/bash

JENKINS_URL=52.91.141.183

scp -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ~/.aws/credentials ubuntu@${JENKINS_URL}:~/credentials
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mkdir -p /var/lib/jenkins/.aws"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo cp ~/credentials ~/.aws/credentials"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mv ~/.aws/JenkinsKeyPair.pem /var/lib/jenkins/.aws/JenkinsKeyPair.pem"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mv ~/credentials /var/lib/jenkins/.aws/credentials"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chmod a+r /var/lib/jenkins/.aws/credentials"
