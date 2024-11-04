<template>
  <div class="container">
    <div class="header">
      <h1>Sales List</h1>
      <router-link to="/sales/add" class="btn-add"> + Add Sale </router-link>
    </div>

    <!-- Search Input -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search sales..."
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>Product ID</th>
          <th>Total Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Filter sales based on searchQuery -->
        <tr v-for="sale in filteredSales" :key="sale._id">
          <td>{{ sale.transactionID }}</td>
          <td>{{ sale.customerID }}</td>
          <td>{{ sale.productID }}</td>
          <td>{{ sale.totalAmount }}</td>
          <td>
            <router-link :to="{ name: 'editSale', params: { id: sale._id } }"
              >Edit</router-link
            >
            |
            <router-link :to="{ name: 'saleDetail', params: { id: sale._id } }"
              >Details</router-link
            >
            |
            <button @click="showConfirmation(sale._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Confirmation Box -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this sale?</p>
        <button @click="deleteSale">Yes, Delete</button>
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
      sales: [],
      searchQuery: "", // Add this for search functionality
      showModal: false,
      saleIdToDelete: null,
    };
  },
  computed: {
    // Computed property to filter sales based on searchQuery
    filteredSales() {
      return this.sales.filter((sale) => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          String(sale.transactionID).toLowerCase().includes(searchText) || // Convert to string for comparison
          String(sale.customerID).toLowerCase().includes(searchText) || // Convert to string for comparison
          String(sale.productID).toLowerCase().includes(searchText) || // Convert to string for comparison
          sale.totalAmount.toString().includes(searchText) // Convert totalAmount to string
        );
      });
    },
  },
  mounted() {
    this.fetchSales();
  },
  methods: {
    fetchSales() {
      axios
        .get("http://localhost:5000/api/sales")
        .then((response) => {
          this.sales = response.data;
        })
        .catch((error) => {
          console.error("Error fetching sales:", error);
        });
    },
    showConfirmation(id) {
      this.saleIdToDelete = id;
      this.showModal = true;
    },
    cancelDelete() {
      this.showModal = false;
      this.saleIdToDelete = null;
    },
    deleteSale() {
      axios
        .delete(`http://localhost:5000/api/sales/${this.saleIdToDelete}`)
        .then(() => {
          this.fetchSales();
          this.showModal = false;
        })
        .catch((error) => {
          console.error("Error deleting sale:", error);
        });
    },
  },
};
</script>
