# 服务管理

## 运行级别



### 运行级别分类

|运行级别| 含义|
|---|---|
| 0 | 关机 |
| 1 | 单用户，类似于Window的安全模式，主要用于系统修复。 |
| 2 |  不完全多用户，类似于字符界面，但不包含NFS(linux和Window进行文件共享）服务。|
| 3 |  完整的命令模式，就是标准字符界面。|
| 4 |  系统保留未使用。|
| 5 |  图形界面。|
| 6 |  启动。|

### 查看上一个级别和当前级别

```sh
[root@iZm5eeens8iab3xz6f0rfiZ lnmp1.7]# runlevel
N 3
```

### 切换运行级别
```sh
[root@iZm5eeens8iab3xz6f0rfiZ lnmp1.7]# init 5
```
### 设置默认运行级别
```sh
[root@iZm5eeens8iab3xz6f0rfiZ lnmp1.7]# vi /etc/inittab
id:3:initdefault:
```

## 服务的分类

- 系统开启的服务越少，服务器就会更加稳定和安全。

- 服务安装方式不同，启动方式也不同。


### 服务管理的方式

- `RPM`包安装的服务，由软件包作者指定安装位置，独立的服务，绝大多数服务都是独立运行在内存中的， 可以直接影响客户端的请求。

- 源码包安装的服务，由我们决定安装位置。


### 查看RPM包安装的服务

```sh
[root@iZm5eeens8iab3xz6f0rfiZ lnmp1.7]# chkconfig --list
```

### 查看源码包安装的服务

- 查看自定义的安装位置，默认`/usr/local`下。

- `usr = Unix System Resource` 系统资源。


### 启动和自启动

- 启动服务就是让此服务在当前系统中运行，并向客户端提供服务。

- 服务启动就是通过设置，让此服务在开机或者重启后随着系统启动而自动停止。


## 服务与端口

- 查看系统中的运行中的进程。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ps -aux
```

- 查看常见服务端口

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/services
```

## 查询系统中监控的端口

- `netstat -tulnp`

|参数| 含义|
|---|---|
| -t | 列出 tcp 数据。 |
| -u | 列出 udp 数据。 |
| -i | 列出正在监听的网络服务。|
| -n | 用端口号显示出服务， 而非服务名。|
| -p | 列出该服务的进程ID|

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# netstat -tulnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      1473/mysqld         
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1494/sshd           
udp        0      0 0.0.0.0:68              0.0.0.0:*                           724/dhclient        
udp        0      0 127.0.0.1:323           0.0.0.0:*                           507/chronyd         
udp6       0      0 ::1:323                 :::*                                507/chronyd   
```