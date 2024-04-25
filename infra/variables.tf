variable "public_key" {
  description = "Main private key for accessing to ec2 machines for our project"
  type        = string
}

variable "api_port" {
  description = "Port for node API"
  type        = number
  default     = 8080
}

variable "react_port" {
  description = "Port for exposing react dev server"
  type        = number
  default     = 3333
}

variable "http_port" {
  description = "Port for exposing nginx production server"
  type        = number
  default     = 80
}

variable "https_port" {
  description = "Port for exposing traefik SSL endpoint"
  type        = number
  default     = 443
}

variable "ec2_ami" {
  description = "Selected AMI for vm's image"
  type        = string
  default     = "ami-080e1f13689e07408"
}
