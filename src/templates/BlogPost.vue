<template>
  <Layout>
    <Section container="md" dots="true">
      <div class="post-header container-md text-center mb-x2">
        <h1 v-html="$page.post.title" />
        <PostMeta :post="$page.post" />
      </div>

      <div class="post-content post mb-x2">
        <g-image
          v-if="$page.post.poster"
          quality="1"
          :src="$page.post.poster"
        />

        <!--<p class="lead" v-html="$page.post.excerpt" />-->

        <div style="text-align:justify" v-html="$page.post.content" />
      </div>
    </Section>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  post: blogPost (id: $id) {
    title
    date (format: "D. MMMM YYYY")
    timeToRead
    content
    author {
      id
      title
      avatar (width: 60)
    }
    excerpt
    cover
  }
}
</page-query>

<script>
import PostMeta from '@/components/PostMeta.vue';
import Newsletter from '@/components/Newsletter.vue';
export default {
  components: {
    PostMeta,
    Newsletter,
  },
  computed: {
    getCoverImage() {
      let path = '';
      const cover = this.$page.post.cover;
      this.test = 'test';
      if (cover != null && typeof cover != 'string') {
        // cover is a path?
        path = `${this.getBaseUrl}${this.$page.post.cover.src}`;
      } else if (cover != null && cover.includes('http')) {
        // cover is a link
        path = cover;
      } else {
        // cover isn't defined
        path = `${this.getBaseUrl}/writing/sra.jpg?${cover}`;
      }
      console.log(cover);
      return path;
    },
    getBaseUrl() {
      return 'https://rholang.github.io';
    },
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.excerpt,
        },
        {
          property: 'og:image',
          content: this.getCoverImage,
        },
      ],
    };
  },
};
</script>
