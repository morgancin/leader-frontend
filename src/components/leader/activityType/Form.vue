<script>
    export default {
        name: "activityTypeForm",
    }
</script>

<script setup>
    defineProps({
      activity: {
            type: Object,
            required: true,
        },
        // textButton: {
        //     type: String,
        //     default: "Save",
        // },
    })

    defineEmits(["submit"]);
</script>

<template>
  <div class="intro-y col-span-12 lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="intro-y box p-5">
        <div class="mt-3">
          <label class="form-label">{{ $t('add_catalog_activity.activity_type') }}</label>
          <input 
            v-model="activity.type" 
            :placeholder="$t('add_catalog_activity.activity_type')"
            type="text" 
            class="form-control w-full"/>
        </div>
        <div class="text-right mt-5">
          <button type="button" class="btn btn-outline-secondary w-24 mr-1">{{ $t('add_catalog_activity.btn_cancel') }}</button>
          <button type="submit" class="btn btn-primary w-24">{{ $t('add_catalog_activity.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>