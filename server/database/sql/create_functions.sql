create function trigger_set_timestamp()
returns trigger as $$
begin
    NEW.updated_at = now();
return NEW;
end;
$$ language plpgsql;

CREATE OR REPLACE FUNCTION public.trigger_insert_words()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin
    insert into word(word, tracker) select
		unnest(
			array_remove(
				regexp_split_to_array(
					NEW.overview,
					'(?!'')[[:punct:]\s*]'
				),
				''
			)
		) as word,
		new.id as tracker;
return NEW;
end;
$BODY$;

CREATE OR REPLACE FUNCTION public.trigger_delete_words()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin
    delete from word where tracker = new.id;
return NEW;
end;
$BODY$;

CREATE OR REPLACE FUNCTION public.trigger_insert_sentences()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin
    insert into sentence(sentence, tracker) select
		unnest(
				array_remove(
					regexp_split_to_array(
						NEW.overview,
						'[.?!]\s*'
					),
					''
				)
			) as sentence,
		new.id as tracker;
return NEW;
end;
$BODY$;

CREATE OR REPLACE FUNCTION public.trigger_delete_sentences()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin
    delete from sentence where tracker = new.id;
return NEW;
end;
$BODY$;

create or replace FUNCTION public.get_dashboard_counts(user_id integer, running_avg character varying)
  returns TABLE (word varchar(50), "count" integer)
AS
$func$
	select word.word, count(*) as "count"
	from tracker join word on tracker.id = word.tracker
	where "user" = user_id
	and created_at > now() - (running_avg || ' day')::interval
	group by word.word;
$func$ 
LANGUAGE sql;

create or replace FUNCTION public.get_dashboard_words(user_id integer, running_avg character varying)
  returns setof dashboard_words
AS
$func$
	select * from dashboard_words
	where "user" = user_id
	and created_at > now() - (running_avg || ' day')::interval;
$func$ 
LANGUAGE sql;

create or replace FUNCTION public.get_dashboard_sentences(user_id integer, running_avg character varying)
  returns setof dashboard_sentences
AS
$func$
	select * from dashboard_sentences
	where "user" = user_id
	and created_at > now() - (running_avg || ' day')::interval;
$func$ 
LANGUAGE sql;