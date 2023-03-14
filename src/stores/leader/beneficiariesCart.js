import { defineStore } from "pinia";
//import axiosClient from "../../axios";
//https://bluuweb.github.io/javascript/03-vue-carrito/#vuex

export const useBeneficiariesCartStore = defineStore("BeneficiariesCartStore", {
    state: () => ({
        cartBeneficiaries: {},
    }),
    actions: {
        add_beneficiary_car(beneficiary, first_name, last_name) {  
            //beneficiary.first_name = first_name;
            //beneficiary.last_name = last_name;
            this.setCart(beneficiary);
        },        

        // mutations ahora son actions
        setCart(beneficiary) {
            this.cartBeneficiaries[beneficiary.id] = { ...beneficiary };
        },

        remove_beneficiary_car(beneficiary) {
            delete this.cartBeneficiaries[beneficiary.id];
        }, 

        // easily reset state using `$reset`
        clearCar () {
            this.$reset()
        }
    }
});