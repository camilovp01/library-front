<template>
  <div class="book-form">
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form-horizontal" @submit="checkForm">
      <fieldset>
        <!-- Form Name -->
        <legend>{{ typeForm == "add" ? 'Agregar Libros' : 'Editar Libro'}}</legend>

        <div class="form-group">
          <label class="control-label" for="title">Título*</label>
          <div class="col-md-4">
            <input
              id="title"
              v-model="title"
              name="title"
              type="text"
              class="form-control input-md"
            />
            <span class="help-block"></span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="year">Año</label>
          <div class="col-md-4">
            <input id="year" v-model="year" name="year" type="number" class="form-control input-md" />
            <span class="help-block"></span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="editorial">Editorial*</label>
          <div class="col-md-4">
            <input
              id="editorial"
              v-model="editorial"
              name="editorial"
              type="text"
              class="form-control input-md"
              required
            />
            <span class="help-block"></span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="description">Descripcion*</label>
          <div class="col-md-4">
            <input
              id="description"
              v-model="description"
              name="description"
              type="text"
              class="form-control input-md"
              required
            />
            <span class="help-block"></span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="author">Autor*</label>
          <div class="col-md-4">
            <select
              id="author"
              v-model="authors"
              name="author"
              class="form-control"
              multiple="multiple"
              required
            >
              <option
                v-for="author in authorsData"
                v-bind:key="author._id"
                :value="author._id"
              >{{author.name}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="reserved">Reservado</label>
          <div class="col-md-4">
            <input
              id="reserved"
              v-model="reserved"
              name="reserved"
              type="checkbox"
              class="form-control check-md"
            />
            <span class="help-block"></span>
          </div>
        </div>

        <div class="form-submit">
          <button>Guardar</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  name: "BookForm",
  data: () => ({
    errors: [],
    title: "",
    year: 0,
    editorial: "",
    description: "",
    id: "",
    authors: [],
    reserved: false,
    authorsData: []
  }),
  props: {
    typeForm: String,
    book: Object
  },
  mounted() {
    this.getAllAuthors();
    if (this.book) {
      this.title = this.book.title;
      this.year = this.book.year.split("-")[0];
      this.editorial = this.book.editorial;
      this.description = this.book.description;
      this.id = this.book._id;
      this.reserved = this.book.reserved;
      this.authors = this.book.author.map(author => author._id);
    }
  },
  methods: {
    checkForm(e) {
      if (this.title && this.editorial && this.description && this.authors) {
        this.typeForm == "add" ? this.addBook() : this.editBook();
      } else {
        this.errors = [];

        this.errors.push("Los campos con * son obligatorios");
      }

      e.preventDefault();
    },

    addBook() {
      // this.title && this.editorial && this.description && this.author
      let book = {
        title: this.title,
        editorial: this.editorial,
        description: this.description,
        author: this.authors,
        year: this.year,
        reserved: this.reserved
      };
      return axios.post(`${Vue.config.baseApiUrl}book`, book).then(() => {
        this.title = "";
        this.editorial = "";
        this.description = "";
        this.authors = [];
        this.year = "";
        this.reserved = false;
        this.$swal
          .fire(
            "Perfecto!",
            `El libro ${this.title} se ha guardado correctamente`,
            "success"
          )
          .then(this.$emit("refresh"));
      });
    },

    editBook() {
      let book = {
        title: this.title,
        editorial: this.editorial,
        description: this.description,
        author: this.authors,
        year: this.year,
        reserved: this.reserved
      };
      return axios
        .put(`${Vue.config.baseApiUrl}book/${this.id}`, book)
        .then(() => {
          this.$swal
            .fire(
              "Perfecto!",
              `El libro ${this.title} se ha modificado correctamente`,
              "success"
            )
            .then(this.$emit("refresh"));
        });
    },

    getAllAuthors() {
      axios.get(`${Vue.config.baseApiUrl}author`).then(authors => {
        this.authorsData = authors.data.authors;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.book-form {
  display: flex;
  justify-content: space-around;
}

.form-horizontal {
  display: flex;
}

.form-group {
  margin: 10px;
}

.input-md {
  border: 0;
  border-bottom: 1px dashed rgb(112, 112, 112);
  &:focus {
    border-bottom: 2px solid rgb(112, 112, 112);
  }
  &:hover {
    border-bottom: 2px solid rgb(112, 112, 112);
  }
}

fieldset {
  border: 0.5px solid rgb(112, 112, 112);
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button {
    background: #72b03a;
    border-radius: 6px;
    padding: 8px;
    color: #ffffff;
    &:hover {
      background: #73be30;
    }
  }
}
</style>
