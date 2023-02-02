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
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="mt-3">
          <label class="form-label">*{{ $t('add_currencies.currency_code') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_currencies.currency_code')"
              v-model="currency.code" />
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_currencies.currency_name') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_currencies.currency_name')"
              v-model="currency.name" />
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_currencies.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_currencies.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>