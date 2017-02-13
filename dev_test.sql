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


insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.40','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812780,-114.0160895,921.057,0.01,0.02,0.01,5.593,4.676,0.26,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.60','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812777,-114.0160891,921.064,-0.01,0.00,0.02,5.476,4.952,0.25,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.80','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812774,-114.0160896,921.088,0.01,-0.01,0.01,4.701,4.441,0.21,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.00','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812763,-114.0160896,921.134,0.00,0.00,0.01,4.200,4.072,0.24,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.20','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812759,-114.0160893,921.181,0.00,0.01,0.01,3.861,3.790,0.27,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.40','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812761,-114.0160890,921.213,0.03,0.02,0.02,3.596,3.568,0.27,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.60','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812761,-114.0160891,921.209,-0.02,0.00,0.03,3.381,3.382,0.24,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.80','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812759,-114.0160892,921.232,-0.02,0.02,0.05,3.223,3.232,0.25,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.00','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812756,-114.0160896,921.249,0.02,0.03,0.07,3.042,3.083,0.27,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.20','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812752,-114.0160899,921.270,0.03,0.03,0.05,2.891,2.955,0.28,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.40','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812745,-114.0160898,921.243,-0.01,0.04,0.05,2.778,2.848,0.26,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.60','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812740,-114.0160900,921.200,-0.04,0.02,0.00,2.688,2.769,0.22,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.80','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812735,-114.0160906,921.162,-0.09,-0.05,-0.09,2.610,2.729,0.29,0.00000,114.84650,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:34.00','%Y-%m-%d %H:%i:%s.%f'),'TEST1',52.0812733,-114.0160910,921.094,0.12,0.01,0.02,2.533,2.682,0.26,0.00000,114.84652,3,6);

insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.20','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812772,-114.0160916,920.963,-0.01,-0.01,0.00,7.671,8.387,0.28,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.40','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812780,-114.0160895,921.057,0.01,0.02,0.01,5.593,4.676,0.26,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.60','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812777,-114.0160891,921.064,-0.01,0.00,0.02,5.476,4.952,0.25,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:31.80','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812774,-114.0160896,921.088,0.01,-0.01,0.01,4.701,4.441,0.21,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.00','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812763,-114.0160896,921.134,0.00,0.00,0.01,4.200,4.072,0.24,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.20','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812759,-114.0160893,921.181,0.00,0.01,0.01,3.861,3.790,0.27,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.40','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812761,-114.0160890,921.213,0.03,0.02,0.02,3.596,3.568,0.27,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.60','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812761,-114.0160891,921.209,-0.02,0.00,0.03,3.381,3.382,0.24,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:32.80','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812759,-114.0160892,921.232,-0.02,0.02,0.05,3.223,3.232,0.25,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.00','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812756,-114.0160896,921.249,0.02,0.03,0.07,3.042,3.083,0.27,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.20','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812752,-114.0160899,921.270,0.03,0.03,0.05,2.891,2.955,0.28,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.40','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812745,-114.0160898,921.243,-0.01,0.04,0.05,2.778,2.848,0.26,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.60','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812740,-114.0160900,921.200,-0.04,0.02,0.00,2.688,2.769,0.22,0.00000,180.00000,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:33.80','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812735,-114.0160906,921.162,-0.09,-0.05,-0.09,2.610,2.729,0.29,0.00000,114.84650,3,6);
insert into stars_record_data(owner, time, title, c_acc, gps_fix, h_acc, h_m_s_l, heading, lat, lon, num_s_v, s_acc, v_acc, vel_d, vel_e, vel_n) values ('will',STR_TO_DATE('2016-09-10 17:35:34.00','%Y-%m-%d %H:%i:%s.%f'),'TEST2',52.0812733,-114.0160910,921.094,0.12,0.01,0.02,2.533,2.682,0.26,0.00000,114.84652,3,6);



