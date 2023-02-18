create trigger set_timestamp
before
update on users
for each row
execute procedure trigger_set_timestamp();
