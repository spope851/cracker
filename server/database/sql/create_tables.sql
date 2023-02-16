create table if not exists users (
    id serial primary key,
    full_name varchar (255),
    email varchar (255) not null,
    username varchar (255) not null,
    password varchar (255) not null
);

create table if not exists tracker (
    id serial primary key
);
