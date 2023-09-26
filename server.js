const express = require('express');
const mysql = require('mysql2');
const PORT = 3001;
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const db = mysql.createConnection(
{
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'moviesAndReviews_db'
}
);

//ROUTES
//GET - get all movies from database tables
app.get('/api/movies', (req,res) => {
    //interact with db
    db.query('SELECT * FROM movieList', (err, data) => {
        console.log(data);
        res.json(data);
    })
})

app.get('/api/movie-reviews', (req,res) => {
    db.query('SELECT * FROM movieReviews',(err, data)=> {
        console.log(data);
        res.json(data);
    })
    
})

app.post('/api/add-movie', (req,res) => {
    const userMovie = req.body
    db.query(`INSERT INTO movieList(movie_name) VALUES (${userMovie.movie_name})`,(err,data) => {
        console.log(data)
    })
    db.query('SELECT * FROM movieList',(err, data)=> {
        // console.log(data);
        res.json(data);
    })
})



//LISTEN
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))