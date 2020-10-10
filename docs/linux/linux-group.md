---
sidebarDepth: 3
---

# 用户和用户组

* 使用操作系统的人都是用户。
* 用户组是具有相同系统系统权限一组用户。

## 配置文件

### `/etc/group`

* `/etc/group` 存储当前系统的所有用户组信息。
* `root` 组编号为 `0` 。
* `1-499` 系统预留编号，预留编号给安装和服务的。
* 用户手动创建的用户组从 `500` 开始。
* 组密码占位符都是 `x` 。
* 如果组内只有一个用户，而且用户名和组名相同的话，可以省略用户名。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/group
root:x:0:
bin:x:1:
daemon:x:2:
```

| 含义     | 含义 |         
| :--------- | :-- | 
| root   |  组的名称       |     
| x      |  密码占位符     |   
| 0      |   组编号        | 
| root   |   组中用户名列表 | 

### `/etc/gshaow`

* 存放了当前系统中用户组的密码信息。
* 和 `/etc/group` 中记录一一对应。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/gshadow
root:::
bin:::
daemon:::
sys:::
```

| 含义     | 含义 |         
| :--------- | :-- | 
| root   |  组的名称。      |     
|      |  组的密码，*为空。     |   
|       |  组的管理者，为空表示都可以管理这个组。        | 
|      |  组中用户名列表 | 

### `/etc/passwd`

* 存储当前系统中所有用户的信息。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
```

| 含义     | 含义 |         
| :--------- | :-- | 
| root   |    组的名称        |     
| x      |    密码占位符       |   
| 0      |    用户编号         | 
| 0      |     用户组的编号      | 
| root      |  用户注释信息      | 
| /root     |  用户主目录|
| /bin/bash     |  shell类型      | 

### `/etc/shadow`

* 存放当前系统中所有用户的密码信息。


``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/shadow
root:password:18517:0:99999:7:::
```

| 含义     | 含义 |         
| :--------- | :-- | 
| root   |  用户名。       |     
| password |  单项加密后的密码。   |   
| 18517      |  修改日期， 这个表示上一次修改密码的日期与1970-1-1 相距的天数密码不可修改的天数。 假如这个数字是`8` ,则表示`8`天内不可改。  如果是`0`, 表示随时都可以改。    | 
| 0   |   这个表示上一次修改密码的日期与1970-1-1 相距的天数密码不可修改的天数。 假如这个数字是`8` ,则表示`8`天内不可改。  如果是`0`, 表示随时都可以改。 | 
| 99999 | 如果是`99999`则永远不用改，如果是其他其他数字，比如`12345`,那么必须在距离1970-1-1的`12345`天内修改密码，否则密码失效。 |
| 7 | 修改期限前`N`天发出警告。 |
|   | 密码修改过期宽限天数 。|
|   | 账号失效日期。 |
|   | 保留：被保留项，暂时还没有被用上。 |

## 用户命令

### whoami
显示登录的用户名。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# whoami
root
```

### id
显示指定用户信息，包括用户编号，用户名，主要组的编号及名称，附属组列表。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# id root
uid=0(root) gid=0(root) groups=0(root)
```
### groups
显示用户所在所有的用户组。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# groups root
root : root
```
### finger
显示用户的详细资料。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# finger root
Login: root                             Name: root
Directory: /root                        Shell: /bin/bash
On since Sat Sep 26 16:38 (CST) on pts/0 from 115.31.243.172
   4 seconds idle
No mail.
No Plan.
```


## 用户和用户组的操作

### 添加用户组
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# groupadd qiadduan
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/group
qianduan:x:1000:
```

### 修改用户组名称
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# groupmod -n houdian qiandaun 
```

### 修改用户组编号
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# groupmod -g 666 houdian
```

### 创建分组并指定编号
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# groupadd -g 666 houdian
```
### 删除用户组
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# groupdel  houdian
```

### 添加用户
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# useradd  test
```

### 修改用户注释
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# usermod -c boss  test
```

### 修改用户名

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# usermod -l test1  test
```

### 指定个人文件夹

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# usermod -d /home/test  test
```

### 修改用户组

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# usermod -g quanduanzu test
```

### 删除用户

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# userdel  test
```
### 用户设置密码
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# passwd  1111
```

### 锁定用户密码

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# passwd  -l qiandaun
```
### 解锁用户密码

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# passwd  -u qiandaun
```
## 主要组和附属组

-  用户可以同属属于多个组，一个主要组和多个附属组。
-  一个用户创建的文件属于主要组。

