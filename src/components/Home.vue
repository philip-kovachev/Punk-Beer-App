<template>
  <div>
    <div class="field">
      <div class="columns">
        <div class="column is-1 is-offset-2"></div>
        <div class="column">
          <input
            v-on:keypress.enter="search()"
            class="input is-medium"
            v-model="searchString"
            type="text"
            placeholder="Search for beer..."
          />
        </div>
        <div class="column">
          <button
            style="float: left"
            @click="search()"
            class="button is-medium is-info"
          >
            Search
          </button>
          <router-link to="/randomBeer"> </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view />

      <div v-if="noresult" class="noresult">
        <h1>No Results Found ...</h1>
      </div>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="(beer, index) in allBeers" :key="index">
          <div class="card">
            <div class="card-content">
              <span style="float: right" class="change-icon">
                <i
                  :id="'star-' + index"
                  @click="favouriteBeer(beer, 'star-' + index)"
                  class="far fa-star"
                ></i>
              </span>
              <div class="content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        style="width: 100%"
                        :src="beer.image_url"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ beer.name }}</p>
                    <p class="media-content1">
                      {{ beer.description | trimDescription }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <beer-list v-show="!isSearched"></beer-list>
  </div>
</template>

<script>
import axios from "axios";

import BeerList from "../components/BeerList";
export default {
  name: "App",
  components: {
    BeerList: BeerList
  },
  data() {
    return {
      allBeers: [],
      searchString: "",
      noresult: false,
      isSearched: false
    };
  },
  methods: {
    search() {
      if (this.searchString != " ") {
        axios
          .get(
            "https://api.punkapi.com/v2/beers?beer_name=" + this.searchString
          )
          .then(res => {
            this.allBeers = res.data;
            if (res.data.length == 0) {
              this.noresult = true;
            } else {
              this.noresult = false;
              this.isSearched = true;
            }
          });
      }
    },
    favouriteBeer(item, id) {
      let temp = false;
      for (let i = 0; i < this.$store.state.favourite.length; i++) {
        if (item.id == this.$store.state.favourite[i].id) {
          temp = true;
          document.getElementById(id).classList.remove("fas");
          document.getElementById(id).classList.add("far");
          this.$store.state.favourite.splice(i, 1);
          break;
        }
      }
      if (!temp) {
        this.$store.state.favourite.push(item);
        document.getElementById(id).classList.remove("far");
        document.getElementById(id).classList.add("fas");
      }
    }
  },
  filters: {
    trimDescription(value) {
      if (value.length >= 100) {
        return (value = value.substr(0, 100) + "...");
      } else {
        return value;
      }
    }
  }
};
</script>
