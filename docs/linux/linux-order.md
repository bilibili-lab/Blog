---
sidebarDepth: 5
---
#  Linux 常用命令

## 命令提示符

``` bash
[root@iZm5eeens8iab3xz6f0rfiZ ~]#
```

* `root` 代表当前的登录的用户。

* `iZm5eeens8iab3xz6f0rfiZ` 主机名。

* `~` 当前的工作目录， 默认是当前的家目录。 root用户就是 `/root` 。

* 提示符  超级用户是 `#` , 普通用户是 `$` 。

## 命令格式

* 命令 [options] [argv]

* 当有多个选项时， 可以写在一起。

* 一般参数有两种写法完整和简化写法 `-a` 和 `--all` 。

## 常用命令

### clear

* 用于清除屏幕。 

### pwd

* `print work directory` 的缩写。

*  显示当前工作目录。

``` bash
[root@iZm5eeens8iab3xz6f0rfiZ ~]# pwd
/root
```

### cd

* `change directory` 的缩写。

*  切换当前工作目录。

* `~` 家目录。

* `.` 当前所在的目录。

* `..` 当前目录位置的上一层目录。

*  按 `TAB` 键可以补全命令和目录。

* 相对路径是相对当前所在的目录。

* 绝对路径是从根目录开始。

``` bash
# 切换到家目录
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cd nginx-1.10.1/
[root@iZm5eeens8iab3xz6f0rfiZ nginx-1.10.1]# pwd
/root/nginx-1.10.1
[root@iZm5eeens8iab3xz6f0rfiZ nginx-1.10.1]# cd ~
[root@iZm5eeens8iab3xz6f0rfiZ ~]# 

## 切换到上一级目录

[root@iZm5eeens8iab3xz6f0rfiZ ~]# cd nginx-1.10.1/
[root@iZm5eeens8iab3xz6f0rfiZ nginx-1.10.1]# cd ..
[root@iZm5eeens8iab3xz6f0rfiZ ~]# 
```

### ls

* `list files` 的缩写。

* 查询目录中的内容。

* ls [options] [文件或者目录]。

常用 `options`
  + -a 显示所有的文件，包括隐藏的文件。 隐藏文件以 `.` 开头。

  + -l 显示文件的详细信息。

以 `ls -al` 为例

``` bash
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ls -al
dr-xr-x---. 11 root root 4096 Sep 14 23:41 .
dr-xr-xr-x. 18 root root 4096 Sep 12 22:10 ..
-rw-------   1 root root 6912 Sep 15 21:55 .bash_history
-rw-r--r--.  1 root root   18 Dec 29  2013 .bash_logout
-rw-r--r--.  1 root root  176 Dec 29  2013 .bash_profile
-rw-r--r--.  1 root root  176 Dec 29  2013 .bashrc
drwxr-xr-x   3 root root 4096 Jul 11  2019 .cache
drwx------   3 root root 4096 Sep 14 10:11 .config
-rw-r--r--.  1 root root  100 Dec 29  2013 .cshrc
drwxr-xr-x   9 1001 1001 4096 Sep 12 22:28 nginx-1.10.1
drwxr-xr-x   5 root root 4096 Sep 14 10:14 .npm
```

说明

| dr-xr-xr-x | . | 1 | root | root | 4096 | Sep 14 23:41 |.bash_profile| 
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | 
| 文件的类型和权限  |  ACL权限  |   硬链接引用数| 所有者 |所有组|文件的大小|最后修改时间 | 文件名 |

### mkdir

* `make directory` 的缩写。

* 用于创建目录。

常用 `options`
 - `-p` 递归创建目录

```sh

# 创建 test 的文件夹

[root@iZm5eeens8iab3xz6f0rfiZ ~]# mkdir  test

# 在 test 文件夹下创建 qianduan 的的文件夹，如果 test 文件不再将会报错。

[root@iZm5eeens8iab3xz6f0rfiZ ~]# mkdir  test/qiandaun
mkdir: cannot create directory ‘test/qiandaun’: No such file or directory

# 加上 -p 参数，可以进行递归创建目录。

[root@iZm5eeens8iab3xz6f0rfiZ ~]# mkdir -p test/qiandaun

``` 

