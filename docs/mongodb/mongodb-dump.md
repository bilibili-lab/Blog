# 备份与恢复

`MongoDB` 也提供了备份和恢复的功能。

## 备份

备份使用 `mongodump` 命令。

``` js
mongodump - h host - d dbname - o dbdirectory
```

|参数|说明|
|---|----|
|--host -h| 主机名|
|--port -p|端口 |
|--out  -o |备份路径 |
|--collection | 集合的名字 |
|--db | 数据库的名字 |
|--username | 用户名 |
|--password | 密码 |

## 恢复

`mongorestore` 命令来恢复备份的数据。

``` js
mongorestore - h < hostname > <: port > -d dbname < path >
```
