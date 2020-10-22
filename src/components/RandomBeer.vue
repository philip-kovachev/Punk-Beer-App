<template>
  <div>
    <div class="container">
      <router-view />

      <div class="columns is-multiline is-centered">
        <button @click="getRandomBeer()" class="button is-medium is-success">
          Get Random Beer
        </button>
        <div
          class="column is-4"
          v-for="(beer, index) in randomBeer"
          :key="index"
        >
          <div class="card">
            <div class="card-content">
              <span style="float: right" class="change-icon"> </span>
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
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
}
</style>

<script>
import axios from "axios";

export default {
  name: "RandomBeer",
  data() {
    return {
      randomBeer: []
    };
  },
  filters: {
    trimDescription(value) {
      if (value.length >= 100) {
        return (value = value.substr(0, 100) + "...");
      } else {
        return value;
      }
    }
  },
  methods: {
    getRandomBeer() {
      axios.get("https://api.punkapi.com/v2/beers/random").then(res => {
        this.randomBeer = res.data;
      });
    }
  }
};
</script>
