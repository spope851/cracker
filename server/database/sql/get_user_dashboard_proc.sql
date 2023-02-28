/* DROP PROCEDURE get_user_dashboard(
    integer,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor
); */
create or replace procedure get_user_dashboard(
	user_id int, 
	-- CREATIVE HOURS AVERAGES
    INOUT _30_day_avg refcursor = '30 day creative hours average', 
    INOUT _60_day_avg refcursor = '60 day creative hours average', 
    INOUT _90_day_avg refcursor = '90 day creative hours average', 
    INOUT _year_avg refcursor = '1 year creative hours average', 
	-- RATINGS COUNTS 30
    INOUT _30_day_count_neg_2 refcursor = '# of -2 ratings in past 30 days', 
    INOUT _30_day_count_neg_1 refcursor = '# of -1 ratings in past 30 days', 
    INOUT _30_day_count_0 refcursor = '# of 0 ratings in past 30 days', 
    INOUT _30_day_count_1 refcursor = '# of 1 ratings in past 30 days', 
    INOUT _30_day_count_2 refcursor = '# of 2 ratings in past 30 days', 
	-- RATINGS COUNTS 60
    INOUT _60_day_count_neg_2 refcursor = '# of -2 ratings in past 60 days', 
    INOUT _60_day_count_neg_1 refcursor = '# of -1 ratings in past 60 days', 
    INOUT _60_day_count_0 refcursor = '# of 0 ratings in past 60 days', 
    INOUT _60_day_count_1 refcursor = '# of 1 ratings in past 60 days', 
    INOUT _60_day_count_2 refcursor = '# of 2 ratings in past 60 days', 
	-- RATINGS COUNTS 90
    INOUT _90_day_count_neg_2 refcursor = '# of -2 ratings in past 90 days', 
    INOUT _90_day_count_neg_1 refcursor = '# of -1 ratings in past 90 days', 
    INOUT _90_day_count_0 refcursor = '# of 0 ratings in past 90 days', 
    INOUT _90_day_count_1 refcursor = '# of 1 ratings in past 90 days', 
    INOUT _90_day_count_2 refcursor = '# of 2 ratings in past 90 days', 
	-- RATINGS COUNTS 1 YEAR
    INOUT _year_count_neg_2 refcursor = '# of -2 ratings in past year', 
    INOUT _year_count_neg_1 refcursor = '# of -1 ratings in past year', 
    INOUT _year_count_0 refcursor = '# of 0 ratings in past year', 
    INOUT _year_count_1 refcursor = '# of 1 ratings in past year', 
    INOUT _year_count_2 refcursor = '# of 2 ratings in past year', 
	-- WORDCLOUDS
    INOUT _30_day_wordcloud refcursor = 'concatenate all overviews from past 30 days',
    INOUT _60_day_wordcloud refcursor = 'concatenate all overviews from past 60 days',
    INOUT _90_day_wordcloud refcursor = 'concatenate all overviews from past 90 days',
    INOUT _year_wordcloud refcursor = 'concatenate all overviews from past year'
)
language plpgsql
as $$
declare
-- variable declaration
begin

	-- CREATIVE HOURS AVERAGES
	select avg(number_creative_hours) 
	from tracker 
	where "user" = user_id
	and created_at > now() - interval '30 day'
	into _30_day_avg;

	select avg(number_creative_hours) 
	from tracker 
	where "user" = user_id
	and created_at > now() - interval '60 day'
	into _60_day_avg;

	select avg(number_creative_hours) 
	from tracker 
	where "user" = user_id
	and created_at > now() - interval '90 day'
	into _90_day_avg;

	select avg(number_creative_hours) 
	from tracker 
	where "user" = user_id
	and created_at > now() - interval '1 year'
	into _year_avg;
	
	-- RATINGS COUNTS 30
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -2
	and created_at > now() - interval '30 day'
	into _30_day_count_neg_2;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -1
	and created_at > now() - interval '30 day'
	into _30_day_count_neg_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 0
	and created_at > now() - interval '30 day'
	into _30_day_count_0;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 1
	and created_at > now() - interval '30 day'
	into _30_day_count_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 2
	and created_at > now() - interval '30 day'
	into _30_day_count_2;
	
	-- RATINGS COUNTS 60
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -2
	and created_at > now() - interval '60 day'
	into _60_day_count_neg_2;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -1
	and created_at > now() - interval '60 day'
	into _60_day_count_neg_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 0
	and created_at > now() - interval '60 day'
	into _60_day_count_0;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 1
	and created_at > now() - interval '60 day'
	into _60_day_count_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 2
	and created_at > now() - interval '60 day'
	into _60_day_count_2;
	
	-- RATINGS COUNTS 90
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -2
	and created_at > now() - interval '90 day'
	into _90_day_count_neg_2;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -1
	and created_at > now() - interval '90 day'
	into _90_day_count_neg_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 0
	and created_at > now() - interval '90 day'
	into _90_day_count_0;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 1
	and created_at > now() - interval '90 day'
	into _90_day_count_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 2
	and created_at > now() - interval '90 day'
	into _90_day_count_2;
	
	-- RATINGS COUNTS 1 YEAR
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -2
	and created_at > now() - interval '1 year'
	into _year_count_neg_2;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = -1
	and created_at > now() - interval '1 year'
	into _year_count_neg_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 0
	and created_at > now() - interval '1 year'
	into _year_count_0;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 1
	and created_at > now() - interval '1 year'
	into _year_count_1;
	
	select count(*)
	from tracker
	where "user" = user_id
	and rating = 2
	and created_at > now() - interval '1 year'
	into _year_count_2;
	
	-- WORDCLOUDS
	select string_agg(overview, ' ')
	from tracker
	where "user" = user_id
	and created_at > now() - interval '30 day'
	into _30_day_wordcloud;
	
	select string_agg(overview, ' ')
	from tracker
	where "user" = user_id
	and created_at > now() - interval '60 day'
	into _60_day_wordcloud;
	
	select string_agg(overview, ' ')
	from tracker
	where "user" = user_id
	and created_at > now() - interval '90 day'
	into _90_day_wordcloud;
	
	select string_agg(overview, ' ')
	from tracker
	where "user" = user_id
	and created_at > now() - interval '1 year'
	into _year_wordcloud;

end; $$