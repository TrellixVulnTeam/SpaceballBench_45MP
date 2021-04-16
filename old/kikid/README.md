k8s in k8s in docker && 2 minikubes

https://github.com/nestybox/sysbox/releases/download/v0.3.0/sysbox-ce_0.3.0-0.ubuntu-bionic_amd64.deb

> with https://hub.docker.com/r/nestybox/ubuntu-bionic-systemd-docker TODO use archlinux
```
passwd 
> root

apt-get update -y


# MINIKUBE INSTALL

apt install wget

wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

cp minikube-linux-amd64 /usr/local/bin/minikube

chmod 755 /usr/local/bin/minikube

# KUBECTL INSTALL

curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl

chmod +x ./kubectl

mv ./kubectl /usr/local/bin/kubectl


# ADD docker grp

usermod -aG docker admin

newgrp docker

# USER FOR MINIKUBE (wont work with root)

su admin
# passwd admin



```
