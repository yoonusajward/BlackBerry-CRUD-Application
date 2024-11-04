<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">
          <img
            src="@/assets/BBLogo.png"
            alt="BlackBerry Logo"
            class="logo-img"
          />
        </router-link>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/customers">Customers</router-link></li>
        <li><router-link to="/employees">Employees</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/sales">Sales</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>
