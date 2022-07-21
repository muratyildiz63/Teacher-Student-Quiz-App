<template>
  <div class="fl col-12">
    <div class="fl col-12 d-flex a-center j-between mb-20">
      <h1 class="block-title">Sorular</h1>
      <span class="btn btn-success">
        <router-link to="/soru-ekle" class="d-flex a-center">
          Soru Ekle
        </router-link>
      </span>
    </div>

    <div class="fl col-12 scrolCat">
      <div class="fl col-12 d-flex FilterBtn mb-15">
        <template v-for="d in dersler" :key="d.id">
          <div class="boxs-5 fl col-3">
            <button class="fl col-12" @click="filrele(d.DersKodu)">
              {{ d.sinif }}. Sınıf {{ d.DersAdi }} Sorular
            </button>
          </div>
        </template>
      </div>
    </div>
    <table class="fl col-12 table table-striped borderTable">
      <thead>
        <tr>
          <th class="text-center"></th>
          <th class="text-center">Ders Kodu</th>
          <th>Soru</th>
          <th class="text-center">A</th>
          <th class="text-center">B</th>
          <th class="text-center">C</th>
          <th class="text-center">D</th>
          <th>Doğru Cevap</th>
          <th class="text-center">Puan</th>
          <th class="text-center">Durum</th>
          <th class="text-center">Sil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="S in SoruList" :key="S.id">
          <td class="text-center">
            <span class="c-pointer">
              <router-link :to="'/soru-guncelle/'+S.id" class="d-flex a-center">
                <img src="../assets/img/update.svg" width="20" alt="" />
              </router-link>
            </span>
          </td>
          <td class="text-center">{{ S.DersKodu }}</td>
          <td>{{ S.Soru }}</td>
          <td class="text-center">{{ S.A }}</td>
          <td class="text-center">{{ S.B }}</td>
          <td class="text-center">{{ S.C }}</td>
          <td class="text-center">{{ S.D }}</td>
          <td>{{ S.DogruCevap }}</td>
          <td class="text-center">{{ S.Puan }}</td>
          <td class="text-center">
            <img
              v-if="S.durum"
              src="../assets/img/active.svg"
              width="20"
              alt=""
            />
            <img v-else src="../assets/img/passive.svg" width="20" alt="" />
          </td>

          <td class="text-center">
            <div class="btn btn-danger btn-small" @click="DeleteUser(S)">
              Sil
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dersler: [],
      SoruList: [],
      SoruFiltre: [],
    };
  },
  created() {
    this.liste();
    this.derslerList();
  },
  methods: {
    liste() {
      this.$appAxios.get("/Sorular").then((res) => {
        this.SoruList = res.data || [];
      });
    },
    derslerList() {
      this.$appAxios.get("/Dersler").then((res) => {
        this.dersler = res.data || [];
      });
    },
    DeleteUser(item) {
      this.$appAxios.delete(`/Sorular/${item.id}`).then(() => {
        this.liste();
      });
    },
 
    filrele(DersKodu) {
      this.$appAxios.get("/Sorular").then((res) => {
        this.SoruList = res.data.filter((i) => i.DersKodu == DersKodu);
      });
    },
  },
};
</script>