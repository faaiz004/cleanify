drop type if exists point_type_enum;
create type point_type_enum as enum('STARTING', 'DUMPING');

create table points (
    id varchar(255) primary key,
    type point_type_enum not null,
    user_id varchar(255) references users(id) not null,
    name varchar(255) not null,
    location varchar(50) not null
);