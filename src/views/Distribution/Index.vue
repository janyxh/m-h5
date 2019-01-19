<template>
  <main>
    <user-info @onPushId="onPushId"></user-info>
    <task :id="id"></task>
  </main>
</template>

<script>
import UserInfo from "@/components/private/distribution/UserInfo";
import task from "@/components/private/distribution/Task";
export default {
  components: {
    "user-info": UserInfo,
    task
  },
  data() {
    return {
      id: ""
    };
  },
  created() {
    document.title = "分销中心";
  },
  methods: {
    onPushId(id) {
      console.log("被推送", id);
      this.id = id;
    }
  }
};
</script>
