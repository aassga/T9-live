<template>
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
        <form id="LoginForm" action="" class="form" style="display: block">
          <div class="form__field">
            <input
              id="AccountInput"
              type="text"
              name="account"
              v-model.trim="loginForm.account"
              autocomplete="off"
              value="test6"
              placeholder="帐号"
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
              placeholder="密码"
            />
          </div>
          <div class="status_field" id="StatusText"></div>
          <div class="form__field" @click="getLogin()">
            <div class="onSubmit">登入</div>
          </div>
        </form>

        <form
          id="ChangePWDForm"
          action=""
          class="form FormOffset"
          style="display: none"
        >
          <div class="form__field2">
            <label id="UserAccount" class="Label">用户帐号：</label>
            <div id="AccountField" style="width: 60%">AAA</div>
          </div>

          <div class="form__field2">
            <label id="OldPassword" class="Label">旧密码：</label>
            <input
              class="PWDField"
              type="password"
              name="oldPassword"
              autocomplete="off"
              style="width: 60%"
              placeholder="点击输入"
            />
          </div>
          <div class="form__field2">
            <label id="NewPassword" class="Label">新密码：</label>
            <input
              class="PWDField"
              type="password"
              name="newPassword"
              autocomplete="off"
              style="width: 60%"
              placeholder="点击输入"
            />
          </div>
          <div class="form__field2">
            <label id="ConfirmNewPassword" class="Label">确认新密码：</label>
            <input
              class="PWDField"
              type="password"
              name="confirmPassword"
              autocomplete="off"
              style="width: 60%"
              placeholder="点击输入"
            />
          </div>

          <div id="Illustrate" class="status_field StatusLabelOffset">
            请输入6-10个字母、数字组成的字符串密码
          </div>
          <div class="form__field ConfirmBtn">
            <input type="submit" id="OK" value="确认" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index";

export default {
  name: "login",
  data() {
    return {
      langBtn: false,
      loginForm: {
        account: "",
        password: "",
        language: "",
      },
      imgSelectKey: "",
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
  },
  methods: {
    getLangImg() {
      const lang = localStorage.getItem("lang");
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
    },
    clickLangBtn(data) {
      this.loginForm.language = data;
      localStorage.setItem("lang", data);
      this.$router.push({ path: "/Loading" });
    },
    getLogin() {
      let parmas = {
        Account: this.loginForm.account,
        Device: "1",
        Language: this.loginForm.language,
        Password: this.loginForm.password,
        SerialNumber: "7mvPK5f4JV",
      };
      console.log(this.loginForm);

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
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
}
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
</style>