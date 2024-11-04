<template>
  <div class="form-container">
    <h1>Edit Sale</h1>
    <form @submit.prevent="editSale">
      <div class="form-group">
        <label for="transactionID">Transaction ID:</label>
        <input
          v-model="sale.transactionID"
          id="transactionID"
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <label for="customerID">Customer ID:</label>
        <input v-model="sale.customerID" id="customerID" type="text" required />
      </div>
      <div class="form-group">
        <label for="productID">Product ID:</label>
        <input v-model="sale.productID" id="productID" type="text" required />
      </div>
      <div class="form-group">
        <label for="totalAmount">Total Amount:</label>
        <input
          v-model="sale.totalAmount"
          id="totalAmount"
          type="number"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sale: {
        transactionID: "",
        customerID: "",
        productID: "",
        totalAmount: 0,
      },
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
  methods: {
    editSale() {
      const saleId = this.$route.params.id;
      axios
        .patch(`http://localhost:5000/api/sales/${saleId}`, this.sale)
        .then(() => {
          this.$router.push("/sales");
        })
        .catch((error) => {
          console.error("Error updating sale:", error);
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
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
  font-weight: 600;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button.submit-btn:hover {
  background-color: #36a673;
}
</style>
