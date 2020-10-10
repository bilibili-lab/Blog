

 
# ACL权限

- 访问控制(Access Control Lists),就是为特定用户和用户组分配的特定权限。

- 一个文件夹或者文件只能有一个所有者或者所有组，无法适应某些应用场景。


##  查看分区ACL权限是否开启

- `dumpe2fs` 命令是查询指定分区详细文件系统信息命令.

  -  `-h`仅显示块中的信息，而不是显示磁盘快组的详细信息。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  fdumpe2fs -h /dev/sda1
# 可以通过此选项判断是都支持ACL权限
Default mount options:    user_xattr acl

```


### 临时开启分区的ACL权限
重新挂载根分区，并挂载加入`ACL`权限。

```sh
mount -o remount，acl /dev/sda1
```

### 永久开启分区的ACL权限

```sh
vi /etc/fstab
UUID / ext4 default,acl 1 1
mount -o remount /dev/sda1
```


## 读写ACL权限

### setfacl

- `setfacl [选项] [文件名]`

| 选项     | 含义 |         
| :--------- | :-- | 
| -m   |  设定`ACL`权限。  |     
| -x   |  删除执行的`ACL`权限。 |   
| -b   |  删除所有的`ACL`权限 。  |   
| -d   |  设定默认`ACL`权限。 |   
| -k   |  删除默认的`ACL`权限。 |   
| -R   |  递归设置`ACL`权限。 |   

### setfacl

- 给用户`guest` 赋予`rx`权限。

- 格式`u:用户名:权限`

```sh
useradd guest
mkdir /home/guest/folfer
useradd  teacher
groupadd students
mkdir folder
chown teacher:students /home//guest/folder
chomd 770 /home/guest/folder
```
### 设置最大权限

- `mask` 是最大有效权限，如果给用户赋予了`ACL`权限，是需要和`mask`的权限做与运算后才能得到真正权限。

- 如果`mask`值是`777`,那么任何数与它相与，得到的是权限本身。

- 如果允许自定义`ACL`, 又不想让他超出最大权限。

```sh
setfacl -m m:r folder
[root@iZm5eeens8iab3xz6f0rfiZ /]# getfacl folder
# file: folder
# owner: tach
# group: stus
user::rwx
user:someone:r-x       #effective:r--
group::rwx             #effective:r--
mask::r--
other::r--
```

## 删除ACL权限

### 删除指定用户的`ACL`权限

`setfacl -x u:用户名 文件名`

```sh
setfacl -x u:someone folder
```

### 删除文件所有用户的`ACL`权限

`setfacl -b 文件名`

```sh
setfacl -b folder
```

### 删除指定用户的`ACL`权限

`setfacl -x g 组名 文件名`

```sh
setfacl -x g:students folder
```

### 递归权限

- 向下一级一级传递权限。

- 父目录设置`ACL`权限的时候，所有的子文件和子目录也会拥有相同的`ACL`权限。

- 递归仅能赋值给目录不能赋值给文件。

```sh
setfacl -m u:someone:rx folder
setfacl -m u:someone:rx -R folder

```

### 默认权限

- 默认`ACL`权限是指如果给父目录设置了默认`ACL`权限，那么父目录里所有新建的子文件都会继承父目录的`ACL`权限。

- `set -m d:u:用户名:权限 目录名`

```sh
setfacl -m d:u:someone:rw folder
```