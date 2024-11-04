<template>
  <div class="container">
    <div class="header">
      <h1>Product List</h1>
      <router-link to="/products/add" class="btn-add">
        + Add Product
      </router-link>
    </div>

    <!-- Search Input -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search products..."
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Use filteredProducts to show results based on search -->
        <tr v-for="product in filteredProducts" :key="product._id">
          <td>{{ product.productName }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>
            <router-link
              :to="{ name: 'editProduct', params: { id: product._id } }"
              >Edit</router-link
            >
            |
            <router-link
              :to="{ name: 'productDetail', params: { id: product._id } }"
              >Details</router-link
            >
            |
            <button @click="showConfirmation(product._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Confirmation Box -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <button @click="deleteProduct">Yes, Delete</button>
        <button @click="cancelDelete">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      searchQuery: "", // Add a search query property
      showModal: false,
      productIdToDelete: null,
    };
  },
  computed: {
    // Computed property to filter products based on the search query
    filteredProducts() {
      return this.products.filter((product) => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          product.productName.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          product.price.toString().includes(searchText)
        );
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:5000/api/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    showConfirmation(id) {
      this.productIdToDelete = id;
      this.showModal = true;
    },
    cancelDelete() {
      this.showModal = false;
      this.productIdToDelete = null;
    },
    deleteProduct() {
      axios
        .delete(`http://localhost:5000/api/products/${this.productIdToDelete}`)
        .then(() => {
          this.fetchProducts();
          this.showModal = false;
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    },
  },
};
</script>
