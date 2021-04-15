# [SpaceballBench](https://spaceballs.fandom.com/wiki/Spaceball_I)

## Virtual devices

- ## IoT
    - camera drone [sensor, actuator]
        - "live" mjpeg stream with three.js
        - HTML api for movement & sensors 
    - temperature sensor [sensor] [WIP]
    - servo [actuator] [WIP]

- ## Dew Server [WIP]

- ## KaaS provider [WIP]
    - kubernetes as a service provider
    - 

- ## Device meta manager  
    - HTTP api for deploying/removing virtual devices
    - assigns an ID and returns the URL of the device

- ## Microservices
    - camera drone services :
        - Controller [WIP]
        - Path Creator [WIP]
        - sensor & Video DB [WIP]
    - temperature sensor :
        - sensor DB ? [WIP]
    - servo :
        - controller ? [WIP]

- ## Analytics
    - sidecar reporter
        - CPU/MEM usage -> prometheus
        - Network packets -> loki
            - track HTML packets with special headers 
    - grafana



# Setup

## sysbox - container runtime 

## docker
> cat /etc/docker/daemon.json   
```
{
  "runtimes": {
    "sysbox-runc": {
      "path": "/usr/bin/sysbox-runc",
      "runtimeArgs": ["--no-kernel-check"]
    }
  },
  "default-runtime": "sysbox-runc" 
}
```
### Docker container image 
> https://hub.docker.com/r/nestybox/archlinux-systemd-docker

