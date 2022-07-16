drop table if exists user;
drop table if exists wallets;

create table wallets(
  walletId varchar(50) primary key,
  hard_currency int,
  soft_currency int
);

insert into wallets(walletId, hard_currency, soft_currency) values ("515f73c2-027d-11ed-b939-0242ac120002", 12, 24);

create table user(
  userId varchar(50),
  walletId varchar(50),
  FOREIGN KEY (walletId) REFERENCES wallets(walletId),
  primary key (userId)
);

insert into user(userId, walletId) values ("22ef5564-0234-11ed-b939-0242ac120002", "515f73c2-027d-11ed-b939-0242ac120002");
