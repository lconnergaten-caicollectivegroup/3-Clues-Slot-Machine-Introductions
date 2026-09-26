-- Apply after the existing rooms, players, votes schema.
-- The host signs in using a verified Supabase email magic link.
create policy "host creates room" on public.rooms for insert to authenticated
 with check ((select auth.jwt()->>'email') = 'lconnergaten@caicollectivegroup.com');
create policy "host advances room" on public.rooms for update to authenticated
 using ((select auth.jwt()->>'email') = 'lconnergaten@caicollectivegroup.com')
 with check ((select auth.jwt()->>'email') = 'lconnergaten@caicollectivegroup.com');
create policy "host scores players" on public.players for update to authenticated
 using ((select auth.jwt()->>'email') = 'lconnergaten@caicollectivegroup.com')
 with check ((select auth.jwt()->>'email') = 'lconnergaten@caicollectivegroup.com');
create policy "signed in room read" on public.rooms for select to authenticated using (true);
create policy "signed in players read" on public.players for select to authenticated using (true);
create policy "signed in votes read" on public.votes for select to authenticated using (true);
revoke execute on function public.finalize_game_scores(uuid) from public, anon;
grant execute on function public.finalize_game_scores(uuid) to authenticated;
drop policy "votes submit" on public.votes;
create policy "votes only during current question" on public.votes for insert to anon, authenticated
 with check (
   exists(select 1 from public.rooms r where r.id=room_id and r.phase='voting' and r.current_question=question)
   and exists(select 1 from public.players p where p.id=player_id and p.room_id=room_id)
 );
