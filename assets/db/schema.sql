DROP DATABASE IF EXISTS moviesAndReviews_db;
CREATE DATABASE moviesAndReviews_db;
USE moviesAndReviews_db;

CREATE TABLE movieList (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(30)
);

CREATE TABLE movieReviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    review VARCHAR(100) NOT NULL,
    movie_link INT,
    FOREIGN KEY (movie_link)
    REFERENCES movieList(id)
    ON DELETE SET NULL
);

INSERT INTO movieList (movie_name)
VALUES
("Lord of the Rings"),
("Star Wars"),
("Your Name");

INSERT INTO movieReviews (review, movie_link)
VALUES

("Beautiful visuals!",3),
("Generational Classic",2);

SELECT * from movieList;
SELECT * from movieReviews;
	

