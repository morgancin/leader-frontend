<script>
    export default {
        name: "TagsForm",
    }
</script>

<script setup>
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    
    defineProps({
      tag: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);
    
    const aTypes = [
        { key:'tag', value: 'TAG' },
        { key:'list', value: 'LIST' },
    ];
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">
        <div class="mt-3">
          <label class="form-label">*{{ $t('add_tags.tag_type') }}</label>
          <v-select
            label="value"
            class="form-control" 
            :options="aTypes" 
            :reduce="value => value.key"
            v-model="tag.type">
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
          <label class="form-label">*{{ $t('add_tags.tag_name') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_tags.tag_name')"
              v-model="tag.name" />
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_tags.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_tags.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>