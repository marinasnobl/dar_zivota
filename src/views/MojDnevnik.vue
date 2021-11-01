<template>
  <div class="home">
    <h1><img src="@/assets/logo2.png" /></h1>
    <br />
    <h2>Moj dnevnik</h2>
    <div class="container">
      <div class="row row-cols-3">
        <div class="col">
          <h4>Razvoj djeteta</h4>
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
          <br />
        </div>
        <div class="col">
          <h4>Promjene kod majke</h4>
          <br />
          <div class="input-group mb-3">
            <button
              class="btn btn-outline-secondary"
              @click="unosPKD"
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
          <br />
        </div>
        <div class="col">
          <h4>Pregled kod ginekologa</h4>
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
          <datepicker :language="hr" v-model="datum"></datepicker><br />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row row-cols-3">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <zapis-dnevnika
                v-for="element1 in ispis1"
                :key="element1"
                :zapis="element1.biljeska"
                :vrijeme="element1.datumBiljeske"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <zapis-dnevnika
                v-for="element2 in ispis2"
                :key="element2"
                :zapis="element2.biljeska"
                :vrijeme="element2.datumBiljeske"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <zapis-dnevnika
                v-for="element3 in ispis3"
                :key="element3"
                :zapis="element3.biljeska"
                :vrijeme="element3.datumZaPregled"
              />
            </div>
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
import { collection, addDoc, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase";
import ZapisDnevnika from "@/components/ZapisDnevnika.vue";

export default {
  name: "Odabir",
  data() {
    return {
      datum: "",
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
    dohvatiZabiljesku1() {
      getDocs(collection(db, "razvoj_djeteta"), where('korisnik', '==', 'alensnobl@gmail.com'))
      .then((query) => {
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
      getDocs(collection(db, "promjene_kod_majke"), where('korisnik', '==', currentUser))
      .then((query) => {
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
      getDocs(collection(db, "pregled_kod_ginekologa"), where('korisnik', 'in', currentUser))
      .then((query) => {
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
        alert("Niste unjeli zabilješku");
      } else {
        try {
          addDoc(collection(db, "razvoj_djeteta"), {
            zabiljeska: this.text1,
            korisnik: currentUser,
            vrijemeUnosa: Date.now(),
          });
          alert("Zabilješka je unesena");
          this.dohvatiZabiljesku1();
        } catch (e) {
          console.error(e);
        }
      }
    },
    unosPKD() {
      if (this.text2 == null) {
        alert("Niste unjeli zabilješku");
      } else {
        try {
          addDoc(collection(db, "promjene_kod_majke"), {
            zabiljeska: this.text2,
            korisnik: currentUser,
            vrijemeUnosa: Date.now(),
          });
          alert("Zabilješka je unesena");
          this.dohvatiZabiljesku2();
        } catch (e) {
          console.error(e);
        }
      }
    },
    unosPKG() {
      if (this.text3 == null) {
        alert("Niste unjeli zabilješku");
      } else {
        try {
          addDoc(collection(db, "pregled_kod_ginekologa"), {
            zabiljeska: this.text3,
            korisnik: currentUser,
            vrijemeUnosa: Date.now(),
            datumPregleda: moment(this.datum).valueOf(),
          });
          alert("Zabilješka je unesena");
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