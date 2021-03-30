from libs import CreateDepl, DeplController
import time

#  kubectl exec -it --namespace default ubuntu-64889d6897-fvnd9 bash

# to deploy :
#  - pods
#  - service (ClusterIP)
#  - service (NodePort) -- if needed

# depl settings :
# depl_name = "<<name>>"
# container_name  = "<<name>>"
# image = "<<image>>"
# label =  {"<<name>>" : "<<name>>"}
# container_port = <<int>>

# CreateService
# settings :
# svc_name = "<<name>>"
# type  = "<<name>>" , supported values: "ClusterIP", TODO "NodePort"
# label =  {"<<name>>" : "<<name>>"}
# selector =  {"<<name>>" : "<<name>>"}
# ports = [[x,y],[x,y],....]
#    x - port
#    y - target port

depl_controller = DeplController.DeplController()

nginx_depl_settings = {
    "depl_name": "nginx",
    "container_name": "nginx-c",
    "image": "nginx:1.15.4",
    "label": {'app': 'nginx'},
    "container_port": 80,
    "command": None,
}

ubuntu_depl_settings = {
    "depl_name": "ubuntu",
    "container_name": "ubuntu-c",
    "image": "ubuntu",
    "label": {'app': 'ubuntu'},
    "container_port": 80,
    "command": ["/bin/sleep", "3650d"]
}

nginx_svc_settings = {
    "svc_name": "nginx-svc",
    "type": "ClusterIP",
    "label": {'svc': 'nginx-svc'},
    "selector": {'app': 'nginx'},
    "ports": [[80, 80]]
}

nginx_svc_np_settings = {
    "svc_name": "nginx-svc-np",
    "type": "NodePort",
    "label": None,
    "selector": {'svc': 'nginx-svc'},
    "ports": [[80, 80]]
}

nginx_depl = CreateDepl.CreatePod(nginx_depl_settings)
ubuntu_depl = CreateDepl.CreatePod(ubuntu_depl_settings)
nginx_svc = CreateDepl.CreateService(nginx_svc_settings)
nginx_svc_np = CreateDepl.CreateService(nginx_svc_np_settings)

depl_controller.create_depl(nginx_depl)
depl_controller.create_depl(ubuntu_depl)
depl_controller.create_svc(nginx_svc)
depl_controller.create_svc(nginx_svc_np)

time.sleep(120)

depl_controller.delete_svc("nginx-svc-np")
depl_controller.delete_svc("nginx-svc")
depl_controller.delete_depl("nginx")
depl_controller.delete_depl("ubuntu")

