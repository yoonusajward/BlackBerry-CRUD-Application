<template>
  <div class="detail-container">
    <h1>Customer Detail</h1>
    <div v-if="customer" class="detail-content">
      <p><strong>Name:</strong> {{ customer.name }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <p><strong>Location:</strong> {{ customer.location }}</p>
      <p><strong>Products Purchased:</strong></p>
      <ul>
        <li v-for="(product, index) in customer.productsPurchased" :key="index">
          <strong>Product Name:</strong> {{ product.productName || "N/A" }}
          <br />
          <strong>Purchase Date:</strong> {{ product.purchaseDate || "N/A" }}
          <br />
          <strong>Price:</strong> ${{ product.price || "N/A" }}
        </li>
      </ul>
      <p><strong>Total Spent:</strong> ${{ customer.totalSpent || "N/A" }}</p>
      <p><strong>Customer Type:</strong> {{ customer.customerType }}</p>
      <router-link to="/customers" class="back-link"
        >Back to Customers</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerDetail",
  data() {
    return {
      customer: null,
    };
  },
  created() {
    this.fetchCustomer();
  },
  methods: {
    fetchCustomer() {
      axios
        .get(`http://localhost:5000/api/customers/${this.$route.params.id}`)
        .then((response) => {
          this.customer = response.data;
        })
        .catch((error) => {
          console.error("Error fetching customer details:", error);
        });
    },
  },
};
</script>

<style scoped>
.detail-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  color: #42b983;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.detail-content p {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 1px solid #42b983;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.back-link:hover {
  background-color: #42b983;
  color: white;
}
</style>
