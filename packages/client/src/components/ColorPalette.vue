<template>
  <div
    class="color-palette"
    :class="chosenPaletteNumber === paletteNumber && 'chosen-palette'"
    @click="$emit('input', paletteNumber)"
  >
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

  model: {
    prop: "chosenPaletteNumber",
  },

  props: {
    paletteNumber: Number,
    chosenPaletteNumber: Number,
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
  cursor: pointer;
  margin-left: 8px;
  width: 52px;
  height: 52px;
  box-sizing: border-box;
  border-radius: 13px;
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
.chosen-palette {
  border: 2px solid #222542;
}
</style>
