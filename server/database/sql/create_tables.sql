create table if not exists users (
    id serial primary key,
    full_name varchar (255),
    email varchar (255) not null unique,
    username varchar (255) not null unique,
    password varchar (255) not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table if not exists tracker (
    id serial primary key
);
