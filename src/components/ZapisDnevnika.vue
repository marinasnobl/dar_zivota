<template>
  <div id="kartica" class="card">
         <div id="kartica_vrijeme_zapisa"> 
           {{ vrijemeZapisa }} 
         </div>
         <div id="kartica_biljeska">
          {{ zapis }}
         </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["zapis", "vrijeme"],
  name: "ZapisDnevnika",
  computed: {
    vrijemeZapisa() {
      return moment(this.vrijeme).toDate().toLocaleDateString();
    },
  },
};
</script>
<style lang="scss">
#kartica{
  border-color: rgb(167, 164, 164);
}
#kartica_vrijeme_zapisa{
  text-align: left;
  margin-left: 5px;
  font-style: italic;
  font-weight: bold;
}
#kartica_biljeska{
  font-family:'CommercialScript BT';
  font-size: 150%;
}
</style>