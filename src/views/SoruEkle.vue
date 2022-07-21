<template>
  <div class="fl col-12">
    <div v-if="alerts" class="alert alert-success">Kaydedildi!!!</div>

    <div class="form-group fl col-12">
      <label for="soru">Soru Giriniz</label>
      <input
        type="text"
        class="form-control"
        id="soru"
        v-model="soru"
        placeholder="Soru Giriniz"
      />
    </div>

    <div class="form-group fl col-6">
      <label for="SecenekA">A Seçeneği</label>
      <input
        type="text"
        class="form-control"
        id="SecenekA"
        v-model="SecenekA"
        placeholder="A Seçeneği"
      />
    </div>

    <div class="form-group fl col-6">
      <label for="SecenekA">B Seçeneği</label>
      <input
        type="text"
        class="form-control"
        id="SecenekB"
        v-model="SecenekB"
        placeholder="B Seçeneği"
      />
    </div>

    <div class="form-group fl col-6">
      <label for="SecenekC">C Seçeneği</label>
      <input
        type="text"
        class="form-control"
        id="SecenekC"
        v-model="SecenekC"
        placeholder="C Seçeneği"
      />
    </div>

    <div class="form-group fl col-6">
      <label for="SecenekD">D Seçeneği</label>
      <input
        type="text"
        class="form-control"
        id="SecenekD"
        v-model="SecenekD"
        placeholder="D Seçeneği"
      />
    </div>

    <div class="form-group col-6 fl">
      <label for="DogruCevap">Dogru Cevap Seçiniz</label>
      <select class="form-control" v-model="DogruCevap" id="DogruCevap">
        <option :value="SecenekA">A: {{ SecenekA }}</option>
        <option :value="SecenekB">B: {{ SecenekB }}</option>
        <option :value="SecenekC">C: {{ SecenekC }}</option>
        <option :value="SecenekD">D: {{ SecenekD }}</option>
      </select>
    </div>

    <div class="form-group fl col-6">
      <label for="Puan">Puan</label>
      <input
        type="number"
        class="form-control"
        id="Puan"
        v-model="Puan"
        placeholder="Puan"
      />
    </div>

    <div class="form-group fl col-6">
      <label for="DersKodu">Ders </label>
      <select class="form-control" v-model="DersKodu" id="DersKodu">
        <option v-for="d in dersler" :key="d.id" :value="d.DersKodu">
          {{ d.sinif }}. sınıf {{ d.DersAdi }}
        </option>
      </select>
    </div>
    <div class="form-group fl col-6">
      <label for="durum">Durum </label>
      <select class="form-control" v-model="durum" id="durum">
        <option :value="true">Aktif</option>
        <option :value="false">Pasif</option>
      </select>
    </div>

    <div class="d-flex j-between fl col-12 mt-4">
      <button class="btn btn-success" @click="onSave">Kaydet</button>
      <button
        class="btn btn-danger"
        @click="$router.push({ name: 'SoruList' })"
      >
        İptal
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerID: this.$route.params.soruID || 0,
      dersler: [],
      soru: "",
      SecenekA: "",
      SecenekB: "",
      SecenekC: "",
      SecenekD: "",
      DogruCevap: "",
      Puan: 0,
      DersKodu: "",
      durum: false,
      alerts: false,
    };
  },
  created() {
    if (this.routerID != 0) {
      this.UpdateList();
    }
    this.derslerList();
  },

  methods: {
    derslerList() {
      this.$appAxios.get("/Dersler").then((res) => {
        this.dersler = res.data || [];
      });
    },

    UpdateList() {
      this.$appAxios.get(`/Sorular?id=${this.routerID}`).then((res) => {
        this.DersKodu = res.data[0].DersKodu;
        this.soru = res.data[0].Soru;
        this.SecenekA = res.data[0].A;
        this.SecenekB = res.data[0].B;
        this.SecenekC = res.data[0].C;
        this.SecenekD = res.data[0].D;
        this.DogruCevap = res.data[0].DogruCevap;
        this.durum = res.data[0].durum;
        this.Puan = res.data[0].Puan;
      });
    },

    onSave() {
      const saveObject = {
        DersKodu: this.DersKodu,
        Soru: this.soru,
        A: this.SecenekA,
        B: this.SecenekB,
        C: this.SecenekC,
        D: this.SecenekD,
        DogruCevap: this.DogruCevap,
        durum: this.durum,
        Puan: this.Puan,
      };

      var UpdateSave = "";
      if (this.routerID != 0) {
        UpdateSave = this.$appAxios.put(
          `/Sorular/${this.routerID}`,
          saveObject
        );
      } else {
        UpdateSave = this.$appAxios.post("/Sorular ", saveObject);
      }

      UpdateSave.then(() => {
        this.alerts = true;
        setTimeout(() => {
          this.soru = "";
          this.SecenekA = "";
          this.SecenekB = "";
          this.SecenekC = "";
          this.SecenekD = "";
          this.DogruCevap = "";
          this.Puan = 0;
          this.DersKodu = "";
        }, 1000);
        setTimeout(() => {
          this.alerts = false;
        }, 5000);
      });
    },
  },
};
</script>