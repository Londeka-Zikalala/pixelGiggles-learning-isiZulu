import express from 'express'
import bodyParser from 'body-parser'
import {engine} from 'express-handlebars'
import pgPromise from 'pg-promise'
import session from 'express-session'
import flash from 'express-flash'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'pixelGigglesKey',
    resave: false,
    saveUninitialized: true
  }));

app.use(flash());


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

  
  const pgp = pgPromise();
  const db = pgp({
    connectionString: 'postgres://learning_isizulu_db_user:YvwWEV8OVJ2kQFSCnhY65Y5olSPwqWcP@dpg-clnelm5e89qs739eb6l0-a.oregon-postgres.render.com/learning_isizulu_db?ssl=true',
  });

  app.use(express.static('public'));


app.set('view engine', 'hbs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));

















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('App started at port', PORT);
});