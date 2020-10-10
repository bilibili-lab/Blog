# YUM在线管理

- `yum` 是`Yellow dog Updater Modified`主要功能是更方便的添加、删除、更新`RPM`包，它能自动解决包的依赖性问题。

- 这个是`rpm`包的在线管理命令。

- 将所有的软件包名放到官方服务器上，当进行`YUM`在线安装时，可以自动解决依赖性问题。

- `/etc/yum.repos.d/`

   - CentOS-Base.repo

   - CentOS-Debuginfo.repo

   - CentOS-Media.repo

   - CentOS-Vault.repo


## CentOS-Base.repo
```sh
[base]
name=CentOS-$releasever - Base
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
baseurl=https://mirrors.ustc.edu.cn/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
```

|字段 | 含义|
|--|--|
| base       | 容器名称 ，一定要放在[]中。|
| name       | 容器说明，可以自己随便写。 |
| mirrorlist | 镜像站点，可以注释掉。 |
| baseurl    | YUM 源服务器的地址， 默认是`CentOS`官方的`YUM`源。 |
| enable     | 此容器是否生效 不写或者写成 enable=1 表示生效，写成ebable=0表示不生效。 |
| gpgcheck   |  如果是 1 就是指 `RPM`的数字证书生效，如果是 0 则表示不生效。 |
| gpgkey     | YUM 源服务器的地址， 默认是`CentOS`官方的`YUM`源 |

## 光盘搭建YUM源

### 1.挂载光盘

```sh
mkdir /mnt/cdrom
mount /dev/cdrom/mnt/cdrom
```

### 2.失效在线YUM源

```sh
cd /etc/yum.repos.d
mv CentOS-Base.repo CentOS-Base.repo.bak
```
查看`YUM`源里有哪些包

```sh
yum list
```

ContOS-Media.repo
```sh
[c6-media]
name=CentOS-$releasever - Media
baseurl=file:///mnt/cdrom
gpgcheck=1
enable=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6
```


## YUM命令

- `yum`安装只需要写包名即可。

|<div style="width:200px">命令</div> | 含义|
|--|--|
| yum list               | 查询所有可用软件包列表 。|
| yum search 关键字       | 搜索服务器上所有和关键字相关的包 。|
| yum - y search 包名     | -y 自动回答yes install安装。|
| yum - y update 包名     | -y 自动回答yes update升级。|
| yum - y remove 包名     | -y 自动回答yes remove 卸载，卸载有依赖性，所以尽量不要卸载 。|
| yum grouplist           |  列出所有可用的软件组列表。|
| yum groupinstall 软件组名  | 安装指定组，组名可以用 grouplist 查询。|
| yum groupremove  软件组名  | 卸载指定软件组。|

```sh 
yum -y install gcc       # 安装 c 语言安装包
yum install update httpd # 升级httpd
```

