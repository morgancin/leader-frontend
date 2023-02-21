import { defineStore } from "pinia";
//import axiosClient from "../../axios";
//https://bluuweb.github.io/javascript/03-vue-carrito/#vuex

export const useComponentsCartStore = defineStore("ComponentsCartStore", {
    state: () => ({
        cartComponents: {},
    }),
    actions: {
        add_component_car(component, quantity, name) {            
            this.cartComponents.hasOwnProperty(component.id)
              ? component.quantity = parseInt(this.cartComponents[component.id].quantity) + parseInt(quantity)
              : component.quantity = parseInt(quantity);
 
            component.name = name.name;

            this.setCart(component);
        },        

        // mutations ahora son actions
        setCart(component) {
            this.cartComponents[component.id] = { ...component };
        },

        remove_component_car(component) {
            delete this.cartComponents[component.id];
        }, 

        // easily reset state using `$reset`
        clearCar () {
            this.$reset()
        }
    }
});