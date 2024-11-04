import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import AboutComponent from "../components/AboutComponent.vue";

// Customer Components
import CustomerList from "../components/customer/CustomerList.vue";
import AddCustomer from "../components/customer/AddCustomer.vue";
import EditCustomer from "../components/customer/EditCustomer.vue";
import CustomerDetail from "../components/customer/CustomerDetail.vue";

// Employee Components
import EmployeeList from "../components/employee/EmployeeList.vue";
import AddEmployee from "../components/employee/AddEmployee.vue";
import EditEmployee from "../components/employee/EditEmployee.vue";
import EmployeeDetail from "../components/employee/EmployeeDetail.vue";

// Product Components
import ProductList from "../components/product/ProductList.vue";
import AddProduct from "../components/product/AddProduct.vue";
import EditProduct from "../components/product/EditProduct.vue";
import ProductDetail from "../components/product/ProductDetail.vue";

// Sales Components
import SalesList from "../components/sales/SalesList.vue";
import AddSale from "../components/sales/AddSale.vue";
import EditSale from "../components/sales/EditSale.vue";
import SaleDetail from "../components/sales/SaleDetail.vue";

const routes = [
  // Home and About
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/about",
    name: "about",
    component: AboutComponent,
  },

  // Customers
  {
    path: "/customers",
    name: "customers",
    component: CustomerList,
  },
  {
    path: "/customers/add",
    name: "addCustomer",
    component: AddCustomer,
  },
  {
    path: "/customers/edit/:id",
    name: "editCustomer",
    component: EditCustomer,
    props: true,
  },
  {
    path: "/customers/detail/:id",
    name: "customerDetail",
    component: CustomerDetail,
    props: true,
  },

  // Employees
  {
    path: "/employees",
    name: "employees",
    component: EmployeeList,
  },
  {
    path: "/employees/add",
    name: "addEmployee",
    component: AddEmployee,
  },
  {
    path: "/employees/edit/:id",
    name: "editEmployee",
    component: EditEmployee,
    props: true,
  },
  {
    path: "/employees/detail/:id",
    name: "employeeDetail",
    component: EmployeeDetail,
    props: true,
  },

  // Products
  {
    path: "/products",
    name: "products",
    component: ProductList,
  },
  {
    path: "/products/add",
    name: "addProduct",
    component: AddProduct,
  },
  {
    path: "/products/edit/:id",
    name: "editProduct",
    component: EditProduct,
    props: true,
  },
  {
    path: "/products/detail/:id",
    name: "productDetail",
    component: ProductDetail,
    props: true,
  },

  // Sales
  {
    path: "/sales",
    name: "sales",
    component: SalesList,
  },
  {
    path: "/sales/add",
    name: "addSale",
    component: AddSale,
  },
  {
    path: "/sales/edit/:id",
    name: "editSale",
    component: EditSale,
    props: true,
  },
  {
    path: "/sales/detail/:id",
    name: "saleDetail",
    component: SaleDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
