<template>
  <div class="container">
    <div class="header">
      <h1>Employee List</h1>
      <router-link to="/employees/add" class="btn-add">
        + Add Employee
      </router-link>
    </div>

    <!-- Search Input -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search employees..."
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Filter employees based on searchQuery -->
        <tr v-for="employee in filteredEmployees" :key="employee._id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.position }}</td>
          <td>
            <router-link
              :to="{ name: 'editEmployee', params: { id: employee._id } }"
              >Edit</router-link
            >
            |
            <router-link
              :to="{ name: 'employeeDetail', params: { id: employee._id } }"
              >Details</router-link
            >
            |
            <button @click="showConfirmation(employee._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Confirmation Box -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this employee?</p>
        <button @click="deleteEmployee">Yes, Delete</button>
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
      employees: [],
      searchQuery: "", // Add this to store search input
      showModal: false,
      employeeIdToDelete: null,
    };
  },
  computed: {
    // Computed property to filter employees based on searchQuery
    filteredEmployees() {
      return this.employees.filter((employee) => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          employee.name.toLowerCase().includes(searchText) ||
          employee.email.toLowerCase().includes(searchText) ||
          employee.position.toLowerCase().includes(searchText)
        );
      });
    },
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      axios
        .get("http://localhost:5000/api/employees")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    },
    showConfirmation(id) {
      this.employeeIdToDelete = id;
      this.showModal = true;
    },
    cancelDelete() {
      this.showModal = false;
      this.employeeIdToDelete = null;
    },
    deleteEmployee() {
      axios
        .delete(
          `http://localhost:5000/api/employees/${this.employeeIdToDelete}`
        )
        .then(() => {
          this.fetchEmployees();
          this.showModal = false;
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    },
  },
};
</script>
