<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <ul class="col-12 d-flex j-center navs">
          <li class="fl">
            <router-link to="/OgrDersler/1" class="d-flex a-center">
              1. Sınıf
            </router-link>
          </li>

          <li class="fl">
            <router-link to="/OgrDersler/2" class="d-flex a-center">
              2. Sınıf
            </router-link>
          </li>

          <li class="fl">
            <router-link to="/OgrDersler/3" class="d-flex a-center">
              3. Sınıf
            </router-link>
          </li>
          <li class="fl OgretmenMenu pos-r">
            <span>Öğrenmen</span>
            <ul class="">
              <li>
                <router-link to="/soru-listesi" class="d-flex a-center">
                  Sorular
                </router-link>
              </li>
              <li>
                <router-link to="/soru-ekle" class="d-flex a-center">
                  Dersler
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <router-view class="layout"></router-view>
      </div>
    </div>
  </div>
</template>

