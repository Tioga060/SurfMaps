create function current_user_id() returns uuid as $$
	select nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable security definer;

create function current_userSteamInfo() returns public."UserSteamInfo" as $$
 select * from public."UserSteamInfo" where "userId" = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable security definer;