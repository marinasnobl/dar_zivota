<template>
  <div id="savjeti">
    <div id="naslov_savjeta">
    <h4>{{ naslov }}</h4>
    </div>
    <div id="tekst_savjeta">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["naslov", "text"],
  name: "karticeSavjeti",
};
</script>
<style>
  #savjeti{
    border-style: solid;
    border-color:dimgray;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
  }
  #naslov_savjeta{
    font-family: Helvetica, sans-serif;
  }
  #tekst_savjeta{
    font-family: Helvetica, sans-serif;
    font-style: italic;
    color: dimgray;
  }
</style>
