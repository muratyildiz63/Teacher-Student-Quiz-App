import {
    createRouter,
    createWebHashHistory
} from "vue-router";
import OgrDersler from "@/views/OgrDersler"
import OgrSorular from "@/views/OgrSorular"
import SoruList from "@/views/SoruList"
import SoruEkle from "@/views/SoruEkle"

const routes = [{
        name: "OgrDersler",
        path: "/OgrDersler/:sinif",
        component: OgrDersler
    },
    {
        name: "OgrSorular",
        path: "/ogrenci-sorular/:DersKodu",
        component: OgrSorular
    },
    {
        name: "soru-guncelle",
        path: "/soru-guncelle/:soruID",
        component: SoruEkle
    },
    {
        name: "SoruList",
        path: "/soru-listesi",
        component: SoruList
    },
    {
        name: "SoruEkle",
        path: "/soru-ekle",
        component: SoruEkle
    },

]

const route = createRouter({
    routes,
    history: createWebHashHistory()
})
export default route