<script>
    export default {
        name: "CurrenciesForm",
    }
</script>

<script setup>
    defineProps({
      currency: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);
</script>

<template>
  <div class="intro-y col-span-12 lg:col-span-6">
    
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      
      <div class="intro-y box p-5">
    
        <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">

          <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> Datos de divisa
          </div>

          <div class="mt-5">        
              <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('add_currencies.currency_code') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          Requerido
                        </div>
                      </div>
                      <div class="leading-relaxed text-slate-500 text-xs mt-3">
                        Código de la divisa, espacio para caracteres alfanúmericos.
                      </div>
                    </div>
                  </div>

                  <div class="w-full mt-3 xl:mt-0 flex-1">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('add_currencies.currency_code')"
                        v-model="currency.code" />
                  </div>
              </div>

              <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('add_currencies.currency_name') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          Requerido
                        </div>
                      </div>
                      <div class="leading-relaxed text-slate-500 text-xs mt-3">
                        Nombre de la divisa, espacio para caracteres alfanúmericos.
                      </div>
                    </div>
                  </div>

                  <div class="w-full mt-3 xl:mt-0 flex-1">
                    <input
                        type="text"
                        class="w-full form-control"
                        :placeholder="$t('add_currencies.currency_name')"
                        v-model="currency.name" />
                  </div>
              </div>
                          
          </div>
          <!-- END: Form Layout -->

        </div>

      </div>

      <div class="flex justify-end flex-col md:flex-row gap-2 mt-5">
        <button type="button" class="py-3 w-full md:w-52 mr-1 btn btn-outline-secondary">{{ $t('add_currencies.btn_cancel') }}</button>
        <button type="submit" class="btn py-3 btn-primary w-full md:w-52">{{ $t('add_currencies.btn_save') }}</button>
      </div>

    </form>

  </div>
</template>