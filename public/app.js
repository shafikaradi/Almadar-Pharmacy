const email = Vue.component('email', {
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
    template:'  <div class="uk-margin"> <div class="center"> <button id="loginButton" v-on:click.prevent="areFieldsEmpty" class=" primary-color uk-button uk-button-primary">تسجيل دخول</button>  </div> </div>',
    methods:{

        areFieldsEmpty:function(){

            console.log(a.$refs);

            if((this.$refs.email === undefined || this.$refs.email === '') && (this.$refs.password === undefined || this.$refs.password === '')){
 
               alert('no email no password');
                
            }else if(this.email === undefined || this.email === '') {
 
              alert('no password');
 
            }else if(this.password === undefined || this.password === ''){
               alert('no email');
            }
 
          
 
         
         }

    }
});
  

const a = new Vue({

    el:"#loginApp",
    data:{
    
        email:"",
        password:"",
        a:"<h1>hi</h1>"
    
    },
    mounted:function(){
    
        // this.showAlert();
    },
    methods:{
    
       
    
    }
    
});

Vue.http.get('/getNationlId').then(response => {
 
    alert(JSON.stringify(response));

   }, error => {
    alert(JSON.stringify(error));
});