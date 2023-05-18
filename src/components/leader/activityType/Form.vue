<script>
    export default {
        name: "ActivityTypeForm",
    }
</script>

<script setup>
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { required } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import i18n from "../../../language/i18n";
    const { t } = i18n.global;

    const props = defineProps({
        activity_type: {
            type: Object,
            required: true,
        },
    });

    const emit = defineEmits(["submit"]);

    ////////RULES
    const rules = {
      name: { required },
      type: { required }
    }
    
    const validate = useVuelidate(rules, props.activity_type);

    const submitCreate = async () => {
      validate.value.$touch();
    
      if (validate.value.$invalid) {
        toast.error(t('messages.validation_error'), {
                      autoClose:1000,
                    });
      }

      const result = await validate.value.$validate();
      
      if(result) {
        emit('submit');
      }
    }
    
    const aTypes = [
        { key:'call', value: 'CALL' },
        { key:'email', value: 'EMAIL' },
        { key:'sms', value: 'SMS' },
        { key:'meet', value: 'MEET' },
        { key:'date', value: 'DATE' },
        { key:'other', value: 'OTHER' },
    ];
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="submitCreate" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_catalog_activity.activity') }}
          </div>

          <div class="mt-5"> 

            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('add_catalog_activity.activity_type') }}</div>
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
                  label="value"
                  class="form-control" 
                  :options="aTypes" 
                  :reduce="value => value.key"
                  v-model="activity_type.type"
                  :class="{ 'border-danger': validate.type.$error }">
                </v-select>

                <template v-if="validate.type.$error">
                  <div
                    v-for="(error, index) in validate.type.$errors"
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
                    <div class="font-medium">{{ $t('add_catalog_activity.activity_name') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Nombre de actividad
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">  
                <input
                  type="text"
                  :placeholder="$t('add_catalog_activity.activity_name')" 
                  class="w-full form-control"
                  v-model="activity_type.name"
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
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('add_catalog_activity.btn_cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('add_catalog_activity.btn_save') }}</button>
      </div>  

    </form>
    <!-- END: Form Layout -->
  </div>
</template>