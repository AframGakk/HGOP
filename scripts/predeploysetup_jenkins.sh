#!/usr/bin/env bash

JENKINS_URL=52.91.141.183

ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mkdir -p /var/lib/jenkins/.aws"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo mkdir -p /var/lib/jenkins/terraform/hgop/production"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chown -R jenkins:jenkins /var/lib/jenkins/.aws"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@${JENKINS_URL} "sudo chown -R jenkins:jenkins /var/lib/jenkins/terraform/hgop/production"