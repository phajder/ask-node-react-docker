output "ask_docker_public_ips" {
  value       = aws_instance.ask_docker_ec2.*.public_ip
  description = "Public IPs for ASK docker VMs"
}

output "ask_docker_private_ips" {
  value = aws_instance.ask_docker_ec2.*.private_ip
}
