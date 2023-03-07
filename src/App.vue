<template>
  <el-container>
    <SideMenu v-if="showSideMenu" class="sideMenu" />
    <el-container class="guestContainer">
      <el-header v-if="showHeader" class="guestHeader">
       
        <el-menu
          mode="horizontal"
          text-color="#fafafa"
          active-text-color="white"
          background-color="#008978"
        >
        
          <template v-if="oidcIsAuthenticated">   
            <el-sub-menu index="1">
              <template #title>
                <el-icon><User /></el-icon>
                Hi! {{ this.oidcUser.name }}
              </template>
              <el-menu-item index="2">
                <el-icon><Key /></el-icon>
                <p>Change Password</p>
              </el-menu-item>
              <el-menu-item index="3" @click="signOutOidc">
                <el-icon><SwitchButton /></el-icon>
                Logout
              </el-menu-item>
            </el-sub-menu>

          </template>
          <template v-else>
            <el-menu-item
              index="1"
              @click="this.$router.push({ path: '/admin/about' })"
             >
              <el-icon></el-icon>
              Log In as Admin
            </el-menu-item>

            <el-menu-item>
                <RouterLink class="routerlink" to="/about">About Us</RouterLink>
            </el-menu-item>

            <el-menu-item>
                <RouterLink class="routerlink" to="/user">Personnels & Contacts</RouterLink>
            </el-menu-item>

            <el-menu-item>
                <RouterLink class="routerlink" to="/user">News & Events</RouterLink>
            </el-menu-item>

            <el-menu-item>
                <RouterLink class="routerlink" to="/user">Gallery</RouterLink>
            </el-menu-item>

            <el-menu-item>
                <RouterLink class="routerlink" to="/career">Careers</RouterLink>
            </el-menu-item>

            <router-link to="/">
              <el-menu-item>
                <img
                  alt="Skanlog logo"
                  id="skanlogLogo"
                  src="@/assets/Images/SkanlogLogoHD.png"
                />
              </el-menu-item>
            </router-link>
          </template>
          <!-- <img
            id="skanlogLogo"
            alt="Skanlog logo"
            src="@/assets/Images/SkanlogLogoHD.png"
            v-if="!appStatus.isGranted"
          /> -->
        </el-menu>
      </el-header>
      
      <el-header v-if="!showHeader" class="adminHeader">
        <el-menu
          mode="horizontal"
          text-color=""
          active-text-color="#000000"
          background-color=""
        >
          <template v-if="oidcIsAuthenticated">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><User /></el-icon>
                Hi! {{ this.oidcUser.name }}
              </template>
              <el-menu-item index="2">
                <el-icon><Key /></el-icon>
                <p>Change Password</p>
              </el-menu-item>
              <el-menu-item index="3" @click="signOutOidc">
                <el-icon><SwitchButton /></el-icon>
                Logout
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item
              index="1"
              @click="this.$router.push({ path: '/protected' })"
            >
              <el-icon><SwitchButton /></el-icon>
              Log In
            </el-menu-item>
          </template>
          <!-- <img
            id="skanlogLogo"
            alt="Skanlog logo"
            src="@/assets/Images/SkanlogLogoHD.png"
            v-if="!appStatus.isGranted"
          /> -->
        </el-menu>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
      <!-- <div id="notGranted" v-else>
        {{ appStatus.message }}
      </div> -->
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "@/components/skanlog/SideMenu.vue";
import { Key, SwitchButton, User } from "@element-plus/icons";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { SideMenu, User, SwitchButton, Key },
  data() {
    return {
      logoUrl: "https://i.ibb.co/4Y8FLqB/Skanlog-Logo-HD.png",
      fitType: "scale-down",
    };
  },
  methods: {
    ...mapActions("oidcStore", ["signOutOidc"]),
    userLoaded() {
      // this.$store.dispatch(
      //   "appStoreStore/appStoreConnectAction",
      //   this.oidcUser,
      // );
    },
  },
  computed: {
    ...mapGetters("oidcStore", [
      "oidcIsAuthenticated",
      "oidcAuthenticationIsChecked",
      "oidcUser",
      "oidcIdToken",
      "oidcIdTokenExp",
    ]),
    ...mapGetters({ appStatus: "appStoreStore/returnAppStatus" }),
    showSideMenu() {
      // return this.$route.name !== "Home" && this.$route.name !== "career" && this.$route.name !== "about";
      const excludedRoutes = ["Home", "career", "about"];
      return !excludedRoutes.includes(this.$route.name);
    },
    showHeader() {
      const route = useRoute();
      return this.$route.name !== "AboutView" && this.$route.name !== "CareerView";
    },
    isHome() {
      return this.$route.name === "Home";
    },

  },
  mounted() {
    window.addEventListener("vuexoidc:userLoaded", this.userLoaded);
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: "OpenSans";
  font-style: normal;
  font-weight: 400;
  src: url("./assets/Fonts/open-sans-v27-latin-regular.eot"); /* IE9 Compat Modes */
  src: local(""),
    url("./assets/Fonts/open-sans-v27-latin-regular.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/Fonts/open-sans-v27-latin-regular.woff2")
      format("woff2"),
    /* Super Modern Browsers */
      url("./assets/Fonts/open-sans-v27-latin-regular.woff") format("woff"),
    /* Modern Browsers */ url("./assets/Fonts/open-sans-v27-latin-regular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("./assets/Fonts/open-sans-v27-latin-regular.svg#OpenSans")
      format("svg"); /* Legacy iOS */
}



.guestHeader {
  width: 60%;
  position: absolute;
  z-index: 1;
  top: 4rem;
}

.adminHeader {
  width: 100%;
}

.router-link-active {
  color: red;
}

.guestContainer {
  align-items: center;
}

.routerlink{
  text-decoration: none;
}

#app {
  font-family: OpenSans;
  text-align: center;
  background-color: #fdf9f8 !important;
  height: calc(100vh - 16px);
  font-size: inherit;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: antialiased;
}
#skanlogLogo {
  max-height: 20px;
  margin: 1em;
}

#notGranted {
  font-size: 1rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}



button,
input,
select,
textarea,
text,
li,
p {
  font-family: OpenSans;
  font-size: inherit;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: antialiased;
}

.el-menu {
  justify-content: flex-end;
  align-content: flex-start;
  align-items: center;
}




.el-menu--horizontal {
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}
.sideMenu {
  height: auto;
}

.main {
  overflow: hidden;
}
</style>
