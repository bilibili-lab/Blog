# 日志

  日志的有利于项目的开发和维护。 `Nginx`提供了非常灵活的日志功能，可以将每块的配置拥的日志独立的记录。

  日志主要分为两类:
  - 访问日志 
    
     是记录客户端的每一次访问请求

 -  错误日志

     发生错误的日志

## 访问日志

```bash
http {
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    ' "$http_referer" "$http_x_forwarded_for" ';
  access_log  logs/access.log  main;
}
```

- 指令 `log_format`

  用于指定日志的访问格式。 `main` 表示日志的名称， 可以自行定制。

- 指令 `access_log`

  用于指定日志的存放路径。 

|  内置变量   | 描述  |
|  ----  | ----  |
| $remote_addr  | 访问者的`ip`地址 |
| $remote_user  | 单元格 |
| $time_local  | 单元格 |
| $request  | 单元格 |
| $status $body_bytes_sent  | 单元格 |
| $http_referer | 单元格 |
| $http_referer  | 单元格 |
| $http_x_forwarded_for  | 单元格 |


## 错误日志