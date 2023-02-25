const nodeExternals = require('webpack-node-externals');

module.exports = {
  siteName: 'Rholang.io: Documentation for the RChain network 🎓',
  siteUrl: `siteUrl: 'https://rholang.io`,
  titleTemplate: '%s - Rchain network',
  siteDescription:
    '👉 Rholang is an open and scalable blockchain language designed for speed and reliability. Build on latest research from the reflective high order calculus.',

  chainWebpack(config, { isServer }) {
    config.module.rules.delete('svg');
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader');

    if (isServer) {
      config.externals(
        nodeExternals({
          whitelist: [
            /\.css$/,
            /\?vue&type=style/,
            /vue-instantsearch/,
            /instantsearch.js/,
            /typeface-league-spartan/,
          ],
        })
      );
    }
  },

  templates: {
    BlogPost: '/blog/:year/:month/:day/:slug',
    //Contributor: '/contributor/:id',
    //Starter: '/starters/:title',
    //Platform: '/starters/platform/:id',
    Example: (node) => node.path,
  },

  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        index: ['development'],
        baseDir: './content/docs',
        pathPrefix: '/docs',
        typeName: 'DocPage',
        template: './src/templates/DocPage.vue',
        plugins: ['@gridsome/remark-prismjs'],
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '#',
            },
          },
        },
      },
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        index: ['developer-environment'],
        baseDir: './content/tutorials/',
        pathPrefix: '/tutorials',
        typeName: 'TutorialPage',
        template: './src/templates/TutorialPage.vue',
        plugins: ['@gridsome/remark-prismjs'],
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '#',
            },
          },
        },
      },
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        index: ['development-dapps'],
        baseDir: './content/dapps',
        pathPrefix: '/dapps',
        typeName: 'DappsPage',
        template: './src/templates/DappsPage.vue',
        plugins: ['@gridsome/remark-prismjs'],
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '#',
            },
          },
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'examples/*.md',
        typeName: 'Example',
        remark: {
          plugins: ['@gridsome/remark-prismjs'],
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: './blog/*/index.md',
        refs: {
          author: 'Contributor',
        },
        remark: {
          plugins: [
            '@gridsome/remark-prismjs',
            [
              '@noxify/gridsome-plugin-remark-embed',
              {
                enabledProviders: ['Soundcloud', 'Youtube'],
              },
            ],
          ],
        },
      },
    },
  ],
};
