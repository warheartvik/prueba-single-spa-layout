import Vue from "vue";
import VueRouter from "vue-router";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

Vue.use(VueRouter);

const routes = constructRoutes(document.querySelector("#single-spa-layout"));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
// console.log(applications)

applications.forEach(registerApplication);
layoutEngine.activate();
start();
