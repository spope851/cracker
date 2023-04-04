-- drop procedure get_user_info(
--     integer,
--     refcursor,
--     refcursor,
--     refcursor,
--     refcursor,
--     refcursor,
--     refcursor,
--     refcursor,
--     refcursor,
--     refcursor
-- );
create or replace procedure get_user_info(
	user_id int, 
    inout _email refcursor = '', 
    inout _username refcursor = '', 
    inout _role refcursor = '', 
    inout _id refcursor = '', 
    inout _last_post_date refcursor = '', 
    inout _last_post_id refcursor = '', 
    inout _last_post_overview refcursor = '', 
    inout _last_post_hours refcursor = '', 
    inout _last_post_rating refcursor = ''
)
language plpgsql
as $$
declare
-- variable declaration
begin

	select id, email, role, username
	from "user"
	where id = user_id
	into _id, _email, _role, _username;

	select tracker.id, tracker.overview, tracker.number_creative_hours, tracker.rating, tracker.created_at
    from tracker
    inner join (
        select max(created_at) as created_at
        from tracker
        where "user" = user_id
    ) last_post
    on tracker.created_at = last_post.created_at
	into _last_post_id, _last_post_overview, _last_post_hours, _last_post_rating, _last_post_date;

end; $$
