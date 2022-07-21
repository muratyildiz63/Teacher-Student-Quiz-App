<template>

  <div class="katbox">


    <ul class="d-flex a-center" v-if="dersler.length>0">
      <template v-for="ders in dersler" :key="ders.id">
        <li v-if="ders.durum">
          <router-link
            :to="'/ogrenci-sorular/' + ders.DersKodu"
            class="d-flex a-center"
          >
            <img
              src="../assets/img/turkce.svg"
              width="45"
              alt=""
              class="cols"
            />
            {{ ders.DersAdi }}
          </router-link>
        </li>
      </template>
    </ul>
    <div v-if="dersler.length<1" class="alert alert-danger">Bu sınıfa ait ders bulunamadı...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dersler: [],
      sinif: this.$route.params.sinif,
    };
  },
  created() {
    this.derslerList();
  },
  methods: {
    derslerList() {
      this.$appAxios.get("/Dersler").then((res) => {
        this.dersler = res.data || [];

        this.dersler = this.dersler.filter(i => i.sinif == this.sinif)
     
      });
    },
  },
  
};
</script>