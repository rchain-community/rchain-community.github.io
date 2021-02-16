<template>
  <Section class="works">
    <div class="grid-cols grid-cols--gap-large grid-cols--full-md">
      <Card class="text-center" title="Write a smart contract">
        <h4>IDEs</h4>
        <ul class="bullet-list mb">
          <li>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=tgrospic.rholang"
            >Visual Studio Code Plugin</a>
          </li>
          <br />
          <li>
            <a href="https://try-rholang-22.netlify.app/">RChain Cloud</a>
          </li>

          <br />
          <li>
            <a href="https://github.com/tgrospic/rholang-idea">Intellij Plugin</a>
          </li>
        </ul>

        <template slot="outer">
          <Dots class="hide-for-small" />
          <Dots class="dots--vertical show-for-small" />
        </template>
      </Card>

      <Card title="Compile" class="text-center flex-align-middle">
        <p>compile code written in</p>

        <div class="card__inner__logo">
          <rholang-logo width="100%" height="100%" />
        </div>

        <ul class="bullet-list mb">
          <li>
            <Bullet />complete asynchronous language
          </li>
          <li>
            <Bullet />runtime engine written in type safe language (scala)
          </li>
          <li>
            <Bullet />concurrency build into the language
          </li>
        </ul>

        <template slot="outer">
          <Dots class="hide-for-small" />
          <Dots class="dots--vertical show-for-small" />
        </template>
      </Card>

      <Card title="Deploy" class="text-center flex-align-middle">
        <p>propose smart-contract to the global distributed Rchain network</p>

        <ul class="bullet-list mb">
          <li>
            <Bullet />types of interaction bounded by namespaces
          </li>
          <li>
            <Bullet />sharding for validators
          </li>
          <li>
            <Bullet />asynchronous notification for names in a contract
          </li>
          <li>
            <Bullet />scalable DAG structure (Directed Acyclic Graph)
          </li>
        </ul>
      </Card>
    </div>
  </Section>
</template>

<script>
import GraphQlLogo from "~/assets/images/graphql-logo.svg";
import VueLogo from "~/assets/images/vue-logo.svg";
import WebpackLogo from "~/assets/images/webpack-logo.svg";
import RholangLogo from "~/assets/images/rholang-small-white.svg";
import Bullet from "~/assets/images/bullet.svg";
import Dots from "~/components/Dots.vue";

export default {
  components: {
    Bullet,
    VueLogo,
    RholangLogo,
    WebpackLogo,
    GraphQlLogo,
    Dots,
  },
};
</script>

<style lang="scss">
.card__inner__logo {
  margin-left: 34%;
  margin-right: 20%;
}

.works {
  .bullet-list li {
    margin-bottom: 0.3rem;
  }

  .card__inner {
    padding: 30px 40px;
  }

  @media screen and (max-width: 850px) {
    .card {
      margin-bottom: 40px;
    }
  }

  &__tools {
    font-weight: 500;
    border: 1px solid var(--border-color);
    max-width: 230px;
    border-radius: 4px;
    z-index: 9;
    margin: 0 auto !important;
    padding: 10px;

    li {
      margin-bottom: 0;
    }
  }

  &__logo {
    background-color: var(--primary-color);
    width: 100px;
    z-index: 1;
    position: relative;
    height: 100px;
    margin: 0 auto;
    margin-top: 18%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 100%;
    z-index: 0;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;

    svg {
      width: 70px;
      height: 70px;
    }
  }

  &__pulse-bg {
    animation: pulse 2s infinite;
    border: 3px solid var(--primary-color);
    width: 100px;
    height: 100px;
    position: absolute;
    border-radius: 100%;
    opacity: 0.3;
    z-index: -1;

    + .works__pulse-bg {
      width: 95px;
      height: 95px;
      animation-delay: 0.3s;
    }
  }

  &__powered-by {
    opacity: 0.8;
    line-height: 1.3;
    padding-bottom: 1.2rem;
  }
}
</style>
