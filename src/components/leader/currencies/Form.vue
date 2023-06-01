<script>
    export default {
        name: "CurrenciesForm",
    }
</script>

<script setup>
    import { required } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import i18n from "../../../language/i18n";
    const { t } = i18n.global;
    
    const props = defineProps({
      currency: {
        type: Object,
        required: true
      }
    });
    
    const emit = defineEmits(["submit"]);

    ////////RULES
    const rules = {
      code: { required },
      name: { required }
    }

    const validate = useVuelidate(rules, props.currency);
    
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
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <form @submit.prevent="submitCreate" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Datos de divisa
          </div>

          <div class="mt-5">        
              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('add_currencies.currency_code') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Código de la divisa, espacio para caracteres alfanúmericos.
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('add_currencies.currency_code')"
                        v-model="currency.code"
                        :class="{ 'border-danger': validate.code.$error }" />
                        
                    <template v-if="validate.code.$error">
                      <div
                          v-for="(error, index) in validate.code.$errors"
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
                        <div class="font-medium">{{ $t('add_currencies.currency_name') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Nombre de la divisa, espacio para caracteres alfanúmericos.
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('add_currencies.currency_name')"
                        v-model="currency.name"
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
                        <div class="font-medium">Status</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        If the status is active, your account can be searched for by
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
                        v-model="currency.active" />                        
                      <label class="form-check-label" for="product-status-active">Active</label>
                    </div>
                  </div>
              </div>
                          
          </div>
          <!-- END: Form Layout -->
          
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('add_currencies.btn_cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('add_currencies.btn_save') }}</button>
      </div>

    </form>

  </div>
</template>