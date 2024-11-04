<template>
  <div class="detail-container">
    <h1>Employee Detail</h1>
    <div class="detail-content">
      <p><strong>Name:</strong> {{ employee.name }}</p>
      <p><strong>Email:</strong> {{ employee.email }}</p>
      <p><strong>Position:</strong> {{ employee.position }}</p>
      <p><strong>Department:</strong> {{ employee.department }}</p>
      <p><strong>Hire Date:</strong> {{ employee.hireDate }}</p>
    </div>
    <router-link to="/employees" class="back-link"
      >Back to Employees</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeDetail",
  data() {
    return {
      employee: {},
    };
  },
  mounted() {
    this.fetchEmployeeDetail();
  },
  methods: {
    fetchEmployeeDetail() {
      axios
        .get(`http://localhost:5000/api/employees/${this.$route.params.id}`)
        .then((response) => {
          this.employee = response.data;
        })
        .catch((error) => {
          console.error("Error fetching employee detail:", error);
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
