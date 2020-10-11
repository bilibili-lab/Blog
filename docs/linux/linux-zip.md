# 压缩与解压

## 常见的压缩格式

 - zip
 - gzip
 - bz2
 - tar.gz

 ## zip

`ZIP` 文件格式是一种压缩目录和文件的数据格式。压缩后的文件后缀名为 `.zip` 。

 - 压缩文件 
   - `zip 压缩后的文件.zip  压缩前文件名 `
```sh{1, 2}
[root@iZm5eeens8iab3xz6f0rfiZ ~]# touch text.txt
[root@iZm5eeens8iab3xz6f0rfiZ ~]# zip text.zip text.txt 
  adding: text.txt (stored 0%)

``` 

 - 压缩目录  
   - `zip  -r 压缩后的文件.zip  压缩前文件名 `
   - `-r  递归压缩`
 ```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# mkdir book
[root@iZm5eeens8iab3xz6f0rfiZ ~]# touch ./book/text.txt
[root@iZm5eeens8iab3xz6f0rfiZ ~]# zip -r book.zip book
  adding: book/ (stored 0%)
  adding: book/text.txt (stored 0%)
 ```

 - 解压

 ```sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# unzip book.zip
 ```    

 ## gzip

`gzip` 命令用于压缩文件, 可以把文件压缩的更小。 
 
 压缩目录是压缩目录下的文件。
 
 压缩后的文件后缀名为 `.gz` 。

|  <div style="width:200px">命令</div> | <div style="width:200px">示例</div> | 含义 | 
|  ---  | --- |  ---|
| gzip                    | gzip a.txt    | 压缩为 `.gz` 格式的压缩文件，源文件会消失。|
| gizp -c 源文件 > 压缩文件  | gizp -c a.txt > yum.txt.gz |  压缩为 `.gz` 格式的压缩文件，源文件不会消失。|
| gzip -r 目录             | gzip -r xx   | 把目录下的每个子文件变成压缩包。并删除源文件。当前目录无变化 |
| gizp -d 压缩文件名        | gzip -d a.txt.gz |   解压文件不保留压缩包 |
| gunzip   压缩文件           | gunzip a.txt.gz |    解压文件不保留压缩包 |

## bz2

`bzip2` 是一个非常有名的压缩工具，并且在大多数主流 `Linux` 发行版上都有。

`bzip2` 不能压缩目录。

|  <div style="width:200px">命令</div> | <div style="width:200px">示例</div> | 含义 | 
|  ---  | --- |  ---|
| bzip2 源文件      | bzip2 a.txt    | 压缩为 `.bz2` 格式的压缩文件，不保留源文件。|
| bzip2 -k 源文件   |  bzip2 -k a.txt  |  压缩为 `.bz2` 格式的压缩文件，保留源文件。|
| bzip2 -d 压缩文件名 | bzip2 -d 1.txt.bz2  | 解压压缩包， 不保留压缩包。|
|bunzip2   压缩文件名 |bunzip2  1.txt.bz2  |    解压压缩包， 不保留压缩包。 |

## tar

- 打包命令。
- 只打包不进行压缩。
- `tar -cvf 打包文件名 源文件`

常用`options`
- c  打包。
- v  显示打包过程。
- v  指定打包后的文件名。
- x  解打包。
- z  压缩为`.tar.gz`格式。

```sh{2,4}
# 打包
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -cvf book.tar book
# 解打包
[root@iZm5eeens8iab3xz6f0rfiZ ~]# tar -xvf book.tar book
```    

 ## tar.gz

- `zip`可以压缩目录但压缩效率不高，`gzip`和`bzip2`压缩率高但不支持目录。
- 可以先将打包为`tar`格式， 再压缩为`.gz`格式。

|  <div style="width:250px">命令</div> | <div style="width:200px">示例</div> | 含义 | 
|  ---  | --- |  ---|
| tar -zcvf 压缩包名.tar.gz  源文件 | tar -zcvf book.tar.gz book    |  可以先打包为`.tar`,在压缩为`.gz`格式。|
| tar -zxvf 压缩包名.tar.gz   |  tar -zxvf book.tar.gz  |  解压`.tar.gz`压缩包 |
| tar -jcvf 压缩包名.tar.bz2  源文件  | tar -jcvf book.tar.gz book   | 可以先打包为`.tar`格式，在压缩为`.bz2`格式|
| tar -jxvf 压缩包名.tar.bz2  | tar -jxvf book.tar.gz   |    解压`.tar.gz`压缩包 |