### rmdir

* `remove directory` 的缩写。

* 删除目录。

* `rmdir` 只能删除空的目录

```bash
root@iZm5eeens8iab3xz6f0rfiZ ~]# rmdir test 
rmdir: failed to remove ‘test’: Directory not empty
```

### rm

* `remove` 的缩写。

*  用于删除一个文件或者目录。

常用 `options`
* `-f` 强制删除，不进行询问。

* `-r` 该目录下的所有目录和文件进行递归删除。

### cp

* `copy file` 的缩写。

*  用于复制文件或目录。

* copy [options] [原文件或者目录] [目标文件]

常用 `options`

### mv

* `move file` 的缩写。

* `mv` 的两个作用：

    - 目录或者文件夹更改名字。

    - 目录或者文件夹进行移动。

* mv [options] [原文件或者目录] [目标文件或者目录]

### alias

命令别名功能将这个过程简单化。系统中已经定义了一些命令别名，要查看已经定义的命令别名，可以使用 `alias` 命令。
```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# alias
alias cp='cp -i'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l.='ls -d .* --color=auto'
alias ll='ls -l --color=auto'
alias ls='ls --color=auto'
alias mv='mv -i'
alias rm='rm -i'
alias which='alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde'

``` 
**自定义别名**

* 格式: alias 别名=小名

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# alias mycat=cat
[root@iZm5eeens8iab3xz6f0rfiZ ~]# alias
alias mycat='cat'
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat shell.sh 
#!/bin/bash
echo -e "\e[43;35m Linux\e[0m hello word"

// 删除别名
[root@iZm5eeens8iab3xz6f0rfiZ ~]# unalias mycat
```

**定义别名永久生效**
 
由于自定义别名是临时生效, 系统重启后将不能再使用。可以如下三步永久生效。

```sh
// 第一步
[root@iZm5eeens8iab3xz6f0rfiZ ~]# vi ~/.bashrc

// 第二步
alias mycat='cat'

// 第三步
[root@iZm5eeens8iab3xz6f0rfiZ ~]# source ~/.bashrc

``` 

### history

**`history` 的作用是显示或操纵历史列表。**

* 至于本次登录的命令暂时存储在内存中，注销成功后会写入文件中。

* 命令保存在 `.bash_history` 中。

* 默认命令记忆可达 `1000` 个。

* 修改保存 `history` 的个数，可在 `/etc/profiles  HISSIZE=2000 `
常用 `options`
* `-c` 清空历史命令。

* `-w` 把缓存中的历史命令写入历史文件中。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# history
1   MAKRER=SHOW_LOCALE;printf $MAKRER""; locale; MAKRER=SHOW_LOCALE;printf $MAKRER"";
2   CHECK_TYPE=SHELL; echo "INFO=${CHECK_TYPE} PID=$$ PPID=$PPID TTY=$(tty) SHELL=$0 HOME=$HOME PWD=$PWD| CHECK_SHELL_END"
3   CHECK_TYPE=SHELL; echo "INFO=${CHECK_TYPE} PID=$$ PPID=$PPID TTY=$(tty) SHELL=$0 HOME=$HOME PWD=$PWD| CHECK_SHELL_END"
4   CHECK_TYPE=SHELL; echo "INFO=${CHECK_TYPE} PID=$$ PPID=$PPID TTY=$(tty) SHELL=$0 HOME=$HOME PWD=$PWD| CHECK_SHELL_END"
5   ls -al
6   yum install zlib
7   yum install openssl
```

**调用历史记录**

*  使用 `上` 、 `下` 箭头调用以前的历史命令。

*  使用 `!n` 重复执行第 `n` 条历史命令。

*  使用 `!!` 重复执行上一条命令。

*  使用 `!字符` 重复执行最后一条以该字符开始的命令。

### wc

`wc` 命令的功能为统计指定文件中的的 `行数、字数、字节数` , 并将统计结果输出。

常用 `options`
* `-c` 只显示 Bytes 数。

* `-l` 或 `--lines` 只显示行数。

* `-w` 或 `--words` 只显示字数。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# wc .bashrc
 12  32 193 .bashrc  #文件行数为12、单词数32、字节数193
