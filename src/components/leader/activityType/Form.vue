<script>
    export default {
        name: "ActivityTypeForm",
    }
</script>

<script setup>
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    defineProps({
        activity_type: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);

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
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="mt-3">
          <label class="form-label">*{{ $t('add_catalog_activity.activity_type') }}</label>
          <v-select
            label="value"
            class="form-control" 
            :options="aTypes" 
            :reduce="value => value.key"
            v-model="activity_type.type">
          </v-select>
          <!--
            :class="{ 'border-danger': validate.service_priority.$error }"
          <template v-if="validate.client_origin.$error">
            <div
              v-for="(error, index) in validate.client_origin.$errors"
              :key="index"
              class="mt-2 text-danger">
              {{ error.$message }}
            </div>
          </template>
          -->
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_catalog_activity.activity_name') }}</label>
          <input
            type="text"
            :placeholder="$t('add_catalog_activity.activity_name')" 
            class="w-full form-control"
            v-model="activity_type.name" />
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_catalog_activity.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_catalog_activity.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>