<template>
  <Layout>
    <Section container="md" class="blog-posts">
      <div class="mb-x2 container-sm text-center">
        <h1>Rholang Blog</h1>
        <p style="opacity: .8">
          Follow us with making the easiest and most fun framework for building
          modern dApps.
        </p>
      </div>
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </Section>
  </Layout>
</template>

<page-query>
query {
  posts: allBlogPost {
    edges {
      node {
        id
        title
        path
        date (format: "D. MMMM YYYY")
        timeToRead
        author {
          title
          avatar (width: 60)
        }
        excerpt
        content
      }
    }
  }
}
</page-query>

<script>
import PostCard from "@/components/PostCard.vue";

export default {
  components: {
    PostCard
  },
  metaInfo: {
    title: "Blog"
  }
};
</script>
