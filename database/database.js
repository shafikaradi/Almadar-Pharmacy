const mysql = require('mysql');



const connectionConfiguration = {

    host:"localhost",
    port:"8809",
    user:"root",
    password:"root",
    database:"Pharmacy"

}



const signin = (email, password, callback) => {
  
    const con = mysql.createConnection(connectionConfiguration);
     
    const query = `SELECT NATIONAL_ID, USER_TYPE FROM USER WHERE EMAIL = "${email}"  AND PASSWORD = "${password}"  LIMIT 1`
     
     con.query(query,(error, result) => {

        if (error) throw error;
        console.log(JSON.stringify(result))
        
        callback(result);
        
        con.end();
    
     })

}

const getUserData = (nationalId, callback) => {

    const con = mysql.createConnection(connectionConfiguration);

      con.query(`SELECT USER.FIRST_NAME, USER.FATHER_NAME, USER.SURENAME, USER_TYPE.USER_TYPE_AR FROM USER LEFT JOIN USER_TYPE ON USER.USER_TYPE = USER_TYPE.USER_TYPE_ID WHERE USER.NATIONAL_ID = ${nationalId}`,(error, result) => {
 
         if (error) throw error;
    
         callback(result);
         con.end();
       
    });
 
 
 }

 const addNewUser = (nationalId,firstName, fatherName, surename, mobileNo, email, password, userType,callback) => {
 
    const con = mysql.createConnection(connectionConfiguration);


        con.query(`INSERT INTO USER (NATIONAL_ID,FIRST_NAME,FATHER_NAME,SURENAME,USER_TYPE,EMAIL,MOBILE_NO,PASSWORD) VALUES (${nationalId},"${firstName}","${fatherName}","${surename}",${userType},"${email}","${mobileNo}","${password}")`,(error, result) => {

            if(error) throw error;
            console.log(JSON.stringify(result));
            callback(result);

            con.end();
     
         });

  

 }

 const getUserByNationlId = (nationalId,callback) => {

    const con = mysql.createConnection(connectionConfiguration);

    con.query(`SELEC NATIONAL_ID, FIRST_NAME, FATHER_NAME,SURENAME,USERTYPE,EMAIL,MOBILE_NO,PASSWORD WHERE NATIONAL_ID = ${nationalId}`,(error,result) => {


            if(error) throw error;
            callback(result);

            con.end();

    });

 }

 const getUserByName = (firstName,fatherName,surename,callback) => {

    const con = mysql.createConnection(connectionConfiguration);

        con.query(`SELEC NATIONAL_ID, FIRST_NAME, FATHER_NAME,SURENAME,USERTYPE,EMAIL,MOBILE_NO,PASSWORD FROM USER WHERE FIRST_NAME = "${firstName}" AND FATHER_NAME = "${fatherName}" AND SURENAME = "${surename}"`,(error,result) => {


            if(error) throw error;
            callback(result);

            con.end();

        });

}

const isNationalIdNotAvailable = (val,callback) => {

    const con = mysql.createConnection(connectionConfiguration);

        con.query(`SELECT COUNT(NATIONAL_ID) AS Counter FROM USER WHERE NATIONAL_ID = ${val}`,(error, result) => {


            callback(result);
            con.end();


        });

}

const isEmailNotAvailable = (val,callback) => {

    const con = mysql.createConnection(connectionConfiguration);

        con.query(`SELECT COUNT(EMAIL) AS Counter FROM USER WHERE EMAIL = "${val}"`,(error, result) => {

            if(error) throw error;

            callback(result);
            con.end();


        });

}

const isMobileNoAvaiable = (val, callback) => {

    const con = mysql.createConnection(connectionConfiguration);

        con.query(`SELECT COUNT(MOBILE_NO) AS Counter FROM USER WHERE MOBILE_NO = ${val}`,(error,result) => {

            if(error) throw error;

            callback(result);
            con.end();

        });


}

const fetchUsers = (callback) => {

    const con = mysql.createConnection(connectionConfiguration);

        con.query(`SELECT USER.NATIONAL_ID, USER.FIRST_NAME, USER.FATHER_NAME, USER.SURENAME, USER_TYPE.USER_TYPE_AR, USER.EMAIL, USER.MOBILE_NO FROM USER LEFT JOIN USER_TYPE ON USER_TYPE.USER_TYPE_ID = USER.USER_TYPE`,(error,result) => {


            if(error) throw error;
            callback(result);

            con.end();

        });

}

const fetchUserData = (nationalId,callback) => {

    const con = mysql.createConnection(connectionConfiguration);

    con.query(`SELECT SELECT USER.NATIONAL_ID, USER.FIRST_NAME, USER.FATHER_NAME, USER.SURENAME, USER_TYPE.USER_TYPE_AR, USER.EMAIL, USER.MOBILE_NO FROM USER LEFT JOIN USER_TYPE ON USER_TYPE.USER_TYPE_ID = USER.USER_TYPE WHERE USER.NATIONAL_ID = ${nationalId}`);



}

module.exports = {
    signin,
    getUserData,
    addNewUser,
    getUserByNationlId,
    getUserByName,
    isMobileNoAvaiable,
    isNationalIdNotAvailable,
    isEmailNotAvailable,
    fetchUsers,
    fetchUserData

}
