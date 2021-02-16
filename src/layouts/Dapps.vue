<template>
  <Layout class="has-sidebar docs-page" :footer="false">
    <div class="container flex flex-align-top">
      <Section class="doc-content flex-fit" container="large">
        <slot />
      </Section>
    </div>
  </Layout>
</template>

<script>
import Github from '~/assets/images/github-logo.svg';

export default {
  components: {
    Github,
  },
};
</script>
