# 磁盘管理

## df

- disk free 的缩写。

- 显示目前在 `Linux` 系统上的文件系统磁盘使用情况统计。

常用`options`

- `-l（local）`  仅显示本地磁盘。

- `-a` 显示所有文件系统的使用情况。

- `-h` 以`1024`进制计算最适合的单位显示磁盘容量。

- `-H` 以`1000`进制计算最适合的单位显示磁盘容量。

- `-T` 显示磁盘分区类型。

- `-t` 显示指定类型文件系统的磁盘分区。

- `-x` 不显示指定类型文件系统的磁盘分区。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# df
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/vda1       41147472 4345716  34898264  12% /
devtmpfs          496996       0    496996   0% /dev
tmpfs             507452       0    507452   0% /dev/shm
tmpfs             507452     440    507012   1% /run
tmpfs             507452       0    507452   0% /sys/fs/cgroup
tmpfs             101492       0    101492   0% /run/user/0
```
| 字段 | 含义 | 
| -- | -- |
| Filesystem   |  文件系统 | 
| 1K-blocks    |  容量 | 
| Used         |  已用 | 
| Available    |  可用 | 
| Use%         |  已经百分比 | 
| Mounted on   |  挂载点 | 

## du

- disk usage 的缩写。

- 统计以磁盘上的文件大小。

常用`options`

- `-b`  以`byte`为单位统计。
- `-k`  以`KB`为单位统计。
- `-m`  以`MB`为单位统计。
- `-h`  以`1024`为单位统计。
- `-H`  以`1000`为单位统计。
- `-s`  指定统计目标。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# du | more
40      ./nginx-1.10.1/conf
12      ./nginx-1.10.1/man
236     ./nginx-1.10.1/src/stream
352     ./nginx-1.10.1/src/http/v2
68      ./nginx-1.10.1/src/http/modules/perl
1520    ./nginx-1.10.1/src/http/modules
2788    ./nginx-1.10.1/src/http
292     ./nginx-1.10.1/src/mail
```

## 添加新硬盘后的分区和格式化

- 硬件设备是由`linux`系统自动识别并以文件的形式存在于根目录下的`dev`目录下。

- `1-4`分区编号是留给主分区和扩展分区的，逻辑分区只能从`5`开始。


| 字段 | 含义 |  中文 |
| -- | -- | -- |
| m    |  print this menu |   打印菜单 |
| n    |  add a new partition |  添加一个分区 |
| d    |  delete a new partition | 删除一个分区  |
| p    |  print the partition table  |  打印分区表 |
| q    |  quit without saveing  changes | 退出不保存 |
| w    |  write table to disk and  exit |  写入分区表并保存 |

## MBR分区

- 使用`fdisk`可以查看磁盘分区情况。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# fdisk -l

Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000b2d99

# 分区信息
   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048    83875364    41936658+  83  Linux
```

- 开始分区

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# fdisk -l

Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000b2d99

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048    83875364    41936658+  83  Linux
[root@iZm5eeens8iab3xz6f0rfiZ ~]# fdisk /dev/vda
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition  # 添加一个分区
   o   create a new empty DOS partition table
   p   print the partition table   # 打印所有分分区
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

Command (m for help): n  # 输入 n  添加分区
Partition type:
   p   primary (1 primary, 0 extended, 3 free)   # 主分区
   e   extended   # 扩展分区
Select (default p): p
Partition number (2-4, default 2): 2
First sector (83875365-83886079, default 83875840): +300M
Value out of range.
First sector (83875365-83886079, default 83875840): 83875840    
Last sector, +sectors or +size{K,M,G} (83875840-83886079, default 83886079): 83886079
Partition 2 of type Linux and of size 5 MiB is set

Command (m for help): p

Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000b2d99

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048    83875364    41936658+  83  Linux
/dev/vda2        83875840    83886079        5120   83  Linux

```

## GPT分区

- `MBR`下主分区最多 `4` 个，`GPT`可达`128`个。

- `MBR`下主分区容量最大`2TB`,`GPT`模式下容量`18EB` 。`(1EB = 1024PB,1PB = 1024TB, 1TB = 1024GB)`

## 格式化

```sh
# 格式化有两种方式
# 第一种
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  mkfs.ext3 /dev/sdb1
# 第二种
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  mkfs -t ext4 /dev/sdb2
```

## 添加swap交换分区

- 建立普通的`Linux`分区。

- 修改分区类型的`16`进制编码。

- 格式化成交换分区。

- 启动交换分区。

## 挂载

###  挂载命令格式

- `mount [-t 文件系统] [-o 特殊选项] 设备文件名 挂载点`

- 选项

   - `-t`文件系统 `ext4 iso 9660`。

   - `-o` 特殊选项。

### 挂载光驱
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  mkdir /mnt/cd
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  mount -t iso9660 /dev/sr0 /mnt/cdrom
```

### 卸载光驱
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  unmount /mnt/cdrom
```

### 挂载U盘

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  fdish -l 查看硬盘及分区信息
[root@iZm5eeens8iab3xz6f0rfiZ ~]#  mount -t iso9660 vfat /dev/sdb1 /mnt/usb
```

