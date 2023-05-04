-- PROCEDURE: public.get_user_dashboard_basic(integer, character varying, refcursor, refcursor, refcursor)

-- DROP PROCEDURE IF EXISTS public.get_user_dashboard_basic(integer, character varying, refcursor, refcursor, refcursor);

CREATE OR REPLACE PROCEDURE public.get_user_dashboard_basic(
	IN user_id integer,
	IN running_avg character varying,
	INOUT _words refcursor,
	INOUT _counts refcursor,
	INOUT _sentences refcursor)
LANGUAGE 'plpgsql'
AS $BODY$
begin
	open _words for
		select
			unnest(
				array_remove(
					regexp_split_to_array(
						overview,
						'(?!'')[[:punct:]\s*]'
					),
					''
				)
			) as word,
			rating,
			number_creative_hours,
			overview,
			created_at,
			id
		from tracker
		where "user" = user_id
		and created_at > now() - (running_avg || ' day')::interval;
		
	open _counts for
		select word, count(*) as "count" from (
			select
				unnest(
					array_remove(
						regexp_split_to_array(
							overview,
							'(?!'')[[:punct:]\s*]'
						),
						''
					)
				) as word
			from tracker
			where "user" = user_id
			and created_at > now() - (running_avg || ' day')::interval
		) as words
		group by words.word
		order by "count" desc;

	open _sentences for
		select
			unnest(
				array_remove(
					regexp_split_to_array(
						overview,
						'[.?!]\s*'
					),
					''
				)
			) as sentence,
			rating,
			number_creative_hours,
			created_at,
			overview
		from tracker
		where "user" = user_id
		and created_at > now() - (running_avg || ' day')::interval;
end; 
$BODY$;
ALTER PROCEDURE public.get_user_dashboard_basic(integer, character varying, refcursor, refcursor, refcursor)
    OWNER TO postgres;
