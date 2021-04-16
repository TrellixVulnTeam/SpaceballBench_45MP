# Nesting tut
> https://ubuntu.com/blog/nested-containers-in-lxd


-- search images
> sudo lxc image list images: archlinux amd64 

-- list images 
> sudo lxc list

https://linuxcontainers.org/lxd/getting-started-cli/#images

-- launch arch
> sudo lxc launch images:archlinux \<name>


# Errors :

## Error: Failed to run: /usr/bin/lxd forkstart tstd /var/lib/lxd/containers /var/log/lxd/tstd/lxc.conf: Try `lxc info --show-log local:tstd` for more info

```
https://discuss.linuxcontainers.org/t/solved-arch-linux-containers-only-run-when-security-privileged-true/4006/4
```

> sudo umount /var/lib/lxd/storage-pools/default/containers/tst/rootfs




## Error: Error deleting storage volume: Failed to remove '/var/lib/lxd/storage-pools/default/containers/tst': unlinkat /var/lib/lxd/storage-pools/default/containers/tstd/rootfs: device or resource busy

- ex. /var/lib/lxd/storage-pools/default/containers/tstd/rootfs: device or resource busy
    - for "tstd" container
- desc :
    - cant delete containers storage volume bcz its mounted

> cat /etc/mtab                                                       
```
...
lxcfs /var/lib/lxcfs fuse.lxcfs rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other 0 0
/var/lib/lxd/storage-pools/default/containers/tstd/rootfs /var/lib/lxd/storage-pools/default/containers/tstd/rootfs shiftfs rw,relatime,mark,passthrough=3 0 0
binfmt_misc /proc/sys/fs/binfmt_misc binfmt_misc rw,nosuid,nodev,noexec,relatime 0 0
tmpfs /var/lib/lxd/shmounts tmpfs rw,relatime,size=100k,mode=711,inode64 0 0
tmpfs /var/lib/lxd/devlxd tmpfs rw,relatime,size=100k,mode=755,inode64 0 0
```

> sudo umount /var/lib/lxd/storage-pools/default/containers/tstd/rootfs

might help 
https://stackoverflow.com/questions/42678979/how-to-remove-default-lxd-storage