insert into todos (
  name,
  user_id ,
  category_id,
  todo_date,
  complete_date,
  enquiry,
  enquiry_processed,
  details
)
values
(
'Order to go from Mcdonalds',
1,
2,
NOW()+INTERVAL '2 day',
null,
'get Big Mac combo',
true,
'call 1844-000-0000 or use app to order for 7pm pick-up https://www4.mcdonalds.ca/mcdeliverycanada/'
);

insert into todos (
  name,
  user_id ,
  category_id,
  todo_date,
  complete_date,
  enquiry,
  enquiry_processed,
  details
)
values
(
'Watch new episode of Yellowstone',
2,
1,
NOW()+INTERVAL '1 day',
null,
'watch next episode of Yellowstone',
true,
'Yellowstone (season 2 episode 3) tomorrow at 8pm https://www.paramountnetwork.com/fan-hub/yellowstone'
);

insert into todos (
  name,
  user_id ,
  category_id,
  todo_date,
  complete_date,
  enquiry,
  enquiry_processed,
  details
)
values
(
'Boxing day - new monitor from Amazom',
3,
4,
NOW()+INTERVAL '1 day',
null,
'get new monitor from anazon boxing day sales',
true,
'Amazon boxing day sales starts tomorrow at 10am https://www.amazon.ca/monitor-4k-monitor-computer-monitor-monitors/b/ref=sv_pc_9?ie=UTF8&node=677246011'
);
