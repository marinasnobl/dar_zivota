<template>
  <div class="about">
    <h1>Stranica za prijavu</h1>
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
            <button type="submit" @click="login()" class="btn btn-primary">Prijava</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
      <div>
        <a href="#" >
           <router-link to="/signup">Nemate račun? Registrirajte se...</router-link>
        </a>
      </div>
    </div>
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
      .then((result)=>{
        console.log("Uspjesna prijava", result);
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