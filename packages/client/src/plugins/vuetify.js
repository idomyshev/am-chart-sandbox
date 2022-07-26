import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#fff",
        secondary: "#222542",
        "secondary-reverse": "#F8F8FA",
        medium: "#F7F9FC",
        success: "#1BC574",
        error: "#F84949",
        menu: "#fff",
      },

      dark: {
        primary: "#3D3F58",
        secondary: "#F8F8FA",
        "secondary-reverse": "#222542",
        medium: "#333659",
        success: "#1BC574",
        error: "#F84949",
        menu: "#222542",
      },
    },
  },
});

// import Vue from "vue";
// import Vuetify from "vuetify/lib/framework";
//
// Vue.use(Vuetify);
//
// export default new Vuetify({
//   theme: {
//     options: { customProperties: true },
//     themes: {
//       light: {
//         checkbox1: "#A1887F",
//       },
//     },
//   },
// });
