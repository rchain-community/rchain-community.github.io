<template>
  <div class="container text-center ">
    <va-progress-tracker :labels="labels" :round="round" :current="current" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels: [
        "Testnet-1",
        "Testnet-2",
        "Testnet-3",
        "Hardening-Phase",
        "Mainnet",
        "Venus update"
      ],
      current: 5,
      round: true
    };
  },
  computed: {
    max() {
      return this.labels.length + 1;
    }
  }
};
</script>
