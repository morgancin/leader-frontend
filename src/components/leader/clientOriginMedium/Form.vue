<script>
    export default {
        name: "ClientOriginMediumForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useGetDataOrigins } from '../../../composables/getDatas/useGetDataOrigins';

    defineProps({
      medium: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);

    const { fetchClientOrigin, results, error } = useGetDataOrigins();

    const dataOrigins = ref([]);
    
    onMounted(async() => {
        await fetchClientOrigin();
        dataOrigins.value = results.value;
    });
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_origin_medium.origin_medium_origin') }}</label>
          <v-select
              label="description"
              class="form-control" 
              :options="dataOrigins" 
              :reduce="description => description.id"
              v-model="medium.parent_id_client_medium">
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
          <label class="form-label">*{{ $t('add_origin_medium.origin_medium_name') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_origin_medium.origin_medium_name')"
              v-model="medium.description" />
        </div>

        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_origin_medium.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_origin_medium.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>