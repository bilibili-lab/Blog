# 工作管理

- 工作管理就是指的单个登录终端中同事管理多个工作的行为。

- 有时候有些命令会卡主我们操作界面，我们就需要把它放入后台，比如拷贝大型文件。

- 当前终端只能管理当前终端的工作， 而不能管理其他终端工作。

- 放入后台的命令必须是还要持续一段时间，这样我们才能去捕捉和操作这个动作。

- 放入后台的命令不能和前台用户交互或者需要前台输入，否则放入后台只能暂停，不能执行。


## 工作管理方法

### 把进程放入后台

- `&` 在命令后面加可以把命令放入后台，并且在后台运行。

- `ctrl + z` 把工作放在后台暂停。

### 查看后台的工作

- `jobs`

  - `-l` 显示工作的`PID`。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# jobs -l
[1]- 14460 Stopped                 sleep 100s
[2]  15018 Running                 sleep 100s &
[3]+ 15044 Stopped                 sleep 200s
```

- 加号代表最近一个放入后台的工作，也就是工作恢复时默认的工作。

- 减号代表倒数第二个放入后台的工作。

### 恢复到前台

- fg %工作号
  
   - `-%工作号` `%`可以省略,注意工作号和`PID`不同。

### 恢复到后台

- bg %工作号
 
   - `-%工作号` `%`可以省略,注意工作号和`PID`不同。

- 后台恢复执行命令，不能和前台有交互。


## 后台命令脱离终端

- 所有的后台程序默认跟终端绑定，终端消失后程序也退出。

- 当终端退出的时候，系统会向终端里所有的进程发送一个`SIGNHB`的信号，终止后台进程。

### rc.local

- 把所有的后台的命令加入到`/etc/.rc.local`文件中。

### 定时任务

- 使用系统的定时任务， 让系统在指定的时间执行某个后台命令。

### nohub

- 使用`nohub`命令, 脱离终端运行， 本质是忽略`SIGNHB`信号。

- nohub [命令] &




## 系统资源查看

### vmstat

- 借助`vmstat`工具来分析`CPU`统计信息。

- `vmstat(Virtual Memory Statistics 虚拟内存统计)` 用来显示`Linux`系统虚拟内存额状态，也可以报告
进程、内存、`IO`等系统整体运行状态。

- `vmstat [刷新延时 刷新次数]`

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# vmstat 1 3
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 8  0      0 130116 212332 543084    0    0     3     2  175   86  0  0 99  0  0
 0  0      0 129596 212332 543092    0    0     0     0  305  658  2  1 97  0  0
 1  0      0 129596 212340 543088    0    0     0    40  253  582  1  2 97  0  0
```

- procs进程信息字段

| 分类 | 参数 | 含义 |
|---|---|---|
|procs | r | 等待运行的进程数，数量越大，系统就越繁忙。|
|procs | b | 不可召唤的进程数量，数量越大，系统就越繁忙。|

- memory 内存信息

| 分类 | 参数 | 含义 |
|---|---|---|
|memory | swpd  | 使用的`Swap`空间的大小，单位`KB`。|
|memory | free  | 空闲的内存容量，单位`KB`。|
|memory | buff  | 缓冲的内存容量，单位`KB`。|
|memory | cache | 缓存的内存容量，单位`KB`。|

- swap 交换分区的信息

  - 说过说`si`和`so`数越大说明数据经常要在磁盘和内存之间数据交换，系统性能就会越差。

| 分类 | 参数 | 含义 |
|---|---|---|
|swap | si(in)   | 从磁盘中交换到内存中的数据的数量。单位`KB`|
|swap | so(out)  | 从内存中交换到磁盘中的数据的数量。单位`KB`|



- io 磁盘读写

  - `bi`和`bo`数越大，说明磁盘的`I/O`越忙。

| 分类 | 参数 | 含义 |
|---|---|---|
|io | bi（in）   | 从块设备读入数据总量，单位块。|
|io | bo (out)  | 写到块设备的数据额总量，单位块。|

- system 系统信息字段
 
  - `in`和`cs`数越大，说明系统与接口的通信越忙。

| 分类 | 参数 | 含义 |
|---|---|---|
|system | in（interrupt)  | 每秒被中断的进程次数。|
|system | cs (switch)     | 每秒进行的事件切换次数。|

- cpu 信息字段
 
