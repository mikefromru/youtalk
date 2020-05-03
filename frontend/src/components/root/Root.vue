<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-right
      color=""
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>You Talk Root</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <!-- <br> -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="menu(x.id)" v-for="x in items" :key="x.id">
          <v-list-item-title>{{ x.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    />

    <router-view/>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    left: false,
    items: [
    	{'id': 0, 'title': 'Levels'},
    	{'id': 1, 'title': 'Users'},
    	{'id': 2, 'title': 'Home'},
      {'id': 3, 'title': 'Feedbacks'},
    ]
  }),
  computed: {
  	...mapGetters('youtalk', ['levels'])
  },
  methods: {
    menu(index) {
      if (index === 0) {
        this.$router.push({name: 'root_levels'})
      }else if (index === 1) {
        this.$router.push({name: 'root_users'})
      }else if (index === 2) {
        this.$router.push({name: 'index'})
      }else if (index === 3) {
        this.$router.push({name: 'root_feedbacks'})
      }
    }
  },
  created() {
    // this.$store.dispatch('root/GET_ROOTLEVELS_QESTIONS', this.$route.params.id)
  }
};
</script>

