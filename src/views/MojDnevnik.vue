<template>
  <div class="home">
    <h1><img src="@/assets/logo2.png" /></h1>
    <p></p>
    <h2>Moj dnevnik</h2>
    <div class="container">
      <div class="row">
        <div class="col">Razvoj djeteta<br><button type="button" class="btn btn-primary">Dodaj</button></div>
        <div class="col">Promjene kod majke<br><button type="button" class="btn btn-primary">Dodaj</button></div>
        <div class="col">Pregled kod ginekologa<br><button type="button" class="btn btn-primary">Dodaj</button></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"><br><datepicker :language="hr" v-model="datum"></datepicker></div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import {hr} from 'vuejs-datepicker/dist/locale';
import moment, { now } from 'moment';

export default {
  name: 'Odabir',
  data() {
    return {
      datum: "",
      hr: hr,
    }
  },
  components: {
    Datepicker
  },
}
</script>