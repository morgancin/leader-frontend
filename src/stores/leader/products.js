import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useProductsStore = defineStore("ProductsStore", {
    state: () => ({
        product: {},
        products: [],
        message: null,
    }),
    actions: {
        async createProduct(product) {
            axiosClient.post('/products', product)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateProduct() {
            axiosClient.put(`/products/${this.product.id}`, this.product)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })

            /*
            ///EJEMPLO DE ERROR, sacado del curso de DevTaller
            .catch(error){
                hasError.value=true;
                if(axios.isAxiosError(error)){
                    return errorMessage.value = error.message;
                }
            }
            */
        },
        async fetchProducts() {
            axiosClient.get('/products')
            .then (({data}) => {
                this.products = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchProduct(id) {
            axiosClient.get(`/products/${id}`)
            .then (({data}) => {
                this.product = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});