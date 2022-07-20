drop table if exists message;
drop table if exists user;
drop table if exists wallets;
drop table if exists club;

create table wallets(
  walletId varchar(50) primary key,
  hard_currency int,
  soft_currency int
);

insert into wallets(walletId, hard_currency, soft_currency) 
  values 
  ("515f73c2-027d-11ed-b939-0242ac120002", 100, 124),
  ("698f73c2-027d-11ed-b939-0242ac120002", 25, 45);

create table club(
  clubId varchar(50),
  maxUserNum int,
  primary key (clubId)
);

insert into club(clubId, maxUserNum) values ("77ef5564-0234-11ed-b939-0242ac120002", 50);

create table user(
  userId varchar(50),
  walletId varchar(50),
  clubId varchar(50),
  FOREIGN KEY (walletId) REFERENCES wallets(walletId),
  FOREIGN KEY (clubId) REFERENCES club(clubId),
  primary key (userId)
);

insert into user(userId, walletId, clubId) 
  values 
  ("22ef5564-0234-11ed-b939-0242ac120002", "515f73c2-027d-11ed-b939-0242ac120002", null),
  ("35269564-0234-11ed-b939-0242ac120002", "698f73c2-027d-11ed-b939-0242ac120002", null);

create table message(
  messageId varchar(50),
  senderId varchar(50),
  clubId varchar(50),
  content varchar(200),
  FOREIGN KEY (senderId) REFERENCES user(userId),
  FOREIGN KEY (clubId) REFERENCES club(clubId),
  primary key (messageId)
);

insert into message(messageId, senderId, clubId, content) values ("256324-0234-11ed-b939-0242ac120002", "22ef5564-0234-11ed-b939-0242ac120002", "77ef5564-0234-11ed-b939-0242ac120002", "This is a message content");
