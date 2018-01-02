
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const ejs = require('ejs');
const db = require('./database/database');
const session = require('express-session');
const administratorRouter = require('./administrator.js');
const app = express();



app.set('trust proxy', 1) 
app.use(session({
    secret: 'ap9313cato'
  }));

app.use(express.static(__dirname+'/views'));
app.use('/',express.static(__dirname +'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.set('view engine','ejs');
app.use('/',administratorRouter.administratorRouter);





app.get('/',(req,res) => {

 
   

    if(req.session.nationalId){
   
        res.redirect('/home');
    }else{

        res.render('index.ejs');
    }
   

})

        

app.get('/logout', (req,res) => {

    req.session.destroy();
    res.redirect('/');

});
        
   
app.post('/getNationlId',(req,res) => {
  
    db.signin(req.body.email ,req.body.password, (result) => {

            
        if(result.length <= 0){

         
            res.send({result:0});

        }else{

            req.session.nationalId = result[0].NATIONAL_ID
            res.send({result:result[0].NATIONAL_ID});

         }
              

    });
    



});       
 

app.get('/test', (request,response) => {

    console.log({test:'test'});
    response.send({test:'test'});
    

})



app.post('/',(request,response) => {

    
    if(request.body.email === '' || request.body.email == undefined){

          response.render('index.ejs', {
               
            warning: "تأكد من إدخالك للبريد الإلكتروني"
                
          });

    }else if(request.body.password === '' || request.body.password == undefined){ 

        response.render('index.ejs', {
               
            warning: "تأكد من إدخالك لكلمة المرور"
              
        });
        
    } else {
    
        db.signin(request.body.email.trim() ,request.body.password.trim(), (result) => {

            
            if(result.length <= 0){

                response.render('index.ejs', {
               
                    warning: "البريد الإلكتروني أو كلمة المرور الذي قمت بإدخاله خاطئ",
                   
                      
                }); 

            }else{

                request.session.nationalId = result[0].NATIONAL_ID
                // response.send({result:result});
                response.redirect('/home');

             }
                  
    
        });
        
    }

        
});


app.listen(4500,() => {

    console.log('localhost:4500');
});





