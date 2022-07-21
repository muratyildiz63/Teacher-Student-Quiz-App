<template>
  <div class="fl col-12 d-flex j-center puanCountbox">
    <div class="puanCount bgWhite">
      <span>Puan</span>
      <span>{{ puan }}</span>
    </div>
    <div class="">
      <img src="../assets/img/time.svg" width="65" alt="" class="cols" />

      <span>{{ localTime }}</span>
    </div>
  </div>
</template>


<script>
export default {
    props:["puan","localTime"]
}
</script>