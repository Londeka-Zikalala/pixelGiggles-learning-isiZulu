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
    let userId = 1;
    let level = 'beginner';
    let username = 'Dr Smit'
    let stage1, stage2, stage3;
    // Convert the data to JSON
    const getBeginnerLevelJson = JSON.stringify(getBegginnerLevel);
  
    for(var i = 0 ; i < getBegginnerLevel.length ; i++){
      let stage = getBegginnerLevel[i]
      if(stage.words === 'Sawubona'){
        stage1 = stage.words
        let updateUserProgress =  await learningIsizuluRoute.updateUserProgress(userId,username, stage1, level)
      } else if(stage.words === 'Unjani'){
        stage2 = stage.words
        let updateUserProgress =  await learningIsizuluRoute.updateUserProgress(userId,username, stage2, level)
      } else if(stage.words === 'Ngiyaphila'){
        stage3 = stage.words
        let updateUserProgress =  await learningIsizuluRoute.updateUserProgress(userId,username, stage3, level)
        console.log(updateUserProgress)
      }
    }
  
    // store the translations
    let translations = ['HELLO', 'HOW ARE YOU', 'I AM FINE'];
  
    //  store the stages
    let stagesArray = [stage1, stage2, stage3];
  
    // Create an empty array to store the h6 elements
    let h6Elements = [];
  
    for(let i = 0; i < stagesArray.length; i++) {
      // Create the h6 element for the current stage
      let h6Element = `<h6>${stagesArray[i]} means ${translations[i]}</h6>`;
  
  
      h6Elements.push(h6Element);
    }
  
    res.render('beginer',{
      getBeginnerLevelJson,
      getBegginnerLevel,
      stage1,
      stage2, 
      stage3,
      h6Elements
    })
  });

// Route for the intermediate level
app.get('/intermediate', async (req, res) => {
  const getIntermediateLevel = await learningIsizuluRoute.getIntermediateLevel();
  const username = 'Dr Smit';
  const level = 'intermediate';
  const userId = 1;
  let stage1;
  let stage2;
  let stage3;

  // Loop through the intermediate level stages
  for (let i = 0; i < getIntermediateLevel.length; i++) {
    let stages = getIntermediateLevel[i];
    
    if (stages === 'Sawubona, unjani?') {
      stage1 = stages;
      let updateUserProgress = await learningIsizuluRoute.updateUserProgress(userId, username, stage1, level);
    } else if (stages === 'Ngiyaphila, wena unjani?') {
      stage2 = stages;
      let updateUserProgress = await learningIsizuluRoute.updateUserProgress(userId, username, stage2, level);
    } else if (stages === 'Ubani igama lakho?') {
      stage3 = stages;
      let updateUserProgress = await learningIsizuluRoute.updateUserProgress(userId, username, stage3, level);
    }
  }

  res.render('intermediate', {
    getIntermediateLevel,
    stage1,
    stage2,
    stage3
  });
});

// Route for the progress page
app.get('/progress', async (req, res) => {
  const username = 'Dr Smit'; 
  const playerProgress = await learningIsizuluRoute.getUserProgress(username);

  res.render('progress', {
    playerProgress
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('App started at port', PORT);
});


///Oh girl I see you have no connection now? 