<script>
    export default {
        name: "ClientOriginMediumForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useGetDataOrigins } from '../../../composables/getData/useGetDataOrigins';

    defineProps({
      mean: {
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
    
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">

          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_origin_medium.origin_medium') }}
          </div>

          <div class="mt-5">
              
              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                <div class="form-label xl:w-72 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('add_origin_medium.origin_medium_origin') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Requerido
                      </div>
                    </div>
                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                      Origen
                    </div>
                  </div>
                </div>
                <div class="flex-1 w-full mt-3 xl:mt-0">
                  <v-select
                    class="form-control"
                    label="description"
                    :options="dataOrigins"                            
                    :reduce="description => description.id"
                    v-model="mean.prospecting_source_id">
                  </v-select>
                </div>
              </div>
              
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                <div class="form-label xl:w-72 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('add_origin_medium.origin_medium_name') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Requerido
                      </div>
                    </div>
                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                      Nombre de medio
                    </div>
                  </div>
                </div>
                <div class="flex-1 w-full mt-3 xl:mt-0"> 
                  <input
                      type="text"
                      class="w-full form-control"
                      v-model="mean.description" />
                </div>
              </div>
              
          </div>
        </div>
      </div>  

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('add_tags.btn_cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('add_tags.btn_save') }}</button>
      </div>  

    </form>
    <!-- END: Form Layout -->
  </div>
</template>