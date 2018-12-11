#!/usr/bin/env bash

rm -rf repository
git clone git@github.com:AframGakk/HGOP.git repository
cd repository
git checkout $GIT_COMMIT

rm -r /var/lib/jenkins/terraform/hgop/apitest

mkdir /var/lib/jenkins/terraform/hgop/apitest
cp *.tf /var/lib/jenkins/terraform/hgop/apitest
cp *.yml /var/lib/jenkins/terraform/hgop/apitest
cp ./scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/apitest/scripts/initialize_game_api_instance.sh
cp ./scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/apitest/scripts/docker_compose_up.sh

cd /var/lib/jenkins/terraform/hgop/apitest

# Destroying the terraform instance
terraform destroy -auto-approve -var environment=apitest || exit 1

# Init Terraform
terraform init

# Apply the instance to AWS via terraform
terraform apply -auto-approve -var environment=apitest || exit 1

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

# Destroying the terraform instance
terraform destroy -auto-approve

cd /var/lib/jenkins/workspace/HGOP
