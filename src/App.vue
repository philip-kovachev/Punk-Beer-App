<template>
  <div id="app">
    <div class="topnav">
      <h1>Beans Love Beers</h1>
      <div class="topnav-right">
        <a> <router-link to="/">Home</router-link></a>
        <a><router-link to="/favourites">Favourites</router-link></a>
        <a><router-link to="/randomBeer">Get a Random Beer!</router-link></a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      allBeers: [],
      searchString: "",
      noresult: false,
      isSearched: false
    };
  }
};
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

.noresult {
  text-align: center;
  margin-top: 60px;
}

i:hover,
img:hover {
  cursor: pointer;
}

.topnav {
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: #00d1b2;
  width: 100%;

  a {
    margin: 10px;
    font-size: 17px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    color: #ffffff;
    margin-top: 10px;
  }

  h1 {
    font-size: 30px;
    margin-top: 10px;
    color: #ffffff;
    margin-left: 10px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
  }

  .topnav-right {
    margin-top: 20px;
  }
}
</style>
