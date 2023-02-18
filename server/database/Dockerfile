FROM postgres:alpine
ENV POSTGRES_PASSWORD=postgres
COPY ./sql/*.sql /docker-entrypoint-initdb.d
