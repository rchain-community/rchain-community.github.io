// Import global styles
import '~/assets/style/index.scss';

// Add global components
import Layout from '~/layouts/Default.vue';
import DocsLayout from '~/layouts/Docs.vue';
import TutsLayout from '~/layouts/Tutorials.vue';
import DappsLayout from '~/layouts/Dapps.vue';
import Section from '~/components/Section.vue';
import Feature from '~/components/Feature.vue';
import Card from '~/components/Card';
import DefaultLayout from '~/layouts/Default.vue';
//import { VaProgressTracker } from "vue-atlas/src/ProgressTracker";

import VueScrollTo from 'vue-scrollto';

import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.6,
  scaleRatio: 1.9,
  headerFontFamily: [
    'Jost',
    'Helvetica',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Jost',
    'Helvetica',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
});

export default function(Vue, { head, router, isServer }) {
  // Set default layout as a global component

  Vue.component('Layout', DefaultLayout);
  Vue.component('Layout', Layout);
  Vue.component('DocsLayout', DocsLayout);
  Vue.component('TutsLayout', TutsLayout);
  Vue.component('DappsLayout', DappsLayout);
  Vue.component('Section', Section);
  Vue.component('Feature', Feature);
  Vue.component('Card', Card);

  Vue.use(VueScrollTo);
  //Vue.use(VaProgressTracker);

  head.style.push({
    type: 'text/css',
    cssText: typography.toString(),
  });
}
