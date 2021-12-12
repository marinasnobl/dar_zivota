<template>

  <div class="home">
    <img src="@/assets/prvo_tromjesecje.png" /><br />
    <div class="container">
      <div class="row">
        <div class="col"><h2>Savjeti</h2></div>
        <div class="col"><h2>Duhovnost</h2></div>
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
    }
  },
  mounted(){
    this.provjera();
  },
  methods:{
    provjera(){
      const q = query(collection(db, "Savjeti"), where('vrsta_savjeta', 'in', ['opci_savjet'] ))
      getDocs(q).then((query) => {  
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
    },
  },
  components:{
    karticeSavjeti
  }
}
</script>
