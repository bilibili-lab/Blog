# 函数

- `Linux Shell` 可以用户定义函数，然后在`shell`脚本中可以随便调用。

- 可以带`function fun()`定义，也可以直接`func()`定义，不带任何参数。

- 调用函数不需要加`()`。

## 简单函数

```sh
[ function ] funcname [()]
{
    action;
    [return int;]
}
```

```sh
start(){
>  echo start
> }
start
```

```sh
#!/bin/bash
start(){
    echo start
}
start
```

## 返回值

- 参数返回， 可以显示加: return 返回，如果不加，将以最后一条命令运行结果，作为返回值。

```sh
> sum4(){
> r=$(($1+$2))
> return $r
>}
# sum4 2 3
echo $?
5
```

## 参数说明

| 参数处理 | 说明 |
|--|---|
|$#| 传递到脚本的参数。 |
|$*| 以一个单字符串显示所有向脚本传递的参数。|
|$@| 与$*相同，但是使用时加引号，并在引导中返回每个参数。|
|$$| 脚本运行的当前进行ID号。 |
|$!| 后台运行的最后一个进行ID号 。|
|$-| 显示Shell使用的当前选项，与`set`命令功能相同。 |
|$?| 显示最后命令的退出状态，0表示没有错误，其他任何错误表示有错误 |

## Shell信息

### 打印当前Shell的选项

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $-
himBH
```
- `$-`记录着当前设置的`Shell`选项，`himBH`是默认值，可以通过`set`命令来设置或者取消一个选项配置。例如：

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# sex -x
```
- 这个可以打开`shell`的调试开关，调式`shell`脚本非常有用，这个时候在检查`$-`变量的值，可以看到多了`x`字符：
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# echo $-
+ echo himxBH
himxBH
++ printf '\033]0;%s@%s:%s\007' root iZm5eeens8iab3xz6f0rfiZ '~'
```

### 选项

- 查看当前`shell`的选项配置
```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# set -o
+ set -o
allexport       off
braceexpand     on
emacs           on
errexit         off
errtrace        off
functrace       off
hashall         on
histexpand      on
history         on
ignoreeof       off
interactive-comments    on
keyword         off
monitor         on
noclobber       off
noexec          off
noglob          off
nolog           off
notify          off
nounset         off
onecmd          off
physical        off
pipefail        off
posix           off
privileged      off
verbose         off
vi              off
xtrace          on
++ printf '\033]0;%s@%s:%s\007' root iZm5eeens8iab3xz6f0rfiZ '~'
```
#### i - interactive

- 包含这个选项说明当前的`shell`是一个交互式的`shell`,何为交互式？你输入命令，`shell`解释执行后给你返回结果，我们在
`Terminal`下使用的`shell`就是交互式的。 如果我们在一个脚本里面`echo $-`,结果是不会包含`i`的。

#### H - history expand

- history expand 就是展开历史列表的命令，可以通过`!`感叹号来完成，例如`!!`返回上一个最近的一个历史命令，”!n“返回第`n`个历史命令，等等。

#### B - brace expansion

- 大括号扩展，是可以让`bash`生成任意字符串的扩展功能。

```sh
echo g{a,b,c}$
```

#### m - monitor mode

- 打开监控模式，可以控制进程的停止、继续、后台、或者前台进行。

- 正常情况下，在交互模式下，该选项默认是打开的， 所以在执行一个比较耗时的命令时，你可以按下`ctrl + Z`让它在后台运行，然后可以用
`fg`命令将后台运行的任务恢复到前台执行。

```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# sleep 100s
+ sleep 100s
^Z
[2]+  Stopped                 sleep 100s
++ printf '\033]0;%s@%s:%s\007' root iZm5eeens8iab3xz6f0rfiZ '~'
[root@iZm5eeens8iab3xz6f0rfiZ ~]# fg
+ fg
sleep 100s
```

#### m - hashal

-  记录命令的位置。

#### 删除

从左往右看， 删除掉`$-`变量中的第一个`i`字符以及之前的内容。

```sh
${-#*i}
```
`%`与`#`的意思刚好相反，从右往左看，删除掉`$-`变量的值中最后一个`i`字符以及之后的内容。

```sh
${-%i*}
```