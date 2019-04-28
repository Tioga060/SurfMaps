create function current_user_id() returns uuid as $$
	select nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable security definer;

create function current_userSteamInfo() returns public."UserSteamInfo" as $$
 select * from public."UserSteamInfo" where "userId" = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable security definer;

create index usersteaminfo_idx on public."UserSteamInfo" using GIN ("name" gin_trgm_ops)

create function search_steam_users(search text)
  -- This function will return a set of posts from the `post` table. The
  -- `setof` part is important to PostGraphile, check out our Functions article
  -- to learn why.
  returns setof public."UserSteamInfo" as $$
    -- Write our advanced query as a SQL query!
	select * from public."UserSteamInfo" where "name" ILIKE ('%' || search || '%') limit 5;
  -- End the function declaring the language we used as SQL and add the
  -- `STABLE` marker so PostGraphile knows its a query and not a mutation.
  $$ language sql stable;