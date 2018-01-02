const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');
const dbIntegrity = require('./public/dataIntegrity');


const router = express.Router();
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));


  
router.get('/home',(req,res) => {


    if(req.session.nationalId){

            db.getUserData(req.session.nationalId, (userData) => {

                res.render('home.ejs',{
                    
                    name:`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,
                    specialty:userData[0].USER_TYPE_AR

                });
           }); 

    } else {



      res.redirect('/');

    }

});


router.get('/addUser',(req,res) => {

     

    if(req.session.nationalId){

            db.getUserData(req.session.nationalId, (userData) => {

                res.render('addUser.ejs',{
                    
                    name:`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,
                    specialty:userData[0].USER_TYPE_AR,
                    getJquary:getJquary

                });


          }); 

          
        } else {

           res.redirect('/');

        }

});

router.post('/addUser',(req,res) => {

      
    const request = req.body;



            if(request.email){

                db.addNewUser(request.email)
            }


          

    
});

router.post('/addUser',(req,res) => {

    if(req.session.nationalId){

            db.getUserData(req.session.nationalId, (userData) => {

                if(dbIntegrity.areFieldsEmpty([req.body.firstName,req.body.fatherName,req.body.surename,req.body.fatherName,req.body.nationalId,req.body.mobileNo,req.body.email,req.body.password,req.body.confirmPassword])){
                    
                    rerenderPageOnInserting(res,`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,userData[0].USER_TYPE_AR,`يجب ملئ كل الحقول`)

                }else if(!dbIntegrity.isNumeric(req.body.nationalId)){
                    
                    rerenderPageOnInserting(res,`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,userData[0].USER_TYPE_AR,`يجب أن يحتوي حقل الرقم الوطني على أرقام فقط`)
                    
                }else if(!dbIntegrity.isNumeric(req.body.mobileNo)){
                    
                    rerenderPageOnInserting(res,`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,userData[0].USER_TYPE_AR,`يجب أن يحتوي حقل الهاتف على أرقام فقط`)
                    
                }else if(!dbIntegrity.passwordLength(req.body.password)){

                    rerenderPageOnInserting(res,`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,userData[0].USER_TYPE_AR,`كلمة السر يجب أن تحتوي على 6 علي الأقل`)
                    
                }else if(!dbIntegrity.passwordMatcher(req.body.password,req.body.confirmPassword)){

                    rerenderPageOnInserting(res,`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,userData[0].USER_TYPE_AR,`كلمة المرور غير متطابقة`)

                }else{  

                  
                    db.addNewUser(req.body.nationalId,req.body.firstName,req.body.fatherName,req.body.surename,req.body.mobileNo,req.body.email,req.body.password,req.body.userType,(result) => {
                    
                        rerenderPageOnInserting(res,`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,userData[0].USER_TYPE_AR,isInserted(result,req.body.firstName));

                    });
                        
                }
        
          });

    
          
        } else {

         res.redirect('/');

        }

});

router.post('/addNewUser',(req,res) => {

    dbIntegrity.isNationalIdNotAvailablePromise(req.body.nationalId).then((result) => {

         
          if(result[0].Counter > 0){
            
            res.send({isNationalIdNotAvailable:true});
            return;

          }else{
 
            return dbIntegrity.isMobieNoNotAvailablePromise(req.body.mobileNo);

          }

    }).then((result) => {

        console.log(result,'s');
     
        if(result[0].Counter > 0){
            
            res.send({isMobieNoNotAvailable:true});

            return;

         }else{
            
            return dbIntegrity.isEmailNotAvailablePromise(req.body.email);

         }

         return;

    }).then((result) => {

        if(result[0].Counter > 0){
            
            res.send({isEmailNotAvailable:true});
            return;

        }else{


            return dbIntegrity.createNewUserPromise(req.body.nationalId, req.body.firstName, req.body.fatherName, req.body.surename, req.body.mobileNo, req.body.email, req.body.password, req.body.userType);

        }   
      
       
        return;

    }).then((result) => {

        if(result.warningCount === 0){
    
            res.send({isInserted:true})
              
      
          }else{

           res.send({isInserted:false})

          }

    }).catch((error)=> {

        console.log(error);


    }); 
       

 });


const isInserted = (result,firstName) => {

    if(result.warningCount === 0){

        return "<div class=\"uk-width-1-2 uk-position-large uk-position-bottom-center uk-position-fixed alert-position container uk-alert-success\" uk-alert> <p>"+`تم إدخال المسخدم ${firstName} بنجاح`+"</p></div>";

    }else{

        return "<div class=\"uk-width-1-2 uk-position-large uk-position-bottom-center uk-position-fixed alert-position container uk-alert-danger\" uk-alert> <p>فشل الإدخال</p></div>";;


    }

}

router.get('/showUsers',(req,res) => {

     

    if(req.session.nationalId){

            db.getUserData(req.session.nationalId, (userData) => {

                res.render('showUsers.ejs',{
                    
                    name:`${userData[0].FIRST_NAME} ${userData[0].SURENAME}`,
                    specialty:userData[0].USER_TYPE_AR

                });
          }); 

          
        } else {

        res.redirect('/');

        }

});

router.post('/getUsers',(req,res) => {

    db.fetchUsers((result) => {

        res.send({'users':result});

    });
    
});

router.get('/userInfo',(req,res) => {

    if(req.session.nationalId){

        res.render('userInfo.ejs');


    }else{

        res.redirect('/');


    }   


});

router.post('/updatePassword',(req,res) => {

    if(req.session.nationalId){

        db.updatePassword(req.body.oldPassword, req.body.newPassword, req.session.nationalId, (result) => {

            if(result.changedRows !== 0){

                req.session.destroy()

            }

            res.send({result:result});

        });
        


    }else{

        res.redirect('/');


    }   


});

const rerenderPageOnInserting = (res,name,specialty,result) => {

    res.render('addUser.ejs',{
                        
        name:name,
        specialty:specialty,
        result:result
    });

}



const getJquary = () => {

    return '<script  type = "text/javascript"  src="jquery.min.js"></script> ';

}


module.exports.administratorRouter = router;