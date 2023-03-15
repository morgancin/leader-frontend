 <script>
    export default {
        name: "ActivityForm",
    }
</script>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { storeToRefs } from "pinia";

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    import useVuelidate from '@vuelidate/core';
    import { required, minLength, maxLength } from '@vuelidate/validators';
    import Toastify from "toastify-js";
    import dom from "@left4code/tw-starter/dist/js/dom";

    import { useActivitiesStore } from "../../../stores/leader/activities";

    const { activities } = storeToRefs(useActivitiesStore());
    const { fetchActivities, fetchActivitiesTypes, fetchActivitiesSubjects } = useActivitiesStore();

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

    const convert_format_date = (date, format) => {
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        if(format == 'en')
            return `${year}-${month}-${day}`;
        
        else if(format == 'es')
            return `${day}/${month}/${year}`;
    }

    ////////ACTIVITIES TYPES & ACTIVITIES SUBJECTS
    const dataActivitiesTypes = ref([]);
    const dataActivitiesSubjects = ref([]);
    const user_login = JSON.parse(sessionStorage.getItem("session_storage_user"));

    onMounted(async() => {
        dataActivitiesTypes.value = await fetchActivitiesTypes();
        await fetchActivities(user_login.id, convert_format_date(props.activity.start_date, 'en'));
    });

    watch(
        () => props.activity.activity_type_id,
        async () => {
            dataActivitiesSubjects.value = await fetchActivitiesSubjects(props.activity.activity_type_id);
        }
    );
    watch(
        () => props.activity.start_date,
        async () => {
            await fetchActivities(user_login.id, convert_format_date(props.activity.start_date, 'en'));
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

    const submitStep = async () => {
        step.value = (step.value == 3) ? -1 : 2;
    }

    const format_start_date = ref(props.activity.start_date);
    format_start_date.value = (format_start_date) => {
        const day = format_start_date.getDate();
        const year = format_start_date.getFullYear();
        const month = format_start_date.getMonth() + 1;
    
        return `${day}/${month}/${year}`;
    }
</script>

<template>

    <!-- Inicio de arreglo LVT-->
    <div class="grid grid-cols-12 gap-4 gap-y-3 pb0">

        <div class="grid grid-cols-12 col-span-8 gap-4 speciallabels">
            
            <form @submit.prevent="submitForm()" autocomplete="on" class="col-span-12">
                <div class="grid grid-cols-12 gap-12 gap-y-5">

                    <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                        <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                          <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.basic-info')}}
                        </div>
                        <div class="mt-5">


                             <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-52 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('add_prospect_activity.activity') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('add_prospect_activity.activity') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full mt-3 xl:mt-0">  
                                    <v-select  
                                        id="cmbActivityType"
                                        class="form-control"
                                        :options="dataActivitiesTypes"
                                        :reduce="name => name.id"
                                        label="name"
                                        v-model="validate.activity_type_id.$model"
                                        :class="{ 'border-danger': validate.activity_type_id.$error }">
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
                            </div>

                            
                            
                            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-52 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('add_prospect_activity.subject') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('add_prospect_activity.subject') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full mt-3 xl:mt-0"> 
                                    <v-select
                                        label="name"
                                        id="cmbActivitySubject"
                                        class="form-control"
                                        :options="dataActivitiesSubjects"
                                        :reduce="name => name.id"
                                        v-model="validate.activity_subject_id.$model"
                                        :class="{ 'border-danger': validate.activity_subject_id.$error }">
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
                            </div>
                            
                            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-52 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('add_prospect_activity.start_date_activity') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('add_prospect_activity.start_date_activity') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full mt-3 xl:mt-0"> 
                                    <Datepicker
                                        :placeholder="$t('add_prospect_activity.start_date_activity')"
                                        closeOnScroll
                                        :format="format_start_date"
                                        :enableTimePicker="false"
                                        v-model="activity.start_date" />
                                </div>
                            </div>
                            
                            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-52 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('add_prospect_activity.start_time') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('add_prospect_activity.start_time') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full mt-3 xl:mt-0">
                                    <Datepicker 
                                        v-model="activity.start_time" 
                                        :placeholder="$t('add_prospect_activity.start_time')"
                                        timePicker />
                                </div>
                            </div>

                           <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-52 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('add_prospect_activity.comments') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('add_prospect_activity.comments') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full mt-3 xl:mt-0">
                                    <div class="mt-2">
                                        <ClassicEditor 
                                            v-model="activity.comments" 
                                            :placeholder="$t('add_prospect_activity.comments')"
                                            :config="editorConfig"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row w-full col-span-12">
                        <button class="btn btn-secondary md:w-52" @click="submitStep">Previous</button>
                        <button class="w-full py-3 btn btn-primary md:w-52">{{ $t('add_prospect_activity.btn_save') }}</button>
                    </div>

                </div>
            </form>
            
        </div>
    
        <div class="col-span-4 timeline">
            <!-- Inicio de la linea del tiempo Prospecto -->
            <div>
                <div class="grid justify-items-start">
                    <div class="text-center title">
                        <h3 class="text-gray-900 text-md dark:text-white">{{ $t('add_prospect_activity.activities_label') }}</h3>
                        <h4 class="text-gray-400 text-md dark:text-white">{{ $t('add_prospect_activity.activities_label_2') }} {{ convert_format_date(activity.start_date, 'es') }}</h4>
                      </div>
                    <p>&nbsp</p>
                    <p>&nbsp</p>

                    <ol class="relative border-l border-sky-800 dark:border-sky-800">
                        <li class="mb-10 ml-4"
                          v-for="(activity, id) in activities" 
                          :key="id">
                            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <h3 class="font-semibold text-gray-900 text-md dark:text-white">{{ activity.prospect.full_name }}</h3>
                            <p class="mb-4 font-normal text-gray-500 text-md dark:text-gray-400">{{ activity.start_time }} {{ activity.activity_subject.activity_type.name }} - {{ activity.activity_subject.name }}</p>
                        </li>
                    </ol>
                </div>
            </div>
            <!-- Fin de la linea del tiempo Prospecto -->
        </div>
    
    </div>

    <!-- Inicio de arreglo LVT-->
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
    .vs__dropdown-toggle{border-color:rgb(var(--color-slate-200) / var(--tw-border-opacity));}
    .border-danger .vs__dropdown-toggle{border-color:rgb(var(--color-danger) / var(--tw-border-opacity))}
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