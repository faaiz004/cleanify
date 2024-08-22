
drop table if exists containers;
drop type if exists container_type;

create type container_type as enum('TO_PICK', 'BEING_PICKED_UP');
create table containers (
    id varchar(255) primary key,
    updated_at timestamp not null,
    depth float not null,
    status container_type not null,
    location varchar (50) not null
);
