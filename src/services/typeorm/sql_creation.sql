create table user(
  userId varchar(50),
  primary key (userId)
);

insert into user(userId) values ("22ef5564-0234-11ed-b939-0242ac120002");

create table wallets(
  walletId int primary key AUTO_INCREMENT,
  userId varchar(50),
  hard_currency int,
  soft_currency int,
  FOREIGN KEY (userId)
    REFERENCES user(userId)
);

insert into wallets(userId, hard_currency, soft_currency) values ("22ef5564-0234-11ed-b939-0242ac120002", 12, 24);
