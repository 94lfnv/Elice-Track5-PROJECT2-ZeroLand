CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL DEFAULT (U.email) UNIQUE,
  `profile_photo` varchar(255) DEFAULT (./default.jpg),
  `created_time` timestamp DEFAULT current_timestamp,
  `updated_time` timestamp DEFAULT current_timestamp ON UPDATE current_timestamp,
  `current_latitude` varchar(255) NOT NULL,
  `current_longitude` varchar(255) NOT NULL
);

CREATE TABLE `stores` (
  `store_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `tag` ENUM ('zero_waste', 'refill') NOT NULL,
  `phone` int,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `address_detail` varchar(255) NOT NULL
);

CREATE TABLE `like_store` (
  `like_store_id` int PRIMARY KEY AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
  `user_id` int NOT NULL,
  `store_id` int NOT NULL
);

CREATE TABLE `reviews` (
  `review_id` int PRIMARY KEY AUTO_INCREMENT,
  `star` int,
  `description` varchar(500),
  `photo` varchar(255),
  `photo2` varchar(255),
  `created_time` timestamp DEFAULT current_timestamp,
  `updated_time` timestamp DEFAULT current_timestamp ON UPDATE current_timestamp,
  `user_id` int NOT NULL,
  `store_id` int NOT NULL
);

CREATE TABLE `like_reviews` (
  `like_review_id` int PRIMARY KEY AUTO_INCREMENT,
  `created_time` timestamp DEFAULT current_timestamp ON UPDATE current_timestamp,
  `tag` ENUM ('like', 'dislike') NOT NULL,
  `user_id` int NOT NULL,
  `review_id` int NOT NULL
);

ALTER TABLE `like_store` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `like_store` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

ALTER TABLE `like_reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `like_reviews` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`);
