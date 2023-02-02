<script>
    export default {
        name: "ActivitieForm",
    }
</script>

<script setup>
import { onMounted, ref, watch, toRefs } from 'vue';

import vSelect from 'vue-select';
import Datepicker from '@vuepic/vue-datepicker';

import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css';

// import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core';
import Toastify from "toastify-js";
import dom from "@left4code/tw-starter/dist/js/dom";

import { useActivitiesStore } from "../../../stores/leader/activities";

const { fetchActivitiesTypes, fetchActivitiesSubjects } = useActivitiesStore(); //ACTIONS

const editorConfig = {
  toolbar: {
    items: [],
  },
};

const props = defineProps({
    activity: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["submit"]);


////////ACTIVITIES TYPES & ACTIVITIES SUBJECTS
const dataActivitiesTypes = ref([]);
const dataActivitiesSubjects = ref([]);

onMounted(async() => {
    dataActivitiesTypes.value = await fetchActivitiesTypes();
});

watch(
    () => props.activity.activity_type_id,
    async () => {
        dataActivitiesSubjects.value = await fetchActivitiesSubjects();
    }
);
////////////////

////////RULES
const rules = {
        activity_type_id: { required },
        // activity_subject_id: { required },
    }

const v$ = useVuelidate(rules, toRefs(props.activity));
const submitForm = async () => {

    v$.value.$touch();
    if (v$.value.$invalid) {
        Toastify({
          node: dom("#failed-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      } else {
        Toastify({
          node: dom("#success-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }

    const result = await v$.value.$validate();
    
    if(result){
        emit('submit')
    }
}    
////////////////

// const categories = ref([1, 3]);
//const categories = ref([]);

//const editorData = ref("<p>Comments</p>");

// const date = ref();
// const startDate = new Date();
// const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
// date.value = new Date();

// Date start - end
// const start_date = ref();
// const flow = ref([ 'calendar' ]);

// const end_date = ref();
// const flows = ref([ 'month', 'year' ]);

// Date
/*
const start_date = ref(new Date());
const end_date = ref(new Date());

const start_time = ref({ 
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        });
const end_time = ref({ 
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        });
*/
</script>

<template>
       
    <form @submit.prevent="submitForm" autocomplete="on">
        <div class="grid grid-cols-12 gap-4 gap-y-5 mt-5">
            <!-- <div class="intro-y col-span-12 sm:col-span-6 md:col-span-4"> -->
            <!-- <div class="intro-y col-span-12 sm:col-span-6">
                <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
                <v-select
                    id="cmbActivityType"
                    class="form-control"
                    :options="dataActivitiesTypes"
                    :reduce="name => name.id_activity_type"
                    label="name"
                    :placeholder="$t('add_prospect_activity.activity')"
                    v-model="activity.activity_type_id">
                </v-select>
            </div> -->

            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-6">
                <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
                <v-select  
                    id="cmbActivityType"
                    class="form-control"
                    :options="dataActivitiesTypes"
                    :reduce="name => name.id_activity_type"
                    label="name"
                    
                    v-model="activity.activity_type_id"
                    
                    v-model.trim="v$.activity_type_id.$model"
                    :class="{ 'border-danger': v$.activity_type_id.$error }"
                    >
                </v-select >
                <template v-if="v$.activity_type_id.$error">
                    <div
                        v-for="(error, index) in v$.activity_type_id.$errors"
                        :key="index"
                        class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>


            <div class="intro-y col-span-12 sm:col-span-6">
                <label for="cmbActivitySubject" class="form-label">*{{ $t('add_prospect_activity.subject') }}</label>
                <v-select
                    id="cmbActivitySubject"
                    class="form-control"
                    :options="dataActivitiesSubjects"
                    :reduce="name => name.id"
                    label="name"
                    :placeholder="$t('add_prospect_activity.subject')"
                    v-model="activity.activity_subject_id">
                </v-select>
            </div>

            <!-- <div class="intro-y col-span-12 sm:col-span-6 md:col-span-6">
                <label for="cmbActivitySubject" class="form-label">*{{ $t('add_prospect_activity.subject') }}</label>
                <v-select  
                    id="cmbActivitySubject"
                    class="form-control"
                    :options="dataActivitiesSubjects"
                    :reduce="name => name.id_activity_subject"
                    label="name"

                    v-model="activity.activity_subject_id"
                    
                    
                    v-model.trim="v$.activity_subject_id.$model"
                    :class="{ 'border-danger': v$.activity_subject_id.$error }"
                    >
                </v-select >
                <template v-if="v$.activity_subject_id.$error">
                    <div
                        v-for="(error, index) in v$.activity_subject_id.$errors"
                        :key="index"
                        class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div> -->




            <div class="intro-y col-span-12 sm:col-span-6">
                <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_date_activity') }}</label>
                <Datepicker 
                    v-model="activity.start_date" 
                    :placeholder="$t('add_prospect_activity.start_date_activity')"
                    utc 
                    modelType="yyyy.MM.dd" 
                    closeOnScroll  
                    :enableTimePicker="false" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6">
                <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_time') }}</label>
                <Datepicker 
                    v-model="activity.start_time" 
                    :placeholder="$t('add_prospect_activity.start_time')"
                    timePicker />
            </div>
            <!-- <div class="intro-y col-span-12 sm:col-span-6">
                <label for="crud-form-2" class="form-label">End Date Activity</label>
                <Datepicker v-model="activity.end_date" utc modelType="yyyy.MM.dd" closeOnScroll placeholder="Select End Date Activity" :enableTimePicker="false" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6">
                <label for="crud-form-2" class="form-label">End Time</label>
                <Datepicker v-model="activity.end_time" timePicker placeholder="Select End Time Activity" />
            </div> -->
            <div class="intro-y col-span-12 ">
                <label>{{ $t('add_prospect_activity.comments') }}</label>
                <div class="mt-2">
                    <ClassicEditor 
                        v-model="activity.comments" 
                        :placeholder="$t('add_prospect_activity.comments')"
                        :config="editorConfig"/>
                </div>
            </div>
            <!-- <div class="intro-y col-span-12 sm:col-span-6">
                <label for="crud-form-2" class="form-label">Start Date Activity</label>
                  <Datepicker v-model="start_date" :flow="flow" utc modelType="yyyy.MM.dd" placeholder="Select Date"  />
             </div> 
             <div class="intro-y col-span-12 sm:col-span-6">
                <label for="crud-form-2" class="form-label">End Date Activity</label>
                  <Datepicker v-model="end_date" :flow="flows" utc />
             </div>-->

            <!-- <div class="intro-y col-span-12 sm:col-span-6">
                <label>Start Date</label>
                 <Datepicker v-model="date" class="mt-2"  />
            </div>
            
            <div class="intro-y col-span-12 sm:col-span-6">
                <label>End Date</label>
                 <Datepicker v-model="time" timePicker />
            </div> -->
            
            <!-- <div class="intro-y col-span-12 sm:col-span-6 relative ">
                
                <div class="absolute rounded-l w-10 h-1/2 flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                    <CalendarIcon class="w-4 h-4" />
                </div>
                <Litepicker v-model="date" :options="{
                                autoApply: false,
                                showWeekNumbers: true,
                                dropdowns: {
                                minYear: 1990,
                                maxYear: null,
                                months: true,
                                years: true,
                                },
                            }" class="form-control pl-12" />
            </div> -->

            <!--    <div class="intro-y col-span-12 sm:col-span-6">
                <label for="txtType" class="form-label">Type</label>
                <input
                    type="text"
                    id="txtType"
                    class="form-control"
                    placeholder="Lastname"
                    v-model="activitie.type"
                />
            </div>
                <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="txtEmail" class="form-label">Email</label>
                    <input
                        type="text"
                        id="txtEmail"
                        class="form-control"
                        placeholder="Important Meeting"
                        v-model="prospect.email"
                    />
                </div>
                <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="txtOfficePhone" class="form-label">Office Phone</label>
                    <input
                        type="text"
                        id="txtOfficePhone"
                        class="form-control"
                        placeholder="Job, Work, Documentation"
                        v-model="prospect.officephone"
                    />
                </div>
                <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-5" class="form-label">Doesn't Have</label>
                    <input
                        id="input-wizard-5"
                        type="text"
                        class="form-control"
                        placeholder="Job, Work, Documentation"
                    />
                </div>
                <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-6" class="form-label">Size</label>
                    <select id="input-wizard-6" class="form-select">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div>
                -->
            <div class="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                <button class="btn btn-secondary w-24">Previous</button>
                <button type="submit" class="btn btn-primary w-24 ml-2">{{ $t('add_prospect_activity.btn_save') }}</button>
            </div>
        </div>
    </form>
    <!-- BEGIN: Success Notification Content -->
    <div
              id="success-notification-content"
              class="toastify-content hidden flex">
              <CheckCircleIcon class="text-success" />
              <div class="ml-4 mr-4">
                <div class="font-medium">{{ $t('add_user.registration_success') }}</div>
                <div class="text-slate-500 mt-1">
                  {{ $t('add_user.check_success') }}
                </div>
              </div>
            </div>
            <!-- END: Success Notification Content -->
            <!-- BEGIN: Failed Notification Content -->
            <div
              id="failed-notification-content"
              class="toastify-content hidden flex">
              <XCircleIcon class="text-danger" />
              <div class="ml-4 mr-4">
                <div class="font-medium">{{ $t('add_user.registration_failed') }}</div>
                <div class="text-slate-500 mt-1">
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
} */
/* .dp__input {
    padding: 8px 40px;
    font-family: Roboto;
    font-size: 0.875rem;
} */
</style>