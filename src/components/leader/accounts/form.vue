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
      account: {
        type: Object,
        required: true
      }
    });
    
    const emit = defineEmits(["submit"]);

    ////////RULES
    const rules = {
      name: { required }
    }

    const validate = useVuelidate(rules, props.account);

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
            <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('accounts.form.labels.title') }}
          </div>

          <div class="mt-5">        
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('accounts.form.labels.fields.name') }}</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        {{ $t('accounts.form.labels.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('accounts.form.instructions.name') }}</div>
                </div>
              </div>              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  type="text"
                  class="w-full form-control"
                  :placeholder="$t('accounts.form.placeholders.name')"
                  v-model="account.name"
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
                      <div class="font-medium">{{ $t('accounts.form.labels.fields.status') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          {{ $t('accounts.form.labels.required') }}
                      </div>
                    </div>
                    <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('accounts.form.instructions.status') }}</div>
                  </div>
                </div>
                <div class="flex-1 w-full mt-3 xl:mt-0">
                  <div class="form-check form-switch">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product-status-active"
                      v-model="account.active" />
                    <label class="form-check-label" for="product-status-active">{{ $t('accounts.form.labels.active') }}</label>
                  </div>
                </div>
            </div>

          </div>
          <!-- END: Form Layout -->
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('accounts.buttons.cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('accounts.buttons.save') }}</button>
      </div>
    </form>
  </div>
</template>