<script>
    export default {
        name: "ActivityTypeForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useGetDataActivityTypes } from '../../../composables/getDatas/useGetDataActivityTypes';

    defineProps({
        activity_result: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);

    const { fetchActivityTypes, results, error } = useGetDataActivityTypes();

    const dataActivityTypes = ref([]);

    onMounted(async() => {
        await fetchActivityTypes();
        dataActivityTypes.value = results.value;
    });

    const aTrackingTypes = [
        { key:'activity', value: 'ACTIVITY' },
        { key:'quote', value: 'QUOTE' },
    ];
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="mt-3">
          <label class="form-label">*{{ $t('add_catalog_activity_result.activity_result_type') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataActivityTypes" 
            :reduce="name => name.id"
            v-model="activity_result.activity_type_id">
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
          <label class="form-label">*{{ $t('add_catalog_activity_result.activity_result_tracking_type') }}</label>
          <v-select
            label="value"
            class="form-control" 
            :options="aTrackingTypes" 
            :reduce="value => value.key"
            v-model="activity_result.tracking_type">
          </v-select>
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_catalog_activity_result.activity_result_name') }}</label>
          <input
            type="text"
            :placeholder="$t('add_catalog_activity_result.activity_result_name')" 
            class="w-full form-control"
            v-model="activity_result.name" />
        </div>

        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_catalog_activity_result.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_catalog_activity_result.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>