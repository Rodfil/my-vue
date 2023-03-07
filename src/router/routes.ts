import { RouteRecordRaw } from "vue-router";
import OidcCallbackError from "@/views/Oidc/OidcCallbackError.vue";

const oidcAuthRoutes: Array<RouteRecordRaw> = [
  {
    path: "/_oidc-callback",
    name: "OidcCallback",
    component: () =>
      import(
        /* webpackChunkName: "bundle.oidc" */ "@/views/Oidc/OidcCallback.vue"
      ),
  },
  {
    path: "/protected",
    name: "Protected",
    component: () =>
      import(/* webpackChunkName: "protected" */ "@/views/Oidc/Protected.vue"),
  },
  {
    path: "/_oidc-callback-error", // Needs to match redirect_uri in you oidcSettings
    name: "OidcCallbackError",
    component: OidcCallbackError,
    meta: {
      isPublic: true,
    },
  },
];

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: "/admin/about",
    name: "AboutView",
    component: () =>
      import(
        /* webpackChunkName: "bundle.initial" */ "@/views/Admin/AboutView.vue"
      ),
  },
  {
    path: "/admin/career",
    name: "CareerView",
    component: () =>
      import(
        /* webpackChunkName: "bundle.initial" */ "@/views/Admin/CareerView.vue"
      ),
  },
  // Catch All 404 page
  { path: "/:pathMatch(.*)*", redirect: "/admin/about" },
];

const guestRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "bundle.test" */ "@/views/Guest/Home.vue"),
    meta: {
      isPublic: true,
    },
  },

  {
    path: "/career",
    name: "career",
    component: () =>
      import(/* webpackChunkName: "bundle.test" */ "@/views/Guest/Career.vue"),
    meta: {
      isPublic: true,
    },
  },

  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "bundle.test" */ "@/views/Guest/About.vue"),
    meta: {
      isPublic: true,
    },
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },

];

const routes: Array<RouteRecordRaw> = [...oidcAuthRoutes, ...adminRoutes, ...guestRoutes];

export default routes;