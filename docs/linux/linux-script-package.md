# 脚本安装

- 脚本包安装的也是`RPM`包和源码包。

- 优点

  - 简单快捷方便。

- 缺点

  - 不能定义安装的版本。

  - 不能定义需要的功能。

## nginx

- `nginx`是一款自由的、开源、高性能、的`http`服务器和反向代理服务器。

- `nginx`可以作为一个`HTTP`服务器进行网站的发布处理，另外`Nginx`可以作为反向代理进行负载均衡的实现。

|功能|Apache|  Nginx|
|---|---|---|
|Proxy代理      |非常好      | 非常好 |
|rewirter       |好         | 非常好 |
|rewirter       |好         | 非常好 |
|热部署          |不支持     | 支持 |
|系统压力比较大    |很大      | 很小 |
|稳定性           |好       | 非常好 |
|安全性           |好       | 一般 |
|技术支持           |非常好       | 很少 |
|静态文件处理           |一般       | 非常好 |


## 安装lnmp

- [lnmp](https://lnmp.org/)

- [install](https://lnmp.org/install.html)

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wget http://soft.vpser.net/lnmp/lnmp1.7.tar.gz -cO lnmp1.7.tar.gz && tar zxf lnmp1.7.tar.gz && cd lnmp1.7 && ./install.sh lnmp
```