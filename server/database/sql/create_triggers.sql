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

CREATE TRIGGER insert_words_from_overview AFTER INSERT 
ON tracker
FOR EACH ROW
execute procedure trigger_insert_words();

CREATE TRIGGER delete_words_from_overview AFTER UPDATE 
ON tracker
FOR EACH ROW
execute procedure trigger_delete_words();

CREATE TRIGGER update_words_from_overview AFTER UPDATE 
ON tracker
FOR EACH ROW
execute procedure trigger_insert_words();

CREATE TRIGGER insert_sentences_from_overview AFTER INSERT 
ON tracker
FOR EACH ROW
execute procedure trigger_insert_sentences();

CREATE TRIGGER delete_sentences_from_overview AFTER UPDATE 
ON tracker
FOR EACH ROW
execute procedure trigger_delete_sentences();

CREATE TRIGGER update_sentences_from_overview AFTER UPDATE 
ON tracker
FOR EACH ROW
execute procedure trigger_insert_sentences();
