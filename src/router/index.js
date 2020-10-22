import Vue from "vue";
import Router from "vue-router";
import Favourites from "../components/Favourites.vue";
import Home from "../components/Home.vue";
import RandomBeer from "../components/RandomBeer.vue";

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/favourites",
            name: "Favourites",
            component: Favourites
        },
        {
            path: "/randomBeer",
            name: "RandomBeer",
            component: RandomBeer
        }
    ]
})
