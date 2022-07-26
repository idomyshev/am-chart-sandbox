<template>
  <div class="color-palette">
    <div
      class="color-palette__left"
      :style="{
        background: getColor(1),
      }"
    />
    <div class="color-palette__center" :style="{ background: getColor(2) }" />
    <div class="color-palette__right" :style="{ background: getColor(3) }" />
  </div>
</template>

<script>
export default {
  name: "ColorPalette",

  props: {
    paletteNumber: Number,
  },

  data() {
    return {
      palettes: [
        ["e26be1", "ffb27d", "9567d9"],
        ["FFCC2F", "EF5734", "00ACEE"],
        ["4B2E83", "B7A57A", "85754D"],
        ["005BBB", "E56A54", "FFC72C"],
        ["E13963", "0072CF", "EA7125"],
        ["00A6D6", "00629B", "003865"],
      ],
    };
  },

  computed: {
    palette() {
      return this.palettes[this.paletteNumber - 1];
    },
  },

  methods: {
    getColor(num) {
      return `#${this.palette[num - 1]}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.color-palette {
  display: flex;
  margin-left: 8px;
  width: 48px;
  height: 48px;
  div {
    width: 16px;
    height: 48px;
  }
  &__left {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &__center {
  }
  &__right {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
