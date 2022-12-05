<script>
    export default {
        name: "ActivityForm",
    }
</script>

<script setup>
import { onMounted, ref, watch } from 'vue';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
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
        activity_subject_id: { required },
    }
const validate = useVuelidate(rules, props.activity);
const submitForm = async () => {
    validate.value.$touch();
    if (validate.value.$invalid) {
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
    const result = await validate.value.$validate();

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

const submitStep = async () => {
        step.value = (step.value == 3) ? -1 : 2;
    }
</script>

<template>
    <form @submit.prevent="submitForm()" autocomplete="on">
        <div class="grid grid-cols-12 gap-4 mt-5 gap-y-5">
            <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4"> -->
            <!-- <div class="col-span-12 intro-y sm:col-span-6">
                <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
                <v-select
                    id="cmbActivityType"
                    class="form-control"
                    :options="dataActivitiesTypes"
                    :reduce="name => name.id"
                    label="name"
                    :placeholder="$t('add_prospect_activity.activity')"
                    v-model="activity.activity_type_id">
                </v-select>
            </div> -->

            <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
                <v-select  
                    id="cmbActivityType"
                    class="form-control"
                    :options="dataActivitiesTypes"
                    :reduce="name => name.id"
                    label="name"
                    
                    v-model="validate.activity_type_id.$model"
                    :class="{ 'border-danger': validate.activity_type_id.$error }"
                    >
                    <!-- v-model="activity.activity_type_id"
                    
                    v-model.trim="validate.activity_type_id.$model" -->
                </v-select >
                <template v-if="validate.activity_type_id.$error">
                    <div
                        v-for="(error, index) in validate.activity_type_id.$errors"
                        :key="index"
                        class="mt-2 text-danger">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            
            <!-- <div class="col-span-12 intro-y sm:col-span-6">
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
            </div> -->

            <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                <label for="cmbActivitySubject" class="form-label">*{{ $t('add_prospect_activity.subject') }}</label>
                <v-select  
                    id="cmbActivitySubject"
                    class="form-control"
                    :options="dataActivitiesSubjects"
                    :reduce="name => name.id"
                    label="name"
                    
                    v-model="validate.activity_subject_id.$model"
                    :class="{ 'border-danger': validate.activity_subject_id.$error }"
                    >
                    <!-- v-model="validate.activity_subject_id.$model"
                    
                    v-model.trim="validate.activity_subject_id.$model" -->
                </v-select >
                <template v-if="validate.activity_subject_id.$error">
                    <div
                        v-for="(error, index) in validate.activity_subject_id.$errors"
                        :key="index"
                        class="mt-2 text-danger">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            
            <div class="col-span-12 intro-y sm:col-span-6">
                <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_date_activity') }}</label>
                <Datepicker 
                    v-model="activity.start_date" 
                    :placeholder="$t('add_prospect_activity.start_date_activity')"
                    utc 
                    modelType="yyyy.MM.dd" 
                    closeOnScroll  
                    :enableTimePicker="false" />
            </div>
            <div class="col-span-12 intro-y sm:col-span-6">
                <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_time') }}</label>
                <Datepicker 
                    v-model="activity.start_time" 
                    :placeholder="$t('add_prospect_activity.start_time')"
                    timePicker />
            </div>
            <!-- <div class="col-span-12 intro-y sm:col-span-6">
                <label for="crud-form-2" class="form-label">End Date Activity</label>
                <Datepicker v-model="activity.end_date" utc modelType="yyyy.MM.dd" closeOnScroll placeholder="Select End Date Activity" :enableTimePicker="false" />
            </div>
            <div class="col-span-12 intro-y sm:col-span-6">
                <label for="crud-form-2" class="form-label">End Time</label>
                <Datepicker v-model="activity.end_time" timePicker placeholder="Select End Time Activity" />
            </div> -->
            <div class="col-span-12 intro-y ">
                <label>{{ $t('add_prospect_activity.comments') }}</label>
                <div class="mt-2">
                    <ClassicEditor 
                        v-model="activity.comments" 
                        :placeholder="$t('add_prospect_activity.comments')"
                        :config="editorConfig"/>
                </div>
            </div>
            <!-- <div class="col-span-12 intro-y sm:col-span-6">
                <label for="crud-form-2" class="form-label">Start Date Activity</label>
                  <Datepicker v-model="start_date" :flow="flow" utc modelType="yyyy.MM.dd" placeholder="Select Date"  />
             </div> 
             <div class="col-span-12 intro-y sm:col-span-6">
                <label for="crud-form-2" class="form-label">End Date Activity</label>
                  <Datepicker v-model="end_date" :flow="flows" utc />
             </div>-->

            <!-- <div class="col-span-12 intro-y sm:col-span-6">
                <label>Start Date</label>
                 <Datepicker v-model="date" class="mt-2"  />
            </div>
            
            <div class="col-span-12 intro-y sm:col-span-6">
                <label>End Date</label>
                 <Datepicker v-model="time" timePicker />
            </div> -->
            
            <!-- <div class="relative col-span-12 intro-y sm:col-span-6 ">
                
                <div class="absolute flex items-center justify-center w-10 border rounded-l h-1/2 bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
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
                            }" class="pl-12 form-control" />
            </div> -->

            <!--    <div class="col-span-12 intro-y sm:col-span-6">
                <label for="txtType" class="form-label">Type</label>
                <input
                    type="text"
                    id="txtType"
                    class="form-control"
                    placeholder="Lastname"
                    v-model="activitie.type"
                />
            </div>
                <div class="col-span-12 intro-y sm:col-span-6">
                    <label for="txtEmail" class="form-label">Email</label>
                    <input
                        type="text"
                        id="txtEmail"
                        class="form-control"
                        placeholder="Important Meeting"
                        v-model="prospect.email"
                    />
                </div>
                <div class="col-span-12 intro-y sm:col-span-6">
                    <label for="txtOfficePhone" class="form-label">Office Phone</label>
                    <input
                        type="text"
                        id="txtOfficePhone"
                        class="form-control"
                        placeholder="Job, Work, Documentation"
                        v-model="prospect.officephone"
                    />
                </div>
                <div class="col-span-12 intro-y sm:col-span-6">
                    <label for="input-wizard-5" class="form-label">Doesn't Have</label>
                    <input
                        id="input-wizard-5"
                        type="text"
                        class="form-control"
                        placeholder="Job, Work, Documentation"
                    />
                </div>
                <div class="col-span-12 intro-y sm:col-span-6">
                    <label for="input-wizard-6" class="form-label">Size</label>
                    <select id="input-wizard-6" class="form-select">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div>
                -->
            <div class="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end">
                <button class="w-24 btn btn-secondary"
                @click="submitStep">Previous</button>
                <button class="w-24 ml-2 btn btn-primary">{{ $t('add_prospect_activity.btn_save') }}</button>
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