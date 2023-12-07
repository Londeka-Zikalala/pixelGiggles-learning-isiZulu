CREATE TABLE progress(
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id),
    level TEXT NOT NULL,
    stage INT NOT NULL,
    is_complete BOOLEAN 
);

 {{{username     level:  stage: }}}