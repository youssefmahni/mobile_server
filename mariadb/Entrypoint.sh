#!/bin/bash

service mariadb start

echo "CREATE DATABASE IF NOT EXISTS $db_name ;" > mariadbfile
echo "CREATE USER IF NOT EXISTS '$db_user'@'%' IDENTIFIED BY '$db_pwd' ;" >> mariadbfile
# echo "CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY '$root_pwd' ;" >> mariadbfile
echo "GRANT ALL PRIVILEGES ON $db_name.* TO '$db_user'@'%' ;" >> mariadbfile
echo "FLUSH PRIVILEGES;" >> mariadbfile
# echo "use $db_name ;" >> mariadbfile

mysql < mariadbfile

echo "user and db created"


mysql < /dbtables.sql

echo "tables created"

# if ! service mariadb status; then
#     echo "mariadb not running"
# fi

# echo "-----"
# grep -i 'socket' /etc/mysql/my.cnf
# echo "-----"
# ls -l /run/mysqld
# echo "-----"

# service mariadb stop


# mysqld_safe

tail -f /dev/null