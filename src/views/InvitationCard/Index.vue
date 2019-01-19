<template>
  <div>
    <iframe :src="urlInvitationCard" frameborder="0" class="iframe-invitation-card"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlInvitationCard: ""
    };
  },
  created() {
    let compId = localStorage.getItem("compId");
    let contentId = localStorage.getItem("contentId");
    let nickName = encodeURI(encodeURI(localStorage.getItem("nickName")));
    let avatarUrl = encodeURI(encodeURI(localStorage.getItem("avatarUrl")));
    this.urlInvitationCard = `http://192.168.0.16:8020/wap/invitation.html?compId=${compId}&contentId=${contentId}&nickName=${nickName}&avatarUrl=${avatarUrl}`;
  }
};
</script>


<style lang="scss" scoped>
.iframe-invitation-card {
  width: 100vw;
  height: 100vh;
}
</style>
