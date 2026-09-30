create or replace function public.restart_live_game(target_room uuid)
returns public.rooms language plpgsql security invoker set search_path = '' as $$
declare old_room public.rooms; new_room public.rooms;
begin
 if (select auth.jwt()->>'email') is distinct from 'lconnergaten@caicollectivegroup.com' then raise exception 'Host access required'; end if;
 select * into old_room from public.rooms where id=target_room for update;
 if not found or old_room.pin <> 'SOLES#3' then raise exception 'This room has already restarted. Reopen the host dashboard.'; end if;
 update public.rooms set pin='archived-'||id::text, phase='results' where id=target_room;
 insert into public.rooms(pin) values(old_room.pin) returning * into new_room;
 return new_room;
end $$;
revoke all on function public.restart_live_game(uuid) from public, anon;
grant execute on function public.restart_live_game(uuid) to authenticated;
