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

create function can_update_map(mapId UUID) returns boolean as $$
	DECLARE
		uploader UUID;
		currentUser UUID;
	BEGIN
		SELECT current_user_id() INTO currentUser;
		SELECT "uploaderId" FROM public."Map" where id = mapId
			INTO uploader;
		RETURN (uploader = currentUser or (
			EXISTS (SELECT "authorId" FROM public."MapAuthor" where "mapId" = mapId and "authorId" = currentUser)
		)) IS TRUE;
  	END;
$$ language plpgsql stable security definer;

create policy update_if_author on public."Map" for update
	with check (can_update_map("id"))

alter table public."Map" enable row level security;

create policy verified_user_insert on public."TextMarkdown" for insert to verified_user with check (true)

create policy insert_if_author_stage on public."StageImage" for insert with check (can_update_map((select "mapId" from public."Stage" where "id" = "stageId")))

select * from pg_policies

create policy update_map_debug on public."Map" for update using (true) with check ("uploaderId" = current_user_id())

create policy update_map_debug on public."Map" for update using (true) with check (true)

drop policy public_select on public."File";
drop policy public_select on public."Image";
drop policy public_select on public."Map";
drop policy public_select on public."MapAuthor";
drop policy public_select on public."MapContributor";
drop policy public_select on public."MapDescription";
drop policy public_select on public."MapFile";
drop policy public_select on public."MapImage";
drop policy public_select on public."Stage";
drop policy public_select on public."StageImage";
drop policy public_select on public."TextMarkdown";

create policy public_select on public."File" for select using (true);
create policy public_select on public."Image" for select using (true);
create policy public_select on public."Map" for select using (true);
create policy public_select on public."MapAuthor" for select using (true);
create policy public_select on public."MapContributor" for select using (true);
create policy public_select on public."MapDescription" for select using (true);
create policy public_select on public."MapFile" for select using (true);
create policy public_select on public."MapImage" for select using (true);
create policy public_select on public."Stage" for select using (true);
create policy public_select on public."StageImage" for select using (true);
create policy public_select on public."TextMarkdown" for select using (true);
