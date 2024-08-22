drop table if exists users;
drop type if exists user_type;

create type user_type as enum('ADMIN', 'GOVERNMENT', 'PRIVATE');

create table users (
    id varchar(255) primary key,
    full_name varchar(255) not null,
    type user_type not null,
    email varchar(255) not null,
    password varchar(255) not null
);
