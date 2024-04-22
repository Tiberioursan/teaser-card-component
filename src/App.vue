<script setup>
import CardComponent from "@/components/CardComponent.vue";

const preTitle = 'Lorem Ipsum:'
const title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' 
const ingress = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const image = 'https://www.fjordtravel.no/wp-content/uploads/2013/08/Amazing-Geirangerfjord-by-Pixabay.jpg'
const cardTypeOptions = ['basicCard', 'detailedCard', 'horizontalCard', 'verticalCard']

</script>

<template>
  <div class="container">
    <CardComponent
        v-for="(cardType, index) in cardTypeOptions"
        :key="cardType"
        :id="index"
        :title="title"
        :image="image"
        :ingress="ingress"
        :tags="['Finans', 'Topic']"
        badge="New"
        :cardType="cardType"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .card {
    margin-bottom: 50px;
  }
}
</style>
