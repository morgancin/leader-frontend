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
    <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
      <!-- <h2 class="mr-auto text-lg font-medium">Quote</h2> -->
      <!--
      <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
        <a
          href="javascript:;"
          @click="newOrderModal = true"
          class="mr-2 shadow-md btn btn-primary">
            New Order
        </a>
        
        <Dropdown class="ml-auto pos-dropdown sm:ml-0">
          <DropdownToggle class="px-2 btn box">
            <span class="flex items-center justify-center w-5 h-5">
              <ChevronDownIcon class="w-4 h-4" />
            </span>
          </DropdownToggle>
          <DropdownMenu class="pos-dropdown__dropdown-menu">
            <DropdownContent>
              <DropdownItem>
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate"
                  >INV-0206020 - {{ $f()[3].users[0].name }}</span
                >
              </DropdownItem>
              <DropdownItem>
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate"
                  >INV-0206022 - {{ $f()[4].users[0].name }}</span
                >
              </DropdownItem>
              <DropdownItem>
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate"
                  >INV-0206021 - {{ $f()[5].users[0].name }}</span
                >
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
      -->
    </div>
    <div class="grid grid-cols-12 gap-5 mt-5 intro-y">
      <!-- BEGIN: Item List -->
      <div class="col-span-12 intro-y lg:col-span-8">
        <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
          <label for="cmbPricesLists" class="form-label">{{ $t('add_quotes.quote_lists_prices') }}</label>
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
        <!--
        <div class="lg:flex intro-y">
          <div class="relative">
            <input
              type="text"
              class="w-full px-4 py-3 pr-10 form-control lg:w-64 box"
              placeholder="Search item..."
            />
            <SearchIcon
              class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 text-slate-500"
            />
          </div>
          <select
            class="w-full px-4 py-3 mt-3 ml-auto form-select box lg:w-auto lg:mt-0">
            <option>Sort By</option>
            <option>A to Z</option>
            <option>Z to A</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>
        -->
        <div class="grid grid-cols-12 gap-5 mt-5">
          <a
            v-if="(back_category)"
            @click="back_categories"
            href="javascript:;">
              Atrás
          </a>
          
          <div
            v-for="(category, id) in dataCategories" 
            :key="id"
            @click="get_categories_from_category(category)"
            class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div class="text-base font-medium">{{ category.name }}</div>
              <!-- <div class="text-slate-500" v-if="(category.products_count > 0)">{{ category.products_count }} Items</div> -->
          </div>

          <div
            v-if="(category_products_count.products_count > 0)"
            @click="get_category_products(category_products_count)"
            class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div class="text-base font-medium">PRODUCTOS</div>
              <div class="text-slate-500">{{ category_products_count.products_count }} Items</div>
          </div>
          
          <!--
          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div class="text-base font-medium">Soup</div>
            <div class="text-slate-500">5 Items</div>
          </div>

          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in bg-primary">
            <div class="text-base font-medium text-white">Pancake & Toast</div>
            <div class="text-white text-opacity-80 dark:text-slate-500">8 Items</div>
          </div>
          
          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div class="text-base font-medium">Pasta</div>
            <div class="text-slate-500">4 Items</div>
          </div>
          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div class="text-base font-medium">Waffle</div>
            <div class="text-slate-500">3 Items</div>
          </div>
          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div class="text-base font-medium">Snacks</div>
            <div class="text-slate-500">8 Items</div>
          </div>
          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div class="text-base font-medium">Deserts</div>
            <div class="text-slate-500">8 Items</div>
          </div>
          <div class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div class="text-base font-medium">Beverage</div>
            <div class="text-slate-500">9 Items</div>
          </div>
            -->
        </div>
        
        <div class="grid grid-cols-12 gap-5 pt-5 mt-5 border-t">
          <!-- @click="addItemModal = true" -->
          <a
            v-for="(product, id) in dataProducts"
            :key="id"
            @click="add_product(product)"
            class="block col-span-12 intro-y sm:col-span-4 2xl:col-span-3">
              <div class="relative p-3 rounded-md box zoom-in">
                <div class="flex-none relative block before:block before:w-full before:pt-[100%]">
                  <div class="absolute top-0 left-0 w-full h-full image-fit">
                    <img
                      class="rounded-md"
                      :alt="product.name"
                      src="https://www.asimetrica.org/wp-content/uploads/2019/03/no-imagen.jpg" style="widt: 150px; height: 150px;"/>
                  </div>
                </div>
                <div class="block mt-3 font-medium text-center truncate">{{ product.name }}</div>
              </div>
          </a>
          
          <!--
          <a
            v-for="(faker, fakerKey) in $_.take($f(), 8)"
            :key="fakerKey"
            href="javascript:;"
            @click="addItemModal = true"
            class="block col-span-12 intro-y sm:col-span-4 2xl:col-span-3">
            <div class="relative p-3 rounded-md box zoom-in">
              <div
                class="flex-none relative block before:block before:w-full before:pt-[100%]"
              >
                <div class="absolute top-0 left-0 w-full h-full image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-md"
                    :src="faker.foods[0].image"
                  />
                </div>
              </div>
              <div class="block mt-3 font-medium text-center truncate">
                {{ faker.foods[0].name }}
              </div>
            </div>
          </a>
          -->
        </div>
      </div>
      <!-- END: Item List -->
      
      <!-- BEGIN: Ticket -->
      <TabGroup class="col-span-12 lg:col-span-4">
        <div class="pr-1 intro-y">
          <div class="p-2 box">
            <TabList class="nav-pills">
              <Tab class="w-full py-2" tag="button">Ticket</Tab>
              <Tab class="w-full py-2" tag="button">Details</Tab>
            </TabList>
          </div>
        </div>
        
        <TabPanels>
          <TabPanel>
            <div class="p-2 mt-5 box">
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
                  Clear Items
              </button>
              <button
                type="button"
                @click="send_preview_quote"
                class="w-32 ml-auto shadow-md btn btn-primary">
                  Preview
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
                <UsersIcon class="w-4 h-4 ml-auto text-slate-500" />
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

          <!--
          <TabPanel>
            <div class="p-2 mt-5 box">
              <a
                v-for="(faker, fakerKey) in $_.take($f(), 5)"
                :key="fakerKey"
                href="javascript:;"
                @click="addItemModal = true"
                class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">
                <div class="max-w-[50%] truncate mr-1">
                  {{ faker.foods[0].name }}
                </div>
                <div class="text-slate-500">x 1</div>
                <EditIcon class="w-4 h-4 ml-2 text-slate-500" />
                <div class="ml-auto font-medium">${{ faker.totals[0] }}</div>
              </a>
            </div>

            <div class="flex p-5 mt-5 box">
              <input
                type="text"
                class="w-full px-4 py-3 pr-10 form-control bg-slate-100 border-slate-200/60"
                placeholder="Use coupon code..." />
              <button class="ml-2 btn btn-primary">Apply</button>
            </div>
            
            <div class="p-5 mt-5 box">
              <div class="flex">
                <div class="mr-auto">Subtotal</div>
                <div class="font-medium">$0.00</div>
              </div>
              <div class="flex mt-4">
                <div class="mr-auto">Discount</div>
                <div class="font-medium text-danger">$0.00</div>
              </div>
              <div class="flex mt-4">
                <div class="mr-auto">Tax</div>
                <div class="font-medium">15%</div>
              </div>
              <div
                class="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div class="mr-auto text-base font-medium">Total</div>
                  <div class="text-base font-medium">$0.00</div>
              </div>
            </div>
            <div class="flex mt-5">
              <button
                class="w-32 btn border-slate-300 dark:border-darkmode-400 text-slate-500">
                  Clear Items
              </button>
              
              <button class="w-32 ml-auto shadow-md btn btn-primary">
                Charge
              </button>
            </div>
          </TabPanel>

          <TabPanel>
            <div class="p-5 mt-5 box">
              <div
                class="flex items-center pb-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">Time</div>
                  <div class="mt-1">02/06/20 02:10 PM</div>
                </div>
                <ClockIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">Customer</div>
                  <div class="mt-1">{{ $f()[0].users[0].name }}</div>
                </div>
                <UserIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">People</div>
                  <div class="mt-1">3</div>
                </div>
                <UsersIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-slate-500">Table</div>
                  <div class="mt-1">21</div>
                </div>
                <MicIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
            </div>
          </TabPanel>
        -->
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
          <label for="pos-form-4" class="form-label">Quantity</label>
          <div class="flex flex-1">
            <button
              type="button"
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
                class="w-12 ml-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
                  +
              </button>
          </div>
        </div>

        <div class="col-span-12">
          <label for="pos-form-5" class="form-label">Notes</label>
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
          Cancel
        </button>
        <button
          type="button"
          class="w-24 btn btn-primary"
          @click="submit_add_product">
            Add Item
        </button>
      </ModalFooter>
    </Modal>
    <!-- END: Add Item Modal -->

  </template>  