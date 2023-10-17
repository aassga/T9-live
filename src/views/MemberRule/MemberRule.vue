<template>
  <div class="MemberRule">
    <IframePage
      :gameRuleUrl="gameRuleUrl"
      :isShowRemember="isShowRemember"
      :iframeDivId="iframeDivId"
      :iframeId="iframeId"
    />
  </div>
</template>
<script>
import IframePage from "@/components/IframePage.vue";

export default {
  name: "MemberRule",
  data() {
    return {
      gameRuleUrl: "",
      iframeDivId: "GamePrecautionsDiv",
      iframeId: "GamePrecautionsIframe",
      isShowRemember: true,
    };
  },
  components: {
    IframePage,
  },
  mounted() {
    this.initOpenGamePrecation();
  },
  methods: {
    initOpenGamePrecation() {
      const language = localStorage.getItem("language");
      const languageList = {
        CN: "cn",
        TW: "tw",
        EN: "en",
        JP: "jp",
        TH: "th",
      };
      const nowLanguage = languageList[language];
      const gameRuleRouter = localStorage.getItem("gameRuleRouter");
      this.gameRuleUrl = `${process.env.VUE_APP_URL}${gameRuleRouter}?language=${nowLanguage}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.MemberRule {
  max-width: 100%;
  height: 100%;
}
</style>