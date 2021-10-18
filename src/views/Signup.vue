<template>
  <div class="about">
    <h1>Stranica za registraciju</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Unesite email</label>
              <input
                v-model="username"
                type="email"
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
                v-model="password1"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Ponovite lozinku</label>
              <input
                type="password"
                v-model="password2"
                class="form-control"
                id="exampleInputPassword2"
                placeholder="Password"
              />
            </div>
            <button type="button" @click="signup" class="btn btn-primary">
              Pošalji
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseApp } from "@/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Registracija",
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    };
  },
  methods: {
    signup() {
      if (
        this.password1 == null ||
        this.password2 == null ||
        this.username == null
      ) {
        alert("Popunite sva potrebna polja");
      } else {
        if (this.password1 == this.password2) {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.username, this.password1)
            .then((result) => {
              alert("Uspjesna registracija");
              this.$router.replace({name: 'Home'});
            })
            .catch(function (error) {
              console.error("Došlo je do greške", error);
            });
        } else {
          alert("Lozinke moraju biti jednake!");
        }
      }
    },
  },
};
</script>
