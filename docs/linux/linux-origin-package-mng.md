# 源码包服务管理

- 使用绝对路径，调用启动脚本来启动。

- 不同的源码包启动脚本不一样。

- 要通过阅读源码包安装说明的方式查看启动的方法。


## 安装Nginx

### root 安装依赖

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# yum install gcc gcc-c++ perl -y
```

### 下载源文件

#### PCRE

-  [官网](http://www.pcre.org/)

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.43.tar.gz
```

#### zlib

-  [官网](zlib.net)

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wget http://prdownloads.sourceforge.net/libpng/zlib-1.2.11.tar.gz
```

#### openssl

-  [官网](https://www.openssl.org/)

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wget https://www.openssl.org/source/openssl-1.0.2n.tar.gz
```
#### nginx

- [官方](http://nginx.org/en/download.html)
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wget http://nginx.org/download/nginx-1.10.1.tar.gz
```

### 解压文件

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -zxvf nginx-1.10.1.tar.gz
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -zxvf openssl-1.0.2n.tar.gz
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -zxvf pcre-8.43.tar.gz
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -zxvf zlib-1.2.11.tar.gz
```


### 配置和安装

```sh

```

### 管理命令

### 自动启动

### service
