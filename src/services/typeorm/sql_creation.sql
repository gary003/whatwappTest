create table user(
  userId varchar(50),
  primary key (userId)
);

insert into user(userId) values ("22ef5564-0234-11ed-b939-0242ac120002");

create table wallets(
  walletId varchar(50) primary key,
  userId varchar(50),
  hard_currency int,
  soft_currency int,
  FOREIGN KEY (userId)
    REFERENCES user(userId)
);

insert into wallets(walletId, userId, hard_currency, soft_currency) values ("515f73c2-027d-11ed-b939-0242ac120002", "22ef5564-0234-11ed-b939-0242ac120002", 12, 24);
