<template>
  <div class="app">
    <Header />
    <div class="app-container">
      <div class="app-welcome">
        <h1>Bienvenido</h1>
      </div>
      <div class="app-content">
        <div class="add-button">
          <button @click="toggleModal()">Agregar</button>
        </div>
        <div class="book-container">
          <Card
            v-for="book in books"
            v-bind:key="book._id"
            :authors="book.author"
            :_id="book._id"
            :title="book.title"
            :description="book.description"
          />
        </div>
      </div>
    </div>
    <Modal :showModal="showModal" :toggleModal="toggleModal" />
  </div>
</template>

<script>
import Card from "./components/library/Card";
import Header from "./components/library/Header";
import Modal from "./components/library/Modal";
import axios from "axios";

export default {
  name: "App",
  components: {
    Card,
    Header,
    Modal
  },
  data: () => ({
    books: [],
    showModal: false
  }),
  mounted() {
    this.getAllBooks();
  },
  methods: {
    getAllBooks() {
      return axios
        .get(`http://192.168.0.8:3000/api/v1/library/book`)
        .then(books => {
          this.books = books.data.books;
          console.log(books.data);
        });
    },
    toggleModal() {
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  color: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &-container {
    max-width: 1200px;
    margin: 70px auto 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &-welcome {
    background: #23252b;
    text-align: center;
  }

  &-content {
    background: #101010;
    padding: 0.5em;
    .add-button {
      display: flex;
      justify-content: flex-end;
      button {
        margin: 1em 4em;
      }
    }
  }
}

.book-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
