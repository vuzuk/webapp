
-- bloggers

CREATE TABLE bloggers (
	id INT UNSIGNED auto_increment primary key NOT NULL,
	username varchar(40) NOT NULL UNIQUE,
	name varchar(40) NOT NULL,
	dob	DATETIME NOT NULL,
	gender TINYINT UNSIGNED NOT NULL,
	contact	
	email varchar(150) NOT NULL UNIQUE,
	Date created
	Date modified


	id INT UNSIGNED auto_increment primary key NOT NULL,
	fullName varchar(40) NOT NULL,
	email varchar(150) NOT NULL,
	password varchar(64) NOT NULL BINARY,
	country varchar(50) NOT NULL,
	contactNum varchar(50) NULL,
	imagePath varchar(180) NULL,

	UNIQUE KEY unique_email (email)
);
CREATE TABLE snippets (
	id int UNSIGNED auto_increment primary key NOT NULL,
	snippet text NOT NULL,
	imagePath varchar(40),
	authorId int UNSIGNED,	
	stage SMALLINT UNSIGNED NOT NULL,
	storyId int UNSIGNED NOT NULL,
	dateCreated DATETIME NOT NULL,
	dateUpdated DATETIME NOT NULL,

	FOREIGN KEY fk_author(authorId)
	REFERENCES users(id)
	ON UPDATE CASCADE
	ON DELETE SET NULL,
	
	FOREIGN KEY fk_story(storyId)
	REFERENCES stories(id)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
);

CREATE TABLE comments(
	id int UNSIGNED auto_increment primary key NOT NULL,
	comment text NOT NULL,
	dateCreated DATETIME NOT NULL,
	authorId int UNSIGNED,
	snippetId int UNSIGNED, /*can be NULL value*/
	storyId int UNSIGNED, /*can be NULL value*/

	FOREIGN KEY fk_author(authorId)
	REFERENCES users(id)
	ON UPDATE CASCADE
	ON DELETE SET NULL,

	FOREIGN KEY fk_snippet(snippetId)
	REFERENCES snippets(id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,

	FOREIGN KEY fk_story(storyId)
	REFERENCES stories(id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);
