provider "aws" {
  profile = "default"
  region  = "us-east-1"
  default_tags {
    tags = {
      source = "tf-ask-docker"
    }
  }
}

resource "aws_key_pair" "main" {
  key_name   = "ask-vm-key"
  public_key = var.public_key
}

resource "aws_security_group" "ask_docker_sg" {
  name        = "ask-docker-sg"
  description = "Ports to be open for testing the app"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = var.api_port
    to_port     = var.api_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = var.react_port
    to_port     = var.react_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = var.http_port
    to_port     = var.http_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = var.https_port
    to_port     = var.https_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    self      = true
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ask_docker_ec2" {
  count                  = 1
  ami                    = "ami-007855ac798b5175e"
  instance_type          = "t2.medium"
  key_name               = aws_key_pair.main.key_name
  vpc_security_group_ids = [aws_security_group.ask_docker_sg.id]
  user_data              = file("install_docker.sh")
  root_block_device {
    volume_size = 100 # in GB
    volume_type = "gp3"
    encrypted   = false
  }
  tags = {
    Name = "${format("ask-docker-%d", count.index)}"
  }
}
