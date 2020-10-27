---
sidebarDepth: 2
---

# 函数

## 字符函数

|函数名称|描述|
|---|----|
|CONCAT| 字符串连接|
|CONCAT_WS| 使用指定的分隔符进行字符连接|
|FORMAT| 数字格式化|
|LOWER| 转为小写字母|
|UPPER| 转为大写字母|
|LEFT|  返回字符串s开始的最左边n个字符|
|RIGHT| 返回字符串s开始的最右边n个字符|
|REPLACE| 字符串替换函数，返回替换后的新字符串|
|SUBSTRING| 截取字符串，返回从指定位置开始的指定长度的字符换|
|REVERSE| 字符串反转（逆序）函数，返回与原始字符串顺序相反的字符串|

### LENGTH

一个用来获取字符串长度的内置函数。

单位是字节，utf8编码下, 一个汉字三个字节，一个数字或字母一个字节。gbk编码下, 一个汉字两个字节，一个数字或字母一个字节。

``` sql
SELECT

    - FORM student

WHERE
    LENGTH(name) > 3;
```

### CHAR_LENGTH

获取字符串长度。

单位为字符，不管汉字还是数字或者是字母都算是一个字符。

``` sql
SELECT

    - FORM student

WHERE
    CHAR_LENGTH(name) > 3;
```

### CONCAT 

函数用于将两个字符串连接为一个字符串。

``` sql
SELECT CONCAT('FIRST ', 'SECOND');
```

### CONCAT_WS 

* `CONCAT_WS()` 代表 `CONCAT With Separator` ，是 `CONCAT()` 的特殊形式。   

* 第一个参数是其它参数的分隔符。分隔符的位置放在要连接的两个字符串之间

``` sql
CONCAT_WS(separator, str1, str2,...)
```

### UPPER

将字符串中的字母字符全部转换成大写  。

``` sql
SELECT UPPER('green'),UPPER('Green');
```

### LOWER

将字符串中的字母转换为小写。

### TRIM

删除字符串左右两侧的空格。

### LEFT

从左侧字截取符串，返回字符串左边的若干个字符。

``` sql
SELECT LEFT('MySQL',2);
```

### RIGHT

从右侧字截取符串，返回字符串右边的若干个字符。

``` sql
SELECT RIGHT('MySQL',2);
```

### SUBSTRING

取子串函数 `SUBSTRING(s，n，len)` 带有 `len` 参数的格式，从字符串 `s` 返回一个长度同 `len` 字符相同的子字符串，起始于位置 `n` 。

也可能对 `n` 使用一个负值。假若这样，则子字符串的位置起始于字符串结尾的第 `n` 个字符，即倒数第 `n` 个字符，而不是字符串的开头位置。

``` sh
SELECT SUBSTRING('computer',3);
SELECT SUBSTRING('computer',3,4);
SELECT SUBSTRING('computer',-3);
SELECT SUBSTRING('computer',-5,3);
```

### REPLACE

替换函数 `REPLACE(s，s1，s2)` 使用字符串 `s2` 替换字符串 `s` 中所有的字符串 `s1` 。

## 数学函数

|函数名称|描述|
|--|---|
|CEIL |向上取整|
|FLOOR |向下取整|
|DIV |整除数|
|DIV| 整除数|
|MOD| 取余|
|POWER| 幂运算|
|ROUND| 四舍五入|
|TRUNCATE| 数字截取|

### ROUND

四舍五入

``` sql
SELECT ROUND(2.5);
```

### TRUNCATE

* `TRUNCATE(X,D)` 是 `MySQL` 自带的一个系统函数。

* `X` 是数值， `D` 是保留小数的位数。

``` sql
SELECT TRUNCATE(123.4567, 3);   # 123.456
SELECT TRUNCATE(123.4567, 2);   # 123.45
SELECT TRUNCATE(123.4567, 1);   # 123.4
SELECT TRUNCATE(123.4567, 0);   # 123
SELECT TRUNCATE(123.4567, -1);  # 120
SELECT TRUNCATE(123.4567, -2);  # 100
SELECT TRUNCATE(123.4567, -3);  # 0
```

### CEIL

向上取整。

``` sql
SELECT CEIL(2.6);
```

### FLOOR

向下取整。

``` sql
SELECT CEIL(2.6);
```

### FLOOR

取余函数。

``` sql
SELECT MOD(10，3);
```

## 日期函数

|函数名称|描述|
|--|---|
|NOW |当前日期和时间|
|CURDATE |当前日期|
|CURTIME |当前时间|
|DATE ADD| 日期变化|
|DATEDIFF| 计算日期差|
|DATE_FORMAT| 幂运算|

### NOW

当前日期和时间

``` sql
SELECT NOW(); 
```

### CURDATE

当前日期

``` sql
SELECT CURDATE();
```

### CURTIME

当前日期

``` sql
SELECT CURTIME();
```

### 返回日期中指定的部分

年、月、日、小时、分钟、秒

``` sql
SELECT YEAR(NOW());
SELECT MONTH(NOW());
SELECT MONTHNAME(NOW());
SELECT DAY(NOW());
SELECT HOUR(NOW());
SELECT MINUTE(NOW());
SELECT SECOND(NOW());
```

### STR_TO_DATE

将日期格式的字符串转成指定格式的日期。

``` sql
SELECT STR_TO_DATE('2018-09-09','%Y-%m-%d')
```

|序号|格式符|功能|
|--|---|---|
|1|%Y|4位的年份|
|2|%y|2为的年份|
|3|%m|月份(01, 02)|
|4|%c|月份(1, 2)|
|5|%d|日(01, 02)|
|6|%H|小时(24小时制)|
|7|%h|小时(12小时制)|
|8|%i|分钟(01, 02)|
|9|%s|秒(00, 02)|
