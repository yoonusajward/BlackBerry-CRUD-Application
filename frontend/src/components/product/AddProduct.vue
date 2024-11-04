<template>
  <div class="form-container">
    <h1>Add New Product</h1>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="productName">Product Name:</label>
        <input
          v-model="product.productName"
          id="productName"
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <input v-model="product.category" id="category" type="text" required />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input v-model="product.price" id="price" type="number" required />
      </div>
      <div class="form-group">
        <label for="stockAvailable">Stock Available:</label>
        <input
          v-model="product.stockAvailable"
          id="stockAvailable"
          type="number"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        productName: "",
        category: "",
        price: 0,
        stockAvailable: 0,
      },
    };
  },
  methods: {
    addProduct() {
      axios
        .post("http://localhost:5000/api/products", this.product)
        .then(() => {
          alert("Product added successfully");
          this.$router.push("/products");
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Styling similar to AddEmployee.vue */
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
  background-color: #36a673;
}
</style>
