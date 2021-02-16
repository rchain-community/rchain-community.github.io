<template>
  <Card class="feature-posts__post" :link="link">
    <slot />
  </Card>
</template>

<script>
import PostMeta from "./PostMeta.vue";

export default {
  components: {
    PostMeta
  },
  props: ["link"]
};
</script>

<style lang="scss">
.feature-posts {
  &__post {
    position: relative;
    margin-bottom: 0rem;
  }
}
</style>
