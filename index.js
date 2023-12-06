import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import flash from 'express-flash';
import session from 'express-session';
import learningIsizulu from './services/learningIsizulu.js'

const pgp = pgPromise();



const connectionString = process.env.DATABASE_URL || 'postgres://learning_isizulu_db_user:YvwWEV8OVJ2kQFSCnhY65Y5olSPwqWcP@dpg-clnelm5e89qs739eb6l0-a.oregon-postgres.render.com/learning_isizulu_db?ssl=true';
const db = pgp(connectionString);
const learningIsizuluRoute = learningIsizulu(db)
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

app.get('/next-page', async(req, res) => {
 
  // Handle the logic for the next page
  res.render('Screen', {}); 
});

app.post('/beginer', async(req, res)=>{
  let username = req.body.username
  await learningIsizuluRoute.insertPlayer(username)
    res.redirect(`beginer`)
})
//route for the begginner level
app.get('/beginer',async (req, res)=> {
const getBegginnerLevel =  await learningIsizuluRoute.getBeginnerLevel()
// Using dummy values here since it is breaking 
const username = 'Dr Smit'
const level = 'beginer'
const userId = 1
let stage1;
let stage2 ; 
let stage3 ;

for(var i = 0 ; i < getBegginnerLevel ; i++){
 let stages = getBegginnerLevel[i]
  if(stages === 'Sawubona'){
    stage1 = stages
  let updateUserProgress =  await learningIsizuluRoute.updateUserProgress(userId,username, stage1, level)
  } else if(stages === 'Unjani'){
    stage2 = stages
    let updateUserProgress =  await learningIsizuluRoute.updateUserProgress(userId,username, stage2, level)

  } else if(stages === 'Ngiyaphila'){
    stage3 = stages
    let updateUserProgress =  await learningIsizuluRoute.updateUserProgress(userId,username, stage1, level)
    console.log(updateUserProgress)
  }

}

console.log( getBegginnerLevel)
  res.render('beginer',{
    getBegginnerLevel,
    stage1,
    stage2, 
    stage3
  })
})







const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('App started at port', PORT);
});


///Oh girl I see you have no connection now? 