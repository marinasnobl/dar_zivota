<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-10">
          {{ vrijemeZapisa }} <br />
          {{ zapis }}
        </div>
        <div class="col">
          <input
         
            class="form-check-input"
            type="checkbox"
            value="test"
            id="defaultCheck1"
          />
        </div>
      </div>
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