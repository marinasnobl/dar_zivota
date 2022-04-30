<template>
  <div class="home">
    <div> <img src="@/assets/logo.png"> </div>
    <br>
    <h2> <div id="home_tekst"> Dobrodošli u vaš vodič za trudnoću <br> krenimo u ovo putovanje <br> zajedno sa zahvalnošću <br> za novi život koji nastaje </div></h2> 
  </div>
</template>

<script>
import { collection, query, where, getDocs, doc} from "firebase/firestore";
import { db } from "@/firebase";
import store from "@/store.js";
import moment, { now } from "moment";
export default {
  name: 'Home',
  data() {
    return {
      store
    };
  },
  mounted() {
    this.provjera();
  },
  methods: {
    provjera() {
      if(store.currentUser!=null){
      let handle1 = setTimeout(() => {
        console.log("Pozivanje firebase");
        const q = query(collection(db, store.currentUser))
        getDocs(q).then((query) => {
        console.log("Dohvacanje podatka");
        query.forEach((doc) => {
          const data1 = doc.data();
          store.datum_zadnje_mjesecnice=data1.datum_zadnje_mjesecnice;
        });
      });
      }, 2000);

      let handle2 = setTimeout(() => {
        console.log("Izracun trudnoce");
        let start = moment(store.datum_zadnje_mjesecnice);
        let end = moment(now());
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        days = Math.round(days);
        store.dani_trudnoce = days;
      }, 5000);
      }
    },
  }
}
</script>
<style>
#home_tekst{
  font-family:Lucida Calligraphy;
  font-stretch: expanded;
  color: #178D7D;
}
</style>