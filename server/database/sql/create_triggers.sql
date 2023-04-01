create trigger update_user
before
update on "user"
for each row
execute procedure trigger_set_timestamp();

create trigger update_tracker
before
update on tracker
for each row
execute procedure trigger_set_timestamp();
