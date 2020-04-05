<template>
  <header class="library-header">
    <h1>BV</h1>
    <h1>Biblioteca Virtual</h1>
    <div class="search">
      <input type="text" placeholder="Buscar..." />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.library-header {
  background: #101010;
  height: 70px;
  display: flex;
  flex-direction: row;
  border: 2px black solid;
  box-sizing: border-box;
  padding: 1em;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
}

.search {
  display: flex;
  justify-content: flex-end;
  input {
    border-radius: 10px;
    padding-left: 0.5em;
    width: 200px;
    height: 30px;
  }
}
</style>
