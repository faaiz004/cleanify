drop type if exists fill_status;
create type fill_status as enum('OVERFLOWING', 'FULL', 'NORMAL', 'EMPTY');

alter table containers add column fill_status default 'NORMAL'::fill_status;