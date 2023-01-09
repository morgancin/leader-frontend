import { defineStore } from "pinia";
//import axiosClient from "../../axios";
//https://bluuweb.github.io/javascript/03-vue-carrito/#vuex

export const useQuotesCarStore = defineStore("QuotesCarStore", {
    state: () => ({
        car: {},
    }),
    actions: {
        addProductCar(quantity, comments, product) {
            product.comments = comments;

            this.car.hasOwnProperty(product.id)
              ? product.quantity = parseInt(this.car[product.id].quantity) + parseInt(quantity)
              : product.quantity = parseInt(quantity);

            this.setCarrito(product);
        },

        // mutations ahora son actions
        setCarrito(product) {
            this.car[product.id] = { ...product }
            //console.log(state.carrito)
        },

        // easily reset state using `$reset`
        clearCar () {
            this.$reset()
        }
    }
});