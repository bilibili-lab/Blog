
# 配置IP地址

## ifconfig临时配置IP

- 查看与配置网络状态。

- 临时设置`eth0`网卡的`IP`地址与子网掩码。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.29.251.46  netmask 255.255.0.0  broadcast 172.29.255.255
        ether 00:16:3e:05:cd:73  txqueuelen 1000  (Ethernet)
        RX packets 155722  bytes 89048715 (84.9 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 101955  bytes 19149881 (18.2 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```sh
ifconfig eth0 172.29.251.46 newmask 255.255.0.0
```

## sethup永久配置IP

```sh
setup
servie newwork restart
```