FROM postgres:alpine
COPY ./sql/trigger_functions/*.sql /docker-entrypoint-initdb.d
COPY ./sql/tables/*.sql /docker-entrypoint-initdb.d
COPY ./sql/views/*.sql /docker-entrypoint-initdb.d
COPY ./sql/functions/*.sql /docker-entrypoint-initdb.d
COPY ./sql/procedures/*.sql /docker-entrypoint-initdb.d