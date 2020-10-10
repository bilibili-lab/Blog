# 变量

## 变量名称
- 可以变化的量。
- 变量名和等号之间不能有空格。
- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
- 变量的长度不得超过`255`个字符。
- 变量默认类型是字符串。
- 不能使用bash里的关键字。
- 不能使用标点符号。

## 变量分类
- 字符串
- 整形
- 浮点型
- 日期型

## 用户自定变量

### 定义变量

- 变量名=变量值

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# name="qianduan"
```
### 输出变量

- `echo` 变量名

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $name
qianduan
```

### 默认都是字符串
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# a=1
[root@iZm5eeens8iab3xz6f0rfiZ ~]# b=2
[root@iZm5eeens8iab3xz6f0rfiZ ~]# c=3
[root@iZm5eeens8iab3xz6f0rfiZ ~]# d=$a+$b+$c
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $d
1+2+3
```
### 引用其他变量

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# name="qianduan"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# myname="$name"_qiandaun  #或者使用 $(name)
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $myname
qianduan_qiandaun
```

### set

- 查询系统中默认所有已经生效的变量。 包括系统变量和自定义变量。

```sh{1-3}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# name="qianduan"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# set | grep name
name=qianduan
```
### unset
删除变量

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~] unset name
```
## 环境变量

- 环境变量是全局变量，而自定义变量是局部变零。
- 自定义变量会在当前的`shell`中生效。 而全局变量会在当前的`shell`以及子`shell`中生效。
- 这种变量主要保护的系统操作环境相关数据。
- 变量可以自定义， 但是系统变量生效的换将变量和变量作用是固定的。

```sh
bash
pstree
```

### 自定义环境变量
```sh
# export 变量名=变量值
[root@iZm5eeens8iab3xz6f0rfiZ ~] export envname=prod
```

### env
- 仅仅用来查看环境变量， 而看不到本地变量。

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# env
XDG_SESSION_ID=973
HOSTNAME=iZm5eeens8iab3xz6f0rfiZ
TERM=xterm-256color
SHELL=/bin/bash
HISTSIZE=1000
SSH_CLIENT=118.31.243.108 13245 22
SSH_TTY=/dev/pts/0
USER=root
...
XDG_RUNTIME_DIR=/run/user/0
_=/usr/bin/env
```

### 常用的环境变量

|  变量名 | 含义 | 
| ---  |  --- |  --- |
| HOSTNAME   | 主机名 | 
| SHELL      | 当前的`SHELL`| 
| TERM       | 终端环境| 
| HISTSIZE   | 历史命令条数| 
| SSH_CLIENT | 当前操作系统如果是用SSH链接的话，这里会记录客户端的IP| 
| SSH_TTY    | SSH链接的终端| 
| USER       | 当前登录的用户| 

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $HOSTNAME
iZm5eeens8iab3xz6f0rfiZ
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $SHELL
/bin/bash
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $TERM
xterm-256color
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $HISTSIZE
1000
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $SSH_CLIENT
118.31.243.108 13245 22
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $SSH_TTY
/dev/pts/0
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $USER
root
```


### $PATH
- 系统搜索路径
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```
如果想把一个自定义的脚本直接可以执行有两种方式
- 把这个文件拷贝到目标目录。
- 把脚本所在的目录添加到环境变量中的`$PATH`的路径。

### $PS1

用来自定义命令提示符,如 `[root@iZm5eeens8iab3xz6f0rfiZ ~]# `。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $PS1
[\u@\h \W]\$
[root@iZm5eeens8iab3xz6f0rfiZ ~]# 
```
|  变量 | 提示符 | 
| ---  |  --- |  --- |
| \d   | 显示日期，格式为`星期 月 日` | 
| \H   | 完整的主机名| 
| \t   | 24小时制时间，格式为`HH:MM:SS`| 
| \A   | 24小时制时间，格式为`HH:MM`| 
| \u   | 显示当前用户名| 
| \w   | 显示所在完整名称| 
| \W | 显示所在目录的最后一个目录| 
| \S | 提示符，`root`为`#`,普通用户为`$`| 

### 语系环境变量

- 查询当前系统语系。

- 在`Linux`中通过`locale`来设置程序运行的不同语言，`locale`由`ANSU C`提供支持，`locate`的命令规则 `<语言>_<地区><字符集编码>` 如`zh_CN.UTF-8`,`zh`代表中文，`CN`代表大陆地区，`UTF-8`代表字符集。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# locale
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=

[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $LANG
en_US.UTF-8

# 临时生效
[root@iZm5eeens8iab3xz6f0rfiZ ~]# locale LANG=zn_cn.utf-8

# 永久生效，修改配置文件，下次开机后生效
# 如果文件不存在，可以手动生成该文件
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/sysconfig/i18n
```

### 中文支持

- 图形界面可以支持中文。

- 第三方工具比如`XSHELL`语系设置正确可以支持中文。

- 虚拟机中纯字符界面不支持中文。

## 位置参数变量
- 这种变量主要是用来向脚本当中传递参数或者数据的，变量名不能自定义，变量作用是固定的。

|  位置参数变量 | 作用 | 
| ---  |  --- |  --- |
| $n   | `n` 为数字， `$0`代表命令本身，`￥1-9`代表第`1`到`9`个参数，`10`以上的参数需要用大括号包含，如`${10}` | 
| $*   | 这个变量代表命令所有参数，`$*`把所有的变量看成一个整体。| 
| $@   | 这个变量代表命令行所有参数，不过`$@`把每个参数进行区分。| 
| ￥#  | 这个变量代表命令行所有参数个数。| 
```sh
# shell.sh
#!/bin/bash
num1=$1
num2=$2
sum=$((num1+num2))
echo $sum


# 执行shell
[root@iZm5eeens8iab3xz6f0rfiZ ~]# sh shell.sh 2 4
6
```

```sh
#!/bin/bash
for i in "$@"
  do
    echo "i=$i"
  done
```

## 预定义变量
- 是脚本中已经定义好的变量，变量名不能自定义, 变量值也是固定。

|  位置参数变量 | 作用 | 
| ---  |  --- |  --- |
| $？  |  最后一次执行的命令的返回状态，`0`表示正确执行，非`0`表示不正确执行。  | 
| $$   |  当前进程的进程号（PID） | 
| $!   |  后台运行的最后一个进程（PID）  | 

## read
- 命令用于从标准输入读取数值。
```sh
read [选项] [变量名]
```
|  位置参数变量 | 作用 | 
| ---  |  --- |  
| -p   |  提示信息，在等待`read`输入时，输出提示信息。 |  
| -t   |  秒数，`read`命令会一直等待用户输入，使用此选项可以指定等待时间。 | 
| -n   |  字符数，`read`命令只能接受指定的字符数，就会执行  | 
| -s   |  隐藏输入数据，适用于机密信息输入。  | 
