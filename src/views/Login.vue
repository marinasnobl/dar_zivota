<template>  
  <div id="pozadina" class="about"> 
    <div id="home_tekst">
    <h1>Stranica za prijavu</h1>
    </div>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Unesite email</label>
              <input
                type="email"
                v-model="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lozinka</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <br>
            <button type="button" @click="login()" class="btn btn-outline-secondary">Prijava</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
      <div>
        <a href="#" >
           <router-link id="link" to="/signup"> Nemate račun? Registrirajte se...</router-link>
        </a>
      </div>
    </div>
    <br><br><br><br><br><br>
  </div>
</template>

<script>
import { firebaseApp } from "@/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name:'login',
  data() {
    return {
      username:null,
      password:null,
    }
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.username, this.password)
      .then((UserCredential)=>{
        this.$router.replace({name: 'Home'});
      })
      .catch((error) => {
        console.error("Greška", error);
        alert("Greška e-maila ili lozinke");
      });
    }
  }  
}
</script>
<style>
  #link{
    font-family: Helvetica, sans-serif;
    color: #178d7d;
  }
</style>