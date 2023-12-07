CREATE TABLE beginner_level(
    id SERIAL PRIMARY KEY,
    words TEXT NOT NULL,
    stage INT NOT NULL 
);

-- DATA
INSERT INTO beginner_level (words, stage) VALUES ('Sawubona', 1);
INSERT INTO beginner_level (words, stage) VALUES ('Unjani?', 2);
INSERT INTO beginner_level (words, stage) VALUES ('Ngiyaphila', 3);
INSERT INTO beginner_level (words,stage) VALUES ('Usalekahle', 4);

