FROM postgres:alpine
ENV POSTGRES_PASSWORD=postgres
COPY ./sql/create_tables.sql /docker-entrypoint-initdb.d/create_tables.sql
