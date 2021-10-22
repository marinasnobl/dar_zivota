<template>
  <div class="home">
    <h1><img src="@/assets/logo2.png" /></h1>
    <p></p>
    <h2>Izračunaj u kojem si mjesecu trudnoće</h2>
    <h2>i otkrij što te čeka na ovome putovanju</h2>
    <div>Za izračun ispuniti polje</div>
    <h2>
    <datepicker :language="hr" v-model="datum"></datepicker>
    </h2>
  <div> 
     <button type="submit" @click="izracun()" class="btn btn-primary">Izračunaj</button>
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
  methods: {
    izracun(){
      let start = moment(this.datum);
      let end = moment(now());
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      days =  Math.round(days);
      console.log(days);
    },
  },
}

</script>