| 分类 | 参数 | 含义 |
|---|---|---|
|CPU | us （user）    | 非内核进程消耗`CPU`的运算时间百分比。|
|CPU | sy （system）  | 内核进程消耗`CPU`的运算时间百分比。|
|CPU | id  (idle)    | 空闲`CPU`的百分比。|
|CPU | wa  (wait)     | 等待`IO`所消耗的`CPU`百分比。|
|CPU | st  (steal)    | 被虚拟机偷走的`CPU`百分比。|

### dmesg

- 开机时内核检测。

```sh
dmesg | grep CPU
```

### free

- 查看内存的使用。

- free [-b | -k | -m | -g]

  - -b 以字节为单位。
  - -k 以KB为单位。
  - -m 以MB为单位。
  - -g 以GB为单位。

`free`指令会显示内存的使用情况，包括实体内存，虚拟的交换文件内存，共享内存区段，以及系统核心使用的缓冲区等。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# free -h
              total        used        free      shared  buff/cache   available
Mem:           991M        126M        125M        460K        738M        680M
Swap:          1.0G          0B        1.0G
```

#### 第一列

-  `Mem` 内存的使用信息。

-  `Swap` 交换空间的使用信息.

#### 第一行

- `total` 系统总的可用物理内存大小。

- `used` 已被使用的物理内存大小。

- `free` 还有多少物理内存可用。

- `shared` 被共享使用的物理内存大小。

- `buff/cache` 被 `buffer` 和 `cache` 使用的物理内存大小。


### cpuinfo

- 查看`CPU`的信息。

- `cat/proc/info`

### uptime

- 显示系统的启动时间和平均负载，也就是`top`的第一行。

- 通过`w`也可以看到。

### 查看内核相关信息

- uname

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# uname -a
Linux iZm5eeens8iab3xz6f0rfiZ 3.10.0-957.21.3.el7.x86_64 #1 SMP Tue Jun 18 16:35:19 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
```
### 查看操作系统位数

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# file /bin/ls
/bin/ls: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID[sha1]=ceaf496f3aec08afced234f4f36330d3d13a657b, stripped
```
### 查看发行版本
```sh
lsb_release -a
```

### 查看发行版本
```sh
yum install redhat-lsb -y
lsb_release -v
```
### 列表进程打开或使用文件信息

- lsof [选项]

- 列出进程调用或打开文件信息。

- 选项

   - -c 字符串：只列出字符串开头的进程打开的文件。

   - -u 用户名：只列出某个用户的进程打开的文件。

   - -p pid 列出某个`PID`进程打开的文件。

#### 查看系统中所有进程调用的文件
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# lsof | more
COMMAND     PID  TID    USER   FD      TYPE             DEVICE  SIZE/OFF       NODE NAME
systemd       1         root  cwd       DIR              253,1      4096          2 /
systemd       1         root  rtd       DIR              253,1      4096          2 /
systemd       1         root  txt       REG              253,1   1620416     269423 /usr/lib/systemd/systemd
systemd       1         root  mem       REG              253,1     20064     272678 /usr/lib64/libuuid.so.1.3.0
systemd       1         root  mem       REG              253,1    265576     266442 /usr/lib64/libblkid.so.1.1.0
systemd       1         root  mem       REG              253,1     90248     265763 /usr/lib64/libz.so.1.2.7
systemd       1         root  mem       REG              253,1    157424     266444 /usr/lib64/liblzma.so.5.2.2
systemd       1         root  mem       REG              253,1     23968     266498 /usr/lib64/libcap-ng.so.0.0.0
systemd       1         root  mem       REG              253,1     19896     265924 /usr/lib64/libattr.so.1.1.0
```
#### 查看某个文件时被哪个进程调用

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# lsof /sbin/init
COMMAND PID USER  FD   TYPE DEVICE SIZE/OFF   NODE NAME
systemd   1 root txt    REG  253,1  1620416 269423 /usr/sbin/../lib/systemd/systemd
```
#### 查看某个进程调用了哪些文件
```sh
lsof -c httpd
```
### disk

- 查看磁盘使用情况。
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        40G  6.4G   32G  17% /
devtmpfs        486M     0  486M   0% /dev
tmpfs           496M     0  496M   0% /dev/shm
tmpfs           496M  428K  496M   1% /run
tmpfs           496M     0  496M   0% /sys/fs/cgroup
tmpfs           100M     0  100M   0% /run/user/0
```




