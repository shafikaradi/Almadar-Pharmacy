const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const db = require('./database/database');
// const session = require('express-session');
// const app = 

// app.use(express.static(__dirname+'/views/index.hbs'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false }));

// app.set('view engine','hbs');

const router = express.Router();


router.get('/',(req,res) => {


    if(req.session.nationalId){
            db.getUserData(req.session.nationalId, (userData) => {

                res.render('home.hbs',{
                    
                    name:`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,
                    specialty:userData[0].USER_TYPE_AR

                });
        }); 
    } else {



      res.redirect('/');

    }

    if(req.body.firstName,req.body.fatherName,req.body.email){

    }else{




    }

        


});

module.exports.router = router;