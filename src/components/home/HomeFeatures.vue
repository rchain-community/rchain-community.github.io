<template>
  <Section dots="true">
    <div
      class="homepage-features grid-cols"
      style="grid-template-columns: repeat(auto-fit, minmax(50%, 1fr)); "
    >
      <Feature>
        <h3>The language you've been waiting for</h3>
        <p style=" text-align: left">
          Rholang is build on the latest research on concurrent languages. Up to
          now all functional languages are built on the lambda calculus. With
          Rholang we built a new language on top of the reflective high order
          calculus (rho-calculus). This leads to a full concurrent language,
          with a very simple and safe way for developers to write concurrent
          code. Rholang is a new calculus from research led by Greg Meredith
          inspired from the pi-calculus.
        </p>
      </Feature>

      <Feature>
        <h3>A new consensus layer</h3>
        <p style=" text-align: left">
          Most blockchains are running serial like a chain, with that,
          throughput is very limited. Rchain is using DAGs (directed acyclic
          graphs) that have a tree like structure and scale massively. Further
          Rchain uses proof of stake from research led by Greg Meredith, Kent
          Shikama, Christian Williams and Vlad Zamfir. The research solves
          current problems in Pos (Proof of stake) algorithms. Additional
          Rholang code is fully verified and the whole Rchain project code is
          written in Scala. With that Rholang is currently the only language,
          where the DAO Bug with Ethereum would have not happened.
        </p>
      </Feature>

      <Feature>
        <h3>A large community</h3>
        <p style=" text-align: left">
          The community for Rholang is the Rchain community. Rchain is founded
          as a cooperative with the democratic thinking in mind - one member -
          one vote. With more than 1500 registered members, Rchain elects new
          board seats and functions as a decentralized cooperation.
        </p>
      </Feature>

      <Feature>
        <h3>Build for dApp developers</h3>
        <p style=" text-align: left">
          The Rholang developer ecosystem is growing. With a new type-safe api,
          dApps can be written for Rchain. Many dApps like RChain-Status, Dappy,
          RchainWallet, nth-caller-game, RSign, RCat and many more are
          developed by the community. Tutorials and an upgraded RNode API makes
          it easy for new developer to come onboard.
        </p>
      </Feature>
    </div>

    <div class="grid-cols grid-cols--2 grid-cols--gap-small grid-cols--full-md">
      <FeatureCard link="/docs">
        <h3>📝Documentation</h3>
        <p>Everything you need to get up and running.</p>
      </FeatureCard>

      <FeatureCard link="/tutorials">
        <h3>📔 Tutorials</h3>
        <p>Read tutorials from the community and learn Rholang</p>
      </FeatureCard>

      <FeatureCard
        link="https://rchain.atlassian.net/wiki/spaces/CORE/overview"
      >
        <h3>📢 Development updates</h3>
        <p>Read the latest development updates</p>
      </FeatureCard>

      <FeatureCard link="https://developer.rchain.coop/">
        <h3>🌟 Rchain Developer Page</h3>
        <p>Ressources for developer</p>
      </FeatureCard>

      <FeatureCard link="https://blog.rchain.coop">
        <h3>🚩 Rchain Blog</h3>
        <p>Keep up to date with new blog posts</p>
      </FeatureCard>

      <FeatureCard
        link="https://www.youtube.com/channel/UCSS3jCffMiz574_q64Ukj_w"
      >
        <h3>📹 Youtube Development Updates</h3>
        <p>Watch every Wednesday the development updates from Rchain</p>
      </FeatureCard>

      <FeatureCard
        link="https://www.youtube.com/channel/UCi8byRkpJBbGgDot2pWXLHA/videos"
      >
        <h3>📹 CASPER Development Research</h3>
        <p>Watch the latest research development led by Greg Meredith</p>
      </FeatureCard>

      <FeatureCard
        link="https://rchain.atlassian.net/wiki/spaces/DOC/pages/3014657/Reading+List"
      >
        <h3>📔 Blockchain 101</h3>
        <p>Get into Blockchain for starters</p>
      </FeatureCard>

      <FeatureCard link="https://try-rholang-22.netlify.app/">
        <h3>☁️ Rholang Cloud</h3>
        <p>Try to write Rholang code and compile it online</p>
      </FeatureCard>

      <FeatureCard link="https://www.rchainwallet.com">
        <h3>💼 Rchain Wallet</h3>
        <p>Community driven Rchain Wallet</p>
      </FeatureCard>

      <FeatureCard link="https://wenode.io/rui/">
        <h3>💼 Rui Wallet</h3>
        <p>China community driven Rchain Wallet for chrome</p>
      </FeatureCard>

      <FeatureCard link="https://icapo.app/">
        <h3>💼 Capo Wallet</h3>
        <p>Community driven Rchain Wallet for android</p>
      </FeatureCard>

      <FeatureCard link="http://app.onechain.one/appstart_en.html">
        <h3>💼 ONE Wallet</h3>
        <p>Community driven Rchain Wallet for android</p>
      </FeatureCard>

      <FeatureCard link="http://revdefine.io/">
        <h3>📡 Rchain Blockchain Explorer</h3>
        <p>Watch the network live</p>
      </FeatureCard>
    </div>
  </Section>
</template>

<script>
import VueLogo from '~/assets/images/vue-logo.svg';
import GraphQlLogo from '~/assets/images/graphql-logo.svg';
import FeatureCard from '@/components/FeatureCard.vue';

export default {
  props: ['icon'],
  components: {
    VueLogo,
    GraphQlLogo,
    FeatureCard,
  },
  computed: {
    iconClasses() {
      let classes = [];
      return classes;
    },
  },
};
</script>

<style lang="scss">
.homepage-features {
  padding: 0 0 calc(2% + var(--space)) 0;
}
</style>
