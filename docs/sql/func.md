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
