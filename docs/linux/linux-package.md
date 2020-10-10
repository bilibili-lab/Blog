# 介绍

`RPM` 是 `Red-Hat Package Manager` （ `RPM` 软件包管理器）的缩写。

## 软件包的分来

1. 源码包

   需要经过编译，把人所编写的源代码编译成机器语言才能运行。

    - 优点
        - 开源免费。
        - 可以自由配置功能。
        - 编译安装更适合的系统，更稳定。
        - 卸载方便。

    - 缺点
        - 安装过复杂。
        - 编译过程长。
        - 安装一旦报错，非常难以排查。

2.  二进制包

    把源代码编程生成 `0/1` 二进制， `RPM` 包,系统默认的安装包。

    - 优点 
        - 包管理系统比较简单， 只要通过简单的命令就可以实现包的安装、升级、查询和卸载。
        - 安装过程速度比源码包快。

        

    - 缺点
        - 经过编译不能看到源代码。
        - 功能选择不灵活。
        - 依赖性比较麻烦。

3.  脚本安装包

    把复杂的安装过程写成脚本， 可以一键安装。 本质上安装的还是源代码。

    - 优点
        - 安装简单。
    - 缺点
        - 失去了自己定义。

      

<!-- ## RPM 命令管理 -->

## RPM 包命名规则

规则: `name-version-release.arch.rpm`
例如: `httpd-2.2.15-15.el6.contos.i686.rpm`
* `httpd` 软件包名

* `2.2.15-15` 软件版本

* `15` 软件发布次数

* `el6.contos` 适合 `Linux` 平台

* `i686` 适合的硬件平台

* `rpm` 包的扩展名

## RPM 包依赖性

* 树形依赖 `a > b > c`

* 环形依赖 `a > b > c > a`

* 模块依赖 [http://rpmfind.net/](http://rpmfind.net/)

## RPM 包全名

* 如果操作的是没有安装过额软件包， 使用**包全名**，而且要注意路径正确。

* 如果是要操作已经安装的软件包时，要使用**包名**，是搜索 `/var/lib/rpm` 中的数据库。

## RPM 安装

安装时候应该先安装依赖, 在安装本身。以 `so` 结尾为模块。

* `rpm -ivh` 包全名
* 选项

   - `i` 安装 `install` 的缩写
   - `v` 安装 `verbose` 的缩写
   - `h` 安装 `hash` 的缩写
   - `--nodeps` 不检测依性，正式环境不能使用。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# rpm -ivh httpd-2.4.6-67.el7.centos.x86_64.rpm
```

## RPM 包升级

* `rpm -uvh` 包全名

* 选项

   - `u` 升级 `upgrade` 的缩写

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# rpm -uvh httpd-2.4.6-67.el7.centos.x86_64.rpm
```

## RPM 卸载

* `rpm -e` 包名
* 选项

   - `e` 升级 `erase` 的缩写
   - `--nodeps` 不检测依性。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# rpm -e httpd
```

## RPM 查询

|  命令 | 参数 |  说明 |
| --------- | --- |  --- |
| rpm -q   包名    | `q` 是 `query` 的缩写    |   查询包是否安装 |
| rpm -qa  包名    | `a` 是 `all` 的缩写      |   查询所有已经安装的 `RPM` 包 |
| rpm -qa  包名    | `i` 是 `infomation` 的缩写 |  查询软件信息 |
| rpm -qip 包名    | `p` 是 `package` 的缩写 |  查询未安装包的信息 |
| rpm -ql  包名   | `l` 是 `list` 的缩写 | 查询安装包都安装了哪些文件 |
| rpm -qf          | `f` 是 `file` 的缩写 | 查询某个文件属于哪个包 |
| rpm -qR          | `R` 是 `requies` |  查询软件包的依赖性 |

默认安装位置
|  命令 | 参数 |  
| ---------         | --- |  
|  /etc/            |   配置文件的安装目录   |   
| /usr/bin          |   可执行文件的安装目录   |  
| /usr/lib          |   程序所使用的函数库保存的位置   |  
| /usr/share/doc    |   基本软件的使用手册保存位置    |  
| /usr/share/man    |   帮助文件的保存位置   |  

## RPM 检验

* `rpm -V 包名` 。

* 只有校验失败的文件才被列出，没有列出的文件应该是完好无损的。

``` sh
# 以 sendmail 为例
[root@iZm5eeens8iab3xz6f0rfiZ ~]# rpm -V sendmail
S.5....Tc/etc/aliases
missing/etc/mail/ip_allow
S.5....Tc/etc/mail/relay_allow
S.5....Tc/etc/sendmail.cf
S.5....Tc/etc/sendmail.cw
S.5....T/usr/sbin/sendmail
S.5....T/var/log/sendmail.st
```

|  参数 |  含义 |  
| ---------         | --- |  
|  S(Size)          |   文件的大小是否发生变化   |   
|  M(Mode)          |   文件的类型或者文件的权限是否发生变化   |  
|  5(Md5)           |   文件的 `MD5` 校验和是否发生了变化（文件的内容是否改变）   |  
|  D(Device)        |   设备的主从代码是否是否发生变化   |  
|  L(Location)      |   文件的路径是否发生变化   |  
|  U(User)          |   文件的属性（所有者）是否发生变化 |   
|  G(Group)         |   问价的所属租是否发生变化 |   
|  T(Group)         |   文件的修改时间是否发生变化 |   

每个设备又分为主设备号和次设备号，主设备号用来区分不同种类的设置。而次设备号用来区分同一类型的多个设备。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ll /dev | grep vda
brw-rw---- 1 root disk    253,   0 Sep 14 10:20 vda
brw-rw---- 1 root disk    253,   1 Sep 14 10:20 vda1
```

|  参数 |  含义 |  
| ---------  | --- |  
| c(config file)          |   配置文件   |   
| d(documentsation)       |   普通文档   |  
| g(ghost files)          |   文件根本不应该属于这个软件包   |  
| L(license files)        |   授权文件   |  
| r(readme)               |   描述文件   |  

## RPM 文件提取

* `rpm2cpio` 包全名 | `cpio -idv` 文件的绝对路径

* `rpm2cpio` 将 `rpm` 包转为 `cpio` 格式的命令。

* `cpio` 是一个标准工具，用于创建软件档案和从档案文件中提取文件。

* `cpio` 选项 < [文件|设备]

   - `-i copy-in` 模式，还原。

   - `-d` 还原时自动刷新目录。

   - `-v` 显示还原过程。
