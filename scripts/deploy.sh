#!/bin/bash

# exit the script if any command has an non-zero exit code
set -e

rm -rf repository
git clone git@github.com:AframGakk/HGOP.git repository
cd repository
git checkout $GIT_COMMIT

# Delete all .tf files from /var/lib/jenkins/terraform/hgop/production
rm /var/lib/jenkins/terraform/hgop/production/*.tf
rm /var/lib/jenkins/terraform/hgop/production/*.yml
rm /var/lib/jenkins/terraform/hgop/production/*.yml
rm -r /var/lib/jenkins/terraform/hgop/production/scripts
# Copy all .tf files from repository to /var/lib/jenkins/terraform/hgop/production
mkdir /var/lib/jenkins/terraform/hgop/production/scripts
cp *.tf /var/lib/jenkins/terraform/hgop/production
cp *.yml /var/lib/jenkins/terraform/hgop/production
cp ./scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/production/scripts/initialize_game_api_instance.sh
cp ./scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/production/scripts/docker_compose_up.sh

#
cd /var/lib/jenkins/terraform/hgop/production

# Destroying the terraform instance
terraform destroy -auto-approve

# Init Terraform
terraform init

# Apply the instance to AWS via terraform
terraform apply -auto-approve

echo "Game API running at " + $(terraform output public_ip)

echo Running initialize script
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
echo Initialize complete
echo Running Docker Compose Up
echo $GIT_COMMIT
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"
echo Docker compose complete

