# 流程控制

## 条件判断

### 按照文件类型判断

| 选项| 含义|
|---|---|
|-d| 文件是否存在并且是目录。|
|-e| 文件是否存在。|
|-f| 文件是否存在并且是普通萎蔫。|
|-b| 文件是否存在并且是设备块文件。|
|-c| 文件是否存在并且是字符设备文件。|
|-L| 文件是否存在并且是链接文件。|
|-p| 文件是否存在并且管道文件。|
|-s| 文件是否存在并且是否为空|
|-S| 文件是否存在并且套接字文件|

``` sh
# 第一种写法
[root@iZm5eeens8iab3xz6f0rfiZ ~]# test -e 1.txt 
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $?
1
[root@iZm5eeens8iab3xz6f0rfiZ ~]# touch 1.txt
[root@iZm5eeens8iab3xz6f0rfiZ ~]# test -e 1.txt 
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $?
0

# 第二种写法
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -e 1.txt ]
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $?
0

[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -e 1.txt ] && echo "yes"  || echo "no"
yes
```

#### 块设备

* 块设备：系统能够随机无序访问固定大小的数据片设备，这些数据片成为块。块设备是以固定大小长度来传送资料，它使用缓冲区暂存数据，时机成熟后从缓存中一次性写入到设备

或者从设备中一次放到缓存区。常见的块设备有硬盘， `CD-ROM` 驱动器， `Flash` 闪存等等。 他们也是通过文件形式存在 `Linux` 中的。 `Linux` 以 `b(block)` 表示块设备。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ll /dev/sr0
brw-rw----   /dev/sr0
```

#### 字符设置 

* 字符设置： 按照字符流方式被有序访问，以不定长度的字符串传送资料，不存在缓冲区，所以对这种设备读写都是实时的，比如键盘等等。 

* `Linux` 以 `c(char)` 表示字符设置。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ll /dev/input/mouse0
crw-rw---- 1 root input 13, 32 Oct  6 17:52 /dev/input/mouse0
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ll /dev/input/event0
crw-rw---- 1 root input 13, 64 Oct  6 17:52 /dev/input/event0
```

#### 管道设置

* 管道文件是 `Linux` 下的一种特殊缓存文件，所谓缓存文件就是只会存在于进程执行的的时候，进程关闭管道文件也关闭了，

管道文件要在读写的时候，先阻塞在写操作系统的 `open` 函数，当有读写操作进行的时候，通信链路建立，写操作开始往管道写东西，写完之后，在读写操作会把东西写出来，最后两个进程
都正常推出， `Linux` 以 `p（pipe）` 表示管道设置。

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# ll /dev/input/mouse0
ll /var/run/autofs.fifo-misc
```

#### 套接字

* 套接字 `Socket` 看做是不同主机之间的进程进行双向通信的端点，简单来说通信两方的一种约定，用套接字中的相关函数来完成通信过程。

套接字 `Socket` 是连接应用程序和网络驱动程序的桥梁，套接字 `Socket` 在应用程序中创建，通过绑定与网络驱动建立关系。
此后，应用程序发送套接字 `Socket` 的数据。由于套接字 `Socket` 交给网络驱动程序向网络上发送出去。应用程序便可以从该 `Socket`
中提取接受到数据，网络应用程序就是这样通过 `Socket` 进行数据的发送与接收。 `Linux` 以 `S(Socket)` 表示套接字设备。

### 按照文件的权限进行判断

| 选项| 含义|
|---|---|
|-r | 文件是否存在，并且是否拥有读权限|
|-w | 文件是否存在，并且是否拥有写权限。|
|-x | 文件是否存在，并且是否拥有执行权限。|

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo read > read.txt
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo write > write.txt
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo execute > execute.txt

[root@iZm5eeens8iab3xz6f0rfiZ ~]# chmod u+w write.txt
[root@iZm5eeens8iab3xz6f0rfiZ ~]# chmod u+x execute.txt

[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -e read.txt ]&& echo "read yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -e write.txt ]&& echo "write yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -e execute.txt ]&& echo "execute yes" || echo "no"
```

### 两个文件间的比较

