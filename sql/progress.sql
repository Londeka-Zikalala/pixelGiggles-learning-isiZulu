CREATE TABLE progress(
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id),
    level TEXT NOT NULL,
    stage INT NOT NULL,
    is_complete BOOLEAN 
);

 stage 1 t stage 2 t stage 3 t stage 4 f

 {{{username     level:  stage: }}}