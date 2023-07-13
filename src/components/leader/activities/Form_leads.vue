<script>
    export default {
        name: "ActivityLeadsForm",
    }
</script>

<script setup>
    import { onMounted, ref, watch, reactive } from 'vue';
    import { storeToRefs } from "pinia";  
    import { required, email, minLength, maxLength, numeric, integer } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';

    import Toastify from "toastify-js";
    import dom from "@left4code/tw-starter/dist/js/dom";

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    import ScheduleForm from "@/components/leader/activities/Form_schedule.vue";

    /////////////NEW
    import { useActivitiesStore } from "@/stores/leader/activities";
    import { useActivitiesResultStore } from "@/stores/leader/activities-results";

    const { createActivity } = useActivitiesStore();
    const { fetchActivitiesResults } = useActivitiesResultStore();
    
    const { activities_results: data_activities_results } = storeToRefs(useActivitiesResultStore());
    //const { activity: data_activity, activities } = storeToRefs(useActivitiesStore());
    /////////////////
    
    const props = defineProps({
        show_modal: {
            type: Boolean,
            required: true
        },
        id_activity: {
            type: Number,
            required: true
        }
    });
    
    const show_schedule_form = ref(false);
    const show_modal_here = ref(props.show_modal);

    const form_data = reactive({
        activity_result_id: '',
        activity_observations: '',
        last_activity_id: props.id_activity,
        
        ////Activity
        comments: '',
        activity_type_id: null,
        activity_subject_id: null,
        start_date: new Date(),
        start_time: { 
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        }
    });
                    
    const convert_format_date = (date, format) => {
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        if(format == 'en')
            return `${year}-${month}-${day}`;
        else if(format == 'es')
            return `${day}/${month}/${year}`;
    }

    const emit = defineEmits(["hideModal"]);

    ////////RULES
    const rules = {
        last_activity_id: { required },
        activity_result_id: { required },
        activity_observations: { required },

        ////Activity
        start_date: { required },
        activity_subject_id: { required }
        //activity_type_id: { required },
    }
    
    const validate = useVuelidate(rules, form_data);

    const hideModal = () => {
        emit('hideModal');
    }

    const editorConfig = {
        toolbar: {
            items: [],
        }
    };

    const submitForm = async () => {
        ///DEBE VALIDA
        //Determinar los campos a considerar insertar y validarlos
        /////////////////////
        
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
        }else{
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
        
        if(result) {
            await createActivity(form_data);
            show_modal_here.value = false;
        }
    }
    
    onMounted(async() => {
        await fetchActivitiesResults();
    });

    watch(
        () => form_data.activity_result_id,
        () => {
                const activity_results = data_activities_results.value.find((obj) => obj.id === form_data.activity_result_id);
                
                if(activity_results.activity_type.name != 'Whatsapp' & activity_results.activity_type.name != 'Email')
                    show_schedule_form.value = true;
                else
                    show_schedule_form.value = false;
            }
    );
</script>

