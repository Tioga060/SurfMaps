create function search_maps(search text)
  -- This function will return a set of posts from the `post` table. The
  -- `setof` part is important to PostGraphile, check out our Functions article
  -- to learn why.
  returns setof public."SurfMap" as $$
    -- Write our advanced query as a SQL query!
    select *
    from public."SurfMap"
    where
      -- Use the `ILIKE` operator on both the `headline` and `body` columns. If
      -- either return true, return the post.
      mapname ilike ('%' || search || '%') or
      author ilike ('%' || search || '%')
  -- End the function declaring the language we used as SQL and add the
  -- `STABLE` marker so PostGraphile knows its a query and not a mutation.
  $$ language sql stable;