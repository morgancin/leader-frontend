<script>
    export default {
        name: "ProductsForm",
    }
</script>

<script setup>
  import { storeToRefs } from "pinia";
  import { onMounted, ref, provide, reactive, computed } from 'vue';

  import { required } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';

  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';

  import { useAccountsStore } from "../../../stores/leader/accounts";
  import { useComponentsCartStore } from "../../../stores/leader/componentsCart";
  import { usePricesListsCartStore } from "../../../stores/leader/priceslistsCart";
  
  import { useGetDataCategories } from '../../../composables/getData/useGetDataCategories';
  import { useGetDataComponents } from '../../../composables/getData/useGetDataComponents';
  import { useGetDataCurrencies } from '../../../composables/getData/useGetDataCurrencies';
  //import { useGetDataPricesLists } from '../../../composables/getData/useGetDataPricesLists';

  //const { cartComponents } = storeToRefs(useComponentsCartStore());
  const { cartPriceslists } = storeToRefs(usePricesListsCartStore());
  const { accounts: dataAccounts } = storeToRefs(useAccountsStore());

  const { fetchAccounts } = useAccountsStore();
  const { add_pricelist_car } = usePricesListsCartStore();
  const { add_component_car, remove_component_car } = useComponentsCartStore();
  
  const { fetchCurrencies, currencies, error_currencies } = useGetDataCurrencies();
  const { fetchComponents, results_components, error_components } = useGetDataComponents();
  const { fetchCategories, results_categories: dataCategories, error } = useGetDataCategories();
  //const { fetchPricesLists, results_prices_lists, error_prices_lists } = useGetDataPricesLists();
  
  const dataComponents = ref([]);
  const dataCurrencies = ref([]);
  const component_modal = ref({});
  const priceslists_modal = ref({});
  const dropzoneValidationRef = ref();
  const addComponentModal = ref(false);
  
  const props = defineProps({
                            product: {
                                      type: Object,
                                      required: true,
                                    }
                                    /*
                            cart_components: {
                                              type: Object,
                                              required: true,
                                            },
                                            */
                          });
                          
  const emit = defineEmits(["submit"]);

  const add_component_form = reactive({
                                        name:'',
                                        quantity:1,
                                    });

  const add_pricelist_form = reactive({
                                        name:'',
                                        price:'',
                                        currency:''
                                    });

  //props.cart_components.value = cartComponents.value;
                                    
  const add_component = () => {
    addComponentModal.value = true;  
  }

  const reduceComponent = () => {  
    if(add_component_form.quantity > 1){
      add_component_form.quantity--;
    }
  }

  const removeComponent = component => {
    remove_component_car(component);
  }

  const pruebas = ref([]);

  const submit_add_component = () => {
    props.product.components.push({
                                    name: add_component_form.name,
                                    quantity:add_component_form.quantity,
                                });
                                
    add_component_form.name = '';
    add_component_form.quantity = 1;
    addComponentModal.value = false;      
  }

  onMounted(async() => {
    await fetchAccounts();
    await fetchCategories();
    //await fetchPricesLists();
    
    await fetchCurrencies();
    dataCurrencies.value = currencies.value;
    
    await fetchComponents();
    dataComponents.value = results_components.value;

    const elDropzoneValidationRef = dropzoneValidationRef.value;

    elDropzoneValidationRef.dropzone.on("success", () => {
      //alert("Added file.");
    });

    elDropzoneValidationRef.dropzone.on("error", (event) => {
      //dropzoneValidationRef.removeFile(event);
      alert("No se pudo subir el archivo, no cumplió las características");
    });
  });

  provide("bind[dropzoneValidationRef]", (el) => {
    dropzoneValidationRef.value = el;
  });
  
  ////////RULES
  const rules = {
    name: { required },
    quantity: { required },
    account_id: { required },
    category_id: { required },
    description: { required }
  }
  
  const validate = useVuelidate(rules, props.product);
  
  const submitCreate = async () => {
    validate.value.$touch();
    
    if (validate.value.$invalid) {
      toast.error('Error de validación', {
                      autoClose:1000,
                    });
    }
    
    const result = await validate.value.$validate();
    
    if(result) {
      emit('submit');
    }
  }
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="submitCreate" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('products.form.labels.title') }}
          </div>
          
          <div class="mt-5">
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">            
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('products.form.labels.fields.account') }}</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      {{ $t('products.form.labels.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    {{ $t('products.form.instructions.account') }}
                  </div>
                </div>
              </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <v-select
                      label="name"
                      class="form-control" 
                      :options="dataAccounts" 
                      :reduce="name => name.id"
                      v-model="product.account_id"
                      :class="{ 'border-danger': validate.account_id.$error }">
                    </v-select>
                    
                    <template v-if="validate.account_id.$error">
                      <div
                          v-for="(error, index) in validate.account_id.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                  </div>
              </div>

              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('products.form.labels.fields.categories') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('products.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('products.form.instructions.categories') }}
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <v-select
                      label="name"
                      class="form-control" 
                      :options="dataCategories" 
                      :reduce="name => name.id"
                      v-model="product.category_id"
                      :class="{ 'border-danger': validate.category_id.$error }">
                    </v-select>

                    <template v-if="validate.category_id.$error">
                      <div
                          v-for="(error, index) in validate.category_id.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                  </div>
              </div>
      
              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('products.form.labels.fields.sku') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('products.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('products.form.instructions.sku') }}
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('products.form.placeholders.sku')"
                        v-model="product.sku" />
                    <div class="text-right form-help">
                      {{ $t('products.form.instructions.validation.sku') }}
                    </div>
                  </div>
              </div>

              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('products.form.labels.fields.name') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('products.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('products.form.instructions.name') }}
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('products.form.placeholders.name')"
                        v-model="product.name"
                        :class="{ 'border-danger': validate.name.$error }" />

                    <template v-if="validate.name.$error">
                      <div
                        v-for="(error, index) in validate.name.$errors"
                        :key="index"
                        class="mt-2 text-danger">
                          {{ error.$message }}
                      </div>
                    </template>
                    <div class="text-right form-help">
                      {{ $t('products.form.instructions.validation.name') }}
                    </div>
                  </div>
              </div>

              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('products.form.labels.fields.description') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('products.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('products.form.instructions.description') }}
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('products.form.placeholders.description')"
                        v-model="product.description"
                        :class="{ 'border-danger': validate.description.$error }" />
                    
                    <template v-if="validate.description.$error">
                      <div
                          v-for="(error, index) in validate.description.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                    <div class="text-right form-help">
                      {{ $t('products.form.instructions.validation.description') }}
                    </div>
                  </div>
              </div>

              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('products.form.labels.fields.quantity') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('products.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('products.form.instructions.quantity') }}
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="number"
                        class="w-full form-control"
                        :placeholder="$t('products.form.placeholders.quantity')"
                        v-model="product.quantity"
                        :class="{ 'border-danger': validate.quantity.$error }" />

                    <template v-if="validate.quantity.$error">
                      <div
                          v-for="(error, index) in validate.quantity.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                  </div>
              </div>

              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                <div class="form-label xl:w-72 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('products.form.labels.fields.status') }}</div>
                        <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('products.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('products.form.instructions.status') }}</div>
                    </div>  
                  </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <div class="form-check form-switch">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="product-status-active"
                          v-model="product.active" />                        
                        <label class="form-check-label" for="product-status-active">{{ $t('products.form.labels.active') }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
      <div class="p-5 mt-5 intro-y box">      
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('products.form.labels.complementary_information') }}
          </div>
          <div class="mt-5">  
            <div class="flex-col items-start mt-10 form-inline xl:flex-row">
              <div class="form-label w-full xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('products.form.labels.fields.photos') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('products.form.labels.required') }}
                    </div>
                  </div>
                  
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    <div>{{ $t('products.form.instructions.validation.photos') }}</div>
                    <div class="mt-2">{{ $t('products.form.instructions.photos') }}</div>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 rounded-md xl:mt-0 dark:border-darkmode-400"> 
                <Dropzone
                  ref-key="dropzoneValidationRef"
                  :options="{
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 120,
                    maxFilesize: 0.5,
                    acceptedFiles: 'image/*',
                    resizeMethod: 'contain',
                    addRemoveLinks: true,
                    dictRemoveFile: 'Eliminar',
                    dictCancelUpload: 'Cancelar subida',
                    dictInvalidFileType: 'No puedes subir este tipo de archivos',
                    dictFileTooBig: 'Archivo es muy grande ({{filesize}}Mb). Tamaño permitido: {{maxFilesize}}Mb.',
                    headers: { 'My-Awesome-Header': 'header value' }
                  }"
                  class="dropzone">
                  <div class="text-lg font-medium">
                    {{ $t('products.form.instructions.dropzone_photos') }}
                  </div>
                  <div class="text-gray-600">
                    {{ $t('products.form.instructions.validation.dropzone_photos') }} <span class="font-medium">{{ $t('products.form.instructions.validation.dropzone_3_photos') }}</span> {{ $t('products.form.instructions.validation.dropzone_4_photos') }}
                      <span class="font-medium">{{ $t('products.form.instructions.validation.dropzone_5_photos') }}</span>.<br>{{ $t('products.form.instructions.validation.dropzone_6_photos') }} <span class="font-medium">0.5 Mb</span>.
                  </div>
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 p-5 intro-y box lg:col-span-5">
          <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 h-100">
            <div class="flex flex-col items-center pb-5 border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
                <div class="flex items-center mr-auto text-base font-medium"><ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('products.form.labels.component_information') }}</div> <a class="mr-2 text-xs shadow-md btn btn-primary" @click="addComponentModal = true">{{ $t('products.buttons.add_component') }} <PlusIcon class="w-4 h-4" /></a>
            </div>
            <div class="mt-5"> 
                <a v-if="Object.keys(product.components).length === 0" class="block w-full text-xs text-center text-slate-500">{{ $t('products.form.labels.component_information_2') }}</a>
                
                <a v-for="(component, id) in product.components"
                  :key="id"
                  href="javascript:;"
                  @click="removeComponent(component)"
                  class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">                
                    <div class="max-w-[50%] truncate mr-1 flex items-center">
                      <TrashIcon class="w-4 h-4 mr-2 text-slate-500" /> {{ component.name }}
                    </div>
                    <div class="flex ml-auto font-medium">
                      <div class="text-slate-500">x {{ component.quantity }}</div>                    
                    </div>
                </a>

                <!--
                <a v-if="Object.keys(cartComponents).length === 0" class="block w-full text-xs text-center text-slate-500">Sin componentes agregados</a>

                <a v-for="(componente, id) in cartComponents"
                :key="id"
                href="javascript:;"
                @click="removeComponent(componente)"
                class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">                
                  <div class="max-w-[50%] truncate mr-1 flex items-center">
                    <TrashIcon class="w-4 h-4 mr-2 text-slate-500" /> {{ componente.name }}
                  </div>
                  <div class="flex ml-auto font-medium">
                    <div class="text-slate-500">x {{ componente.quantity }}</div>                    
                  </div>
                </a>
                -->
            </div>
          </div>
        </div>  

        <div class="col-span-12 p-5 intro-y box lg:col-span-7">
          <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 h-100">
            <div class="flex flex-col items-center pb-5 border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
                <div class="flex items-center mr-auto text-base font-medium"><ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('products.form.labels.price_information') }}</div>
                <!--<a class="mr-2 shadow-md btn btn-primary" @click="addPricesListsModal = true">Agregar lista de precio <PlusIcon class="w-4 h-4" /></a>-->
            </div>
            <div class="mt-5"> 
                <!--<a v-if="Object.keys(cartPriceslists).length === 0" class="block w-full text-xs text-center text-slate-500">Sin listas de precios agregadas</a>               
                <a v-for="(pricelist, id) in cartPriceslists"
                :key="id"
                href="javascript:;"
                @click="removePriceList(pricelist)"
                class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">                
                  <div class="max-w-[50%] truncate mr-1 flex items-center">
                    <TrashIcon class="w-4 h-4 mr-2 text-slate-500" /> <b class="mr-2">[{{ pricelist.currency }}]</b> {{ pricelist.name }}
                  </div>
                  <div class="flex ml-auto font-medium">
                    <div class="text-slate-500">$ {{ pricelist.price }}</div>                    
                  </div>
                </a>-->
                <div class="overflow-x-auto">
                  <table class="table border">
                    <thead>
                      <tr>                        
                        <th class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                          <div class="flex items-center">
                            {{ $t('products.form.labels.price_information_2') }} 
                          </div>
                        </th>
                        <th class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !pl-0 pr-2">
                          {{ $t('products.form.labels.price_information_3') }}
                        </th>
                        <th class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !pl-0 pr-5">
                          {{ $t('products.form.labels.price_information_4') }}
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <tr v-for="(pricelist, id) in product.price_lists">
                        <td>{{ pricelist.name }}</td>

                        <td class="!pl-0 pr-2 max-w-[7rem]">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="number"
                              class="form-control max-w-[6rem]"
                              :placeholder="$t('products.form.placeholders.price')"
                              v-model="pricelist.price" />
                          </div>
                        </td>

                        <td class="!pl-0 pr-5 min-w-[7rem]">
                          <v-select
                            label="code"
                            class="form-control" 
                            :options="dataCurrencies"
                            :reduce="code => code.id"
                            v-model="pricelist.currency_id">
                              <template #option="{ code, name }">
                                <b>{{ code }}</b> {{ name }}
                              </template>
                          </v-select>
                        </td>
                      </tr>
                    </tbody>
                    
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('products.buttons.cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('products.buttons.save') }}</button>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>

  <!-- BEGIN: Add Component Modal -->
  <Modal :show="addComponentModal" @hidden="addComponentModal = false">
    <ModalHeader>
      <h2 class="mr-auto text-base font-medium">{{ $t('products.form.labels.component_information_3') }}</h2>
    </ModalHeader>
    
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">      
      <div class="col-span-12">
        <label for="pos-form-5" class="form-label">{{ $t('products.form.labels.component_information_4') }}:</label>
        <input
          type="text"
          class="form-control"
          :placeholder="$t('add_components.name')"
          v-model="add_component_form.name" />
      </div>

      <div class="col-span-12">
        <label for="pos-form-4" class="form-label">{{ $t('products.form.labels.component_information_5') }}:</label>
        
        <div class="flex flex-1">
          <button
            type="button"
            @click="reduceComponent"
            class="w-12 mr-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
              -
          </button>

          <input
            type="text"
            id="pos-form-4"
            placeholder="Item quantity"
            class="w-24 text-center form-control"
            v-model="add_component_form.quantity" />

          <button
            type="button"
            @click="add_component_form.quantity++"
            class="w-12 ml-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
              +
          </button>
        </div>
      </div>
    </ModalBody>

    <ModalFooter class="text-right">
      <button
        type="button"
        class="w-24 btn btn-primary"
        @click="submit_add_component">
          {{ $t('products.buttons.save') }}
      </button>
    </ModalFooter>
  </Modal>
  <!-- END: Add Component Modal -->
</template>

<style>
  .dropzone .dz-preview .dz-remove{ background:#fff; border-radius:5px; color:#000; padding:4px 6px; font-size:10px;
  position:absolute; left:5px; top:5px; z-index:30; line-height:1; cursor:pointer}
  .dropzone .dz-preview .dz-image,.dropzone .dz-preview.dz-file-preview .dz-image{ border-radius:5px}
  .dz-error .dz-image{ border:2px solid #cf0c00}
    .dz-error:before{ width:100%; height:100%; background:#cf0c00; opacity:0.5; content:""; position:absolute; left:0px; top:0px;
    z-index:11; border-radius:5px}
  .mb-0{ margin-bottom:0px}
  .h-100{ height:100%}
</style>