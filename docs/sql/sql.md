# SQL

## SQL是什么？

`Structured Query Language` 结构化查询语言。

### 为什么要用SQL？

* 使用界面操作数据不方便。

* 我们需要通过应用程序去操作数据库。

## SQL组成

* `DDL（data definition language）` 数据库定义语言

主要的命令有 `CREATE` 、 `ALERT` 、 `DROP` 等， `DDL` 主要是用在定义或者改变表结构、
数据类型、表之间的链接和约束等初始化工作，他们大多建立在表使用。

* `DML（data manipulation language）` 是数据库操作语言

    它们是 `SELECT` 、 `UPDATE` 、 `INSERT` 、 `DELETE` ，就象它的名字一样，这 4 条命令是用来对数据库里的数据进行操作的语言。

* `DCL（Data Control Language）`
    是数据库控制功能。是用来设置或更改数据库用户或角色权限的语句，
    包括 `grant,deny,revoke等）` 语句。在默认状态下，只有 `sysadmin,dbcreator,db_owner或db_securityadmin` 等人员才有权力执行DCL。

* `TCL - Transaction Control Language`
  

    事务控制语言。

    - `COMMIT` 保存已完成的工作。
    - `SAVEPOINT` 在事务中设置保存点，可以回滚到此处。
    - `ROLLBACK` 回滚。
    - `SET TRANSACTION` 改变事务选项。
