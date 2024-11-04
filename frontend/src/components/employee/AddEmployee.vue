<template>
  <div class="form-container">
    <h1>Add New Employee</h1>
    <form @submit.prevent="addEmployee">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="employee.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="employee.email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="position">Position:</label>
        <input v-model="employee.position" id="position" type="text" required />
      </div>
      <div class="form-group">
        <label for="department">Department:</label>
        <input
          v-model="employee.department"
          id="department"
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <label for="hireDate">Hire Date:</label>
        <input v-model="employee.hireDate" id="hireDate" type="date" required />
      </div>
      <button type="submit" class="submit-btn">Add Employee</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddEmployee",
  data() {
    return {
      employee: {
        name: "",
        email: "",
        position: "",
        department: "",
        hireDate: "",
      },
    };
  },
  methods: {
    addEmployee() {
      axios
        .post("http://localhost:5000/api/employees", this.employee)
        .then(() => {
          alert("Employee added successfully!");
          this.$router.push("/employees");
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Common form container styling */
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
