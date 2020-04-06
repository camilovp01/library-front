<template>
  <div class="book-card" @click="toggleModal('edit', book)">
    <div class="img-card-contain">
      <img src="https://edit.org/images/cat/portadas-libros-big-2019101610.jpg" alt="Portada" />
    </div>
    <div class="book-description">
      <div class="rowCard">
        <b>Título</b>
        <p :title="title">{{title}}</p>
      </div>
      <div class="rowCard">
        <b>Autor(es)</b>
        <p>{{format(authors, 'name')}}</p>
      </div>
      <div class="rowCard">
        <b>Descripción</b>
        <p>{{description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    authors: Array,
    _id: String,
    title: String,
    description: String,
    toggleModal: Function,
    book: Object
  },
  methods: {
    format(array, property) {
      let author = "";
      for (let i = 0; i < array.length; i++) {
        author += i != 0 ? ", " + array[i][property] : array[i][property];
      }
      return author;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.book-card {
  background: green;
  width: 200px;
  height: 380px;
  background-color: #ffffff52;
  margin: 9px;
  border-radius: 15px;
  transition: all 0.5s;
  img {
    width: 90%;
    border-radius: 15px;
    margin-top: 8px;
  }
  &:hover {
    cursor: pointer;
    width: 210px;
    height: 390px;
  }
}

.rowCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 16px;
  b {
    margin: 0 40px 0 10px;
    width: 40px;
    font-size: 12px;
  }
  p {
    margin: 0;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.img-card-contain {
  display: flex;
  justify-content: center;
}

.book-description {
  margin-top: 15px;
}
</style>
