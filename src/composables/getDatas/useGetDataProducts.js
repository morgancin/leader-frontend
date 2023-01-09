import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataProducts()
{
    const products_errors = ref(null);
    const results = ref([]);

    const fetchProducts = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/products/list`)
        .then (({data}) => {
            results.value = data;
        })
        .catch(function (err) {
            products_errors.value = err;
        })
    };

    const fetchProductsCategory = async (category) => {
        results.value = [];
        
        await axiosClient.get(`/products/list/category/${category.id}`)
        .then (({data}) => {
            results.value = data.data;
        })
        .catch(function (err) {
            products_errors.value = err;
        })
    };

    return{
        fetchProducts,
        fetchProductsCategory,
        products: readonly(results),
        //error,
        products_errors,
    };
}