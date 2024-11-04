<template>
  <div class="form-container">
    <h1>Edit Customer</h1>
    <form @submit.prevent="updateCustomer">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="customer.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="customer.email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input v-model="customer.location" id="location" type="text" required />
      </div>

      <!-- Products Purchased Section -->
      <div class="form-group">
        <label>Products Purchased:</label>
        <div
          v-for="(product, index) in customer.productsPurchased"
          :key="index"
          class="product-purchased-group"
        >
          <div class="form-group">
            <label for="productName">Product Name:</label>
            <input v-model="product.productName" type="text" />
          </div>
          <div class="form-group">
            <label for="purchaseDate">Purchase Date:</label>
            <input v-model="product.purchaseDate" type="date" />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input v-model="product.price" type="number" />
          </div>
          <button
            type="button"
            @click="removeProduct(index)"
            class="btn-remove"
          >
            Remove Product
          </button>
        </div>
        <button type="button" @click="addProduct" class="btn-add-product">
          Add Product
        </button>
      </div>

      <div class="form-group">
        <label for="totalSpent">Total Spent:</label>
        <input
          v-model="customer.totalSpent"
          id="totalSpent"
          type="number"
          required
        />
      </div>
      <div class="form-group">
        <label for="customerType">Customer Type:</label>
        <input
          v-model="customer.customerType"
          id="customerType"
          type="text"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Update Customer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditCustomer",
  data() {
    return {
      customer: {
        name: "",
        email: "",
        location: "",
        productsPurchased: [], // array of product objects
        totalSpent: 0,
        customerType: "",
      },
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
          console.error("Error fetching customer:", error);
        });
    },
    updateCustomer() {
      // Automatically recalculate total spent
      this.customer.totalSpent = this.customer.productsPurchased.reduce(
        (total, product) => total + Number(product.price || 0),
        0
      );

      axios
        .patch(
          `http://localhost:5000/api/customers/${this.$route.params.id}`,
          this.customer
        )
        .then(() => {
          alert("Customer updated successfully");
          this.$router.push("/customers");
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        });
    },
    addProduct() {
      this.customer.productsPurchased.push({
        productName: "",
        purchaseDate: "",
        price: 0,
      });
    },
    removeProduct(index) {
      this.customer.productsPurchased.splice(index, 1);
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

button.submit-btn,
button.btn-add-product,
button.btn-remove {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button.submit-btn:hover,
button.btn-add-product:hover,
button.btn-remove:hover {
  background-color: #36a673;
}
</style>
