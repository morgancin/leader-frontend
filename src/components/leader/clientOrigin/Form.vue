<script>
    export default {
        name: "ClientOriginForm",
    }
</script>

<script setup>
    defineProps({
      origin: {
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
          <label class="form-label">{{ $t('add_catalog_origin.origin_name') }}</label>
          <input
              type="text" 
              class="w-full form-control"
              :placeholder="$t('add_catalog_origin.origin_name')"
              v-model="origin.description" />
        </div>
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">Cancel</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_catalog_origin.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>