| 选项| 含义|
|---|---|
| 文件1 -n 文件2  | 判断文件1的修改时间是否比文件2的新。|
| 文件1 -ot 文件2 | 判断文件1的修改时间是否比文件2的旧。|
| 文件1 -ef 文件2 | 判断文件1和文件2的inode号是否一致，可用于判断硬链接。|

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ write.txt -nt read.txt ]&& echo "write is older than read " || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ read.txt -ot write.txt ]&& echo "read is older than write" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ execute.txt -ef execute2.txt ]&& echo "execute and execute2.txt are the same" || echo "no"
```

### 两个整数间的比较

| 选项| 含义|
|---|---|
| 整数1 -eq 整数2  | 判断整数1是否整数2相等。|
| 整数1 -nq 整数2  | 判断整数1是否和整数2不相等。|
| 整数1 -gt 整数2  | 判断整数1是否大于整数2.|
| 整数1 -lt 整数2  | 判断整数1是否小于整数2.|
| 整数1 -ge 整数2  | 判断整数1是否大于等于整数2.|
| 整数1 -le 整数2  | 判断整数1是否小于等于整数2.|

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 2 -eq 2]&& "echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 3 -ne 2]&& "echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 3 -gt 2]&& "echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 1 -lt 2]&& "echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 2 -ge 2]&& "echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 2 -le 2]&& "echo "yes" || echo "no"
```

### 两个字符串的判断

| 选项| 含义|
|---|---|
| -z 字符串 | 判断字符串是否为空。|
| -n 字符中 | 判断字符串是否为非空。|
| 字符串1  == 字符串2 | 判断字符串1是否和字符串2相等。|
| 字符串1  != 字符串2 | 判断字符串1是否和字符串2不相等。|

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# name=qiaduan
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -z "$name" ]&&echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# name2=qianduan1
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ -z "$name"=="$name2" ]&&echo "yes" || echo "no"
```

### 多重条件判断

| 选项| 含义|
|---|---|
| 判断1 -a 判断2 | 逻辑与|
| 判断1 -o 判断2 | 逻辑或|
| ! 判断          | 逻辑非|

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 2 -gt 1 -a 3 -gt 2]&&echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 2 -gt 1 -a 3 -gt 4]&&echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ 2 -gt 1 -o 3 -gt 4]&&echo "yes" || echo "no"
[root@iZm5eeens8iab3xz6f0rfiZ ~]# [ !3 -gt 4 ]&&echo "yes" || echo "no"
```

## 单分支if语句

* `if` 语句使用 `fi` 结尾。

* [条件判断式]就是使用 `test` 命令进行判断，所以中括号和条件判断式之间必须有空格。

* `then` 后面跟着符合条件之后执行的程序，可以放在 `[ ]` 之后，用 `;` 分割，也可以换行，不用。

### 语法

``` sh
if [条件判断];then
    代码体
if
```

``` sh
if [条件判断]
then
    代码体
if
```

``` sh
if [ 2 -gt 1 ];then echo bigger;fi
```

### 判断当前用户是否是root用户

``` sh
#!/bin/bash
user=$(whoami)
if("$user" === "root")
then
echo "I am  root"
if
```

## 双分支if语句

### 语法

``` sh
if [条件判断]
then
   代码体1
else
   代码体2
```

### 判断是否目录

``` sh
#!/bin/bash
read -t 10 -p "please input a filename" dir
if[ -d "$dir"]
then
  echo "is dir"
else 
  echo "is not dir"  
fi
```

## 多分支if语句

### 语法

``` sh
if [条件判断1]
then
  代码体1
elif [条件判断2]
  代码体2
else
  代码体3
fi  
```

``` sh
#!/bin/bash
read -p "please input grade" grade
if ["$grade" -gt 90]
    then
         echo great
elif ["$garde" -gt 80]
    then
        echo good
else
    echo bad
fi
```

## case

- `case` 和 if 都是多分支判断语句，`if` 能判断多个条件，`case`只能判断一个条件。

### 语法

```sh
case 变量名 in
值1）
   代码1
   ;;
值2）
   代码2
   ;;
*)
   代码3
   ;;
esac
```

```sh
#!/bin/bash
read -p "yes or no?" -t 30 choose
case $choose in
    "yes")
       echo "yes"
       ;;
    "no")
       echo "no"
       ;;
    *)
        echo "other"
       ;;
esac
```

## for循环

### 语法

```sh
for 变量 in 值1 值2 值3
do
代码块
done
```

```sh
#!/bin/bash
for i in 1 2 3
do
    echo $i
done
```

### 语法

```sh
#!/bin/bash
for((i=1;i<=10;++));
do
    echo $(($i))  // 加不加$都一样
done
```

## while循环

- `while`循环是不定循环，也称为条件循环，只要条件成立，就会一直继续。
```sh
while [条件判断式]
do  
    代码块
done
```
```sh
#!/bin/bash
i=1
result=0
while [$i -le 100]
    do
        result=$(($result + i))
        i=$(($i+1))
    done
echo $result
```

## until循环

- 直到条件不成立。

```sh
#!/bin/bash
i=1
result=0
until [$i -le 100]
    do
        result=$(($result + i))
        i=$(($i+1))
    done
echo $result
```