create trigger set_timestamp
before
update on "user"
for each row
execute procedure trigger_set_timestamp();
