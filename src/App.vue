<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"
            ><router-link to="/"
              ><img src="@/assets/logo.png" height="40px" /></router-link
          ></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">
                <router-link to="/">Home</router-link>
              </a>
              <a v-if="!store.currentUser" class="nav-link" href="#">
                <router-link to="/login">Prijava</router-link>
              </a>
              <a v-if="!store.currentUser" class="nav-link" href="#">
                <router-link to="/signup">Registracija</router-link>
              </a>
              <a v-if="store.currentUser" class="nav-link" href="#">
                <router-link to="/entry">Izračun trudnoće</router-link>
              </a>
              <a v-if="store.currentUser" class="nav-link" href="#">
                <router-link to="/mojDnevnik">Moj dnevnik</router-link>
              </a>
              <a
                v-if="
                  store.dani_trudnoce <= 84 &&
                  store.currentUser &&
                  store.dani_trudnoce != null
                "
                class="nav-link"
                href="#"
              >
                <router-link to="/PrvoTromjesecje" class="nav-link"
                  >Prvo tromjesečje</router-link
                >
              </a>
              <a
                v-if="
                  store.dani_trudnoce > 84 &&
                  store.dani_trudnoce <= 182 &&
                  store.currentUser
                "
                class="nav-link"
                href="#"
              >
                <router-link to="/DrugoTromjesecje"
                  >Drugo tromjesečje</router-link
                >
              </a>
              <a
                v-if="store.dani_trudnoce > 182 && store.currentUser"
                class="nav-link"
                href="#"
              >
                <router-link to="/TreceTromjesecje"
                  >Treće tromjesečje</router-link
                >
              </a>
              <a
                v-if="store.currentUser"
                href="#"
                @click="logout()"
                class="nav-link"
              >
                Odjava
              </a>
              <p v-if="store.currentUser" class="nav-link">
                {{ store.currentUser }}
              </p>
               <p v-if="store.dani_trudnoce && store.currentUser" class="nav-link">
                dan trudnoće: {{ store.dani_trudnoce }}
               </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
import { firebaseApp } from "@/firebase.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import store from "@/store.js";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email);
    store.currentUser = user.email;
  } else {
    console.log("No user");
    store.currentUser = null;
  }
});

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      store.datum_zadnje_mjesecnice = null;
      store.dani_trudnoce = null;
      store.currentUser = null;
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.replace({ name: "Login" });
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  div {
    border-spacing: 0;
  }
  a {
    font-weight: bold;
    color: #178d7d;

    &.router-link-exact-active {
      color: #0ec7ae;
    }
  }
  p {
    color: #178d7d;
    font-style: italic;
  }
}
</style>
