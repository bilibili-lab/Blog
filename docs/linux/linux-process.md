---
sidebarDepth: 3
---
# 进程管理

进程是正在执行的程序或命令， 每一个进程都是一个运行的实体，都有自己的地址和空间并且用一定的系统资源。

进程就是正在执行的某个程序。

## 进程管理介绍

* 判断服务器的状态。
* 查看系统中的所有进程。
* 杀死进程，只有无法关闭才要杀死进程。

## 进程的查看 - ps

一次性给出当前系统中进程状态。

* `ps aux` 查看系统中所有进程，使用 `BSD` 操作系统格式。
* `ps -le` 查看系统中所有进程，使用 `Linux` 标准格式。
* `TTY` 是 `TeleType` 的一个缩写，原来指的是电传打字机，是通过串行线用打印机键盘通过阅读和发送消息的东西。后来这东西被键盘与显示器取代，所以现在叫终端比较合适。
* `pts(pseudo-terminal slave)` 是所谓的伪终端或虚拟终端，具体表现就是你打开一个终端，这个终端就叫 `pts/0` ，如果你再打开一个终端，这个新的终端就叫 `pts` /1。

| 参数     | 含义 |         
| :--------- | :-- | 
| a   |  显示一个终端所有进程  |     
| u   |  显示进程的的归属用户及内存的使用情况。 |   
| x   |  显示没有终端控制的进程。  |   
| l   |  长格式显示，显示更详细的信息。 |   

**ps aux**

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.3  43532  3280 ?        Ss   Sep14   0:11 /usr/lib/systemd/systemd --switched-root --system --deserialize 22
root         2  0.0  0.0      0     0 ?        S    Sep14   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S    Sep14   0:04 [ksoftirqd/0]
root         5  0.0  0.0      0     0 ?        S<   Sep14   0:00 [kworker/0:0H]
root         7  0.0  0.0      0     0 ?        S    Sep14   0:00 [migration/0]
root         8  0.0  0.0      0     0 ?        S    Sep14   0:00 [rcu_bh]
```

| 参数     | 含义 |         
| :--------- | :-- | 
| USER     | 该进程是哪个用户创建的。 |     
| PID      | 进程 `ID` 号 。 |   
| %CPU     | 该进程占用 `CPU` 的资源百分比，占用越高说明越消耗系统资源 。|   
| %MEM     | 该进程占用物理内存百分比，占用越高说明越消耗系统资源。  |   
| VSZ      | 该进程占用虚拟内存的百分比，单位 `KB` 。|   
| RSS      | 该进程占用实例的物理内存的百分比，单位 `KB` 。 |   
| TTY      | 该进程在哪个终端中运行， `tty1~tty7` 表示本地终端， `tty1~tty6` 是字符终端， `tty7` 是图形终端。 `pst/0~255` 代表虚拟终端。 `?` 代表此终端是系统启动的。|   
| STAT     |  进程的状态 。如下详细介绍。 |   
| START    |  启动时间。 |   
| TIME     |  该进程占用 `CPU` 的运算时间，数值越高说明越消耗资源。 |   
| COMMAND  |  产生此进程的命令名。  |   

#### 进程的状态(STAT)

| 参数     | 含义 |         
| :--------- | :-- | 
| R(Running)          | 运行 |     
| S(Sleep)            | 休眠 |     
| T(Terminated)       | 停止 |     
| S(Son)              | 包含子进程 |     
| +                   | 位于后台 |     

 

## pstree

树形结构显示程序和进程之间的关系。

* `pstree [选项]`
  + `-p` 显示进程的 PID。
  + `-u` 显示进程对应的用户名称。

选项

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# pstree
systemd─┬─AliSecGuard───6*[{AliSecGuard}]
        ├─AliYunDun───22*[{AliYunDun}]
        ├─AliYunDunUpdate───3*[{AliYunDunUpdate}]
        ├─2*[agetty]
        ├─aliyun-service───2*[{aliyun-service}]
        ├─atd
        ├─auditd───{auditd}
        ├─chronyd
        ├─containerd───8*[{containerd}]
        ├─crond
        ├─dbus-daemon
        ├─dhclient
        ├─dockerd───13*[{dockerd}]
        ├─nginx───nginx
        ├─polkitd───6*[{polkitd}]
        ├─rsyslogd───2*[{rsyslogd}]
        ├─sshd───sshd───bash───pstree
        ├─systemd-journal
        ├─systemd-logind
        ├─systemd-udevd
        └─tuned───4*[{tuned}]
```

## 进程的查看 - top

