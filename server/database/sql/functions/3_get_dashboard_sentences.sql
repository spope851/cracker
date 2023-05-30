-- FUNCTION: public.get_dashboard_sentences(integer, character varying)

-- DROP FUNCTION IF EXISTS public.get_dashboard_sentences(integer, character varying);

CREATE OR REPLACE FUNCTION public.get_dashboard_sentences(
	user_id integer,
	running_avg character varying)
    RETURNS SETOF dashboard_sentences 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
	select * from dashboard_sentences
	where "user" = user_id
	and created_at > now() - (running_avg || ' day')::interval;
$BODY$;

ALTER FUNCTION public.get_dashboard_sentences(integer, character varying)
    OWNER TO postgres;
