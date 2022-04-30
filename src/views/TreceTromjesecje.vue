<template>

  <div class="home">
    <img src="@/assets/trece_tromjesecje.png" /><br />
    <div class="container">
      <div class="row">
        <div id="home_tekst" class="col"><h2>Savjeti za tjelesno zdravlje</h2></div>
        <div id="home_tekst" class="col"><h2>Savjeti za duhovno zdravlje</h2></div>
      </div>
      <div class="row">
        <div class="col">
          <kartice-savjeti
          v-for="element in ispis1"
          :key="element.id"
          :naslov="element.naslov"
          :text="element.text"
          />
        </div>
        <div class="col">
          <div class="col">
          <kartice-savjeti
          v-for="element in ispis2"
          :key="element.id"
          :naslov="element.naslov"
          :text="element.text"
          />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import karticeSavjeti from "@/components/karticeSavjeti.vue"
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return{
      ispis1: [],
      ispis2: []
    }
  },
  mounted(){
    this.provjera();
  },
  methods:{
    provjera(){
      const q1 = query(collection(db, "savjetiTrecetromjesecje"), where('vrsta_savjeta', 'in', ['opci_savjet'] ))
      getDocs(q1).then((query) => {  
        this.ispis1 = [];
        query.forEach((doc) => {
          const data1 = doc.data();
          this.ispis1.push({
            id: data1.id,
            naslov: data1.naslov,
            text: data1.text,
          });
        });
      });
      const q2 = query(collection(db, "savjetiTrecetromjesecje"), where('vrsta_savjeta', 'in', ['duhovni_savjet'] ))
      getDocs(q2).then((query) => {  
        this.ispis2 = [];
        query.forEach((doc) => {
          const data2 = doc.data();
          this.ispis2.push({
            id: data2.id,
            naslov: data2.naslov,
            text: data2.text,
          });
        });
      });
    },
  },
  components:{
    karticeSavjeti
  }
}
</script>