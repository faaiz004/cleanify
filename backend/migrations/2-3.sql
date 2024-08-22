drop type if exists vehicle_status;
drop table if exists vehicles;

create type vehicle_status as enum ('WORKING', 'NOT_WORKING', 'BROKEN');
create table vehicles(
    id varchar(255) primary key,
    user_id varchar(255) references users(id) not null,
    status vehicle_status not null,
    location varchar (50) not null
);