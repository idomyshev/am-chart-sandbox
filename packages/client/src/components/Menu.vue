<template>
  <div class="menu">
    <div class="menu__logo">CYRIS</div>
    <v-switch
      v-model="$vuetify.theme.dark"
      inset
      label="Dark Theme"
      color="gray"
      persistent-hint
    ></v-switch>
    <div class="menu__content">
      <p class="menu__content-title">Menu</p>
      <div class="menu__items">
        <router-link class="menu__item active" to="/">
          <v-icon class="menu__item-icon">mdi-view-dashboard</v-icon>
          Global Overview
        </router-link>
        <router-link class="menu__item" to="/">
          <v-icon class="menu__item-icon">mdi-view-dashboard</v-icon>
          Campaign KPIs
        </router-link>
        <router-link class="menu__item" to="/">
          <v-icon class="menu__item-icon">mdi-view-dashboard</v-icon>
          Benchmarking
        </router-link>
        <router-link class="menu__item" to="/">
          <v-icon class="menu__item-icon">mdi-view-dashboard</v-icon>
          Add New Page
        </router-link>
      </div>
    </div>
    <div class="menu__user">
      <p class="menu__user-title">Profile</p>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Menu",
});
</script>

<style scoped lang="scss">
@import "./src/scss/theme.scss";
@import "./src/scss/custom_variables.scss";

.menu {
  display: flex;
  flex-direction: column;
  width: 276px;
  min-height: 100vh;
  padding: 36px 24px;
  background: var(--v-menu-base);

  &__items {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 16px 0 16px 24px;
    font-size: 15px;
    border-radius: $border-radius;
  }

  &__item-icon {
    margin-right: 14px;
  }
}
</style>

<style lang="scss">
@import "@/scss/custom_variables.scss";

.v-application.theme--light {
  .menu {
    box-shadow: $box-shadow-light;

    &__item {
      color: $text-color-light;

      &.active {
        background-color: $menu-item-light;
      }

      .menu__item-icon {
        color: $text-color-light;
      }
    }
  }
}

.v-application.theme--dark {
  .menu {
    &__item {
      color: $text-color-dark;

      .menu__item-icon {
        color: $text-color-dark;
      }

      &.active {
        color: $text-color-light;
        background-color: $menu-item-dark;

        .menu__item-icon {
          color: $text-color-light;
        }
      }
    }
  }
}
</style>
