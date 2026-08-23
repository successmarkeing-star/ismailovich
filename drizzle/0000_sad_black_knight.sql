CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`orderNumber` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`status` enum('inquiry','confirmed','sourcing','shipping','completed','cancelled') NOT NULL DEFAULT 'inquiry',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`trackingNumber` varchar(64) NOT NULL,
	`orderNumber` varchar(64),
	`productName` varchar(255) NOT NULL,
	`origin` varchar(128) NOT NULL,
	`destination` varchar(128) NOT NULL,
	`mode` enum('sea','air','road') NOT NULL,
	`status` enum('quote','sourcing','processing','inTransit','customs','outForDelivery','delivered') NOT NULL DEFAULT 'processing',
	`progress` int NOT NULL DEFAULT 0,
	`currentLocation` varchar(128),
	`estimatedArrival` timestamp,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shipments_id` PRIMARY KEY(`id`),
	CONSTRAINT `shipments_trackingNumber_unique` UNIQUE(`trackingNumber`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
