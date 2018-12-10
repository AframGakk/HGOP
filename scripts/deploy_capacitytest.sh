#!/usr/bin/env bash

mkdir /var/lib/jenkins/terraform/hgop/capacitytest
mkdir /var/lib/jenkins/terraform/hgop/capacitytest/scripts
cp *.tf /var/lib/jenkins/terraform/hgop/capacitytest
cp *.yml /var/lib/jenkins/terraform/hgop/capacitytest
cp ./scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/capacitytest/scripts/initialize_game_api_instance.sh
cp ./scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/capacitytest/scripts/docker_compose_up.sh

cd /var/lib/jenkins/terraform/hgop/capacitytest

# Init Terraform
terraform init

# Apply the instance to AWS via terraform
terraform apply -auto-approve

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

# Destroying the terraform instance
terraform destroy -auto-approve

cd /var/lib/jenkins/workspace/HGOP