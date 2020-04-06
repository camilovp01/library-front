<template>
  <div class="modal" v-if="showModal">
    <div class="modal-back"></div>
    <div class="modal-container">
      <div class="modal-content">
        <div class="close">
          <button @click="toggleModal()">X</button>
        </div>
        <BookForm :book="book" :typeForm="typeForm" @refresh="refresh()" />
      </div>
    </div>
  </div>
</template>

<script>
import BookForm from "./BookForm";

export default {
  name: "Modal",
  props: {
    showModal: Boolean,
    toggleModal: Function,
    typeForm: String,
    book: Object
  },
  components: {
    BookForm
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-back {
  background: black;
  opacity: 0.5;
  position: fixed;
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
    height: 600px;
    position: relative;
    top: 0;
    z-index: 10;
    color: black;
    border-radius: 10px;
    padding: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .close {
    display: flex;
    justify-content: flex-end;
    button {
      border-radius: 2px;
    }
  }
}
</style>
