<template>
  <Section class="intro">
    <div class="container text-center">
      <div class="intro__message mb" hidden></div>

      <h1 class="intro__title">
        <span>Rholang is a</span>
        <transition-group name="rotate" class="intro__keywords">
          <div v-show="currentText == 0" key="0">new concurrent language</div>
          <div v-show="currentText == 1" key="1">performant language</div>
          <div v-show="currentText == 2" key="2">blockchain language</div>
          <div v-show="currentText == 3" key="3">language for distributed computing</div>
          <div v-show="currentText == 4" key="4">community language</div>
        </transition-group>
      </h1>

      <p class="intro__lead lead post mb">
        Rholang is an open and scalable blockchain language designed for speed and
        reliability. Build on latest research from the
        reflective high order calculus.
      </p>
      <p class="intro__links">
        <g-link to="/docs/" class="button primary button--large">
          <span>Get started</span>
        </g-link>
      </p>
    </div>
  </Section>
</template>

<static-query>
query {
  metadata {
    gridsomeVersion
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      currentText: 0
    };
  },
  mounted() {
    ($vm => {
      (function animate() {
        $vm._counter = setTimeout(() => {
          $vm.currentText = ($vm.currentText + 1) % 5;
          requestAnimationFrame(animate);
        }, 5000);
      })();
    })(this);
  },
  destroyed() {
    clearTimeout(this._counter);
  }
};
</script>

<style lang="scss">
.intro {
  padding: calc(9% + var(--space)) 0;
  background-image: url("~@/assets/images/background.png");
  background-repeat: no-repeat;
  background-size: cover;

  &__title {
    font-size: 3rem;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 850px) {
      & {
        font-size: 2rem;
      }
    }
  }

  &__lead {
    max-width: 610px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.3rem;
    color: white;

    @media screen and (max-width: 850px) {
      & {
        font-size: 1rem;
      }
    }
  }

  &__info {
    font-size: 0.9rem;
  }

  &__keywords {
    position: relative;
    display: block;
  }
}
</style>
