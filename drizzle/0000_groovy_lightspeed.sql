CREATE TABLE `content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text,
	`filepath` text,
	`text` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fileid` integer,
	`link` text NOT NULL,
	`type` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`fileid`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action
);
