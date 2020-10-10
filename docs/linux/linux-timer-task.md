# 介绍

- 有些任务比如备份数据库等操作需要在系统空闲的时候执行。

## at

- 一次定时任务。

### 启动服务

```sh
chkconfig --list | grep atd
service status
service atd start
```

### at的访问控制

- 如果系统中没有`/etc/at.allow`,那么只有写入`/etc/at.allow`(白名单)中的用户可以使用`at`命令（优先级更高，会忽略`/etc/deny`文件）。

- 如果系统中没有`/etc/at.allow`文件，只有`/etc/at.deny`,那么写入`/etc/at.deny`文件中的用户不能使用`at`命令，但这个对`root`用户并没有作用。

- 如果这两个文件都不存在，那么只有`root`用户可以使用`at`命令。

### at命令

- at 选项 时间

- 选项

  - `-m` 当`at`工作完成，无论是否命令输出，d都用`email`通知`at`命令的用户。

  - `-c` 工作号，显示该`at`工作的实际内容。

- 时间
  
  - `HH:MM`例如10:10。

  - `HH:MM YYYY-MM-DD` 10:10 2018-08-08。

  - `HH:MM[am|pm] [month] [date]`

  - `HH:MM[am|pm] + [minutes] [hours|days|weeks] now +5 minutes`


  ### atq

  - 查询当前服务器上的`at`工作。


  ### atrm

  - 删除指定的`at`任务。

## crontab

- 可以循环定时执行定时任务。

- [cron](https://cron.qqe2.com/)

```sh
service crond restart
chkconfig crond on
```

### crontab 设置

- crontab [选项]

- 选项

- -e 编辑`crontab`定时任务。

- -i 查看`crontab`任务。

- -r 删除当前用户所有的`crontab`任务。

### 语法

```sh
# Example of job definition:
 .---------------- minute (0 - 59)
 |  .------------- hour (0 - 23)
 |  |  .---------- day of month (1 - 31)
 |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
 |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
 |  |  |  |  |
 *  *  *  *  * user-name  command to be executed
```
#### 位置

|项目|含义| 范围|
|---|---|---|
|第1个*| 1小时中的第几分钟  | 0-59|
|第2个*| 一天当中的第几个小时| 0-23|
|第3个*| 一个月当中的第几天 | 1-31|
|第4个*| 一年当中第几个月   | 1-12|
|第5个*| 一周当中的星期几   | 0-6 |

#### 特殊符号
|<div style="width:100px">符号</div>|含义| 例子|
|---|---|---|
|* | 代表任意时间  |比如第一个星就代表一个小时中没分钟执行一次。|
|, | 代表不连续时间  |比如”1,2,3“, 就代表每小时的1分钟，2分钟，3分钟执行命令。|
|- | 代表时间范围  |比如`1-5 * **`,代表没小时的第1分钟到第5分钟执行命令。|
|*/n| 代表每隔多久执行一次  | 比如"/10"就代表每隔10分钟就执行一次命令。|
|0 0 1，10 * 1| 每月1号和10号，每周1的0点0分都会执行。 | |

### 注意事项

- 所有选项不能为空，必须填写。

- `crontab`小单位是分钟，最大单位是天。

- 不管写命令还是脚本都要使用绝对路径。

## 系统定时任务

- `crontab -e`是用户执行的命令，不同的用户身份可以执行自己的定时任务。

- 如果需要系统执行定时任务，可以编辑`/etc/crontab`文件。

- `/etc/crontab` 可以指定`shell`、路径、邮件发送和家目录。

### /etc/crontab

- 修改`/etc/crontab`配置文件

```sh
5 5 * * * echo `date` >> /root/date.log
```


### /etc/cron

- 把需要定时执行的脚本复制到`/etc/cron.{daily,weekly,monthly}`目录中的任意一个。

```sh

[root@iZm5eeens8iab3xz6f0rfiZ ~]# ls /etc/cron*
/etc/cron.deny  /etc/crontab

/etc/cron.d:
0hourly  sysstat

/etc/cron.daily:
logrotate  man-db.cron

/etc/cron.hourly:
0anacron

/etc/cron.monthly:

/etc/cron.weekly:
```

### anacron配置

- `anacron`是用来保证在系统关机的时候错过的定时任务`(/etc/cron.daily)`, 可以在系统开启后自动执行。

- `anacron`会使用`1`天，`7`天和`1`个月作为检测周期。

- 在系统的`/var/spool/anacron` 目录存在`cron.{daily,weekly,monthly}`文件，用于记录上次执行`cron`的时间。

- 和当前的时间做比较，如果两个时间的差值超过`anacron`指定的时间差，那就证明有`crontab`未执行。

- `/etc/cron.{daily,weekly,monthly}`只会被`anacron`调用。

### /etc/anacrontab
```sh
root@iZm5eeens8iab3xz6f0rfiZ ~]# cat /etc/anacrontab
# /etc/anacrontab: configuration file for anacron

# See anacron(8) and anacrontab(5) for details.

SHELL=/bin/sh
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
# the maximal random delay added to the base delay of the jobs
RANDOM_DELAY=45
# the jobs will be started during the following hours only
START_HOURS_RANGE=3-22

#period in days   delay in minutes   job-identifier   command
1       5       cron.daily              nice run-parts /etc/cron.daily
7       25      cron.weekly             nice run-parts /etc/cron.weekly
@monthly 45     cron.monthly            nice run-parts /etc/cron.monthly
```

### cron.daily 执行过程

- 首先读取`/var/spool/anacron/cron.daily`中的上一次执行时间。

- 和当前时间对比，如果两个时间相差超过`1`天,说明漏执行了，就执行`cron.daily`。

- 执行任务的时间只能在`3-22`点之间。

- 执行的时强制延迟时间`5`分钟，在随机延迟`0-45`分钟。

- 使用`nice`命令指定默认的优先级，在使用`run-parts`脚本执行`/ect/corn.daily`目录中所有的可执行文件。