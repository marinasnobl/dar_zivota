

      
        
        
        
        
      </div>
    </div>
  </div>
</nav>

<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">DAR ŽIVOTA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
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
              <a v-if="store.currentUser" href="#" @click="logout()" class="nav-link disabled">
                Odjava
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { firebaseApp } from "@/firebase.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import store from "@/store.js";

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
    return{
      store,
    };
  },
  methods: {
    logout(){
      const auth = getAuth();
      signOut(auth)
      .then(()=> {
        this.$router.push({name: 'Login'});
      });
    },
  },
}
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

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
