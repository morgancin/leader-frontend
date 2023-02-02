<script>
    export default {
        name: "ActivitySubjectForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    
    import { useGetDataActivityTypes } from '../../../composables/getDatas/useGetDataActivityTypes';
    
    defineProps({
      subject: {
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
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_catalog_subject.subject_type') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataActivityTypes" 
            :reduce="name => name.id"
            v-model="subject.activity_type_id">
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
          <label class="form-label">*{{ $t('add_catalog_subject.subject_name') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_catalog_subject.subject_name')"
              v-model="subject.name" />
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">Cancel</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_catalog_subject.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>