<template>
    <div class="card">
  <h5 class="card-header">{{naslov}}</h5>
  <div class="card-body">
    <p class="card-text">{{text}}</p>
  </div>
</div>
</template>

<script>

export default {
  props: ["naslov", "text"],
  name:"karticeSavjeti"
}
</script>
