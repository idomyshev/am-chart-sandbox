CREATE TABLE charts(id int primary key, name varchar(50), template varchar(50), config json);
CREATE SEQUENCE chart_id_seq;
alter table charts alter column id set default nextval('chart_id_seq');