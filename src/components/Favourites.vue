<template>
  <div>
    <div class="container mt-5">
      <div class="columns is-multiline">
        <div class="column is-4" v-for="(beer, index) in allBeers" :key="index">
          <div class="card">
            <div class="card-content">
              <span style="float:right" class="change-icon">
                <i
                  :id="'star-' + index"
                  @click="favouriteBeer(beer, 'star-' + index)"
                  class="fas fa-star"
                ></i>
              </span>
              <div class="content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        style="width: 100%;"
                        :src="beer.image_url"
                        alt="placeholder"
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

<script>
export default {
  name: "Favourites",
  data() {
    return {
      allBeers: this.$store.state.favourite
    };
  },
  methods: {
    favouriteBeer(item, id) {
      let temp = false;
      for (let i = 0; i < this.$store.state.favourite.length; i++) {
        if (item.id == this.$store.state.favourite[i].id) {
          temp = true;

          this.$store.state.favourite.splice(i, 1);
          break;
        }
      }
      if (!temp) {
        this.$store.state.favourite.push(item);
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