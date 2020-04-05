<template>
  <div class="modal" v-if="showModal">
    <div class="modal-back"></div>
    <div class="modal-container">
      <div class="modal-content">
        <button @click="toggleModal()">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: Boolean,
    toggleModal: Function
  }
};
</script>

<style lang="scss" scoped>
.modal-back {
  background: black;
  opacity: 0.5;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 5%;

  .modal-content {
    background: #ffff;
    width: 30%;
    height: 500px;
    position: relative;
    top: 0;
    z-index: 10;
    color: black;
    border-radius: 10px;
    padding: 2em;
    box-sizing: border-box;
  }
}
</style>
