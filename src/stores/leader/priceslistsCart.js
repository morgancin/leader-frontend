import { defineStore } from "pinia";
//import axiosClient from "../../axios";
//https://bluuweb.github.io/javascript/03-vue-carrito/#vuex

export const usePricesListsCartStore = defineStore("PricesListsCartStore", {
    state: () => ({
        cartPriceslists: {},
    }),
    actions: {
        add_pricelist_car(pricelist, price, name, currency) {                        
            
            //pricelist.id = name.id + currency.code;
            pricelist.name = name.name;
            pricelist.price = price;            
            pricelist.currency = currency.code;

            this.setCart(pricelist);
        },        

        // mutations ahora son actions
        setCart(pricelist) {
            this.cartPriceslists[pricelist.id] = { ...pricelist };
        },

        remove_pricelist_car(pricelist) {
            delete this.cartPriceslists[pricelist.id];
        }, 

        // easily reset state using `$reset`
        clearCar () {
            this.$reset()
        }
    }
});