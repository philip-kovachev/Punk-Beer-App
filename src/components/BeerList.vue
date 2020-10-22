<template>
  <div class="container mt-5">
    <div class="columns is-multiline">
      <div class="column is-4" v-for="(beer, index) in allBeers" :key="index">
        <div class="card">
          <div class="card-content">
            <span style="float:right" class="change-icon">
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
                      style="width: 100%;"
                      :src="beer.image_url"
                      alt="placeholder"
                      @click="
                        playSound(
                          'https://soundsnap-prod.nyc3.digitaloceanspaces.com/files/audio/bs/transcode/403198-Beer_Handling_-Glass_Mug_Bottle_Open_005559_.mp3?response-content-disposition=attachment%3B+filename%3D%22403198-Beer_Handling_-Glass_Mug_Bottle_Open_005559_.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AD4PI63EK5AJWZMJZZKH%2F20201022%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20201022T124636Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=907a4f44b743d8c680313c3cf519d43c6ae5dc23d4d63a9f588cde637857fdd5'
                        )
                      "
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
</template>

<style lang="scss" >
.field {
  margin: 20px;
}

.card {
  width: 100%;
  height: 250px;
}
</style>

<script>
import axios from "axios";

export default {
  name: "BeerList",
  data() {
    return {
      allBeers: null
    };
  },
  mounted() {
    axios.get("https://api.punkapi.com/v2/beers").then(res => {
      this.allBeers = res.data;
    });
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
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  }
};
</script>

