FROM debian:bullseye

RUN apt-get update -y

RUN apt-get install apt-utils mariadb-server -y

COPY ./50-server.cnf /etc/mysql/mariadb.conf.d/50-server.cnf

COPY dbtables.sql /dbtables.sql

COPY ./Entrypoint.sh /Entrypoint.sh

RUN chmod +x /Entrypoint.sh

CMD ["/Entrypoint.sh"]