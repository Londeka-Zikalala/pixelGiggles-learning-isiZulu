import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import flash from 'express-flash';
import session from 'express-session';

const pgp = pgPromise();

const connectionString = process.env.DATABASE_URL || 'postgres://learning_isizulu_db_user:YvwWEV8OVJ2kQFSCnhY65Y5olSPwqWcP@dpg-clnelm5e89qs739eb6l0-a.oregon-postgres.render.com/learning_isizulu_db?ssl=true';
const db = pgp(connectionString);

const app = express();

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(flash());

const handlebars = exphbs.create({
  extname: '.handlebars',
  defaultLayout: false,
  layoutDir: './views/layouts',
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', async (req, res) => {
//   res.render('index', {});
// });



app.get('/', async (req, res) => {
  res.render('home', {});
});

app.get('/next-page', (req, res) => {
  // Handle the logic for the next page
  res.render('Screen', {}); 
});

//route for the begginner level
app.get('/begginner',(req, res)=> {


  res.render('beginner',{})
})




































const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('App started at port', PORT);
});
