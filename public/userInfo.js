$(document).ready(() => {

    $('#changePassword').click((event) => {

      event.preventDefault();
    
  
      if(areFieldsEmpty([$("#oldPassword").val(),$("#newPassword").val(),$("#confirmPassword").val()])){

            alert('كل الحقول مطلوبة')
            }else if(passwordLengthLessThenSix($("#newPassword").val())){

            alert('كلمة السر يجب ألا تكون أقل من 6 أحرف');

            }else if(passwordMatcher($("#oldPassword").val(),$("#confirmPassword").val())){

            alert('كلمة السر غير متوافقة');

            }else{

              $.ajax({

                        
                  url:"/updatePassword",
                  type:"POST",
                  data:"oldPassword="+$("#oldPassword").val()+"&newPassword="+$("#newPassword").val(),
                  success: (response) => {


                                    
                    if(response.changedRows === 0){

                        alert("فشل تغيير، حول مجدداً")


                      }else{

                        alert("تم تغيير كلمة المرور بنجاح")
                        window.location.replace('/');

                      }


                  }



              });


             }

     

   });

})



$("#changePassword").hover(() => {

    $("#changePassword").css("background-color", "#68981b" );

},() => {

  $("#changePassword").css("background-color", "#86C323");

});

$("#updateUserData").hover(() => {

  $("#updateUserData").css("background-color", "#68981b" );

},() => {

$("#updateUserData").css("background-color", "#86C323");

});




$(document).ready(() => {

    
      
    $.ajax({

      url:"/fetchUserData",
      type:"POST",
      success:(result) => {

        

        
        $("#nationalId").val(result[0].NATIONAL_ID);
        $("#firstName").val(result[0].FIRST_NAME);
        $("#surename").val(result[0].SURENAME);
        $("#fatherName").val(result[0].FATHER_NAME);
        $("#email").val(result[0].EMAIL);
        $("#mobileNo").val(result[0].MOBILE_NO);
      }


    });


    $("#updateUserData").click((event) => {
      
      event.preventDefault();

      if(areFieldsEmpty([$("#nationalId").val(), $("#firstName").val(),$("#surename").val(), $("#fatherName").val(),  $("#email").val(), $("#mobileNo").val()])){

         alert('كل الحقول مطلوبة');
      }else if(!isEmail($("#email").val())){

        alert('تأكد من صحة صيغة البريد الإلكتروني');

      }else if(!isNumeric($("#mobileNo").val())){

        alert('الرقم الهاتف يجب أن يحتوي على أرقام فقط');

      }else if(!isNumeric($("#nationalId").val())){

        alert('الرقم الوطني يجب أن يحتوي على أرقام فقط');
        
      }else if(!isValidateName($("#firstName").val())|| !isValidateName($("#fatherName").val()) || !isValidateName($("#surename").val())){

        alert('حقول الأسماء يجب أن تحتوي على حروف فقط');

      }
        

    });

});