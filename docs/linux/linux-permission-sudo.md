

 
# sudo权限

- `root`把本来只有超级管理员可以使用的命令赋予普通用户来使用。

- `sudo` 操作的对象是系统命令。

## visudo

- 通过`visudo`可以由超级用户赋权。

- 实际修改的是`/etc//sudoers`文件。

- 命令必须写绝对路径。

```sh
root  ALL=(ALL) ALL
用户名 被管理主机地址(IP)=(可使用的身份) 授权命令(绝对路径)

somethone ALL=(root) /usr/sbin/useradd  
```

```sh
%wheel ALL=(ALL) ALL
%组名 被管理主机地址(IP)=(可使用的身份) 授权命令(绝对路径)

```

```sh
sudo -l 查看目前的sudo权限
```