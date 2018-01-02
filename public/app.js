const ab = Vue.component('email', {
    template: '<div class="uk-inline"> <span class="uk-form-icon" uk-icon="icon: mail"></span><input v-model="email" id="email" name="email" type="email" placeholder="البريد الإلكتروني" class="uk-input uk-form-width-large"/></div>',
    data: function() {

        return {
            email:""
        }
    }
});

const password = Vue.component('password', {
    template: ' <div class="uk-margin uk-inline"> <span class="uk-form-icon" uk-icon="icon: lock"></span> <input  v-model="password" id="password" name="password" type="password" placeholder="كلمة المرور" class="uk-input uk-form-width-large"/></div>',
    data: function() {

        return {

            password:""
            
        }
    }
});

Vue.component('submit', {
    template:'  <div class="uk-margin"> <div class="center"> <button id="loginButton" v-on:click.prevent="signin" class=" primary-color uk-button uk-button-primary">تسجيل دخول</button>  </div> </div>',
    methods:{

        areFieldsEmpty:function(){

            console.log(ab);

            if((ab.$refs.email === undefined || ab.$refs.email === '') && (password.$refs.password === undefined || password.$refs.password === '')){
 
               alert('no email no password');
                
            }else if(ab.$refs === undefined || ab.$refs === '') {
 
              alert('no password');
 
            }else if(ab.$refs.email === undefined || ab.$refs.email === ''){
               alert('no email');
            }
 
          
 
         
         },
         signin:function(){

            this.$http.post('/getNationlId',{params:{email:"shafiq.aradi@icloud.com",password:"a"}}).then(response => {

                alert(JSON.stringify(response));

            },error =>{

                console.log(JSON.stringify(error));

            })
        }
    

    }
});

Vue.component('warning', {

    template:'<div class="uk-width-1-2 removeable uk-position-large uk-position-bottom-center uk-position-fixed alert-position container uk-alert-danger" uk-alert> <p></p> </div>',
    data:function(){

        return {
          
            message:""
            
        }
    }
})
  

const vueApp = new Vue({

    el:"#loginApp",
    data:{
    
        email:"",
        password:""
    
    },
    mounted:function(){
    
        // this.showAlert();
    },
    methods:{

      
       
    
    }
    
});


