<template>
  <div id="LoginIframeParent">
    <div class="align">
      <div class="grid align__item">
        <div class="register">
          <div
            id="Lang"
            class="ts-select is-active is-bottom"
            @click="langBtn = !langBtn"
          >
            <div class="content">
              <span
                id="SelectedFlag"
                class="ts-flag"
                :class="`is-${imgSelectKey}-flag`"
              ></span>
            </div>
            <div
              id="SelectLangPanel"
              class="ts-dropdown is-scrollable is-bottom"
              v-show="langBtn"
            >
              <button
                v-for="(item, index) in langSelect"
                :key="index"
                id="SelectLangItem"
                class="item"
                @click="clickLangBtn(item.key, item.imgKey)"
              >
                <span
                  :id="`SelectedFlag_${index}`"
                  class="ts-flag"
                  :class="`is-${item.imgKey}-flag`"
                ></span>
                {{ item.lang }}
              </button>
            </div>
          </div>
          <br />
          <img
            class="site__logo Logo"
            width="80"
            height="76"
            src="./../../../static/Icon.png"
          />
          <img
            class="site__title Logo"
            width="282"
            height="76"
            src="./../../../static/TitleText.png"
          />
          <form id="LoginForm" action="" class="form">
            <div class="form__field">
              <input
                id="AccountInput"
                type="text"
                name="account"
                v-model.trim="loginForm.account"
                autocomplete="off"
                value="test6"
                :placeholder="$t('AccountInput')"
              />
            </div>

            <div class="form__field">
              <input
                id="PasswordInput"
                type="password"
                name="password"
                v-model.trim="loginForm.password"
                autocomplete="off"
                value=""
                :placeholder="$t('PasswordInput')"
              />
            </div>
            <div class="status_field"> <span v-show="statusField">{{ $t('ConnectServer_0') }}</span></div>
            <div class="form__field" @click="getLogin()">
              <div class="onSubmit">{{ $t('Login') }}</div>
            </div>
          </form>

          <form
            id="ChangePWDForm"
            action=""
            class="form FormOffset"
            style="display: none"
          >
            <div class="form__field2">
              <label id="UserAccount" class="Label">{{ $t('UserAccount') }}</label>
              <div id="AccountField" style="width: 60%">AAA</div>
            </div>

            <div class="form__field2">
              <label id="OldPassword" class="Label">{{ $t('OldPassword') }}</label>
              <input
                class="PWDField"
                type="password"
                name="oldPassword"
                autocomplete="off"
                style="width: 60%"
                :placeholder="$t('ClickInput')"
              />
            </div>
            <div class="form__field2">
              <label id="NewPassword" class="Label">{{ $t('NewPassword') }}</label>
              <input
                class="PWDField"
                type="password"
                name="newPassword"
                autocomplete="off"
                style="width: 60%"
                :placeholder="$t('ClickInput')"
              />
            </div>
            <div class="form__field2">
              <label id="ConfirmNewPassword" class="Label">{{$t('ConfirmNewPassword')}}</label>
              <input
                class="PWDField"
                type="password"
                name="confirmPassword"
                autocomplete="off"
                style="width: 60%"
                :placeholder="$t('ClickInput')"
              />
            </div>

            <div id="Illustrate" class="status_field StatusLabelOffset">{{$t('Illustrate')}}</div>
            <div class="form__field ConfirmBtn">
              <input type="submit" id="OK" value="确认" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index";
function gethiddenStatus() {
  var isHidden = document.hidden;
  if(isHidden){
    console.log(13213)
  }else{
    console.log(1324253543)
    this.init();
  }
}
export default {
  name: "login",
  data() {
    return {
      langBtn: false,
      statusField:false,
      loginForm: {
        account: "",
        password: "",
        language: "cn",
      },
      imgSelectKey: "cn",
      langSelect: [
        {
          key: "cn",
          lang: "简体中文",
          imgKey: "cn",
        },
        {
          key: "tw",
          lang: "繁體中文",
          imgKey: "hk",
        },
        {
          key: "en",
          lang: "English",
          imgKey: "gb",
        },
        {
          key: "jp",
          lang: "日本語",
          imgKey: "jp",
        },
        {
          key: "th",
          lang: "ภาษาไทย",
          imgKey: "th",
        },
      ],
    };
  },
  mounted() {
    this.getLangImg();
    document.addEventListener('visibilitychange', this.handleVisiable)
  },
  destroyed() {
    window.removeEventListener("visibilitychange",this.handleVisiable)
  },
  methods: {
    handleVisiable(e) {
      switch(e.target.visibilityState) {
        case 'hidden':
          // console.log('内容不可见，处理后台、最小化、锁屏状态')
          break;
        case 'visible':
          console.log('处于正常打开')
          this.init();
          break;
      }
    },
    init() {
      this.$router.push({ path: "/Loading" });
    },
    getLangImg() {
      const lang = localStorage.getItem("language");
      switch (lang) {
        case "cn":
          this.imgSelectKey = "cn";
          break;
        case "tw":
          this.imgSelectKey = "hk";
          break;
        case "en":
          this.imgSelectKey = "gb";
          break;
        case "jp":
          this.imgSelectKey = "jp";
          break;
        case "th":
          this.imgSelectKey = "th";
          break;
      }
      this.loginForm.language = lang;
    },
    clickLangBtn(data) {
      this.loginForm.language = data;
      this.setActiveLanguage(data);
      return history.go(0);
    },
    setActiveLanguage(lang) {
      localStorage.setItem("language", lang);
    },
    getLogin() {
      const device = localStorage.getItem('device')
      let parmas = {
        Account: this.loginForm.account,
        Device: device === 'mobile' ? 1 : 0,
        Language: this.loginForm.language,
        Password: this.loginForm.password,
        SerialNumber: localStorage.getItem("serialNumber"),
      };
      console.log(parmas);
      this.statusField = true
      // let parmas = {
      //   Device: "1",
      //   Token:
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ0ZXN0NixhMTIzNDU2LDdtdlBLNWY0SlYiLCJqdGkiOiI5MDU4ZGFmNi01NzE4LTQxNzMtYmZlNi1jMGU2NmIyOWRjMWMiLCJuYmYiOjE2OTUwMTg2MDgsImV4cCI6MTY5NTEwNTAwOCwiaWF0IjoxNjk1MDE4NjA4LCJpc3MiOiJsb2JieV9zZXJ2ZXIiLCJhdWQiOiJ0ZXN0NixhMTIzNDU2LDdtdlBLNWY0SlYifQ.B29FS70HlK6gif68UaRRgZivlPulnp-WQlISoVTWlVM",
      // };
      // login(parmas).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.align {
  height: 100%;
  #Lang {
    position: absolute;
    left: 280px;
    top: 20px;
    background: #252525;
    border-color: #5f5f5f;
    visibility: visible;
  }
    
  .onSubmit {
    background-image: linear-gradient(160deg, #f6ac70 0%, #fdda8d 100%);
    color: #fff;

    width: 100%;
    border-radius: 27px;
    padding: 0.5rem 1rem;
  }
}

</style>