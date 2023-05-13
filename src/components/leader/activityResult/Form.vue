<script>
    export default {
        name: "ActivityTypeForm",
    }
</script>

<script setup>
    import { onMounted, ref, watch} from 'vue';
    import { storeToRefs } from "pinia";

    import { required } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { usePipelinesStore } from "@/stores/leader/pipelines";

    import { useGetDataActivityTypes } from '../../../composables/getData/useGetDataActivityTypes';
    const { fetchActivityTypes, results, error } = useGetDataActivityTypes();

    const { fetchPipelines, fetchPipelineStages } = usePipelinesStore();

    const { pipelines:data_pipelines, pipeline_stages: data_pipeline_stages } = storeToRefs(usePipelinesStore());

    const pipeline_id = ref();
    const dataActivityTypes = ref([]);

    const props = defineProps({
        activity_result: {
            type: Object,
            required: true,
        },
    });

    const emit = defineEmits(["submit"]);

    ////////RULES
    const rules = {
      name: { required },
      activity_type_id: { required },
      pipeline_stage_id: { required }
    }

    const validate = useVuelidate(rules, props.activity_result);

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
    
    onMounted(async() => {
      await fetchPipelines();
      await fetchActivityTypes();
      dataActivityTypes.value = results.value;
    });
    
    watch(
        () => pipeline_id.value,
        async () => {
          props.activity_result.pipeline_stage_id = null;
          
          await fetchPipelineStages(pipeline_id.value);
        }
    );
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="submitCreate" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_catalog_activity_result.activity_result') }}
          </div>

          <div class="mt-5">
            
            <!-- AQUI -->
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('add_catalog_activity_result.activity_result_pipeline') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('add_catalog_activity_result.activity_result_pipeline') }}</div>
                </div>
              </div>
              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <v-select
                  label="name"
                  class="form-control"
                  :options="data_pipelines"
                  :reduce="name => name.id"
                  v-model="pipeline_id">
                </v-select>  
              </div>
            </div>
            
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('add_catalog_activity_result.activity_result_pipeline_stages') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('add_catalog_activity_result.activity_result_pipeline_stages') }}</div>
                </div>
              </div>
              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <v-select
                  label="name"
                  class="form-control"
                  :options="data_pipeline_stages"
                  :reduce="name => name.id"
                  v-model="activity_result.pipeline_stage_id"
                  :class="{ 'border-danger': validate.pipeline_stage_id.$error }">
                </v-select>

                <template v-if="validate.pipeline_stage_id.$error">
                  <div
                    v-for="(error, index) in validate.pipeline_stage_id.$errors"
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
                    <div class="font-medium">{{ $t('add_catalog_activity_result.activity_result_type') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Tipo de actividad
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0"> 
                <v-select
                  label="name"
                  class="form-control" 
                  :options="dataActivityTypes" 
                  :reduce="name => name.id"
                  v-model="activity_result.activity_type_id"
                  :class="{ 'border-danger': validate.activity_type_id.$error }">
                </v-select>

                <template v-if="validate.activity_type_id.$error">
                  <div
                    v-for="(error, index) in validate.activity_type_id.$errors"
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
                    <div class="font-medium">{{ $t('add_catalog_activity_result.activity_result_name') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Nombre de resultado de actividad
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  type="text"
                  class="w-full form-control"
                  v-model="activity_result.name"
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
            
          </div>
        </div>
      </div>  

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('add_catalog_activity_result.btn_cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('add_catalog_activity_result.btn_save') }}</button>
      </div>
    </form>
    
    <!-- END: Form Layout -->
  </div>
</template>