provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

resource "aws_instance" "game_server" {
  ami           = "ami-0ac019f4fcb7cb7e6"
  instance_type = "t2.micro"
  tags {
    Name = "GameServer"
  }
}
