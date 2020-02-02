module.exports = {

    /**
     * This function is responsible for getting the players
     * and sending the user to the neccessary routes;
     */
    savePlayer: (req, res) => {
        console.log(req.body);
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;
        let id = req.body.id;

        if (id == "" || id == null) {
            // Empty Id means the player is to be created
            let query = `INSERT INTO players VALUES ("", "${firstname}", "${lastname}", "${position}", "${number}", "${username}")`;

            db.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                res.redirect('/');
            });
        } else {
            // Existing Id means the player passed is to be editted

            // So we first fetch the player from the database
            let get_player_query = `UPDATE players SET first_name = "${firstname}", last_name = "${lastname}", position = "${position}", number = "${number}", user_name = "${username}" WHERE id = ${id}`;

            db.query(get_player_query, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                console.log(result);
                res.redirect('/');
            })
        }

    },

    getPlayerForEdit: (req, res) => {

        // We are getting the id from the url i.e /edit-player/2
        // so we use 2 to fetch the player from db;
        let id = req.params.id;

        // this query helps us get that one user that needs to be editted
        // so we can pass his or her details into the input boxes
        let query = `SELECT * FROM players WHERE id = ${id} `;

        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

            // this query helps us get all the players in db
            // so we can display it in the table
            let query = "SELECT * FROM players ORDER BY id ASC";

            db.query(query, (err, players) => {
                if (err) {
                    res.redirect('/');
                }

                res.render('index', {
                    title: 'Welcome to Play View',
                    player: result[0],
                    players: players
                });
            })


        })

    },

    deletePlayer: (req, res) => {

        // We are getting the id from the url i.e /edit-player/2
        // so we use 2 to fetch the player from db;
        let id = req.params.id;

        // this query helps to delete a player from the database
        let query = `DELETE FROM players WHERE id = ${id} `;

        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

            // this query helps us get all the players in db
            // so we can display it in the table
            let query = "SELECT * FROM players ORDER BY id ASC";

            db.query(query, (err, players) => {
                if (err) {
                    res.redirect('/');
                }

                res.render('index', {
                    title: 'Welcome to Play View',
                    players: players
                });
            })


        })

    }
};