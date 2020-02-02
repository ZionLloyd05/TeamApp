module.exports = {

    /**
     * This function is responsible for getting the players
     * and sending the user to the neccessary routes;
     */
    getHomePage: (req, res) => {
        let query = "SELECT * FROM players ORDER BY id ASC";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('index', {
                title: 'Welcome to Play View',
                players: result
            });
        });
    }
};