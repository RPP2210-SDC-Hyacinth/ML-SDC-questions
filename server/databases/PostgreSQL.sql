DROP DATABASE IF EXISTS questions;

CREATE DATABASE questions;

CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY NOT NULL, product_id integer NOT NULL, body character varying (1000), date_written bigint, asker_name character varying (200), asker_email character varying (200), reported boolean, helpful integer);

CREATE TABLE IF NOT EXISTS answers (id SERIAL PRIMARY KEY NOT NULL, question_id integer NOT NULL, body character varying (1000), date_written bigint, answerer_name character varying (200), answerer_email character varying (200), reported boolean, helpful integer);

CREATE TABLE IF NOT EXISTS answers_photos (id SERIAL PRIMARY KEY NOT NULL, answer_id integer NOT NULL, url character varying (500));

\copy questions from '/Users/m.li/Desktop/Hack/questions.csv' delimiter ',' CSV HEADER

\copy answers from '/Users/m.li/Desktop/Hack/answers.csv' delimiter ',' CSV HEADER

\copy answers_photos from '/Users/m.li/Desktop/Hack/answers_photos.csv' delimiter ',' CSV HEADER



ALTER TABLE answers ALTER COLUMN date_written TYPE varchar USING to_char(to_timestamp(date_written/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');

ALTER TABLE questions ALTER COLUMN date_written TYPE varchar USING to_char(to_timestamp(date_written/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');

ALTER TABLE questions RENAME body TO question_body
ALTER TABLE questions RENAME id TO question_id
ALTER TABLE questions RENAME helpful TO question_helpfulness


SELECT setval ('answers_id_seq', (SELECT max(id) from answers));

SELECT setval ('questions_id_seq', (SELECT max(id) from questions));

SELECT setval ('answers_photos_id_seq', (SELECT max(id) from answers_photos));

CREATE INDEX product_id ON questions(product_id);

CREATE INDEX answer_questions ON answers(question_id);

CREATE INDEX photos_answers_id ON answers_photos(answer_id);