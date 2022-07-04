// Server

const { response } = require('express');
const express = require('express');
const { user } = require('pg/lib/defaults');
const app = express()
const port = 4040;
const {user_game, user_game_biodata} = require('./models')

app.use (express.urlencoded({extended:true}))
app.use('/style', express.static("views/style"));
app.use('/js', express.static("views/js"));

app.set("view engine", "ejs");

app.get("/",(req, res) => {
    res.render("index");
});

app.get("/game", (req,res) => {
    res.render("game");
    res.end ();
});

app.get("/login", (req,res) => {
    res.render("login")
});

app.post("/login", (req,res) => {
    const {username,password} = req.body

    user_game.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(response => {
        if(response != null && response.isSuperAdmin){
            res.redirect('/dashboard')
        }else {
            res.status(302).redirect("/")
        }
    })
})

app.get('/dashboard',(req,res) => {
    user_game.findAll({
        include: user_game_biodata
    })
        .then(users => {
            res.render('dashboard', {users})
        })
})

app.get('/history',(req,res) => {
    user_game.findAll({
    })
        .then(users => {
            res.render('history', {users})
        })
})


app.post('/user', (req,res) => {
    const {username,password,first_name,last_name,birthplace} = req.body
    user_game.create({
        username,
        password,
        isSuperAdmin: false
    }).then(user_game => {
        user_game_biodata.create({
            id_user: user_game.id,
            first_name,
            last_name,
            birthplace
        }).then(response => {
            res.redirect('/dashboard')
        })
    })
})

app.get('/user/:id/delete', (req,res) => {
    const {id} = req.params
    user_game.destroy({
        where: {id}
    }).then(response => {
        res.redirect('/dashboard')
    })
})

app.get('/user/:id/edit', (req,res) => {
    const {id} = req.params
    user_game.findOne({
        where: {id},
        include: user_game_biodata
    }).then(user => {
        res.render('edit', {user})
    })
})

app.post('/user/:id/update', (req,res) => {
    const {id} = req.params
    const {username,password,first_name,last_name,birthplace} = req.body

    user_game.update({
        username,
        password
    },{where:{id}})
    .then(response => {
        user_game_biodata.update({
            first_name,last_name,birthplace
        }, {where: {id_user:id}})
        .then(response => {
            res.redirect('/dashboard')
        })
    })
})

app.listen(4040, () => {
    console.log(`Server running on ${port}`);
});
