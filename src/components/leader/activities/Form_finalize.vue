<script>
    export default {
        name: "ActivityFinalizeForm",
    }
</script>

<script setup>
    import { onMounted, ref, watch } from 'vue';

    import useVuelidate from '@vuelidate/core';
    import { required, minLength, maxLength } from '@vuelidate/validators';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useGetDataActivityResults } from '../../../composables/getData/useGetDataActivityResults';
    const { fetchActivitiesResults, results, error } = useGetDataActivityResults();

    const editorConfig = {
      toolbar: {
        items: [],
      },
    };

    const props = defineProps({
        activity_reschedule: {
            type: Object,
            required: true,
        },
        activity_information: {
            type: Object,
            required: true,
        }, 
    });

    const emit = defineEmits(["submit", "view_activity_form"]);

    const bButtonsShow = ref(true);
    const dataActivitiesResults = ref([]);
    
    onMounted(async() => {
        await fetchActivitiesResults();
        dataActivitiesResults.value = results.value;
    });

    watch(
        () => props.activity_reschedule.activity_result_id,
        async () => {
          let [result_activities_results] = dataActivitiesResults.value.filter((p) => p.id == props.activity_reschedule.activity_result_id);

          if(typeof result_activities_results !== 'undefined') {

              if(result_activities_results.tracking_type !== null)
                  bButtonsShow.value = false;
              else
                  bButtonsShow.value = true;

              emit('view_activity_form', result_activities_results.tracking_type);
              
          }else {
              emit('view_activity_form', null);
          }

        }
    );
    
    const submitForm = async () => {
      emit('submit')
    }
</script>

<template>
    <form @submit.prevent="submitForm()" autocomplete="on">
        <div class="grid grid-cols-12 gap-4 mt-5 gap-y-5">

            <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                <b>{{ $t('add_activity_finalize.label_prospect') }}:</b> {{ activity_information.client }}<br />
                <b>{{ $t('add_activity_finalize.label_type') }}:</b> {{ activity_information.type }}<br />
                <b>{{ $t('add_activity_finalize.label_subject') }}:</b> {{ activity_information.subject }}<br />
                <b>{{ $t('add_activity_finalize.label_date') }}:</b>{{ activity_information.activity_date }}
            </div>
            
            <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                <label for="cmbActivitiesResults" class="form-label">*{{ $t('add_activity_finalize.activity_finalize_activity_result') }}</label>
                <v-select
                    label="name"
                    id="cmbActivitiesResults"
                    class="form-control"
                    :options="dataActivitiesResults"
                    :reduce="name => name.id"
                    v-model="activity_reschedule.activity_result_id">
                </v-select>
                <!--
                <v-select  
                    id="cmbActivityResult"
                    class="form-control"
                    :options="dataActivitiesResults"
                    :reduce="name => name.id"
                    label="name"
                    v-model="validate.activity_type_id.$model"
                    :class="{ 'border-danger': validate.activity_type_id.$error }">
                </v-select>
                -->
            </div>
            
            <div class="col-span-12 intro-y ">
                <label>{{ $t('add_activity_finalize.observations') }}</label>
                <div class="mt-2">
                    <ClassicEditor
                        :config="editorConfig" 
                        :placeholder="$t('add_activity_finalize.observations')"
                        v-model="activity_reschedule.observations" />
                </div>
            </div>
            
            <div class="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end" v-if="bButtonsShow">
                <button class="w-24 btn btn-secondary" @click="submitStep">Previous</button>
                <button class="w-24 ml-2 btn btn-primary">{{ $t('add_activity_finalize.btn_save') }}</button>
            </div>
        </div>
    </form>
    
     <!-- BEGIN: Success Notification Content -->
     <div
              id="success-notification-content"
              class="flex hidden toastify-content">
              <CheckCircleIcon class="text-success" />
              <div class="ml-4 mr-4">
                <div class="font-medium">{{ $t('add_user.registration_success') }}</div>
                <div class="mt-1 text-slate-500">
                  {{ $t('add_user.check_success') }}
                </div>
              </div>
            </div>
            <!-- END: Success Notification Content -->
            <!-- BEGIN: Failed Notification Content -->
            <div
              id="failed-notification-content"
              class="flex hidden toastify-content">
              <XCircleIcon class="text-danger" />
              <div class="ml-4 mr-4">
                <div class="font-medium">{{ $t('add_user.registration_failed') }}</div>
                <div class="mt-1 text-slate-500">
                  {{ $t('add_user.check_failed') }}
                </div>
              </div>
            </div>
            <!-- END: Failed Notification Content -->
</template>

<style>
/* .dp__theme_light {
   --dp-background-color: #1b253b;
   --dp-text-color: #b6c0ce;
   --dp-hover-color: #1e40af;
   --dp-hover-text-color: #b6c0ce;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: #1e40af;
   --dp-primary-text-color: #b6c0ce;
   --dp-secondary-color: #b6c0ce;
   --dp-border-color: #959595;
   --dp-menu-border-color: #2d2d2d;
   --dp-border-color-hover: #1b253b;
   --dp-disabled-color: #737373;
   --dp-scroll-bar-background: #212121;
   --dp-scroll-bar-color: #484848;
   --dp-success-color: #1e40af;
   --dp-success-color-disabled: #428f59;
   --dp-icon-color: #b6c0ce;
   --dp-danger-color: #e53935;
   --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
.dp__input {
    padding: 8px 40px;
    font-family: Roboto;
    font-size: 0.875rem;
} */
</style>