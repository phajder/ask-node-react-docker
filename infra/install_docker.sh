#!/bin/bash

install_debian() {
    export DEBIAN_FRONTEND=noninteractive
    apt-get update && apt-get upgrade -y
    apt-get install -y ca-certificates curl

    install -m 0755 -d /etc/apt/keyrings

    curl -fsSL "https://download.docker.com/linux/${OS_ID}/gpg" -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/${OS_ID} \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update && apt-get install -y \
       git \
       docker-ce \
       docker-ce-cli \
       containerd.io \
       docker-buildx-plugin \
       docker-compose-plugin
    systemctl enable --now docker
}

install_amzn() {
    yum update && yum upgrade -y

    # Install docker
    yum install -y git docker
    systemctl enable --now docker

    # Install docker plugins
    mkdir -p /usr/local/lib/docker/cli-plugins

    curl -sL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) \
      -o /usr/local/lib/docker/cli-plugins/docker-compose

    # Set ownership to root and make executable
    chown root:root /usr/local/lib/docker/cli-plugins/docker-compose
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
}

OS_ID=$(awk -F= '$1=="ID" { print $2 }' /etc/os-release | tr -d '"')

case $OS_ID in
    "debian")
        install_debian
        usermod -aG docker admin
        ;;
    "ubuntu")
        install_debian
        usermod -aG docker ubuntu
        ;;
    "amzn")  # Amazon Linux
        install_amzn
        usermod -aG docker ec2-user
        ;;
    *)
        echo "Unsupported distribution: $OS_ID"
        exit 1
        ;;
esac
