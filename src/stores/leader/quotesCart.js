import { defineStore } from "pinia";
//import axiosClient from "../../axios";
//https://bluuweb.github.io/javascript/03-vue-carrito/#vuex

export const useQuotesCartStore = defineStore("QuotesCartStore", {
    state: () => ({
        cart: {},
        total: 0,
        sub_total: 0,
    }),
    actions: {
        add_product_car(product, quantity, comments, prices_lists_id) {
            [product].some((v, i) => {
                if (v.prices) {
                    v.prices.some((v2, i2) => {
                        if(v2.prices_list) {
                            if (v2.prices_list.id === prices_lists_id) {
                                v.price = v2.price
                            }
                        }
                    });
                }
            });

            this.cart.hasOwnProperty(product.id)
              ? product.quantity = parseInt(this.cart[product.id].quantity) + parseInt(quantity)
              : product.quantity = parseInt(quantity);

            product.comments = comments;
            product.amount = (product.quantity * product.price);

            this.setCart(product);

            this.update_sub_total_and_total_products();
        },
        
        update_products_prices_lists(prices_lists_id) {
            for (const [key, v] of Object.entries(this.cart)) {
                if (v.prices) {
                    for (const [key2, v2] of Object.entries(v.prices)) {
                        if(v2.prices_list) {
                            if (v2.prices_list.id === prices_lists_id) {
                                v.price = v2.price;
                                v.amount = (v.quantity * v.price);
                                this.total = this.total + v.amount;
                            }
                        }
                    }
                }
            }

            this.update_sub_total_and_total_products();
            //console.log(JSON.stringify(this.cart));
        },

        update_sub_total_and_total_products() {
            let total = 0;

            for (const [key, v] of Object.entries(this.cart)) {
                total = total + v.amount;

                if (v.prices) {
                    for (const [key2, v2] of Object.entries(v.prices)) {
                        //total = total + v.amount;
                        /*
                        if(v2.prices_list) {
                            if (v2.prices_list.id === prices_lists_id) {
                                v.price = v2.price;
                                v.amount = (v.quantity * v.price);
                                this.total = this.total + v.amount;
                            }
                        }
                        */
                    }
                }
            }

            this.total = total;
            this.sub_total = total;
        },

        // mutations ahora son actions
        setCart(product) {
            this.cart[product.id] = { ...product };
            //this.total = this.cart.reduce((acc, o) => acc + parseInt(o.amount), 0);
            //console.log(JSON.stringify(this.cart));
        },

        // easily reset state using `$reset`
        clearCar () {
            this.$reset()
        }
    }
});