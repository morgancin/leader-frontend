<script>
    export default {
        name: "PipelinesForm",
    }
</script>

<script setup>
    import { ref, reactive } from 'vue';
    import draggable from 'vuedraggable';
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    defineProps({
      pipeline: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);

    const cartStages = ref([]);

    const idref = ref(1); //initialize

    const addStage = () => {
      cartStages.value.push({
                          name: "",
                          percentage: 0,
                          id: idref.value
                      });   
      idref.value=idref.value+1;
    }
    const removeStage = (id) => { 
      cartStages.value = cartStages.value.filter((obj) => obj.id !== id);
    }

</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      
      <div class="p-5 intro-y box">
    
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">

          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_pipelines.pipeline') }}
          </div>

          <div class="mt-5">        
              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('add_pipelines.pipeline_name') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('add_pipelines.pipeline_name') }}
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <input
                        type="text"
                        class="w-full form-control"
                        v-model="pipeline.name" />
                  </div>
              </div>

              <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('add_pipelines.pipeline_is_default') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('add_pipelines.pipeline_is_default') }}
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <v-select
                        class="form-control"
                        :options="['Yes', 'No']">
                        </v-select>   
                  </div>
              </div>                
          </div>

        </div>

        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-5">

          <div class="flex items-center pb-5 text-base border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
              <div class="flex items-center mr-auto text-base font-medium"><ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_pipelines.pipeline_stages') }}</div>
              <a class="mr-2 text-xs shadow-md btn btn-primary" @click="addStage"> {{$t('add_pipelines.btn_add_new_stage')}} <PlusIcon class="w-4 h-4" /></a> 
          </div>

          <div class="mt-5"> 

              <a v-if="Object.keys(cartStages).length === 0" class="block w-full text-xs text-center text-slate-500 mt-3">{{$t('forms.noitems')}}</a>          
              
              <table class="table border" v-if="Object.keys(cartStages).length > 0" >
                <thead>
                  <tr>
                    <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">{{$t('add_pipelines.pipeline_stage_sort')}}</th>
                    <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">{{$t('add_pipelines.pipeline_stage_name')}}</th>
                    <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2">{{$t('add_pipelines.pipeline_stage_percent')}}</th>
                    <th scope="col" class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2"></th>
                  </tr>
                </thead>                                
                <draggable 
                  v-model="cartStages" 
                  tag="tbody" 
                  item-key="id"
                  >
                  <template #item="{ element }"> 
                    <tr>
                      <td scope="row">
                        <button class="mt-2 sm:mt-0">
                          <AlignJustifyIcon class="w-4 h-4 text-slate-500"/>
                        </button>
                      </td>
                      <td><input type="text" class="form-control mt-2 sm:mt-0" :placeholder="$t('add_pipelines.pipeline_stage_name')"></td>
                      <td>
                        <div class="input-group">                    
                          <input type="number" class="form-control" :placeholder="$t('add_pipelines.pipeline_stage_percent')">
                          <div class="input-group-text">%</div>
                        </div>
                      </td>
                      <td>
                        <button class="mt-2 sm:mt-0">
                          <TrashIcon class="w-4 h-4 mr-2 text-slate-500 cursor-pointer" @click="removeStage(element.id)"/>
                        </button>
                      </td>
                    </tr>
                  </template>
                </draggable>
              </table>

              

          </div>

        </div>



      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('forms.cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('forms.save') }}</button>
      </div>
    </form>
  </div>
</template>
<style>
table.table tbody tr {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}
table.table tbody tr:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}
</style>