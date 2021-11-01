<template>
  <div class="card">
    <div class="card-body">{{vrijemeZapisa}}<br>{{zapis}}</div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ["zapis", "vrijeme"],
  name: "ZapisDnevnika",
  computed: {
    vrijemeZapisa(){
      return moment(this.vrijeme).toDate().toLocaleDateString();
    }
  }
};
</script>