import assert from 'assert';
import pgPromise from 'pg-promise';
import learningIsizulu from '../services/learningIsizulu.js';


const pgp = pgPromise();
  const db = pgp({
    connectionString: 'postgres://learning_isizulu_db_user:YvwWEV8OVJ2kQFSCnhY65Y5olSPwqWcP@dpg-clnelm5e89qs739eb6l0-a.oregon-postgres.render.com/learning_isizulu_db?ssl=true',
  });
  
const learningIsiZuluTest = learningIsizulu(db)
describe('The learningIsiZulu Function', function () {
    //set a time out
  this.timeout(10000);
  this.beforeEach(async function () {
    await db.none(`TRUNCATE progress RESTART IDENTITY CASCADE`);
    await db.none(`TRUNCATE users RESTART IDENTITY CASCADE`);

});
    it('should insert a new player without giving an error', async function () {
        let newPlayer = 'Dr Smit';
      let newRegistration = await learningIsiZuluTest.insertPlayer(newPlayer)
      console.log(newPlayer, newRegistration)
        assert.equal(newRegistration, 'Succesfully registered player!')
    })
  
    it('should get the user progress without giving an error', async function () {
      let username = 'Dr Smit';
      await learningIsiZuluTest.insertPlayer(username)
      let userProgress = await learningIsiZuluTest.getUserProgress(username)
      console.log(username, userProgress)
      assert.equal(userProgress.length, 0) 
    })
  
  it('should update the user progress without giving an error', async function () {
    let username = 'Dr Smit';
    let level = 'beginner'
    let stage = 1
    let isComplete = false;
    await learningIsiZuluTest.insertPlayer(username);
    let userId = await learningIsiZuluTest.getUserId(username)
    await learningIsiZuluTest.updateUserProgress(userId, username,stage,level)
    let userProgress = await learningIsiZuluTest.getUserProgress(username)
    console.log(userProgress);
    assert.equal(userProgress[0].is_complete, true)
 
  })

  it('should get the beginner level without giving an error', async function () {
      let beginnerLevel = await learningIsiZuluTest.getBeginnerLevel()
      console.log(beginnerLevel)
      assert.equal(beginnerLevel.length > 0, true) 
  })

  it('should get the intermediate level without giving an error', async function () {
      let intermediateLevel = await learningIsiZuluTest.getIntermediateLevel()
      console.log(intermediateLevel)
      assert.equal(intermediateLevel.length > 0, true) 
  })
})

