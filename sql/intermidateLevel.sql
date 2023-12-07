CREATE TABLE intermediate_level(
id SERIAL PRIMARY KEY,
phrases TEXT NOT NULL,
stage INT NOT NULL
);

-- DATA
INSERT INTO intermediate_level (phrases, stage) VALUES ('Yebo, sawubona', 1);
INSERT INTO intermediate_level (phrases, stage) VALUES ('Ngiyaphila, unjani?', 2);
INSERT INTO intermediate_level (phrases, stage) VALUES ('');
