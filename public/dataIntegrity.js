
const isNumeric = (val) => {

    return !isNaN(parseFloat(val)) && isFinite(val);

  }

const passwordLengthLessThenSix = (val) => {

    if(val.length < 6){

        return true;

    }else{

         return false;

    }


}

const passwordMatcher = (password,confirmPassword) => {

    if(password === confirmPassword){

        return true
    }else{


        return false
    }


};

const areFieldsEmpty = (fields) => {



    for(let i = 0; i < fields.length; i++){


        if(fields[i].length === 0){
  
            return true
           
       }
       

    }
    
        return false;

};

const isValidateName = (val) => {    

    var nameExpression = /^[A-Za-zأ-ي]+$/;
    if(nameExpression.test(val))
       return true;
    else
       return false;      
}

const isEmail = (val) => {

    var emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(emailExpression.test(val))
       return true;
    else
       return false;   

}
// const isNationalIdNotAvailablePromise = (mobileNo) => {

//     return new Promise((resolve,reject) => {


//           db.isNationalIdNotAvailable(mobileNo, (result) => {
 
//                 if(result){

//                     resolve(result);

//                 }else{

//                   reject(new Error('Something went wrong'));
                    
//                 }

//           });

//     });
// };

// const isEmailNotAvailablePromise = (email) => {


//     return new Promise((resolve,reject) => {


//         db.isEmailNotAvailable(email,(result) => {
     
//             if(result){

//                 resolve(result);

//             }else{

//               reject(new Error('Something went wrong'));
                
//             }
        
//         });

//     });

// };

// const isMobieNoNotAvailablePromise = (mobileNo) => {


//     return new Promise((resolve,reject) => {


//         db.isMobileNoAvaiable(mobileNo,(result) => {
     
//             if(result){

//                 resolve(result);

//             }else{

//               reject(new Error('Something went wrong'));
                
//             }
        
//         });

//     });

// };

// const createNewUserPromise = (nationalId,firstName, fatherName, surename, mobileNo, email, password, userType) => {
    
//     return new Promise((resolve,reject) => {

//         db.addNewUser(nationalId,firstName, fatherName, surename, mobileNo, email, password, userType,(result) => {


//             if(result){

//                 resolve(result);

//             }else{

//               reject(new Error('Something went wrong'));
                
//             }



//         })


//     });
// }





module.exports = {

    isNumeric,
    passwordLengthLessThenSix,
    passwordMatcher,
    areFieldsEmpty,
    isValidateName,
    isEmail
};