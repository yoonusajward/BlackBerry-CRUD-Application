<template>
  <div>
    <HeaderComponent />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-content {
  margin-top: 80px; /* This ensures content is pushed down by 80px, adjust as needed */
  padding: 20px;
}
</style>
