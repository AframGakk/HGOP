#!/usr/bin/env bash

rm -rf repository
git clone git@github.com:AframGakk/HGOP.git repository
cd repository
git checkout $GIT_COMMIT

rm -r /var/lib/jenkins/terraform/hgop/capacitytest
pwd
mkdir /var/lib/jenkins/terraform/hgop/capacitytest
mkdir /var/lib/jenkins/terraform/hgop/capacitytest/scripts
cp *.tf /var/lib/jenkins/terraform/hgop/capacitytest
cp *.yml /var/lib/jenkins/terraform/hgop/capacitytest
cp ./scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/capacitytest/scripts/
cp ./scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/capacitytest/scripts/

cd /var/lib/jenkins/terraform/hgop/capacitytest

# Destroying the terraform instance
#terraform destroy -auto-approve -var environment=apitest || exit 1

# Init Terraform
terraform init -var environment=capacitytest || exit 1

# Apply the instance to AWS via terraform
terraform apply -auto-approve -var environment=capacitytest || exit 1

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

# Destroying the terraform instance
terraform destroy -auto-approve -var environment=capacitytest || exit 1

#cd /var/lib/jenkins/workspace/HGOP