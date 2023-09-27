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
            <div class="status_field">
              <span v-show="statusField">{{ tipMsgShow }}</span>
            </div>
            <div class="form__field" @click="validate()">
              <div class="onSubmit">{{ $t("Login") }}</div>
            </div>
          </form>

          <form
            id="ChangePWDForm"
            action=""
            class="form FormOffset"
            style="display: none"
          >
            <div class="form__field2">
              <label id="UserAccount" class="Label">{{
                $t("UserAccount")
              }}</label>
              <div id="AccountField" style="width: 60%">AAA</div>
            </div>

            <div class="form__field2">
              <label id="OldPassword" class="Label">{{
                $t("OldPassword")
              }}</label>
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
              <label id="NewPassword" class="Label">{{
                $t("NewPassword")
              }}</label>
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
              <label id="ConfirmNewPassword" class="Label">{{
                $t("ConfirmNewPassword")
              }}</label>
              <input
                class="PWDField"
                type="password"
                name="confirmPassword"
                autocomplete="off"
                style="width: 60%"
                :placeholder="$t('ClickInput')"
              />
            </div>

            <div id="Illustrate" class="status_field StatusLabelOffset">
              {{ $t("Illustrate") }}
            </div>
            <div class="form__field ConfirmBtn">
              <input type="submit" id="OK" value="确认" />
            </div>
          </form>
        </div>
      </div>
      <div class="mask__block" v-show="maskShow"></div>
      <section
        id="dialog"
        class="dialog-box effect-fade dialog-style"
        :class="{ 'show': showErrorMsg }"
        :style="marginStyle()"
      >
        <div class="dialog-box-container normal">
          <div class="dialog-box-content">{{ $t("Msg_MemberNotFound") }}</div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index";
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      langBtn: false,
      maskShow:false,
      statusField: false,
      showErrorMsg: false,
      loginForm: {
        account: "",
        password: "",
        language: "CN",
      },
      imgSelectKey: "cn",
      langSelect: [
        {
          key: "CN",
          lang: "简体中文",
          imgKey: "cn",
        },
        {
          key: "TW",
          lang: "繁體中文",
          imgKey: "hk",
        },
        {
          key: "EN",
          lang: "English",
          imgKey: "gb",
        },
        {
          key: "JP",
          lang: "日本語",
          imgKey: "jp",
        },
        {
          key: "TH",
          lang: "ภาษาไทย",
          imgKey: "th",
        },
      ],
      tipMsgShow: "",
    };
  },
  mounted() {
    this.getLangImg();
    this.initLang();
    window.addEventListener("visibilitychange", this.handleVisiable);
  },
  destroyed() {
    window.removeEventListener("visibilitychange", this.handleVisiable);
  },
  methods: {
    ...mapMutations({
      setGameList:"ws/setGameList",
    }),
    handleVisiable(e) {
      switch (e.target.visibilityState) {
        case "hidden":
          // console.log('内容不可见，处理后台、最小化、锁屏状态')
          break;
        case "visible":
          // console.log('处于正常打开')
          // this.init();
          break;
      }
    },
    init() {
      this.$router.push({ path: "/Loading" });
    },
    initLang(){
      const lang = localStorage.getItem("language") || 'CN';
      this.setActiveLanguage(lang);
    },
    getLangImg() {
      const lang = localStorage.getItem("language") || 'CN';
      const langList = {
        'CN':'cn',
        'TW':'hk',
        'EN':'gb',
        'JP':'jp',
        'TH':'th',
      }
      this.imgSelectKey = langList[lang]
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
    validate() {
      if (!this.loginForm.account) {
        this.tipMsgShow = this.$t("Msg_EnterAcc");
        return;
      } else if (!this.loginForm.password) {
        this.tipMsgShow = this.$t("Msg_EnterPwd");
      } else {
        this.tipMsgShow = this.$t("ConnectServer_0");
        this.getLogin();
      }
    },
    getLogin() {
      this.statusField = true;
      const device = localStorage.getItem("device");
      let parmas = {
        Account: this.loginForm.account,
        Device: device === "mobile" ? '1' : '0',
        Language: this.loginForm.language,
        Password: this.loginForm.password,
        SerialNumber: localStorage.getItem("serialNumber"),
      };
      login(parmas).then((res) => {
        if(res.Error === 0){
          const token = res.Data.Token
          const gameList = res.Data.GameList
          const gameRuleRouter = res.Data.MemberRuleUrl
          const socktUrlList = res.Data.ConnectIds
          this.setGameList(gameList)
          localStorage.setItem('token',token)
          localStorage.setItem('account',this.loginForm.account)
          localStorage.setItem('password',this.loginForm.password)
          localStorage.setItem('gameRuleRouter',gameRuleRouter)
          localStorage.setItem('socketUrlListL',JSON.stringify(socktUrlList))
          
          this.$router.push({ path: "/MemberRule" });

        }else if(res.ErrorCode === 'MemberNotFound'){
          this.maskShow = true;
          this.showErrorMsg = true;
          this.statusField = false;
          setTimeout(() => {
            this.maskShow = false;
            this.showErrorMsg = false;            
          }, 1500);
        }
      });
    },
    marginStyle(){
      const lang = localStorage.getItem("language") || 'CN';
      const num = {
        'CN':'-63px',
        'TW':'-63px',
        'EN':'-104px',
        'JP':'',
        'TH':'-113px',
      }
      return `margin-left:${num[lang]};`
    }
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
  .dialog{
    &-style{
      // width: 125.6px;
      height: 65.6px;
      margin-top: -33px;
      z-index: 99999;
      display: block;
    }
  }
  .mask{
    &__block{
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0000004d;
    }
  }
}
</style>