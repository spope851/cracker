create table if not exists role_lookup (
    id serial primary key,
    name varchar (255) not null unique,
    description varchar (255) not null
);

create table if not exists "user" (
    id serial primary key,
    email varchar (255) not null unique,
    username varchar (255) not null unique,
    password varchar (255) not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    role integer default 1,
    foreign key(role) references role_lookup(id)
);

create table if not exists tracker (
    id serial primary key
);
