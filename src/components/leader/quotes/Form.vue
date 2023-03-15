<script>
    export default {
        name: "QuotesForm",
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { onMounted, ref, watch, reactive } from "vue";
    import { useQuotesCartStore } from "../../../stores/leader/quotesCart";
    
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    
    import { useGetDataProducts } from "../../../composables/getData/useGetDataProducts";
    import { useGetDataCategories } from "../../../composables/getData/useGetDataCategories";
    import { useGetDataPricesLists } from "../../../composables/getData/useGetDataPricesLists";
    
    const addItemModal = ref(false);
    const newOrderModal = ref(false);
    
    const { cart, sub_total:sub_total_quote, total: total_quote } = storeToRefs(useQuotesCartStore());
    
    const { add_product_car, update_products_prices_lists } = useQuotesCartStore();

    /* /////////////////////// */
    const { fetchCategories, results_categories, error } = useGetDataCategories();
    const { fetchProductsCategory, products, products_error } = useGetDataProducts();
    const { fetchPricesLists, results_prices_lists, error_prices_lists } = useGetDataPricesLists();
    
    const dataProducts = ref([]);
    const product_modal = ref({});
    const dataCategories = ref([]);
    const dataPricesLists = ref([]);
    const back_category = ref(null);
    const prices_lists_id = ref(1);
    const category_products_count = ref({});
    
    const add_product_form = reactive({
                                      quantity:1,
                                      comments:'',
                                  });
    const props = defineProps({
        send_quote: {
            type: Object,
            required: true,
        },
        activity_information: {
            type: Object,
            required: true,
        },
    });

    const emit = defineEmits(["submit_preview_quote"]);
    
    onMounted(async() => {
        await fetchCategories();
        dataCategories.value = results_categories.value;

        await fetchPricesLists();
        dataPricesLists.value = results_prices_lists.value;
    });

    watch(
        () => prices_lists_id.value,
        () => {
          update_products_prices_lists(prices_lists_id.value);
        }
    );
    
    /* /////////////////////// */
    const getParent = (root, id) => {
      let node;
      
      root.some(n => {
        if (n.id === id) {  
          return node = n;
        }
        
        if (n.subcategories) {
          return node = getParent(n.subcategories, id);
        }
      });
      
      return node || null;
    }
    
    const get_categories_from_category = async (category) => {
      dataProducts.value = [];
      dataCategories.value = [];
      category_products_count.value = {};

      let result = getParent(results_categories.value, category.id);
      
      //////////
      //console.log(result.name + 'TotalProducts ' + result.products_count);
      if(result.products_count > 0) {
        category_products_count.value = result;
      }
      ////////////////////

      if(result.subcategories.length > 0) {
        back_category.value = (result.parent_id === null) ? -1 : result.parent_id;
        dataCategories.value = result.subcategories;
      }
      /*
      else {
        await fetchProductsCategory(category);
        dataProducts.value = products.value;
      }
      */
    }

    const get_category_products = async (category) => {
      await fetchProductsCategory(category);
      dataProducts.value = products.value;
    }

    const back_categories = () => {
      if(back_category.value === -1) {
        back_category.value = null;
        dataCategories.value = results_categories.value;

      }else {
        let result = getParent(results_categories.value, back_category.value);
        get_categories_from_category(result);
      }
    }

    /*
    const fetch_products_or_categories = async (category) => {
      dataProducts.value = {};
      let result = getParent(results_categories.value, category.id);
      
      if(result.subcategories.length > 0) {
        back_category.value = (result.parent_id === null) ? -1 : result.parent_id;
        dataCategories.value = result.subcategories;
        
      }else {
        await fetchProductsCategory(category);
        dataProducts.value = products.value;
      }
    }

    const back_categories = () => {
      if(back_category.value === -1) {
        back_category.value = null;
        dataCategories.value = results_categories.value;

      }else {
        let result = getParent(results_categories.value, back_category.value);
        fetch_products_or_categories(result);
      }
    }
    */

    /*
    const submit_add_product = () => {
      //addItemModal.value = false;
      showModal.value = false;
      
      add_product_car(
                      product_modal.value,                                                     //product_modal.value,
                      //add_product_form.quantity,
                      //add_product_form.comments,
                      //prices_lists_id.value     //product.prices.filter(p => p.id === prices_lists_id.value), //prices_lists_id.value,
                    );
                    
      
      product_modal.value = {};
    }
    */

    const reduceItem = () => {  
      if(add_product_form.quantity > 1){
        add_product_form.quantity--;
      }
    }

    const add_product = product => {
      addItemModal.value = true;
      product_modal.value = product;
    }

    const submit_add_product = () => {
      add_product_car(
                      product_modal.value,                                                     //product_modal.value,
                      add_product_form.quantity,
                      add_product_form.comments,
                      prices_lists_id.value     //product.prices.filter(p => p.id === prices_lists_id.value), //prices_lists_id.value,
                  );

      product_modal.value = {};
      addItemModal.value = false;      
    }

    const send_preview_quote = () => {
      //props.send_quote.cart.value = cart.value;
      //props.send_quote.activity.value = props.activity_information;
      //console.log('heyyy');
      emit('submit_preview_quote');      
    }
</script>

<template>
    
    <div class="grid grid-cols-12 gap-5 mt-5 intro-y">
      
      <!-- BEGIN: Item List -->      
      <div class="col-span-12 intro-y lg:col-span-8">

        <div class="intro-y box p-5">
          <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">

            <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_products.products') }}
            </div>

            <div class="mt-5">


              <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                <div class="form-label xl:w-42 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('add_quotes.quote_lists_prices') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('forms.required') }}
                      </div>
                    </div>
                    <div class="leading-relaxed text-slate-500 text-xs mt-3">
                      {{ $t('add_quotes.quote_lists_prices') }}
                    </div>
                  </div>
                </div>

                <div class="w-full mt-3 xl:mt-0 flex-1">   
                  <v-select
                    id="cmbPricesLists"
                    class="form-control"
                    :options="dataPricesLists"
                    :reduce="name => name.id"
                    label="name"
                    :placeholder="$t('add_quotes.quote_lists_prices')"
                    v-model="prices_lists_id">
                  </v-select>
                </div>
              </div>


              <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                <div class="form-label xl:w-42 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('add_categories.categories') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('forms.required') }}
                      </div>
                    </div>
                    <div class="leading-relaxed text-slate-500 text-xs mt-3">
                      {{ $t('add_categories.categories') }}
                    </div>
                  </div>
                </div>

                <div class="w-full mt-3 xl:mt-0 flex-1">   
                    <a
                      v-if="(back_category)"
                      @click="back_categories"
                      href="javascript:;"
                      class="w-full flex items-center">
                        <ChevronLeftIcon class="w-4 h-4 mr-auto sm:mr-2" /> {{$t("forms.back")}}
                    </a>                    
                    <div
                      v-for="(category, id) in dataCategories" 
                      :key="id"
                      @click="get_categories_from_category(category)"
                      class="w-full btn btn-outline-default sm:w-auto zoom-in mt-2 ml-2">
                        <div class="text-sm font-medium">{{ category.name }}</div>
                        <ChevronRightIcon class="w-4 h-4 ml-auto sm:ml-2" />
                        <!--<div class="text-slate-500">{{ category_products_count.products_count }} {{$t("forms.items")}}</div>-->
                    </div>
                    <div
                      v-if="(category_products_count.products_count > 0)"
                      @click="get_category_products(category_products_count)"
                      class="w-full btn btn-outline-default sm:w-auto zoom-in mt-2 ml-2 text-left">
                        <div class="text-sm font-medium text-left">{{$t("add_products.products")}}<br><div class="text-slate-500 text-xs">{{ category_products_count.products_count }} {{$t("forms.items")}}</div></div>                        
                        <ChevronRightIcon class="w-4 h-4 ml-auto sm:ml-2" />
                    </div>
                </div>
              </div>
                            
              <div class="grid grid-cols-12 gap-5 pt-5 mt-5 border-t">                
                <a v-if="Object.keys(dataProducts).length === 0" class="block w-full text-xs text-center text-slate-500 col-span-12">{{$t("forms.zeroitems")}}</a>
                <a v-else class="block w-full text-xs text-center text-slate-500 col-span-12">{{$t("forms.pickone")}}</a>
                <a
                  v-for="(product, id) in dataProducts"
                  :key="id"
                  @click="add_product(product)"
                  class="block col-span-12 intro-y sm:col-span-4 2xl:col-span-3">
                    <div class="relative p-3 rounded-md box zoom-in outline-dashed">
                      <div class="flex-none relative block before:block before:w-full before:pt-[100%]">
                        <div class="absolute top-0 left-0 w-full h-full image-fit">
                          <img
                            class="rounded-md"
                            :alt="product.name"
                            src="https://www.asimetrica.org/wp-content/uploads/2019/03/no-imagen.jpg" style="widt: 150px; height: 150px;"/>
                        </div>
                      </div>
                      <div class="flex mt-3 text-center place-content-center items-center">
                        <div class="block font-medium text-center truncate">{{ product.name }}</div>
                        <PlusCircleIcon class="w-4 h-4 ml-auto sm:ml-2" />
                      </div>
                    </div>
                </a>                      
              </div>

            </div>

          </div>
        </div>
      </div>
      <!-- END: Item List -->
      
      <!-- BEGIN: Shopping cart -->
      <TabGroup class="col-span-12 lg:col-span-4">
        <div class="pr-1 intro-y">
          <div class="p-2 box">
            <TabList class="nav-pills">
              <Tab class="w-full py-2" tag="button">{{$t("forms.cart")}}</Tab>
              <Tab class="w-full py-2" tag="button">{{$t("add-prospect.prospect")}}</Tab>
            </TabList>
          </div>
        </div>
        
        <TabPanels>
          <TabPanel>
            <div class="p-2 mt-5 box">
              <a v-if="Object.keys(cart).length === 0" class="block w-full text-xs text-center text-slate-500">{{$t("forms.noitems")}}</a>
              <a
                v-for="(product, id) in cart"
                :key="id"
                href="javascript:;"
                @click="addItemModal = true"
                class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">                
                  <div class="max-w-[50%] truncate mr-1">
                    {{ product.name }}
                  </div>
                  <div class="text-slate-500">x {{ product.quantity }}</div>
                  <EditIcon class="w-4 h-4 ml-2 text-slate-500" />
                  <div class="ml-auto font-medium">${{ product.price }}</div>
              </a>
            </div>
            <div class="p-5 mt-5 box">
              <div class="flex">
                <div class="mr-auto">Subtotal</div>
                <div class="font-medium">${{ sub_total_quote }}</div>
              </div>
              <div
                class="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div class="mr-auto text-base font-medium">Total</div>
                  <div class="text-base font-medium">${{ total_quote }}</div>
              </div>
            </div>
            <div class="flex mt-5">
              <button
                class="w-32 btn border-slate-300 dark:border-darkmode-400 text-slate-500">
                  {{$t("forms.clearitems")}}
              </button>
              <button
                type="button"
                @click="send_preview_quote"
                class="w-32 ml-auto shadow-md btn btn-primary">
                  {{$t("forms.download")}}
              </button>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div class="p-5 mt-5 box">
              <div 
                class="flex items-center pb-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_date') }}</div>
                    <div class="mt-1">{{ activity_information.activity_date }}</div>
                  </div>
                  <ClockIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_prospect') }}</div>
                  <div class="mt-1">{{ activity_information.client }}</div>
                </div>
                <UserIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_type') }}</div>
                  <div class="mt-1">{{ activity_information.type }}</div>
                </div>
                <ActivityIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_subject') }}</div>
                  <div class="mt-1">{{ activity_information.subject }}</div>
                </div>
                <MicIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
            </div>
          </TabPanel>
          
        </TabPanels>
      </TabGroup>
      <!-- END: Ticket -->
    </div>
    
    <!-- BEGIN: New Order Modal -->
    <Modal :show="newOrderModal" @hidden="newOrderModal = false">
      <ModalHeader>
        <h2 class="mr-auto text-base font-medium">New Order</h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="pos-form-1" class="form-label">Name</label>
          <input
            id="pos-form-1"
            type="text"
            class="flex-1 form-control"
            placeholder="Customer name"
          />
        </div>
        <div class="col-span-12">
          <label for="pos-form-2" class="form-label">Table</label>
          <input
            id="pos-form-2"
            type="text"
            class="flex-1 form-control"
            placeholder="Customer table"
          />
        </div>
        <div class="col-span-12">
          <label for="pos-form-3" class="form-label">Number of People</label>
          <input
            id="pos-form-3"
            type="text"
            class="flex-1 form-control"
            placeholder="People"
          />
        </div>
      </ModalBody>
      <ModalFooter class="text-right">
        <button
          type="button"
          @click="newOrderModal = false"
          class="w-32 mr-1 btn btn-outline-secondary"
        >
          Cancel
        </button>
        <button type="button" class="w-32 btn btn-primary">Create Ticket</button>
      </ModalFooter>
    </Modal>
    <!-- END: New Order Modal -->


    <!-- BEGIN: Add Item Modal -->
    <!-- <Modal :show="addItemModal" @hidden="addItemModal = false"> -->
    <Modal :show="addItemModal" @hidden="addItemModal = false">
      <ModalHeader>
        <h2 class="mr-auto text-base font-medium">
          {{ product_modal.name }}
        </h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="pos-form-4" class="form-label">{{ $t('add_components.quantity') }}</label>
          <div class="flex flex-1">
            <button
              type="button"
              @click="reduceItem"
              class="w-12 mr-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
                -
            </button>
            <input
              type="text"
              id="pos-form-4"
              placeholder="Item quantity"
              class="w-24 text-center form-control"
              v-model="add_product_form.quantity" />
              <button
                type="button"
                @click="add_product_form.quantity++"
                class="w-12 ml-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
                  +
              </button>
          </div>
        </div>

        <div class="col-span-12">
          <label for="pos-form-5" class="form-label">{{ $t('forms.comments') }}</label>
          <textarea
            id="pos-form-5"
            class="form-control"
            placeholder="Item notes"
            v-model="add_product_form.comments">
          </textarea>
        </div>
      </ModalBody>

      <ModalFooter class="text-right">
        <button
          type="button"
          @click="addItemModal = false"
          class="w-24 mr-1 btn btn-outline-secondary">
          {{ $t('forms.cancel') }}
        </button>
        <button
          type="button"
          class="w-24 btn btn-primary"
          @click="submit_add_product">
            {{ $t('forms.add') }}
        </button>
      </ModalFooter>
    </Modal>
    <!-- END: Add Item Modal -->

  </template>  
  <style>
    .vs__dropdown-toggle{ background:#fff}
    .vs__search{ font-size:14px}
  </style>