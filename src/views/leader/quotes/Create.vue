<script>
  export default {
    name: "QuotesCreateView"
  }
</script>

<script setup>
  import { ref, reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import QuotesForm from "../../../components/leader/quotes/Form.vue";
  import QuotesPreview from "../../../components/leader/quotes/Preview.vue";
  
  import { useQuotesStore } from "../../../stores/leader/quotes";
  import { useActivitiesStore } from "../../../stores/leader/activities";

  const route = useRoute();
  const { createQuote } = useQuotesStore();
  const { fetchActivity } = useActivitiesStore();
  const { activity_information } = storeToRefs(useActivitiesStore());
  
  const step = ref(1);
  const send_quote = reactive({
                              cart: {},
                              activity: {},
                            });
  /*
  import { reactive } from "vue";
  import { useProductsStore } from "../../../stores/leader/products";
  import ProductsForm from "../../../components/leader/products/Form.vue";

  const { createProduct } = useProductsStore();

  const form = reactive({
                        sku:'',
                        name:'',
                        quantity:'',
                        description:'',
                        category_id:'',
                  });

  const submit = async () => {
    await createProduct(form);
  }
  */
  
  //const { fetchActivity, createActivityReschedule } = useActivitiesStore();
  
  fetchActivity(route.params.id);

  const submit_preview_quote = async () => {
    step.value = 2;
    console.log('Hola!...');
  }

  const submit_send_quote = async () => {
    await createQuote(send_quote);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_quotes.quotes') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/activities`">{{ $t('add_quotes.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <QuotesForm
        v-if="(step == 1)"
        :send_quote="send_quote"
        :activity_information="activity_information"
        @submit_preview_quote="submit_preview_quote" />
        
      <QuotesPreview
        v-if="(step == 2)"
        @submit_send_quote="submit_send_quote" />
    </div>
  </div>
</template>