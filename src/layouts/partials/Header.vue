<template>
  <header>
    <div class="header-inner container flex gap-30">
      <Logo />

      <Nav class="flex-fit" />

      <SearchForm />

      <nav class="header-actions flex">
        <ToggleTheme />

        <a
          aria-label="Twitter"
          href="//twitter.com/rchain_coop?lang=en"
          rel="noopener noreferrer"
          class="hide-for-small"
          target="_blank"
          title="Join us on twitter"
        >
          <twitter-logo />
        </a>

        <a
          aria-label="Discord"
          href="//discord.gg/NWkQnfH"
          rel="noopener noreferrer"
          class="hide-for-small"
          target="_blank"
          title="Join our discord"
        >
          <discord-logo />
        </a>

        <div class="has-dropdown">
          <a
            aria-label="github"
            href="//github.com/rchain/rchain"
            rel="noopener noreferrer"
            target="_blank"
            title="Rchain @ GitHub"
          >
            <github-logo height="20px" width="20px" />
            <span class="hide-for-small" style="margin-left:5px;"
              >v{{ $static.metadata.gridsomeVersion }}</span
            >
          </a>
          <div class="dropdown">
            <a
              href="//github.com/rchain/rchain"
              rel="noopener noreferrer"
              target="_blank"
              >Core Repository</a
            >
            <a
              href="https://github.com/rchain-community"
              rel="noopener noreferrer"
              target="_blank"
              >Rchain Community</a
            >
            <a
              href="https://github.com/tgrospic/rnode-client-js"
              rel="noopener noreferrer"
              target="_blank"
              >RNode Client</a
            >
            <a
              href="https://github.com/fabcotech/rchain-toolkit"
              rel="noopener noreferrer"
              target="_blank"
              >Rchain Toolkit</a
            >
            <a
              href="https://github.com/arvinxx/my-rchain-wallet"
              rel="noopener noreferrer"
              target="_blank"
              >MyRchainWallet</a
            >
            <a
              href="https://github.com/imphila/Capo"
              rel="noopener noreferrer"
              target="_blank"
              >Capo Mobile App</a
            >
            <a
              href="https://github.com/dimworm/rui"
              rel="noopener noreferrer"
              target="_blank"
              >Rui锐 Chrome Wallet</a
            >

            <a
              href="https://github.com/rchain-community/rchain-community.github.io"
              rel="noopener noreferrer"
              target="_blank"
              >Rholang Website</a
            >
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<static-query>
query {
  metadata {
    gridsomeVersion
  }
}
</static-query>

<script>
import Logo from './Logo';
import Nav from './Nav';
import SearchForm from '@/components/SearchForm.vue';
import ToggleTheme from '@/components/ToggleTheme.vue';
import GithubLogo from '@/assets/images/github-logo.svg';
import TwitterLogo from '@/assets/images/twitter-logo.svg';
import DiscordLogo from '@/assets/images/discord-logo.svg';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  components: {
    Logo,
    GithubLogo,
    TwitterLogo,
    ToggleTheme,
    DiscordLogo,
    SearchForm,
    Nav,
    LazyHydrate,
  },
};
</script>

<style lang="scss">
header {
  z-index: 20;
  position: relative;
  top: 0;
  background-color: var(--bg-transparent);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: nowrap;
  position: sticky;
  transition: background-color 0.3s, border-color, 0.3s;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.16);

  .header-bar {
    background: linear-gradient(90deg, #9c0000 50%, rgb(255, 228, 227) 100%);
    padding: 2px;
    text-align: center;
    color: #fff;
    font-size: 1rem;

    a {
      color: currentColor;
    }
  }

  .header-inner {
    padding: 0 var(--space);
    min-height: var(--header-height);
  }

  @media screen and (min-width: 992px) and (max-resolution: 1) {
    backdrop-filter: blur(4px);
  }


}
</style>