可以动态地持续监听进程地运行状态。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# top
```

常用 `options`
| 选项     | 含义 |         
| :--------- | :-- | 
| -b                  | 使用批处理模式输出，一般和 `n` 配合使用。|     
| -n                  | 次数，指定 `top` 命令执行的次数，一般使用了 `-b` 选项才配合使用。 |     
| -d                  | 秒数，指定 `top` 命令每隔几秒更新，默认是 `3` 秒。 |     
   

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# top
top - 23:35:13 up 11 days, 13:14,  1 user,  load average: 0.00, 0.01, 0.05
Tasks:  73 total,   1 running,  71 sleeping,   1 stopped,   0 zombie
%Cpu(s):  1.0 us,  0.3 sy,  0.0 ni, 98.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  1014904 total,    78168 free,   145800 used,   790936 buffers
KiB Swap:        0 total,        0 free,        0 used.   700412 cached

  PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND                                                                                                                   
25680 root      10 -10  134544  15564  10340 S  1.0  1.5  17:13.08 AliYunDun                                                                                                                 
    1 root      20   0   43532   3280   2040 S  0.0  0.3   0:11.90 systemd                                                                                                                   
    2 root      20   0       0      0      0 S  0.0  0.0   0:00.02 kthreadd                                                                                                                  
    3 root      20   0       0      0      0 S  0.0  0.0   0:04.52 ksoftirqd/0                                                                                                               
    5 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kworker/0:0H                                                                                                              
    7 root      rt   0       0      0      0 S  0.0  0.0   0:00.00 migration/0                                                                                                               
    8 root      20   0       0      0      0 S  0.0  0.0   0:00.00 rcu_bh                                                                                                                    
    9 root      20   0       0      0      0 S  0.0  0.0   0:59.84 rcu_sched                                                                                                                 
   10 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 lru-add-drain                                                                                                             
   11 root      rt   0       0      0      0 S  0.0  0.0   0:05.24 watchdog/0                                                                                                                               
```

 **第二行为任务队列信息**

| <div style="width:250px">内容</div>     | 含义 |         
| :--------- | :-- | 
| 23:35:13             | 系统的当前时间。 |     
| up 11 days , 13:14   | 系统的运行时间，本机已经运行了 11 天。 |     
| 1 user               | 当前登录了一个客户端。|     
| load average: 0.00, 0.01, 0.05 | 系统在之前 `1` 分钟, `5` 分钟， `15` 分钟的平均负载。一般认为小于 `1` 时负载比较小。大于 `1` 超过负载。|    

 **第三行为进程的信息**
| <div style="width:150px">内容</div>     | 含义 |         
| :--------- | :-- | 
| Tasks:  73 total   | 系统中的进程总数。 |     
| up 11 days , 13:14 |  |     
| 1 running          | 正在运行的进程数。|     
| 71 sleeping        | 睡眠的进程数。   |     
| 1 stopped          | 正在停止的进程。  |
| 0 zombie           | 僵尸进程，如果不是 `0` 的话需进行检查。 |

 **第四行为CPU的信息**

| <div style="width:150px">内容</div>     | 含义 |         
| :--------- | :-- | 
| %Cpu(s):  1.0 us  |   用户模式占用 `CPU` 的百分比。 |     
| 0.3 sy            |   系统模式占用 `CPU` 的百分比。|     
| 0.0 ni            |   改变过优先级的用户进程，占用 `CPU` 的百分比。 |     
| 98.7 id           |   空闲 `CPU` 的 `CPU` 百分比。 |     
| 0.0 wa            |   等待输入/输出的进程占用 `CPU` 的百分比。  |
| 0.0 hi            |   硬中断请求服务占用的 `CPU` 的百分比。  |
| 0.0 si            |   软中断请求服务上占用 `CPU` 的百分比 |
| 0.0 st            |   st(Steal time)虚拟时间百分比，就是当有。|

 **第五行为物理内存信息**
| <div style="width:200px">内容</div>     | 含义 |         
| :--------- | :-- | 
| KiB Mem :  1014904 total   |  物理内存的数量， 单位是 `KB` 。 |     
| 78168 free        |  已经使用的物理内存数量 。 |     
| 1145800 used       | 空闲的物理内存的数量，  |     
| 790936 buffers  | 作为缓冲的内存数量，可以存存放需要写入硬盘的数据，用来加速的写入。  |     

 **第六行为交换分区信息**
| <div style="width:150px">内容</div>     | 含义 |         
| :--------- | :-- | 
|  0 total      |  总计的交换分区（虚拟内存）的大小。 |     
|  0 free       |  已经使用的交换分区大小。 |     
|  0 used       |  空闲的交换分区大小。  |     
|  700412 cached  | 把需要经常读取的数据从硬盘读取到内存中，加速了数据的读书。  |     

 **第六行为每个进程的信息**
