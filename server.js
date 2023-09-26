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
//http://localhost:3001/api/movies
app.get('/api/movies', (req,res) => {
    //interact with db
    db.query('SELECT * FROM movieList', (err, data) => {
        
        res.json(data);
    })
})

//GET - all reviews from database tables
//http://localhost:3001/api/movie-reviews
app.get('/api/movie-reviews', (req,res) => {
    db.query('SELECT * FROM movieReviews',(err, data)=> {
        
        res.json(data);
    })
    
})

//POST REQUEST - add a movie to database
//http://localhost:3001/api/add-movie
app.post('/api/add-movie', (req,res) => {
    const userMovie = req.body.movie_name
    db.query(`INSERT INTO movieList(movie_name) VALUES (?)`, userMovie, (err,data) => {
        if(err) {
            console.log(err)
        }else {
            console.log(data)
            db.query('SELECT * FROM movieList',(err, data)=> {
                res.json(data);
            })
        }
        
    })
   
})

//PUT REQUEST - update a review
//http://localhost:3001/api/review/{user input}
app.put('/api/review/:id',(req,res) => {
    if (req.params.id == req.body.movie_link)
    {
        const sqlString = `UPDATE movieReviews SET review = "${req.body.review}" where id = ${req.params.id }`
        db.query(sqlString, (err, results) => {
            if(err){
                console.log(err)
                res.json("error at db.query")
            } else {
                db.query('SELECT * FROM movieReviews',(err, data)=> {
                 res.json(data);
                })
            }
        })
    }
    else {
        res.json("index doesn't match movie link")
    }
    } )

//DELETE REQUEST - delete a movie
//http://localhost:3001/api/movie/{user input}
    app.delete('/api/movie/:id', (req,res) => {
        let movieListArray= [];
        db.query('SELECT * FROM movieList', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let hasValue = false;
                movieListArray = data;
                console.log(movieListArray);
                console.log(req.params.id)
                console.log(movieListArray[0].id) 
                for (let i =0 ; i<movieListArray.length; i++) {
                    if (req.params.id == movieListArray[i].id) {
                        hasValue = true;
                        db.query('DELETE FROM movieList WHERE id = ?', req.params.id, (err,result) => {
                            if (err) {
                                console.log(err)
                                res.json("Error at db.query(DELETE...")
                            }else {
                                console.log("ID Successfully Deleted")
                                res.json("ID Successfully Deleted")
                            }
                        })
                    }
                } 
                if (!hasValue){
                   res.json("Error, no movie has this index value") 
                }
                
            }
        })
    })


//LISTEN
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))