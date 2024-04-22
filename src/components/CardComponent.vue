<script setup>
import {ref, watch, computed} from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ingress: {
    type: String,
    required: true
  },
  badge: {
    type: String
  },
  image: {
    type: String
  },
  tags: {
    type: Array,
    default: () => []
  },
  cardType: {
    type: String,
    required: true,
    default: 'verticalCard'
  }
})

const emit = defineEmits(['action_media', 'action_content'])

const maxTitleCharacters = 30
const maxIngressCharacters = 120
let intervalId = null

let cardIsHovered = ref(false)
let displayedIngress = ref(props.ingress)

let truncateText = computed(() => (text, maxCharacters) => {
  if (text.length > maxCharacters) {
    return text.slice(0, maxCharacters - 4) + ' ...'
  }
  return text
})

watch(cardIsHovered, (newVal) => {
  if (newVal) {
    displayedIngress.value = displayedIngress.value.slice(0, -4)
    ingressTypingAnimation()
  } else {
    clearInterval(intervalId)
    setTimeout(() => {
      displayedIngress.value = truncateText.value(props.ingress, maxIngressCharacters)
    }, 500)
  }
}, { immediate: true })

function ingressTypingAnimation () {
  let index = displayedIngress.value.length;
  intervalId = setInterval(() => {
    if (index < props.ingress.length) {
      displayedIngress.value += props.ingress[index];
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 10)
}

function handleMouseenter() {
  cardIsHovered.value = true
}

function handleMouseleave() {
  cardIsHovered.value = false
}

function handleCardClick(event) {
  if (event.target.classList.contains('card-title')) {
    emit('action_content', { title: props.title, id: props.id });
  }
  else if (event.target.tagName === 'IMG' || props.cardType === 'basicCard' || props.cardType === 'detailedCard') {
    emit('action_media', { title: props.title, id: props.id });
  }
}
</script>

<template>
  <article
      :class="[cardType, 'card']"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
      @click="handleCardClick"
  >
    <section v-if="cardType === 'detailedCard'" class="card-badge">
      {{ badge }}
    </section>
    <section class="card-image">
      <div v-if="cardType === 'basicCard'" class="index-number">{{ id }}</div>
      <img v-else :src="image" alt="card image" />
    </section>
    <section class="card-content">
      <h2 class="card-title">
        {{ truncateText(title, maxTitleCharacters) }}
      </h2>
      <p
          v-if="cardType !=='basicCard'"
          class="card-ingress"
          :title="cardType !== 'detailedCard' ? 'Scrollable content' : ''"
      >{{ displayedIngress }}</p>
      <ul class="card-tags">
        <li v-for="(tag, index) in tags" :key="tag">
          <span class="tag-name">{{ tag.toUpperCase() }}</span>
          <span v-if="index < tags.length - 1" class="tag-separator">|</span>
        </li>
      </ul>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  border: 1px solid $border-color;
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 11px $shadow-color;
    .card-image img {
      transform: scale(1.1);
    }
  }
  .card-image {
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.3s ease-in-out;
    }
  }
  .card-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    .card-title {
      margin-bottom: 0.5rem;
      &:hover {
        text-shadow: 0 0 4px $shadow-color;
      }
    }
    .card-ingress {
      margin-bottom: 1rem;
    }
    .card-tags {
      list-style: none;
      padding: 0;
      li {
        display: inline-block;
        font-size: $font-size-xxs;
        color: $gray-3;
        .tag-separator {
          margin: 0 0.2rem;
        }
        .tag-name {
          &:hover {
            text-decoration: underline; 
          }
        }
      }
    }
  }
}

// CSS for DETAILED card type
.detailedCard {
  flex-direction: column;
  width: 66%;
  min-width: 500px;
  aspect-ratio: 1;
  position: relative;
  box-shadow: 2px 2px 2px $shadow-color-darker;
  .card-badge {
    margin: 1rem;
    background-color: $badge-color;
    color: $white;
    padding: 2px 10px 2px 5px;
    border-radius: 4px;
    width: fit-content;
    &::before {
      content: "•";
      font-size: $font-size-xl;
      line-height: 0.2em;
      padding-right: 0.1em;
      vertical-align: sub;
    }
    &:hover {
      background-color: $badge-hover-color;
    }
  }
  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .card-content {
    justify-content: end;
    color: $white;
    height: auto;
    margin-top: auto;
    &:hover {
      .card-ingress {
        max-height: 10em;
      }
    }
    .card-title {
      order: 2;
      font-size: $font-size-xl;
      font-weight: $font-weight-black;
    }
    .card-ingress {
      order: 3;
      max-height: 3em;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }
    .card-tags {
      order: 1;
      li {
        color: $white;
      }
    }
  }
}

// CSS for BASIC card type
.basicCard {
  height: 200px;
  width: 50%;
  min-width: 300px;
  background-color: $card-background-color;
  .card-image {
    flex: 1;
    .index-number {
      width: 100%;
      height: 100%;
      text-align: end;
      padding-right: 10px;
      font-size: $font-size-xxl;
      font-weight: $font-weight-medium;
    }
  }
  .card-content {
    flex: 4;
    position: relative;
    width: 100%;
    .card-title {
      color: $gray-1;
      font-size: 1.4em;
      font-weight: $font-weight-medium;
    }
    .card-tags {
      margin: auto 0;
      font-size: $font-size-sm;
      span {
        margin: 0 0.2rem;
      }
    }
  }
}

// CSS for VERTICAL and HORIZONTAL card types
.verticalCard, .horizontalCard {
  .card-content {
    position: relative;
    .card-title {
      color: $gray-2;
      font-size: $font-size-xs;
      font-weight: $font-weight-medium;
    }
    .card-ingress {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      overflow: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .card-tags {
      margin-top: auto;
    }
  }
}
.verticalCard {
  flex-direction: column;
  display: grid;
  grid-template-rows: 50% 50%;
  height: 500px;
  width: 50%;
  min-width: 400px;
  .card-image {
    grid-row: 1;
  }
  .card-content {
    grid-row: 2;
  }
}

.horizontalCard {
  height: 300px;
  .card-image {
    flex: 1;
  }
  .card-content {
    flex: 2;
    height: auto;
  }
}

@media (max-width: 576px) {
  .basicCard {
    width: 100%;
  }
  .detailedCard {
    min-width: auto;
    width: 100%;
    min-height: 500px;
    aspect-ratio: auto;
  }
  .verticalCard {
    width: 100%;
  }
}
</style>