```

### ln


- ln（link files）的缩写，链接命令，生成链接文件。

#### 硬链接的特征

- 拥有相同的节点和存储`block`块， 可以看做是同一个文件。

- 可以通过`i`节点访问。

- 不能跨分区。

- 不能针对目录使用。

- 一般不使用。

#### 软链接的特征

- `ln - s [y源文件] [目标文件]`

  - `-s`创建软链接。

- 类似`window`的快捷方式。

- 软连接拥有自己的`i`节点和`Block`块， 但是数据中只保存源文件的文件名和`i`节点号， 并没有实际的文件和数据。

- `lrwxrwxrwx` `l` 是软链接，软链接的文件权限是`777`。

- 修改任意一个文件，另一个都会改变。

- 删除源文件， 软链接不能使用。

- 软链接源文件必须是绝对路径。




- 

## 文件查看命令

### cat

- `cat`命令用于链接文件并打印到输出设备上。

```sh
cat [-AbeEnstTuv] [--help] [--version] fileName
```
常用选项

- -n 或 --number：由 1 开始对所有输出的行数编号。


### more

- `Linux more` 命令类似于 `cat`, 不过会以一页一页形式显示，方便使用者逐页阅读，而最基本的指令就是按空格键`space`，往下一页，按`b (back)`就会返回一页显示，而且还有搜索搜索功能（与 `vi`相似），使用中的说明文件，请按`h`。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# more fileName
```

### head

- 用来显示开始某个数量的文件区块。

- 默认显示 `10` 行。

- `-n` 显示的行数。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# head -5 reademe.txt
```


### tail


- 查看文件的内容。

- ` -f` 文件里的最尾部的内容显示在屏幕上，并且不断刷新，只要 `filename` 更新就可以看到最新的文件内容。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tail -f readme.md 
```

## 文件搜索命令

### locate

- 在后台数据库中按文件名搜索，速度比较快。

- 数据库保存在`/var/lib/mlocate`后台数据库，每天更新一次。

- 可以`updatedb`命令立即更新数据库。

- 只能搜索文件名。

- `/etc/updatedb.conf` 建立索引配置文件。
   
   - `PRUNE_BIND_MOUNTS = ”yes“` 全部生效，开启搜索限制。

   - `PRUNEFS` 不搜索的文件文件系统。

   - `PRUNEFNAMES` 忽略的文件类型。

   - `PRUNEFPATHS` 忽略的路径 `/tmp` 。

### whereis

- 搜索命令所在的路径及帮助文档文档所在的位置。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
```

- 常用`options`

  - `-b` 只查找课执行文件。

  - `-b` 只查找帮助文件。

### which

- 在环境变量`$PATH`设置的目录里查找符合条件的文件。

- 可以看到别名。

- 能看到的都是外部安装的命令。

- 无法查看`Shell`自带的命令。如`which cd`


```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# which ls
alias ls='ls --color=auto'
        /usr/bin/ls
```

### find

-  文件搜索命令。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find [搜索范围] [搜索条件]
```
#### 按名称搜索

- 避免大范围的搜索，会非常消耗系统资源。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find / -name aaa.log
```
#### 通配符

- `find` 是在系统当中搜索符合条件的文件名，如果需要匹配，使用通配符匹配，通配符是完全匹配。

- 通配符
   
   - `*`  匹配任意内容。
   - `？`  匹配任意一个字符。
   - `[]`  匹配任意一个中括号内的字符。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find  -name ”ab[cdef]“
```
#### -i

- 不区分大小写
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find / -iname A.log
```
#### -user

- 按所有者进行搜索

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find /root -user root
```

