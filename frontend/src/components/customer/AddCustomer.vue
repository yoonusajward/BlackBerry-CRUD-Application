<template>
  <div class="form-container">
    <h1>Add New Customer</h1>
    <form @submit.prevent="addCustomer">
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
      <div
        class="form-group"
        v-for="(product, index) in customer.productsPurchased"
        :key="index"
      >
        <h3>Product {{ index + 1 }}</h3>
        <label for="productName">Product Name:</label>
        <input
          v-model="product.productName"
          id="productName"
          type="text"
          placeholder="Enter product name"
          required
        />
        <label for="purchaseDate">Purchase Date:</label>
        <input
          v-model="product.purchaseDate"
          id="purchaseDate"
          type="date"
          required
        />
        <label for="price">Price:</label>
        <input
          v-model="product.price"
          id="price"
          type="number"
          placeholder="Enter price"
          required
        />
        <button type="button" @click="removeProduct(index)">
          Remove Product
        </button>
      </div>

      <button type="button" @click="addProduct">+ Add Another Product</button>

      <div class="form-group">
        <label for="totalSpent">Total Spent:</label>
        <input v-model="totalSpent" id="totalSpent" type="number" readonly />
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
      <button type="submit" class="submit-btn">Add Customer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCustomer",
  data() {
    return {
      customer: {
        name: "",
        email: "",
        location: "",
        productsPurchased: [
          {
            productName: "",
            purchaseDate: "",
            price: 0,
          },
        ],
        customerType: "",
      },
    };
  },
  computed: {
    totalSpent() {
      return this.customer.productsPurchased.reduce(
        (total, product) => total + Number(product.price),
        0
      );
    },
  },
  methods: {
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
    addCustomer() {
      axios
        .post("http://localhost:5000/api/customers", {
          ...this.customer,
          totalSpent: this.totalSpent, // Use computed totalSpent
        })
        .then(() => {
          alert("Customer added successfully");
          this.$router.push("/customers");
        })
        .catch((error) => {
          console.error("Error adding customer:", error);
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

form {
  display: flex;
  flex-direction: column;
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
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b983;
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
  background-color: #3a9a72;
}

button:focus {
  outline: none;
}

button[type="button"] {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="button"]:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }
}
</style>
