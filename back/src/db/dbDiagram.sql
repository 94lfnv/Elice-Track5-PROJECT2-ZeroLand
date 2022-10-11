CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` varchar(255),
  `nickname` varchar(255) DEFAULT (U.email),
  `profile_photo` varchar(255) DEFAULT ('./default.jpg'),
  `created_time` timestamp,
  `updated_time` timestamp,
  `currrent_latitude` varchar(255),
  `currrent_longitude` varchar(255)
);

CREATE TABLE `stores` (
  `store_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `tag` ENUM ('zero_waste', 'refill'),
  `url` varchar(255),
  `phone` int,
  `open_time` time,
  `close_time` time,
  `currrent_latitude` varchar(255),
  `currrent_longitude` varchar(255),
  `address_id` int,
  `address_detail` varchar(255)
);

CREATE TABLE `address` (
  `address_id` int PRIMARY KEY AUTO_INCREMENT,
  `si_do` varchar(255),
  `gu` varchar(255),
  `dong` varchar(255)
);

CREATE TABLE `like_store` (
  `like_store_id` int PRIMARY KEY AUTO_INCREMENT,
  `time` time,
  `user_id` int,
  `store_id` int
);

CREATE TABLE `stickers` (
  `sticker_id` int PRIMARY KEY AUTO_INCREMENT,
  `tag` ENUM ('visited_zero_waste_shop', 'visited_refill_shop', 'bought_first_zero_waste_product', 'bought_first_refill_product'),
  `time` timestamp,
  `user_id` int
);

CREATE TABLE `reviews` (
  `review_id` int PRIMARY KEY AUTO_INCREMENT,
  `star` int,
  `description` varchar(255),
  `photo` varchar(255) DEFAULT null,
  `created_time` timestamp,
  `updated_time` timestamp,
  `user_id` int,
  `store_id` int
);

CREATE TABLE `posts` (
  `post_id` int PRIMARY KEY AUTO_INCREMENT,
  `tag` ENUM ('board_A', 'board_B', 'board_C'),
  `title` varchar(255),
  `description` varchar(255),
  `photo` varchar(255),
  `created_time` timestamp,
  `updated_time` timestamp,
  `user_id` int
);

CREATE TABLE `like_reviews` (
  `like_review_id` int PRIMARY KEY AUTO_INCREMENT,
  `created_time` timestamp,
  `tag` varchar(255),
  `user_id` int,
  `review_id` int
);

ALTER TABLE `stores` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`);

ALTER TABLE `like_store` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `like_store` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

ALTER TABLE `stickers` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `like_reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `like_reviews` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`);