| <div style="width:150px">内容</div>     | 含义 |         
| :--------- | :-- | 
|  PID            |  进程 `ID` 号 。  |     
|  USER           |  该进程是哪个用户创建的 。|     
|  PR             |  进程优先级 。 `Priority` 的缩写。 |     
|  NI             | `nice` 值。负值表示高优先级，正值表示低优先级 。 `Nice` 的缩写。 |     
|  VIRT           |  进程使用的虚拟内存总量，单位 `kb` 。 `VIRT=SWAP+RES` 。 |     
|  RES            |  进程使用的、未被换出的物理内存大小，单位 `kb` 。 `RES=CODE+DATA` 。 |     
|  SHR            |  共享内存大小，单位 `kb` 。|     
|  S              |  进程状态。 `D=不可中断的睡眠状态R= 运行 S= 睡眠 T= 跟踪/停止 Z= 僵尸进程` 。       |     
|  %CPU           |  该进程占用 `CPU` 的资源百分比，占用越高说明越消耗系统资源 。 |     
|  %MEM           |  该进程占用物理内存百分比，占用越高说明越消耗系统资源。  |     
|  TIME+          |  进程使用的CPU时间总计，单位 `1/100` 秒。 |     
|  COMMAND        |  进程名称（命令名/命令行） 。|     

## 杀死进程

### 进程信号

* `kill -l` 查看进程信号。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
```

| <div style="width:150px">信号</div> | 信号名称 |  说明 |       
| :--------- | :-- | --- |
|  1       | SIGHUP  |  该信号让进程立即关闭，然后重写读取配置文件后重启，平滑重启。  |  |   
|  2       | SIGINT  |  程序终止信号，用于关闭前台进程，相当于 `ctrl + c` |     |
|  9       | SIGKILL |  用来立即结束程序的运行，本信号不能阻塞，处理和忽略，一般用于强制终止。 |     |
|  15      | SIGTERM |  正常结束进程的信号， `kill` 命令的默认信号，如果不能正常终止，才会尝试 `SIGKILL` 信号。|     |

### 杀死单一进程

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# kill -9 进程ID
```

### killall

* 按照进程名杀死进程。
  + `-i` 交互式，询问是否要杀死某个进程。
  + `-l` 进程名忽略大小写。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# killall [选项] [信号] 进程名
```

### pkill

* 按照进程名杀死进程。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# pkill [选项][信号] 进程名 -t 按终端类型
[root@iZm5eeens8iab3xz6f0rfiZ ~]# pkill -9 -t pts/2
```

### w

* 用于显示已经登陆系统的用户列表，并显示用户正在执行的指令。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# w
 11:25:06 up 12 days,  1:04,  1 user,  load average: 0.15, 0.06, 0.06
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    47.96.60.211     10:21    2.00s  0.00s  0.00s w
```

| <div style="width:150px">选项</div> | 含义 |         
| :--------- | :-- | --- |
|  USER      | 显示登录用户账号名。 |   
|  TTY       | 用户登录所用的终端。 |      
|  FROM      | 显示用户在何处登录。 |      
|  LOGIN@    | 是 `LOGIN AT` 的意思，表示登录进入系统的时间。 |       
|  IDLE      | 用户空闲时间，从上一次任务结束后，开始计时。 |       
|  JCPU      | 终端代号来区分，表示这段时间内，所有与终端相关的进程任务所耗时的 `CPU` 时间。 |       
|  PCPU      | 指 `WHAT` 域的任务执行后耗费 `CUP` 的时间。 |       
|  WHAT      | 表示当前执行的任务。 |       

    

## 修改进程的优先级

 - `Linux` 操作系统时一个多用户，多任务的操作系。 `Linux` 系统同时管理者非常多的进程，但是 `CPU` 在同一时间周期内只能运算一个指令。
 - 进程的优先级决定了每个进程处理的选后顺序。

### 修改进程优先级

* `ps -le` 可以查看进程的优先级。
* `PRI` 表示 `Priority` , `NI` 表示 `Nice` 。 这两个值都表示优先级，数字越小代表进程的优先级越高
* `NI` 的值范围是 `-20-19` 。
* 普通用户调整 `NI` 的值的范围是 `0-19` ，而且只能调整自己的进程。
* 普通用户只能调高 `NI` 值，但是不能调低。 比如原来是 `0` , 则只能调为大于 `0` 的数字。
* `root` 用户才能设定进程 `NI` 值为负值，而且可以调整任何用户进程。
* `PRI` (最终值) = `PRI` (原始值) + `NI` 。

### nice

* `nice` 命令可以给新执行的命令直接负值 `NI` 值。
* 但不能修改已经存在的进程 `NI` 值。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# nice -n -5 service httpd start
```

### renice

* 修改已经存在的进程 `NI` 值。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# renice -10 30054
```
