# 执行脚本

1. 写好`student.js`代码。

``` js
var startTime = Date.now();
var db = connect('school');
let result = []
for (var = i; i < 10000; i++) {
    result.push({
        _id: 1,
        name: 'qianduan' + '1'
    })
}
db.school.insert(result)
print(Date.now() - startTime);
```

2. 切换到该目录，执行命令。

``` sh
mongo student.js
```
