<template>
  <div class="home">
    <h1><img src="@/assets/logo2.png" /></h1>
    <p></p>
    <h2>Izračunaj u kojem si mjesecu trudnoće</h2>
    <h2>i otkrij što te čeka na ovome putovanju</h2>
    <div v-if="!store.datum_zadnje_mjesecnice">
      Za izračun odabrati datum zadnje mjesečnice
    </div>
    <div v-if="store.datum_zadnje_mjesecnice">
      Datum zadnje mjesečnice postavljen na {{ this.datum_mjesecnice }}<br>
      Za ponovno postavljanje datuma, odaberite datum iz kalendara 
    </div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col"></div>
        
        <div class="col">
          <datepicker :language="hr" v-model="datum" :clear-button="true" placeholder="Odaberite datum"></datepicker> <br>
          <button type="button" @click="izracun()" class="btn btn-primary">
            Izračunaj
          </button>
        </div>
        <div class="col">
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { hr } from "vuejs-datepicker/dist/locale";
import moment, { now } from "moment";
import { collection, addDoc, updateDoc, doc} from "firebase/firestore";
import { db } from "@/firebase";
import store from "@/store";

export default {
  name: "Odabir",
  data() {
    return {
      datum: null,
      hr: hr,
      datum_mjesecnice: null,
      store,
    };
  },
  components: {
    Datepicker,
  },
  mounted(){
    this.provjera();
  },
  methods: {
    provjera(){
      this.datum_mjesecnice = moment(store.datum_zadnje_mjesecnice).toDate().toLocaleDateString();
    },
    izracun() {
      if(store.datum_zadnje_mjesecnice==null){
       try{
          addDoc(collection(db, store.currentUser), {
            tip_zabiljeske: "datum_zadnje_mjesecnice",
            datum_zadnje_mjesecnice: moment(this.datum).valueOf()
        });
       } catch(e){
         console.error(e)
       }
      }else {
        const Ref = doc(db, store.currentUser, 'heHJweGVFN25xzvhLXfu');
        updateDoc(Ref, {datum_zadnje_mjesecnice: moment(this.datum).valueOf()})
      }
      let start = moment(this.datum);
      let end = moment(now());
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      days = Math.round(days);
      store.dani_trudnoce=days;
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
    },
  },
};
</script>