/* DROP PROCEDURE get_user_dashboard(
    integer,
    refcursor,
    refcursor,
    refcursor,
    refcursor,
    refcursor
); */
create or replace procedure get_user_info(
	user_id int, 
    INOUT _email refcursor = '', 
    INOUT _username refcursor = '', 
    INOUT _role refcursor = '', 
    INOUT _id refcursor = '', 
    INOUT _last_post refcursor = ''
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

	select max(created_at)
	from tracker 
	where "user" = user_id
	into _last_post;

end; $$