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
  <div class="intro-y col-span-12 lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="intro-y box p-5">
    
        <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">

          <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_origin_medium.origin_medium') }}
          </div>

          <div class="mt-5"> 

            <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                <div class="form-label xl:w-72 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('add_origin_medium.origin_medium_origin') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Requerido
                      </div>
                    </div>
                    <div class="leading-relaxed text-slate-500 text-xs mt-3">
                      Origen
                    </div>
                  </div>
                </div>
                <div class="w-full mt-3 xl:mt-0 flex-1"> 
                  <v-select
                      label="description"
                      class="form-control" 
                      :options="dataOrigins" 
                      :reduce="description => description.id"
                      v-model="medium.parent_id_client_medium">
                  </v-select>
                </div>
              </div>

        
            <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                <div class="form-label xl:w-72 xl:!mr-10">
                  <div class="text-left">
                    <div class="flex items-center">
                      <div class="font-medium">{{ $t('add_origin_medium.origin_medium_name') }}</div>
                      <div
                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Requerido
                      </div>
                    </div>
                    <div class="leading-relaxed text-slate-500 text-xs mt-3">
                      Nombre de medio
                    </div>
                  </div>
                </div>
                <div class="w-full mt-3 xl:mt-0 flex-1"> 
                  <input
                      type="text"
                      class="w-full form-control"
                      v-model="medium.description" />
                </div>
              </div>


          </div>
        </div>
      </div>  

      <div class="flex justify-end flex-col md:flex-row gap-2 mt-5">
        <button type="button" class="py-3 w-full md:w-52 mr-1 btn btn-outline-secondary">{{ $t('add_tags.btn_cancel') }}</button>
        <button type="submit" class="btn py-3 btn-primary w-full md:w-52">{{ $t('add_tags.btn_save') }}</button>
      </div>  

    </form>
    <!-- END: Form Layout -->
  </div>
</template>