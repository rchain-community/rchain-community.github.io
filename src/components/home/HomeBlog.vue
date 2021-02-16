<template>
  <Section dots="true" secondary="true">
    <div class="container text-center container-sm mb">
      <h2>Latest from Rholang blog</h2>
    </div>
    <div class="blog-posts container container-md">
      <PostCard
        v-for="edge in $static.posts.edges"
        :key="edge.node.id"
        :post="edge.node"
      />
    </div>
  </Section>
</template>

<script>
import PostCard from '@/components/PostCard.vue';
import Newsletter from '~/components/Newsletter';

export default {
  components: {
    PostCard,
    Newsletter,
  },
};
</script>

<static-query>
query {
  posts: allBlogPost(limit:3) {
    edges {
      node {
        id
        title
        path
        date (format: "D. MMMM YYYY")
        timeToRead
        content
        author {
          id
          title
          avatar (width: 60)
        }
        excerpt
      }
    }
  }
}
</static-query>
