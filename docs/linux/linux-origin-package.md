# 源码包管理

## 安装方式不同

- `RPM`包的安装位置是由软件包作者决定的，不需要指定安装位置。

- `RPM`包安装的服务可以使用系统服务命令`service`来管理。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  service httpd start
# 或
[root@iZm5eeens8iab3xz6f0rfiZ ~]# /etc/init.d/httpd start
```

- 源码包安装在指定的位置中， 一般是`/usr/local/软件名`。

- 源码包安装的服务不能被服务命令管理器，因为没有安装到 就是默认的路径中，所以只能用绝对路径进行服务管理。

- `httpd`和`apache`关系， 简单理解就是`apache2`以上版本改为`httpd`。

## 安装源码包

### 准备安装

- 安装C语言编译器。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# yum install -y gcc
```

### 安装注意

- 源码包一般放在`/usr/local/src`目录下。

- 软件的安装位置`/usr/local`, 相当于`program files`目录。

- 如何正确定安装过程是否正常

  - 安装过程不能终止。

  - 出现`error warning`等提示。

## 安装过程

### 下载

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wget http://archive.apache.org/dist/httpd/httpd-2.2.11.tar.gz
```

### 解压

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -xzvf httpd-2.2.11.tar.gz
```
### 进入解压目录

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cd httpd-2.2.11
```

### configure

- 定义需要的功能选项。

- 检查系统环境是否符合安装要求。

- 把定义好的功能选项和检测系统环境的信息都写入`Makefile`文件中，用于后续的编辑。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ./configure --prefix=/usr/local/httpd
````

### 编译和安装

- 把源码编译成二进制文件。

- `make`

   - `make clean` 一旦编译报错可以执行这一步进行清理。

- `make install`

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# make
[root@iZm5eeens8iab3xz6f0rfiZ ~]# make install
```
安装帮助文档

```sh
 # 这里可以查看安装说明
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /usr/local/src/httpd-2.2.11/INSTALL

# 这是用 YUM 或者说 RPM 安装的 httpd
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /var/www/html/index.html 

# 这是用源码安装的httpd
root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /usr/lcoal/httpd/httpdoc/index.html 
````

## 源码包的卸载

- 不需要卸载命令，直接删除安装项目即可，不会有任何残留。