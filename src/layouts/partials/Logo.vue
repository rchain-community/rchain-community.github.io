<template>
  <div class="logo" @contextmenu="rightClick" oncontextmenu="return false;">
    <g-link class="logo__link" to="/" title="Back to home">
      <g-image
        class="logo__svg hide-for-small"
        alt="Rholang.org"
        src="~/assets/images/rholang-logo.svg"
        width="200px"
        immediate="true"
      />
      <g-image
        class="logo__svg show-for-small logo__svg--small"
        alt="Rholang.org"
        src="~/assets/images/rholang-logo-small.svg"
        width="200px"
        immediate="true"
      />
    </g-link>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {}
};
</script>

<style lang="scss">
.logo {
  &__svg {
    width: 100px;
    height: 27px;
    margin-top: 20px;
    &--small {
      margin-top: 30px;
      width: 40px;
      height: 38px;
    }
  }
}
</style>
