-- FUNCTION: public.get_dashboard_sentences(integer, character varying, integer[], numeric, numeric)

-- DROP FUNCTION IF EXISTS public.get_dashboard_sentences(integer, character varying, integer[], numeric, numeric);

CREATE OR REPLACE FUNCTION public.get_dashboard_sentences(
	user_id integer,
	running_avg character varying,
	p_rating integer[] DEFAULT NULL::integer[],
	min_hours numeric DEFAULT 0,
	max_hours numeric DEFAULT 24)
    RETURNS SETOF dashboard_sentences 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
	select * from dashboard_sentences
	where "user" = user_id
	and created_at > now() - (running_avg || ' day')::interval
	and rating = ANY(COALESCE(p_rating, ARRAY [-2, -1, 0, 1, 2]))
	and number_creative_hours between min_hours and max_hours;
$BODY$;

ALTER FUNCTION public.get_dashboard_sentences(integer, character varying, integer[], numeric, numeric)
    OWNER TO postgres;
