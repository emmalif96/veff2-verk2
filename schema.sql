
  CREATE TABLE students (
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null, 
  phone INTEGER not null, 
  texti varchar(1500) not null, 
  job varchar(64) not null, 
  processed boolean not null DEFAULT false,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);
