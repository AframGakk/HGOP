# information on the service where the instance is set up. The provider info needs to hold the
# credential key generated for each user.
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# holds information about a new provider security group. Provider security group controls which
# ports are open on an instance and which protocol is used to communicate to the port. Ingress values are
# rules for the security group where a rule can open up a port with specific communication style.
resource "aws_security_group" "game_security_group" {
  name   = "GameSecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Information about the new instance to be created on the providor. This names the instance, sets which type of instance
# (in this case Ubuntu t2.micro) and the security info (security group, key to be used).
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = ["${aws_security_group.game_security_group.id}"]
  tags {
    Name = "GameServer"
  }
  # Copies the docker init file to the new instance via ssh with KeyPair authentication.
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  # Copies the docker-compose yaml file to the new instance via SSH.
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  #
  # connects to the new instance and executes a remote command to make
  # initialize_game_api_instance.sh executable
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
}

# Creates output variable for Terraform. In this case the public_ip variable
# gets the ip value of the new instance
output "public_ip" {
  value = "${aws_instance.game_server.public_ip}"
}
