<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Manage Your BlackBerry Products Efficiently</h1>
        <p>
          Streamline the management of BlackBerry's customers, products, sales,
          and employees with this powerful web interface.
        </p>
        <router-link to="/products" class="btn-hero">Get Started</router-link>
      </div>
    </section>

    <!-- Dashboard Section -->
    <section class="dashboard-section section-box">
      <h2>Dashboard Overview</h2>
      <div class="dashboard-cards">
        <div class="card">
          <h3>Total Products</h3>
          <p>{{ totalProducts }}</p>
          <router-link to="/products" class="btn-card"
            >View Products</router-link
          >
        </div>
        <div class="card">
          <h3>Available Stock</h3>
          <p>{{ availableStock }} Units</p>
          <router-link to="/products/add" class="btn-card"
            >Add New Product</router-link
          >
        </div>
        <div class="card">
          <h3>Latest Sales</h3>
          <p>{{ latestSales }} Sales Today</p>
          <router-link to="/sales" class="btn-card">View Sales</router-link>
        </div>
      </div>
    </section>

    <!-- Top-Selling Products Section -->
    <section class="top-selling-section section-box">
      <h2>Top-Selling Products</h2>
      <div class="top-selling-cards">
        <div
          class="product-card"
          v-for="product in topSellingProducts"
          :key="product._id"
        >
          <div class="product-info">
            <h3>{{ product.productName }}</h3>
            <p class="quantity-sold">{{ product.quantitySold }} Units Sold</p>
            <p class="product-id">Product ID: {{ product._id }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Summary Section -->
    <section class="customer-summary-section section-box">
      <h2>Customer Summary</h2>
      <div class="summary-cards">
        <div class="card">
          <h3>Total Customers</h3>
          <p>{{ totalCustomers }}</p>
        </div>
        <div class="card">
          <h3>Government Customers</h3>
          <p>{{ governmentCustomers }}</p>
        </div>
        <div class="card">
          <h3>Retail Customers</h3>
          <p>{{ retailCustomers }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalProducts: 0,
      availableStock: 0,
      latestSales: 0,
      topSellingProducts: [],
      totalCustomers: 0,
      governmentCustomers: 0,
      retailCustomers: 0,
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const productsResponse = await axios.get(
          "/api/dashboard/total-products"
        );
        this.totalProducts = productsResponse.data.totalProducts;

        const stockResponse = await axios.get("/api/dashboard/available-stock");
        this.availableStock = stockResponse.data.availableStock;

        const salesResponse = await axios.get("/api/dashboard/latest-sales");
        this.latestSales = salesResponse.data.latestSales;

        const topSellingResponse = await axios.get(
          "/api/dashboard/top-selling"
        );
        this.topSellingProducts = topSellingResponse.data.topSellingProducts;

        const customerSummaryResponse = await axios.get(
          "/api/dashboard/customer-summary"
        );
        this.totalCustomers = customerSummaryResponse.data.totalCustomers;
        this.governmentCustomers =
          customerSummaryResponse.data.governmentCustomers;
        this.retailCustomers = customerSummaryResponse.data.retailCustomers;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Home Page Container */
.home-container {
  font-family: "Poppins", sans-serif;
  padding: 20px;
  color: #2c3e50;
}

/* Section Box: Makes each section distinct */
.section-box {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(to right, #1c1c1e, #2b2b2d),
    url("@/assets/blackberry-bg.png") no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 20px;
  text-align: center;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.6rem;
  margin-bottom: 30px;
}

.btn-hero {
  background-color: #42b983;
  color: white;
  padding: 14px 28px;
  font-size: 1.4rem;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-hero:hover {
  background-color: #379672;
  transform: scale(1.05);
}

/* Dashboard Section */
.dashboard-section {
  text-align: center;
}

.dashboard-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.dashboard-cards {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.card p {
  font-size: 1.4rem;
  margin-bottom: 20px;
}

.btn-card {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-card:hover {
  background-color: #1abc9c;
}

/* Top-Selling Products Section */
.top-selling-section {
  text-align: center;
}

.top-selling-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  width: 22%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.product-card h3 {
  font-size: 1.4rem;
  color: #333;
}

.quantity-sold {
  font-size: 1.2rem;
  color: #42b983;
  margin-bottom: 10px;
}

.product-id {
  font-size: 1rem;
  color: #888;
}

/* Customer Summary Section */
.customer-summary-section {
  text-align: center;
}

.summary-cards {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}
</style>
