<script>
    export default {
        name: "PipelinesForm",
    }
</script>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { storeToRefs } from "pinia";
    import draggable from 'vuedraggable';

    import { required } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useAccountsStore } from "@/stores/leader/accounts";

    const { accounts: dataAccounts } = storeToRefs(useAccountsStore());

    const cartStages = ref([]);
    const idref = ref(0);

    const props = defineProps({
      pipeline: {
                  type: Object,
                  required: true,
                }
    });
    
    const emit = defineEmits(["submit"]);

    const addStage = () => {
      cartStages.value.push({
                            name: "",
                            percentage: 0,
                            id: idref.value
                        });
                        
      idref.value = idref.value+1;
    }

    const removeStage = (id) => { 
      cartStages.value = cartStages.value.filter((obj) => obj.id !== id);
    }
    
    ////////RULES
    const rules = {
      name: { required },
      account_id: { required }
    }

    const validate = useVuelidate(rules, props.pipeline);

    const submitCreate = async () => {
      validate.value.$touch();
    
      if (validate.value.$invalid) {
        toast.error('Error de validación', {
                      autoClose:1000,
                    });
      }

      const result = await validate.value.$validate();
      
      if(result) {
        props.pipeline.stages = [...cartStages.value];
      
        emit('submit');
      }
    }
                    
    onMounted(async() => {
      await fetchAccounts();
    });
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <form @submit.prevent="submitCreate" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_pipelines.pipeline') }}
          </div>
          
          <div class="mt-5">
          
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('add_pipelines.pipeline_account') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('add_pipelines.pipeline_account') }}</div>
                </div>
              </div>
              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <v-select
                  label="name"
                  class="form-control"
                  :options="dataAccounts"
                  :reduce="name => name.id"
                  v-model="pipeline.account_id"
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
                    <div class="font-medium">{{ $t('add_pipelines.pipeline_name') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('add_pipelines.pipeline_name') }}</div>
                </div>
              </div>
              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  type="text"
                  class="w-full form-control"
                  v-model="pipeline.name"
                  :class="{ 'border-danger': validate.name.$error }" />
                  
                <template v-if="validate.name.$error">
                  <div
                    v-for="(error, index) in validate.name.$errors"
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
                    <div class="font-medium">{{ $t('add_pipelines.pipeline_is_default') }}</div>
                  </div>                      
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="product-status-active"
                    v-model="pipeline.is_default" />
                    <label class="form-check-label" for="product-status-active">{{ $t('add_pipelines.pipeline_is_default') }}</label>
                  </div>
              </div>
            </div>
            
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                <div class="form-label xl:w-72 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">Status</div>
                        <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          If the status is active, your pipeline can be searched for by
                          potential buyers.
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <div class="form-check form-switch">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="product-status-active"
                          v-model="pipeline.active" />                        
                        <label class="form-check-label" for="product-status-active">Active</label>
                      </div>
                    </div>
                  </div>
            </div>
          </div>

        <div class="p-5 mt-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
            <div class="flex items-center mr-auto text-base font-medium"><ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_pipelines.pipeline_stages') }}</div>
            <a class="mr-2 text-xs shadow-md btn btn-primary" @click="addStage"> {{$t('add_pipelines.btn_add_new_stage')}} <PlusIcon class="w-4 h-4" /></a>
          </div>

          <div class="mt-5">
            <a v-if="Object.keys(cartStages).length === 0" class="block w-full mt-3 text-xs text-center text-slate-500">{{$t('forms.noitems')}}</a>
            <table class="table border" v-if="Object.keys(cartStages).length > 0">
              <thead>
                <tr>
                  <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">{{$t('add_pipelines.pipeline_stage_sort')}}</th>
                  <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">{{$t('add_pipelines.pipeline_stage_name')}}</th>
                  <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2">{{$t('add_pipelines.pipeline_stage_percent')}}</th>
                  <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2"></th>
                </tr>
              </thead>

              <draggable
                tag="tbody"
                item-key="id"
                v-model="cartStages">
                  <template #item="{ element }">
                    <tr>
                      <td scope="row">
                        <button class="mt-2 sm:mt-0">
                          <AlignJustifyIcon class="w-4 h-4 text-slate-500"/>
                        </button>
                      </td>
                      <td>
                        <input type="text" class="mt-2 form-control sm:mt-0" :placeholder="$t('add_pipelines.pipeline_stage_name')" v-model="element.name" />
                      </td>
                      <td>
                        <div class="input-group">                    
                          <input type="number" class="form-control" :placeholder="$t('add_pipelines.pipeline_stage_percent')" v-model="element.percentage" />
                          <div class="input-group-text">%</div>
                        </div>
                      </td>
                      <td>
                        <button class="mt-2 sm:mt-0">
                          <TrashIcon class="w-4 h-4 mr-2 cursor-pointer text-slate-500" @click="removeStage(element.id)" />
                        </button>
                      </td>
                    </tr>
                  </template>
                </draggable>

            </table>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
      <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('forms.cancel') }}</button>
      <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('forms.save') }}</button>
    </div>
  </form>
</div>

</template>

<style>
  table.table tbody tr {
      cursor: move; /* fallback if grab cursor is unsupported */
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
  }
  table.table tbody tr:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
  }
</style>