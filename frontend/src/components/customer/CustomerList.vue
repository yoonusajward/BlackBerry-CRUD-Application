<template>
  <div class="container">
    <div class="header">
      <h1>Customer List</h1>
      <router-link to="/customers/add" class="btn-add">
        + Add Customer
      </router-link>
    </div>

    <!-- Search Input -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search customers..."
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Customer Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Filter customers based on searchQuery -->
        <tr v-for="customer in filteredCustomers" :key="customer._id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.location }}</td>
          <td>{{ customer.customerType }}</td>
          <td>
            <router-link
              :to="{ name: 'editCustomer', params: { id: customer._id } }"
              >Edit</router-link
            >
            |
            <router-link
              :to="{ name: 'customerDetail', params: { id: customer._id } }"
              >Details</router-link
            >
            |
            <button @click="showConfirmation(customer._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Confirmation Box -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this customer?</p>
        <button @click="deleteCustomer">Yes, Delete</button>
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
      customers: [],
      searchQuery: "", // Add this to store search input
      showModal: false,
      customerIdToDelete: null, // Store the ID of the customer to be deleted
    };
  },
  computed: {
    // Computed property to filter customers based on searchQuery
    filteredCustomers() {
      return this.customers.filter((customer) => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          customer.name.toLowerCase().includes(searchText) ||
          customer.email.toLowerCase().includes(searchText) ||
          customer.location.toLowerCase().includes(searchText) ||
          customer.customerType.toLowerCase().includes(searchText)
        );
      });
    },
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      axios
        .get("http://localhost:5000/api/customers")
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });
    },
    showConfirmation(id) {
      this.customerIdToDelete = id;
      this.showModal = true;
    },
    cancelDelete() {
      this.showModal = false;
      this.customerIdToDelete = null; // Reset the customer to be deleted
    },
    deleteCustomer() {
      axios
        .delete(
          `http://localhost:5000/api/customers/${this.customerIdToDelete}`
        )
        .then(() => {
          this.fetchCustomers(); // Refresh customer list
          this.showModal = false; // Close the modal
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    },
  },
};
</script>
