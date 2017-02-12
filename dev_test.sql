-- Force table regeneration --

drop table stars_news_board;
drop table stars_record_data;
drop table stars_record;
drop table stars_user;

-- Test data --

-- password is 'password'
insert into stars_user(username,password,email,is_admin) values ('will','$2a$10$m0377As3ubDnW/NHMnuQIu4/Vv72v1rvh35cRz9zLYQQJtiY6W4oW','jianzhao.li@edu.sait.ca',1);
insert into stars_user(username,password,email,is_admin) values ('user1','$2a$10$m0377As3ubDnW/NHMnuQIu4/Vv72v1rvh35cRz9zLYQQJtiY6W4oW','user1@edu.sait.ca',0);
insert into stars_user(username,password,email,is_admin) values ('user2','$2a$10$m0377As3ubDnW/NHMnuQIu4/Vv72v1rvh35cRz9zLYQQJtiY6W4oW','user2@edu.sait.ca',0);
insert into stars_user(username,password,email,is_admin) values ('user3','$2a$10$m0377As3ubDnW/NHMnuQIu4/Vv72v1rvh35cRz9zLYQQJtiY6W4oW','user3@edu.sait.ca',0);

insert into stars_record(owner,title,description) values ('will','TEST1','This is a test record');
insert into stars_record(owner,title,description) values ('will','TEST2','This is a test record');
insert into stars_record(owner,title,description) values ('will','TEST3','This is a test record');
insert into stars_record(owner,title,description) values ('user1','TEST1','This is a test record');
insert into stars_record(owner,title,description) values ('user1','TEST2','This is a test record');
insert into stars_record(owner,title,description) values ('user1','TEST3','This is a test record');
insert into stars_record(owner,title,description) values ('user2','TEST1','This is a test record');
insert into stars_record(owner,title,description) values ('user2','TEST2','This is a test record');
insert into stars_record(owner,title,description) values ('user2','TEST3','This is a test record');
insert into stars_record(owner,title,description) values ('user3','TEST1','This is a test record');
insert into stars_record(owner,title,description) values ('user3','TEST2','This is a test record');
insert into stars_record(owner,title,description) values ('user3','TEST3','This is a test record');
