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
                <router-link to="/PrvoTromjesecje"
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
                {{ store.dani_trudnoce }}
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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import store from "@/store.js";
import moment, { now } from "moment";

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
  mounted() {
    this.provjera();
  },
  methods: {
    provjera() {
      let handle1 = setTimeout(() => {
        console.log("Pozivanje firebase");
        const q = query(
          collection(db, store.currentUser),
          where("tip_zabiljeske", "in", ["datum_zadnje_mjesecnice"])
        );
        console.log("Dohvacanje podatka");
        getDocs(q).then((query) => {
          query.forEach((doc) => {
            const data1 = doc.data();
            store.datum_zadnje_mjesecnice = data1.datum_zadnje_mjesecnice;
          });
        });
      }, 3000);
      let handle2 = setTimeout(() => {
        console.log("Izracun trudnoce");
        let start = moment(store.datum_zadnje_mjesecnice);
        let end = moment(now());
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        days = Math.round(days);
        store.dani_trudnoce = days;
      }, 5000);
    },
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push({ name: "Login" });
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
