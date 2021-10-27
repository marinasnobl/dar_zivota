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
              id="button-addon1"
            >
              Dodaj
            </button>
            <input
              v-model="text2"
              type="text"
              class="form-control"
              placeholder="Dodajte novu bilješku"
              aria-describedby="button-addon1"
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
              id="button-addon1"
               @click="unosPKG"
            >
              Dodaj
            </button>
            <input
              v-model="text3"
              type="text"
              class="form-control"
              placeholder="Dodajte novu bilješku"
              aria-describedby="button-addon1"
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
            <div class="card-body">This is some text within a card body.</div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">This is some text within a card body.</div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">This is some text within a card body.</div>
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
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "Odabir",
  data() {
    return {
      datum: "",
      text1: "",
      text2: "",
      text3: "",
      hr: hr,
    };
  },
  methods: {
    unosRD() {
      try {
        addDoc(collection(db, "razvoj_djeteta"), {
          zabiljeska: this.text1,
          korisnik: currentUser,
          vrijemeUnosa: Date.now(),
        });
        alert("Zabilješka je unesena");
        this.text1 = "";
      } catch (e) {
        console.error(e);
      }
    },
    unosPKD() {
      try {
        addDoc(collection(db, "promjene_kod_majke"), {
          zabiljeska: this.text2,
          korisnik: currentUser,
          vrijemeUnosa: Date.now(),
        });
        alert("Zabilješka je unesena");
         this.text2 = "";
      } catch (e) {
        console.error(e);
      }
    },
    unosPKG() {
      try {
        addDoc(collection(db, "pregled_kod_ginekologa"), {
          zabiljeska: this.text3,
          korisnik: currentUser,
          vrijemeUnosa: Date.now(),
          datumPregleda: this.datum
        });
        alert("Zabilješka je unesena");
         this.text3 = "";
      } catch (e) {
        console.error(e);
      }
    },
  },
  components: {
    Datepicker,
  },
};
</script>