<template>
    <!-- BEGIN: Modal Content quick action nuevo prospecto -->
    <Modal :show="show_modal_here" @hidden="hideModal" class="speciallabels" size="modal-xl">
        <ModalHeader>
            <h2 class="mr-auto text-base font-medium">{{$t('activities.title') }}</h2>
        </ModalHeader>
        
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="grid grid-cols-12 col-span-8 gap-4">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                    <label for="cmbActivitiesResults" class="flex flex-col w-full form-label sm:flex-row">*{{ $t('activities.form.labels.fields.activities_results') }}:</label>
                    <v-select
                        label="name"
                        class="form-control"
                        id="cmbActivitiesResults"
                        :reduce="name => name.id"
                        :options="data_activities_results"
                        v-model="form_data.activity_result_id">
                    </v-select>
                    <!--
                        v-model="activity_reschedule.activity_result_id"
                        :class="{ 'border-danger': validate.activity_result_id.$error }"
                            
                        <v-select
                            label="name"
                            class="form-control" 
                            :options="dataAccounts"
                            v-model="data_activity.account_id"
                            :reduce="name => name.id"
                            :class="{ 'border-danger': validate.account_id.$error }">
                        </v-select>
                        <template v-if="validate.account_id.$error">
                            <div
                            v-for="(error, index) in validate.account_id.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                        </template>
                        -->
                </div>
                
                <div class="col-span-12 sm:col-span-12 withlabel">
                    <label for="modal-form-1" class="form-label">{{ $t('activities.form.labels.fields.comments') }}</label>

                    <ClassicEditor
                        :config="editorConfig"
                        :placeholder="$t('activities.form.placeholders.comments')"
                        v-model="form_data.activity_observations" />
                </div>
                
                <ScheduleForm
                    v-if="show_schedule_form"
                    :form_data="form_data" />

                <!-- Aqui pal real -->
                <!--
                <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
                    <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
                    <v-select
                        label="name"
                        id="cmbActivityType"
                        class="form-control"
                        :options="dataActivitiesTypes"
                        :reduce="name => name.id"
                        v-model="activity_type_id">
                    </v-select >
                </div>
                
                <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
                    <label for="cmbActivitySubject" class="form-label">*{{ $t('add_prospect_activity.subject') }}</label>
                    <v-select
                        label="name"
                        class="form-control"
                        id="cmbActivitySubject"
                        :options="dataActivitiesSubjects"
                        :reduce="name => name.id"
                        v-model="data_activity.activity_subject_id"
                        :class="{ 'border-danger': validate.activity_subject_id.$error }">
                    </v-select>
                    <template v-if="validate.activity_subject_id.$error">
                        <div
                            v-for="(error, index) in validate.activity_subject_id.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                                {{ error.$message }}
                        </div>
                    </template>
                </div>
                
                <div class="col-span-12 intro-y sm:col-span-6 withlabel">
                    <label for="crud-form-2" class="form-label">*{{ $t('add_prospect_activity.start_date_activity') }}</label>
                    <Datepicker
                        closeOnScroll
                        :enableTimePicker="false"
                        :format="format_start_date"
                        :placeholder="$t('add_prospect_activity.start_date_activity')"
                        v-model="data_activity.start_date" />
                    <template v-if="validate.start_date.$error">
                        <div
                            v-for="(error, index) in validate.start_date.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
                
                <div class="col-span-12 intro-y sm:col-span-6 withlabel">
                    <label for="crud-form-2" class="form-label">*{{ $t('add_prospect_activity.start_time') }}</label>
                    <Datepicker
                        timePicker
                        :placeholder="$t('add_prospect_activity.start_time')"
                        v-model="data_activity.start_time" />
                </div>
                <div class="col-span-12 sm:col-span-12 withlabel">
                    <label for="modal-form-1" class="form-label">{{ $t('add_prospect_activity.comments') }}</label>
                    <ClassicEditor
                        :config="editorConfig"
                        :placeholder="$t('add_prospect_activity.comments')"
                        v-model="data_activity.comments" />
                </div>
                -->
                <!-- END -->
            </div>
                            
                <!-- Inicio de la linea del tiempo Prospecto -->
                <!--
                <div class="col-span-4 timeline">
                    <div>
                        <div class="grid justify-items-start">
                            <div class="text-center title">
                                <h3 class="text-gray-900 text-md dark:text-white">{{ $t('add_prospect_activity.activities_label') }}</h3>
                                <h4 class="text-gray-400 text-md dark:text-white">{{ $t('add_prospect_activity.activities_label_2') }} {{ convert_format_date(data_activity.start_date, 'es') }}</h4>
                            </div>
                            <p>&nbsp</p>
                            <p>&nbsp</p>
                            <ol class="relative border-l border-sky-800 dark:border-sky-800">
                                <li class="mb-10 ml-4"
                                    v-for="(activity, id) in activities"
                                    :key="id">
                                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                        <h3 class="font-semibold text-gray-900 text-md dark:text-white">{{ activity.prospect.full_name }}</h3>
                                        <p class="mb-4 font-normal text-gray-500 text-md dark:text-gray-400">{{ activity.activity_date }} {{ activity.activity_subject.activity_type.name }} - {{ activity.activity_subject.name }}</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                -->
                <!-- Fin de la linea del tiempo Prospecto -->
        </ModalBody>
        <!-- END: Modal Body -->
        
        <!-- BEGIN: Modal Footer -->
        <ModalFooter>
            <!-- BEGIN: Modal Content quick action nuevo prospecto -->
            <button type="button" @click="show_modal_here = false" class="w-20 mr-1 btn btn-outline-secondary">{{$t('forms.cancel')}}</button>
            <button type="submit" @click="submitForm" class="w-20 btn btn-primary">{{$t('forms.save')}}</button>
        </ModalFooter>
        <!-- END: Modal Footer -->
    <!--</div>-->
    <!--</form>-->
    <!--</div>-->
  </Modal>
  <!-- END: Modal Content -->
  
  <!-- BEGIN: Success Notification Content -->
  <!-- class="flex hidden toastify-content" -->
  <div
    id="success-notification-content"
    class="hidden toastify-content">
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
    class="hidden toastify-content">
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
    .vs__search{ border-color:transparent!important; padding:0 7px!important}
    .vs__search:focus{outline:none!important; box-shadow:none!important}
    .ck-editor__editable {min-height: 100px!important}
    .speciallabels label{ position:absolute; background:#fff; margin-bottom:0px; left:7px; padding:5px; top:-2px;
    line-height:1; z-index:1; width:auto; font-size:11px; color:#999}
    .speciallabels .withlabel{ position:relative; padding-top:10px}
    .speciallabels .form-control,.dp__input{ font-size:12px}
    .speciallabels .vs__selected{ margin:0px; margin-top:4px; padding:0px; margin-left:5px}
    .speciallabels .ck-reset_all{ opacity:0}
    .speciallabels .ck-editor__editable{border-color:rgb(var(--color-slate-200) / var(--tw-border-opacity))!important; border-radius:0.375rem!important; box-shadow:none!important}
    .speciallabels .ck-editor__editable.ck-focused{ border-color:rgb(var(--color-primary) / var(--tw-border-opacity))!important;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-border-opacity: 0.4;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);    
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(var(--color-primary) / var(--tw-ring-opacity));
    --tw-ring-opacity: 0.2;box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)!important}
    .timeline{ background:rgb(var(--color-slate-100) / var(--tw-bg-opacity)); border-radius:6px; padding:20px; border:1px dashed rgba(0,0,0,0.1)}
    .title{width:100%; border-bottom:1px dashed rgba(0,0,0,0.1);padding-bottom:20px;margin-bottom:-10px}
    .withlabel.flex .vs__dropdown-toggle{ border-radius:0.25rem 0px 0px 0.25rem}
    .addmore{cursor:pointer}
    .addmore.active svg{ transform:rotate(45deg)}
</style>