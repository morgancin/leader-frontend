<script>
    export default {
        name: "TagsForm",
    }
</script>

<script setup>
    defineProps({
      tag: {
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
          <label class="form-label">Tag</label>
          <input 
          v-model="tag.name" 
          placeholder="tag"
          type="text" 
          class="form-control w-full"/>
        </div>
        <!-- <div class="mt-3">
          <label class="form-label">Type</label>
          <input 
          v-model="tag.type" 
          placeholder="tag type"
          type="text" 
          class="form-control w-full"/>
        </div> -->
        <div class="text-right mt-5">
          <button type="button" class="btn btn-outline-secondary w-24 mr-1">Cancel</button>
          <button type="submit" class="btn btn-primary w-24">save</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>