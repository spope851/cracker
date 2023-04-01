create table if not exists role_lookup (
    id serial primary key,
    name varchar (10) not null unique,
    description varchar (255) not null
);

create table if not exists "user" (
    id serial primary key,
    username varchar (50) not null unique,
    password varchar (100) not null,
    email varchar (100) not null unique,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    role integer default 1,
    foreign key(role) references role_lookup(id)
);

create table if not exists tracker (
    id serial primary key,
    overview varchar (512) not null,
    number_creative_hours numeric (3,1) not null,
    rating smallint not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    "user" integer not null,
    foreign key("user") references "user"(id)
);

-- PROD only feature
-- unique index for tracker table
-- this index is saying a new row cannot be added unless all 4 values (day, month and year of created_at, and "user") are unique
/*
create unique index day_uq on tracker (
    extract(day from created_at),
    extract(month from created_at),
    extract(year from created_at),
    "user"
);
*/

-- statement for elevating user role to admin:
/*
update "user" set role=2 where id=1;
*/

-- statement for adding a row to tracker:
/*
insert into tracker (
overview,
number_creative_hours,
rating,
"user"
) values (
'this is an overview. these are the things I did today. how nice',
2.5,
2,
1
);
*/
