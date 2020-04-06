<template>
  <div class="app">
    <Header />
    <div class="app-container">
      <div class="app-welcome">
        <h1>Bienvenido</h1>
      </div>
      <div class="app-content">
        <div class="add-button">
          <button @click="toggleModal('add', null)">+ Agregar</button>
        </div>
        <div class="book-container">
          <Card
            v-for="book in books"
            v-bind:key="book._id"
            :authors="book.author"
            :_id="book._id"
            :title="book.title"
            :description="book.description"
            :toggleModal="toggleModal"
            :book="book"
          />
        </div>
      </div>
    </div>
    <!-- <BookForm /> -->
    <Modal
      @refresh="getAllBooks()"
      :typeForm="typeForm"
      :showModal="showModal"
      :toggleModal="toggleModal"
      :book="book"
    />
  </div>
</template>

<script>
import Card from "./components/library/Card";
import Header from "./components/library/Header";
import Modal from "./components/library/Modal";
import axios from "axios";
import Vue from "vue";

export default {
  name: "App",
  components: {
    Card,
    Header,
    Modal
  },
  data: () => ({
    books: [],
    showModal: false,
    typeForm: "",
    book: {}
  }),
  mounted() {
    this.getAllBooks();
  },
  methods: {
    getAllBooks() {
      axios.get(`${Vue.config.baseApiUrl}book`).then(books => {
        this.books = books.data.books;
      });
    },
    toggleModal(typeForm, book) {
      this.showModal = !this.showModal;
      this.typeForm = typeForm;
      this.book = book;
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
        background: #72b03a;
        border-radius: 6px;
        padding: 8px;
        color: #ffffff;
        box-shadow: 0;
        &:hover {
          background: #73be30;
        }
      }
    }
  }
}

.book-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
