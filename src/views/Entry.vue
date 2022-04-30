<template>
  <div id="pozadina" class="home">
    <div id="izracun">
       <img src="@/assets/logo2.png" >
      <h3>
        <br>
        Izračunaj u kojem si mjesecu trudnoće <br />
        i otkrij što te čeka na ovome putovanju <br />
        <br />
      </h3>
    </div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <datepicker
            id="kalendar"
            :language="hr"
            v-model="datum"
            :clear-button="true"
            placeholder="Odaberite datum"
          ></datepicker>
         
        </div>
        <div id="tipka_izracunaj" class="col">
           <button
            type="button"
            @click="izracun()"
            class="btn btn-outline-secondary"
          >
            Izračunaj
          </button>
        </div>
      </div>
      <br><br>
      <img src="@/assets/happy_married_couple.png" height="10%" width="10%">
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { hr } from "vuejs-datepicker/dist/locale";
import moment, { now } from "moment";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import store from "@/store";

export default {
  name: "Odabir",
  data() {
    return {
      datum: null,
      hr: hr,
      store,
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    izracun() {
      if (this.datum == null) {
        alert("Odaberite odgovarajući datum");
      } else {
        try {
          setDoc(doc(db, store.currentUser, "zadnja_mjesecnica"), {
            datum_zadnje_mjesecnice: moment(this.datum).valueOf(),
          });
        } catch (e) {
          console.error(e);
        }
        let start = moment(this.datum);
        let end = moment(now());
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        days = Math.round(days);
        store.dani_trudnoce = days;
        if (days < 0) {
          alert("Unjeli ste pogrešan datum!");
        } else {
          if (days <= 84) {
            this.$router.replace({ name: "PrvoTromjesecje" });
          }
          if (days > 84 && days <= 182) {
            this.$router.replace({ name: "DrugoTromjesecje" });
          }
          if (days > 182) {
            this.$router.replace({ name: "TreceTromjesecje" });
          }
        }
      }
    },
  },
};
</script>
<style>
#pozadina {
}
#tipka_izracunaj{
  text-align: left;
}
#izracun {
  color: #178d7d;
  font-family: Lucida Calligraphy;
}
#kalendar {
  text-align: center;
}
</style>