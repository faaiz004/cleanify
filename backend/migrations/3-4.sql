drop table if exists areas;

create table areas(
    id varchar(255) primary key,
    center varchar(50) not null,
    radius float not null,
    name varchar(255) not null
);