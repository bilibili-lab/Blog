# Shell 实战

## 注意事项

- 开头加解释器:`#!/bin/bash`和注释说明。

- 命令建议规则： 变量名大写、局部变量小写，函数名小写，名字体现出实际作用。

- 默认变量是全局的，在函数中变量`local`指定为局部变量，避免污染其他作用域。

- `set -e` 遇到执行非`0`时退出脚本，`set -x`打印执行过程。

- 写脚本一定要先测试再上生产环境。

## 获取随机字符串或数字

- `-c --characters=LIST select only these characters`

### 获取随机8位字符串

- `MD5`全称是报文摘要算法`(Message-Digest Algorithm 5)`, 此算法对任意长度的信息
逐位进行计算，产生一个二进制长度为`128`位（十六进制长度是32位）的报文摘要，不同的文件
产生相同的报文摘要的可能性非常小。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $RANDOM |md5sum | cut -c 1-8
a9720d06
[root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /proc/sys/kernel/random/uuid | cut -c 1-8
59556c20
```

### 获取随机8位数字

- `cksum`命令是确保文件从一个系统传输到另一个系统过程中没有被损坏，这个测试要求校验和在源系统被计算出来。
在目的系统中又被计算一次，两个数字比较，如果校验和相等，则该文件被认为是正确传输了。

- `%N` 十一分之一，纳秒`[000000000, 999999999]`

```sh
echo $RANDOM | cksum | cut -c 1-8
date +%N | cut -c 1-8
```

## 定义一个颜色输出字符串函数

- 终端的字符颜色是转义序列控制的，是文本模式下系统显示功能。

- 转义序列是以`ESC`开头，即用`\033`来完成（`ESC`的`ASCII`码用十进制表示是27，八进制表示是033）。

- 书写格式：开始部分：`\033[显示方式；前景色；背景色m+结尾部分：\033[0m` 显示方式。

| 数值| 含义|
|--|--|
|0   |默认值|
|1   |高亮|
|22  |非粗体|
|4   |下划线|
|24  |非下划线|
|5   | 闪烁|
|25  |非闪烁|
|7   |反显|
|27  |非反显|

前景色

| 数值| 含义|
|--|--|
|30   |黑色|
|31   |红色|
|32   |绿色|
|33   |黄色|
|34   |蓝色|
|35   |洋色|
|36   |青色|
|37   |白色|

背景色

| 数值| 含义|
|--|--|
|40   |黑色|
|41   |红色|
|42   |绿色|
|43   |黄色|
|44   |蓝色|
|45   |洋色|
|46   |青色|
|47   |白色|


## 批量创建用户

- `/dev/null 2>&1` 这条命令的意思是将标准输出和错误输出全部重定向到`/dev/null`中，也就是将产生的所有新丢弃。

- `command > file2 > file`的意思是将命令所产生的标准输出信息和错误信息都输出信道到`file`中。
`command > file2 > file`这样的写法，`stdout`和`stderr`直接送到`file`中，`file`会被打开两次，这样`stdout`和`stderr`
会互相覆盖，这样写相当使用了`FD1`和`FD2`两个同时去抢占`file`的管道。

- `command > file2 >&1` 这条命令就将`stdout`直接送向`file`,`stderr` 继承了`FD1`管道后，在被送往`file`,此时`file`只被打开一次，也只只用了
一个管道`FD1`,它包括了`stdout`和`stderr`的内容。

| 符号| 含义|
|--|--|
| >   |代表重定向到哪里|
|/dev/null   | 代表空设备文件|
|2   |代表stderr标准错误|
|&   |表示等同于的意思，`2>&1`,表示2的输出重定向等于1|
|1   |1表示`stdout`标准输出，系统默认值是1，所以`/dev/null`等同于`1>/dev/null`|

```sh
#!/bin/bash
USER_FILE=user.txt
for USER in user.txt{1..5}; do
    if ! id $USER &> /dev/null;then
        PASS=$(echo $RANDOM | md5sum | cut -c 1-8)
        useradd $USER
        echo $PASS | passwd --stdin $USER &> /dev/null
        echo -e "$USER\t$PASS" >> $USER_FILE
        echo "$USER user create successfully."
    else
        echo_color red "$USER already exists.";
    fi
done
```

## 检查主机存活状态

```sh
#!/bin/bash
for IP in $@; do
    if ping -c 1 $IP &>/dev/null; then
      echo "$IP is  ok"
    else
      echo "$IP is wrong!"
done
```

## 系统监控



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


```sh
#!/bin/bash
cup(){
    local user system idle await steal
    user=$(vmstat | awk 'NR==3{print $13}')
    system=$(vmstat | awk 'NR==3{print $14}')
    idle=$(vmstat | awk 'NR==3{print $15}')
    await=$(vmstat | awk 'NR==3{print $16}')
    steal=$(vmstat | awk 'NR==3{print $17}')
    echo "user=$user,system=$system,idle=$idle,await=$await,steal=$steal"
}
cpu
```
### free

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

```sh
#!/bin/bash
memory(){
    local total used free
    used=$(free -m | awk 'NR==2{print $2}')
    used=$(free -m | awk 'NR==3{print $3}')
    free=$(free -m | awk 'NR==3{print $4}')
    echo "内存总计: ${total}M"
    echo "内存使用: ${used}M"
    echo "内存剩余: ${free}M"
}
memory
```

### disk
- 查看磁盘使用情况
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
```sh
#!/bin/bash
disk(){
    local partitions area total uesd free precent mount
    partitions=$ ( df -h | awk 'BEGIN{OFS="@"}/^\/dev\//{print $1,$2,$3,$4,$5,$6}')
    echo $partitions
    for p in $partitions;do
        area=$(echo $p | cut -d "@" -f1)
        total=$(echo $p | cut -d "@" -f2)
        uesd=$(echo $p | cut -d "@" -f3)
        free=$(echo $p | cut -d "@" -f4)
        precent=$(echo $p | cut -d "@" -f5)
        mount=$(echo $p | cut -d "@" -f6)
        echo "$area,$total,$uesd,$free,$precent,$mount"
    done 
}
disk
```

### 监听网络流量

```sh
#!/bin/bash
traffic(){
    local old_in old_out new_in new_out
    old_in=$(ifconfig ens33 | grep "RX packets" | awk '{print $3}')
    old_out=$(ifconfig ens33 | grep "TX packets" | awk '{print $3}')
    sleep 1s
    new_in=$(ifconfig ens33 | grep "RX packets" | awk '{print $3}')
    new_out=$(ifconfig ens33 | grep "TX packets" | awk '{print $3}')
    in=$(($new_in-$old_in))
    out=$(($new_out-$old_out))
    echo "in=${in},out=${out}"
}
traffic
```

### 监听网站的状态

```sh
#!/bin/bash
checkUrl(){
   HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" $1)
   if [ $HTTP_CODE -ne 200 ]; then
     echo "$1 not ok"
   else
     echo "$1 is ok"
   fi
}
checkUrl
```