#!/bin/bash

rm -rf repository
git clone git@github.com:AframGakk/HGOP.git repository
cd repository
git checkout $GIT_COMMIT

# Delete all .tf files from /var/lib/jenkins/terraform/hgop/production
rm /var/lib/jenkins/terraform/hgop/production/*.tf
rm /var/lib/jenkins/terraform/hgop/production/*.yml
rm -r /var/lib/jenkins/terraform/hgop/production/scripts
# Copy all .tf files from repository to /var/lib/jenkins/terraform/hgop/production
mkdir /var/lib/jenkins/terraform/hgop/production/scripts
cp *.tf /var/lib/jenkins/terraform/hgop/production
cp *.yml /var/lib/jenkins/terraform/hgop/production
cp ./scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/production/scripts/initialize_game_api_instance.sh

#
cd /var/lib/jenkins/terraform/hgop/production

# Init Terraform
terraform init
# Destroying the terraform instance
terraform destroy -auto-approve
# Apply the instance to AWS via terraform
terraform apply -auto-approve

echo "Game API running at " + $(terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

#TODO exit on error if deployment fails.

#exit 0


# execute the command on the new instance via ssh to initialize the web service
# ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
