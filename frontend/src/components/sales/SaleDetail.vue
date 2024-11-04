<template>
  <div class="detail-container">
    <h1>Sale Details</h1>
    <div class="detail-content">
      <p><strong>Transaction ID:</strong> {{ sale.transactionID }}</p>
      <p><strong>Customer ID:</strong> {{ sale.customerID }}</p>
      <p><strong>Product ID:</strong> {{ sale.productID }}</p>
      <p><strong>Total Amount:</strong> ${{ sale.totalAmount }}</p>
    </div>
    <router-link to="/sales" class="back-link">Back to Sales</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sale: {},
    };
  },
  mounted() {
    const saleId = this.$route.params.id;
    axios
      .get(`http://localhost:5000/api/sales/${saleId}`)
      .then((response) => {
        this.sale = response.data;
      })
      .catch((error) => {
        console.error("Error fetching sale:", error);
      });
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

.back-link {
  display: inline-block;
  margin-top: 1rem;
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
