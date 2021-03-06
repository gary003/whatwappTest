drop table if exists donation;
drop table if exists message;
drop table if exists user;
drop table if exists wallet;
drop table if exists club;

create table wallet(
  walletId varchar(50) primary key,
  hard_currency int,
  soft_currency int
);

insert into wallet(walletId, hard_currency, soft_currency) 
  values 
  ("515f73c2-027d-11ed-b939-0242ac120002", 1000, 1240),
  ("698f73c2-027d-11ed-b939-0242ac120002", 250, 450),
  ("412cddd2-027d-11ed-b939-0242ac120002", 850, 750),
  ("96373dc2-027d-11ed-b939-0242ac120002", 950, 650);

create table club(
  clubId varchar(50),
  maxUserNum int,
  primary key (clubId)
);

insert into club(clubId, maxUserNum) 
  values
  ("77ef5564-0234-11ed-b939-0242ac120002", 50),
  ("56se5564-0234-11ed-b939-0242ac120002", 50);

create table user(
  userId varchar(50),
  walletId varchar(50),
  clubId varchar(50),
  FOREIGN KEY (walletId) REFERENCES wallet(walletId),
  FOREIGN KEY (clubId) REFERENCES club(clubId),
  primary key (userId)
);

insert into user(userId, walletId, clubId) 
  values 
  ("22ef5564-0234-11ed-b939-0242ac120002", "515f73c2-027d-11ed-b939-0242ac120002", "77ef5564-0234-11ed-b939-0242ac120002"),
  ("35269564-0234-11ed-b939-0242ac120002", "698f73c2-027d-11ed-b939-0242ac120002", "77ef5564-0234-11ed-b939-0242ac120002"),
  ("14523564-0234-11ed-b939-0242ac120002", "412cddd2-027d-11ed-b939-0242ac120002", "56se5564-0234-11ed-b939-0242ac120002"),
  ("68965564-0234-11ed-b939-0242ac120002", "96373dc2-027d-11ed-b939-0242ac120002", null);

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

create table donation(
  donationId varchar(50),
  recipientId varchar(50),
  fundingGoal int,
  currentFund int default 0,
  FOREIGN KEY (recipientId) REFERENCES user(userId),
  primary key (donationId)
);

insert into donation(donationId, recipientId, fundingGoal) values ("45698-0234-11ed-b939-0242ac120002", "35269564-0234-11ed-b939-0242ac120002", 2150);
