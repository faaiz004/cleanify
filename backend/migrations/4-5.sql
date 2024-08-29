drop type if exists fill_status;
create type fill_status_enum as enum('OVERFLOWING', 'FULL', 'NORMAL', 'EMPTY');

alter table containers add column fill_status fill_status_enum not null default 'NORMAL';