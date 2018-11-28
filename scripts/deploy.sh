#!/bin/bash

# Destroying the terraform instance
terraform destroy -auto-approve

# Init Terraform
terraform init

# Apply the instance to AWS via terraform
terraform apply -auto-approve

# execute the command on the new instance via ssh to initialize the web service
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
