
<template>
  <div class="fl col-12 bgWhite boxs o-hidden">
    <div class="fl col-12 d-flex j-center" v-if="!basla && Sorular.length > 0">
      <button class="btn btn-success" @click="(basla = !basla), zamanKontrol()">
        Başla
      </button>
    </div>
    <div v-if="Sorular.length < 1">Bu kategoriye Ait Soru Bulunamadı</div>

    <div
      class="fl col-12 d-flex j-center column"
      v-if="basla && localTime > 0 && Sorular.length > ShowIndex"
    >
      <PuanZaman :puan="puan" :localTime="localTime" />

      <template v-for="(Soru, index) in Sorular" :key="Soru.id">
        <div
          :class="{ active: index == ShowIndex }"
          class="fl col-12 Questions mb-20"
        >
          <p>{{ Soru.Soru }}</p>
          <div class="row">
            <div class="boxs col-6 fl col-xs-12">
              <button
                :class="{ active: cevap == Soru.A }"
                @click="cevap = Soru.A"
              >
                {{ Soru.A }}
              </button>
            </div>
            <div class="boxs col-6 fl col-xs-12">
              <button
                :class="{ active: cevap == Soru.B }"
                @click="cevap = Soru.B"
              >
                {{ Soru.B }}
              </button>
            </div>
            <div class="boxs col-6 fl col-xs-12">
              <button
                :class="{ active: cevap == Soru.C }"
                @click="cevap = Soru.C"
              >
                {{ Soru.C }}
              </button>
            </div>
            <div class="boxs col-6 col-xs-12 fl">
              <button
                :class="{ active: cevap == Soru.D }"
                @click="cevap = Soru.D"
              >
                {{ Soru.D }}
              </button>
            </div>
          </div>

          <div
            class="btn col-12 btn-info"
            v-if="cevap != ''"
            @click="kontrol(Soru)"
          >
            Cevapla
          </div>
        </div>

        <div class="overlay" :class="{ active: myAlert }"></div>
        <div class="messages" :class="{ active: myAlert }">
          <div class="d-flex j-center a-center column h-100">
            <img
              src="../assets/img/alert.svg"
              width="100"
              alt=""
              class="cols"
            />
            <div class="alert" v-html="msgText"></div>
            <div class="btn btn-primary" @click="go()">Devam</div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="Sorular.length > 0">
      <div
        v-if="ShowIndex >= Sorular.length"
        class="text-center alert alert-success"
      >
        Tebrikler!! Testi başarılı bir şekilde tamamladınız
        <div>
          Puan : <span>{{ puan }} </span>
        </div>
      </div>

      <div v-if="localTime < 1" class="alert alert-danger">
        Süre Bitmiştir
        <a href="/">Tekrar Dene</a>
      </div>
    </div>
  </div>
</template>

<script>
import PuanZaman from "@/views/PuanZaman";
export default {
  components: {
    PuanZaman,
  },
  data() {
    return {
      Sorular: [],
      DersKodu: this.$route.params.DersKodu,
      basla: false,
      ShowIndex: 0,
      cevap: "",
      puan: 0,
      localTime: 60,
      msgText: "",
      myAlert: false,
    };
  },
  created() {
    this.SorularList();
  },
  methods: {
    SorularList() {
      this.$appAxios.get("/Sorular").then((res) => {
        this.Sorular = res.data || [];
        this.Sorular = this.Sorular.filter((i) => i.DersKodu == this.DersKodu);
      });
    },

    kontrol(Soru) {
      if (Soru.DogruCevap == this.cevap) {
        this.puan = this.puan + Soru.Puan;
        this.cevap = "";
        this.msgText = "Tebrikler Doğru Cevap";
        this.myAlert = true;
        this.localTime = 100;
      } else {
        this.msgText = `Yanlış Cevap <br> Doğru Cevap : ${Soru.DogruCevap}`;
        this.myAlert = true;
        this.localTime = 100;
      }
    },
    go() {
      this.localTime = 30;
      this.myAlert = false;
      setTimeout(() => {
        this.ShowIndex++;
      }, 1000);
    },

    zamanKontrol() {
      clearInterval(myInterval);
      var time = this;
      this.localTime = 60;
      var myInterval = setInterval(function () {
        time.localTime--;
      }, 1000);
    },
  },
};
</script>