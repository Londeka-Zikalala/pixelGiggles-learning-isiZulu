function learningIsizulu(db) {

    //function to insert a user 
    async function insertPlayer(username) {
        try {
            //Insert user name only if it doesn't exist
            await db.none(`INSERT INTO users (username) VALUES ($1) ON CONFLICT DO NOTHING`, [username]);
            return 'Succesfully registered player!'
        } catch (error) {
            console.error(error.message)
            return 'Error registering new player'
        }

        }

    //function to get user's progress
    async function getUserProgress(username) {
        try {
            //check if the user exists 
            const currentPlayer = await db.oneOrNone(`SELECT id FROM users WHERE username =$1`, [username]);
            if (currentPlayer) {
                //get the progress
                let playerProgress = await db.manyOrNone(`SELECT progress.id, progress.user_id, progress.level, progress.stage, progress.is_complete
            FROM progress
            JOIN users ON progress.user_id = users.id
            WHERE users.username = $1`, [username])
            return playerProgress
            }
            
        } catch(error) {
            console.error(error.message)
        }
    }
    
    //get the user id 
    async function getUserId(username) {
        let user = await db.oneOrNone(`SELECT * FROM users WHERE username = $1`, [username]);
        let userId = user.id;
        console.log(user)
        return userId
        }
    //function to update the user progress
    async function updateUserProgress(userId, username, stage, level) {
      
        try {

            userId = await getUserId(username)
            let CurrentStage = await db.none(`INSERT INTO progress (user_id, level, stage, is_complete) VALUES ($1,$2,$3,false)`, [userId, level, stage]);
            if (!CurrentStage) {
                await db.none(`UPDATE progress SET is_complete = true WHERE user_id = $1`, [userId])
            }
        } catch (error) {
            console.error(error.message)
        }
        }
    //function to fetch the beginner level
    async function getBeginnerLevel() {
        try {
            //get the entire table data 
            let theBeginnerLevel = await db.manyOrNone(`SELECT * FROM beginner_level`)
            return theBeginnerLevel
        } catch (error) {
            console.error(error.message)
        }
    }
    //function to get the intermediate level 
    async function getIntermediateLevel() {
        try {
            //get the entire table data 
            let theIntermediateLevel = await db.manyOrNone(`SELECT * FROM intermediate_level`)
            return theIntermediateLevel
        } catch (error) {
            console.error(error.message)
        }
    }
   return {
       insertPlayer,
       getUserId,
       getBeginnerLevel,
       getIntermediateLevel,
       getUserProgress,
       updateUserProgress
    }
}

export default learningIsizulu