#### 按时间搜搜

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find /nginx/access.log -mtime +5
```
| 参数| 含义 |
| -- | -- | 
| atime |  文件访问时间  | 
| ctime |  改变文件属性  | 
| mtime |  修改文件内容  | 

| 参数| 含义 |
| -- | -- | 
| -5 |  5天内修改的文件  | 
| 5 |  5天前当前修改的文件  | 
| +5 |  5天修改时间  | 


#### 按大小搜索

- `k`小写

- `M`大写

| 参数| 含义 |
| -- | -- | 
| -8k |  小于8k  | 
| 8k |   等于8k  | 
| +8k |  大于8k  | 
| +8M |  小于8M  | 

#### 按i节点搜索

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find . imun 123456
```
####  综合应用

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# find /tem -size  +10k  -a -size -20k
```
- 查找`/etc`目录下，大于`10kb`并且小于`20kb`的文件。

- `-a (and)`逻辑与，两个条件都满足。

- `-o (or)` 逻辑或，两个条件满足一个即可。

## 帮助命令

### 基本用法

- `man` 命令 获取指定命令的帮助。

#### man的级别

- 1 查看命令的帮助。

- 2 查看可以被内核调用的函数的帮助。

- 3 查看函数和函数库的帮助。

- 4 查看特殊文件的帮助。

- 5 查看配置文件的帮助。

- 6 查看游戏的帮助。

- 7 查看其它的帮助。

- 8 查看系统的管理员可用命令的帮助。

- 9 查看和内核相关的帮组。

## 关机和重启命令

### shutdown

* 安全地停止、关机、重启 `Linux` 系统。实现自动定时关机的功能

常用 `options`
* `-c` 取消前一个关机命令。

* `-h` 关机。

* `-r` 重启。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown now
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown 13:20  
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown -p now  #  关闭机器
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown -H now  #  停止机器      
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown -r 09:35 #  在 09:35am 重启机器
```

要取消即将进行的关机

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# shutdown -c

``` 

###  init

* 关机

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# init 0 
```

* 重启

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# init 6

``` 

###  logout

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# logout
```

## 查看登录用户信息

### whoami
用于显示自身用户名称。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  whoami 
root
```
###  id
`id`命令用于显示用户的ID，以及所属群组的ID。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# id root
uid=0(root) gid=0(root) groups=0(root)
[root@iZm5eeens8iab3xz6f0rfiZ ~]# id xxx
id: xxx: no such user
```
### w

查看当前登陆用户信息

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# w
20:11:10 up 6 days,  9:50,  1 user,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             @   IDLE   JCPU   PCPU WHAT
root     pts/0    118.31.243.244   20:10    6.00s  0.00s  0.00s w
```

**第一行信息输出内容**

* `20:11:10` 当前系统时间。

* `up 6 days` 系统运行时长。

* `1 user` 登录用户数。

* `load average: 0.00, 0.01, 0.05` 过去 `1` ， `5` ， `15` 分钟的平均负载信息。值越高，性能越差。


**第二行信息输出内容**

* `USER` 登录用户名。

* `TTY` 登录用户使用的终端名。 `tty1` 为本地终端。 `pts/0 ` 为远程终端。

* `FROM` 登录用户来源的主机名或IP地址。

* `LOGIN@` 用户登录时长。

* `IDLE` 自用户上一次与终端进行交互以来的空闲时间。

* `JCPU` 附加到tty的所有进程使用的时间。

* `PCPU` 用户当前进程所用的时间。

* `WHAT` 用户当前的进程及选项/参数。

### who

查看当前和以前的登陆用户信息
```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# who
root     pts/0        2020-09-20 20:10 (118.31.243.244)
``` 

* `USER` 登录用户名。

* `TTY` 登录用户使用的终端名。 `tty1` 为本地终端。 `pts/0 ` 为远程终端。

* `LOGIN` 登录时间， `IP` 地址。

### last

查看当前登录和过去登录的信息。
```sh{1}
root@iZm5eeens8iab3xz6f0rfiZ ~]# last
root     pts/0        118.31.243.244   Sun Sep 20 20:10   still logged in   
root     pts/0        118.31.243.73    Sun Sep 20 20:10 - 20:10  (00:00)    
root     pts/0        47.96.60.109     Sun Sep 20 09:09 - 14:30  (05:21)    
root     pts/0        47.96.60.212     Sun Sep 20 09:09 - 09:09  (00:00)    
... 
wtmp begins Thu Jul 11 11:10:20 2019
```

### lastlog

查看所有用户的最后登录时间。

```sh{1}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# lastlog
Username         Port     From             Latest
root             pts/0    118.31.243.244   Sun Sep 20 20:10:48 +0800 2020
bin                                        **Never logged in**
daemon                                     **Never logged in**
adm                                        **Never logged in**
...
```

