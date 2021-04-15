

apk update

apk add k3s docker
apk add openrc

touch /run/openrc/softlevel

service docker start

echo \
'https://dl-cdn.alpinelinux.org/alpine/v3.13/main
https://dl-cdn.alpinelinux.org/alpine/v3.13/community
http://dl-cdn.alpinelinux.org/alpine/edge/community
http://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories 



apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing minikube

