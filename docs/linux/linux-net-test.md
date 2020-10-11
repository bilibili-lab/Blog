
# 网络测试命令

## ping

- ping [选项] IP或域名。

- 测试指定`IP`或域名的网络状态。

-  选项

   - -c 次数指定`ping`包的次数。

```sh
[root@iZ2ze4re2plzzckpd3iu6pZ ~]# ping www.baidu.com -c 3
PING www.a.shifen.com (220.181.38.150) 56(84) bytes of data.
64 bytes from 220.181.38.150 (220.181.38.150): icmp_seq=1 ttl=53 time=4.66 ms
64 bytes from 220.181.38.150 (220.181.38.150): icmp_seq=2 ttl=53 time=4.68 ms
64 bytes from 220.181.38.150 (220.181.38.150): icmp_seq=3 ttl=53 time=4.73 ms

--- www.a.shifen.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 5ms
rtt min/avg/max/mdev = 4.655/4.689/4.734/0.085 ms
```

## traceroute

- 路由跟踪命令。

- 选项

    - `-n` 使用`IP`,不使用域名，速度更快。


## wget

- 下载文件。

## tcpdump

- `tcpdump -i eth0 -nnX port21`

- 选项

  - `i` 指定网卡。

  - `-nn` 将数据包中的域名与服务转为`IP`和端口。

  - `-X`以十六进制和`ASCII`码显示数据包内容。

  - `port`指定监听的端口。





