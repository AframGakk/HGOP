#!/bin/bash

rm -r repository
git clone git@github.com:AframGakk/HGOP.git repository
cd repository

# Destroying the terraform instance
terraform destroy -auto-approve

cd /var/lib/jenkins/terraform/hgop/production

# Init Terraform
terraform init

# Apply the instance to AWS via terraform
terraform apply -auto-approve

echo "Game API running at " + $(terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

#TODO exit on error if deployment fails.

#exit 0


# execute the command on the new instance via ssh to initialize the web service
# ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
