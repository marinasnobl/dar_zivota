<template>
  <div class="home">
    <h1><img src="@/assets/moj_dnevnik.png" /></h1>
    <br />
   
    <div class="container">
      <div class="row row-cols-3">
        <div class="col">
          <h1 id="naslov" >Razvoj djeteta</h1>
          <br />
          <div class="input-group mb-3">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              @click="unosRD"
            >
              Dodaj
            </button>
            <input
              v-model="text1"
              type="text"
              class="form-control"
              placeholder="Dodajte novu bilješku"
              aria-describedby="button-addon1"
            />
          </div>
          <div class="col">
              <zapis-dnevnika
                v-for="element in ispis1"
                :key="element.id"
                :zapis="element.biljeska"
                :vrijeme="element.datumBiljeske"
              /> 
        </div>
        </div>
        <div id="dnevnik" class="col">
          <h1 id="naslov">Promjene kod majke</h1>
          <br />
          <div class="input-group mb-3">
            <button
              class="btn btn-outline-secondary"
              @click="unosPKM"
              type="button"
              id="button-addon2"
            >
              Dodaj
            </button>
            <input
              v-model="text2"
              type="text"
              class="form-control"
              placeholder="Dodajte novu bilješku"
              aria-describedby="button-addon2"
            />
          </div>
          <div class="col">
          
              <zapis-dnevnika
                v-for="element in ispis2"
                :key="element.id"
                :zapis="element.biljeska"
                :vrijeme="element.datumBiljeske"
              />
            
        </div>
        </div>
        <div class="col">
          <h1 id="naslov">Pregled kod ginekologa</h1>
          <br />
          <div class="input-group mb-3">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon3"
              @click="unosPKG"
            >
              Dodaj
            </button>
            <input
              v-model="text3"
              type="text"
              class="form-control"
              placeholder="Dodajte novu bilješku"
              aria-describedby="button-addon3"
            />
          </div>
          <datepicker :language="hr" v-model="datum" placeholder="Odaberite datum pregleda"></datepicker><br />
          <div class="col">
          
              <zapis-dnevnika
                v-for="element in ispis3"
                :key="element.id"
                :zapis="element.biljeska"
                :vrijeme="element.datumZaPregled"
              />
            
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import { hr } from "vuejs-datepicker/dist/locale";
import moment, { now } from "moment";
import currentUser from "@/store";
import { collection, addDoc, getDocs, doc, where, query, deleteDoc, setDoc, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import ZapisDnevnika from "@/components/ZapisDnevnika.vue";
import store from '@/store';

export default {
  name: "Odabir",
  data() {
    return {
      datum: null,
      text1: null,
      text2: null,
      text3: null,
      hr: hr,
      ispis1: [],
      ispis2: [],
      ispis3: [],
    };
  },
  mounted() {
    this.dohvatiZabiljesku1();
    this.dohvatiZabiljesku2();
    this.dohvatiZabiljesku3();
  },
  methods: {
    obrisi1() {
        deleteDoc(doc(db, 'razvoj_djeteta', ''))//kod drugih navodnih znakova treba doći id od označene bilješke
        console.log("Test")
        alert("Uspješno obrisano")
        this.dohvatiZabiljesku1();
    },
    obrisi2() {
        deleteDoc(doc(db, 'promjene_kod_majke', ''))//kod drugih navodnih znakova treba doći id od označene bilješke
        alert("Uspješno obrisano")
        this.dohvatiZabiljesku2();
    },
    obrisi3() {
        deleteDoc(doc(db, 'pregled_kod_ginekologa', ''))//kod drugih navodnih znakova treba doći id od označene bilješke
        alert("Uspješno obrisano")
        this.dohvatiZabiljesku3();
    },
    dohvatiZabiljesku1() {
     const q = query(collection(db, store.currentUser + "_razvoj_djeteta"),orderBy("vrijemeUnosa", "desc"))
      getDocs(q).then((query) => {
        this.ispis1 = [];
        query.forEach((doc) => {
          const data1 = doc.data();
          this.ispis1.push({
            id: doc.id,
            datumBiljeske: data1.vrijemeUnosa,
            biljeska: data1.zabiljeska,
          });
        });
      });
    },
    dohvatiZabiljesku2() {
      const q = query(collection(db, store.currentUser +"_promjene_kod_majke"),orderBy("vrijemeUnosa", "desc"))
      getDocs(q).then((query) => {
        this.ispis2 = [];
        query.forEach((doc) => {
          const data2 = doc.data();
          this.ispis2.push({
            id: doc.id,
            datumBiljeske: data2.vrijemeUnosa,
            biljeska: data2.zabiljeska,
          });
        });
      });
    },
    dohvatiZabiljesku3() {
      const q = query(collection(db, store.currentUser + "_pregled_kod_ginekologa"),orderBy("vrijemeUnosa", "desc"))
      getDocs(q).then((query) => {
        this.ispis3 = [];
        query.forEach((doc) => {
          const data3 = doc.data();
          this.ispis3.push({
            id: doc.id,
            datumZaPregled: data3.datumPregleda,
            biljeska: data3.zabiljeska,
          });
        });
      });
    },
    unosRD() {
      if (this.text1 == null) {
        alert("Niste unjeli bilješku");
      } else {
        try {
          addDoc(collection(db, store.currentUser + "_razvoj_djeteta"), {
            zabiljeska: this.text1,
            vrijemeUnosa: Date.now(),
          });
          alert("Bilješka je unesena");
          this.text1=null;
          this.dohvatiZabiljesku1();
        } catch (e) {
          console.error(e);
        }
      }
    },
    unosPKM() {
      if (this.text2 == null) {
        alert("Niste unjeli bilješku");
      } else {
        try {
         addDoc(collection(db, store.currentUser + "_promjene_kod_majke"), {
            zabiljeska: this.text2,
            vrijemeUnosa: Date.now(),
          });
          alert("Bilješka je unesena");
          this.text2=null;
          this.dohvatiZabiljesku2();
        } catch (e) {
          console.error(e);
        }
      }
    },
    unosPKG() {
      if (this.text3 == null || this.datum==null) {
        alert("Niste unjeli bilješku ili datum pregleda");
      } else {
        try {
          addDoc(collection(db, store.currentUser + "_pregled_kod_ginekologa"), {
            zabiljeska: this.text3,
            vrijemeUnosa: Date.now(),
            datumPregleda: moment(this.datum).valueOf(),
          });
          alert("Bilješka je unesena");
          this.text3=null;
          this.datum=null;
          this.dohvatiZabiljesku3();
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  components: {
    Datepicker,
    ZapisDnevnika,
  },
};
</script>
<style lang="scss">
#dnevnik{
  border-color: rgb(167, 164, 164);
  border-style:solid;
  border-top:0;
  border-bottom: 0;
}
#naslov{
  font-family:'CommercialScript BT';
  color: #178D7D;
}
</style>