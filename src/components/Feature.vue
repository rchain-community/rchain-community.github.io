<template>
  <div class="feature text-center">
    <div class="feature__inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["icon", "gradient"],
  computed: {
    iconClasses() {
      let classes = [];
      if (this.gradient) classes.push("gradint-" + this.gradient);
      return classes;
    }
  }
};
</script>

<style lang="scss">
.feature {
  margin-bottom: var(--space-x2);
  padding: 0 var(--space-x3);

  @media screen and (max-width: 850px) {
    margin-bottom: var(--space-x2);
    padding: 0 var(--space);
  }

  svg {
    margin-top: -0.25rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
}
</style>
