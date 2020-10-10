# 配置文件

* `/etc/nginx/nginx.conf` 主配置文件

* `/etc/nginx/conf.d/*.conf` 包含 `conf.d` 目录下的所有配置文件。

* `/etc/nginx/conf.d/default.conf`

## 基本语法

**/etc/nginx/nginx.conf**
``` sh
#  使用#号可以进行注释。
#  使用$符号可以使用变量。
#  配置文件由指令与指令快组成，指令快以{}将多条指令组成在一起。
#  每条指令以分号；结尾
#  指令与参数之间以空格分隔。
#  有些指令支持正则表达式
[root@iZm5eeens8iab3xz6f0rfiZ ~]# vi /etc/nginx/nginx.conf
user  root;  # 设置运行此nginx用户名
worker_processes  1; # 工作进程数

error_log  /var/log/nginx/error.log warn; # 错误日志文件位置， warn代表日志级别
pid        /var/run/nginx.pid;  # 进程id

events {
    worker_connections  1024; # 工作进程最大连接数
}

http {
    # include 语句允许把多个配置文件组合起来，以提高可维护性。
    include       /etc/nginx/mime.types; # http Content-type 类型
    default_type  application/octet-stream;  # 默认的文件类型
    # 定义日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
   
    access_log  /var/log/nginx/access.log  main;  # 访问日志存放位置
   
    sendfile        on;   # 零拷贝模式
    #tcp_nopush     on;   # TCP 积攒够在推送， 提高性能。
    # 超时时间
    keepalive_timeout  65;

    #gzip  on; # gzip压缩

    #include /usr/local/nginx/conf/*.conf; # 包含其他配置文件

    include /etc/nginx/conf.d/*.conf; # 包含其他配置文件

}
```

**/etc/nginx/conf.d/default.conf**

``` sh
[root@iZm5eeens8iab3xz6f0rfiZ ~]# vi /etc/nginx/conf.d/default.conf
   # 每个server对应一个服务。
   server {
        listen       80;  # 端口
        server_name  0.0.0.0; # 域名 || ip地址

        #charset koi8-r;   # 字符编码

        #access_log  logs/host.access.log  main;  # 访问日志的位置和格式
        root  /root/vue-element-admin/dist;

        location / {   #所有匹配的路径 
            index  index.html index.htm;  
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        # deny  all 禁止所有人访问
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
```
## Systemd

- 系统启动和服务器守护进程管理器，负载在系统启动或者停止时，激活系统资源，服务器和其他进程。根据管理，字母`d`是守护进程（daemon）的缩写。

## 配置目录

|  配置目录   | 用途  |
|  ----  | ----  |
|  /usr/lib/systemd/system|每个服务最主要的启动脚本设置，类似于之前的/etc/initd.d |
|  /run/system/system| 系统执行过程中所产生的服务脚本，比上面的目录优先进行。 |
|  /etc/system/system| 管理员建立的执行脚本，类似于/etc/rc.d/rcN.d/Sxx类的功能，比上面的目录优先运行，在三者之中，此目录优先级最高。|

## systemctl

- 监控和控制systemd的主要命令是`systemctl`。

- 该命令可用于查看系统和管理系统服务。

```sh
命令： systemctl command name.service
启动： service name start => systemctl start name.service
停止： service name stop => systemctl stop name.service
重启： service name restart => systemctl restart name.service
状态： service name status => systemctl status name.service
```

## 启动和重新加载

```sh
systemctl restart nginx.service
systemctl reload nginx.service
nginx -s reload
```

## 日志类型

###  日志类型

- `/var/log/nginx/access.log` 访问日志

- `/var/log/nginx/error.log` 错误日志

### log_format

- [内置变量](http://nginx.org/en/docs/http/ngx_http_log_module.html)

```sh
http {
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    ' "$http_referer" "$http_x_forwarded_for" ';
  access_log  logs/access.log  main;
}
```

|  内置变量   | 描述  |
|  ----  | ----  |
| $remote_addr  | 访问者的`ip`地址 |
| $remote_user  | 客户端的用户名 |
| $time_local  | 访问时间和时区 |
| $request  | 请求行 |
| $status  | HTTP 请求状态 |
| $body_bytes_sent  | 发送给客户端的文件内容大小 |
| $http_referer    | 告诉服务器该网页是从哪个页面链接过来的 |
| $http_x_forwarded_for  | X-Forwarded-For: client, proxy1, proxy2，服务端最远的设备 IP，然后是每一级代理设备的 IP |

### HTTP请求变量

- 注意把`-`换成`_`，比如`User-Agent`对应`$http_user_agent`

|  名称   | 含义  |  例子 |
|  ----  | ----  | --- |
| arg_PARAMETER | 请求参数 |  $arg_name |
| http_HEADER   | 请求头 | $http_refer  $http_host $http_user_agent  |
| sent_http_HEADER | 响应头 | send_http_cookies |
