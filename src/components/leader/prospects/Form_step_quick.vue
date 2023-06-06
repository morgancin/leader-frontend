<script>
    export default {
        name: "ProspectStepQuickForm",
    }
</script>
<script setup>  
  import { onMounted, ref, watch, reactive } from 'vue';
  import { storeToRefs } from "pinia";  
  import { required, email, minLength, maxLength, numeric } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';

  import Toastify from "toastify-js";
  import dom from "@left4code/tw-starter/dist/js/dom";

  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';

  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  import { useAccountsStore } from "@/stores/leader/accounts";
  import { useProspectsStore } from "@/stores/leader/prospects";
  import { useCompaniesStore } from "@/stores/leader/companies";
  import { useActivitiesStore } from "@/stores/leader/activities";
  import { useActivitiesTypeStore } from "@/stores/leader/activities-type";
  import { useActivitySubjectStore } from "@/stores/leader/activities-subjects";
  import { useGetDataProspectingSources } from '../../../composables/getData/useGetDataProspectingSources';
  //import { useProspectingSourcesStore } from "@/stores/leader/prospecting-sources";

  import CompanyForm from "@/components/leader/companies/Form.vue";

  const { fetchAccounts } = useAccountsStore();
  const { createProspect } = useProspectsStore();
  const { fetchActivities } = useActivitiesStore();
  const { fetchActivitiesTypes } = useActivitiesTypeStore();
  const { fetchActivitiesSubjects } = useActivitySubjectStore();
  const { createCompany, fetchCompanies } = useCompaniesStore();
  const { fetchProspectingSources, fetchProspectingMeans, fetchProspectingMean } = useGetDataProspectingSources();
  //const { fetchActivities, fetchActivitiesSubjects } = useActivitiesStore();
  
  //const { activity, activities } = storeToRefs(useActivitiesStore());
  const { prospect } = storeToRefs(useProspectsStore());
  const { activity, activities} = storeToRefs(useActivitiesStore());
  const { accounts: dataAccounts } = storeToRefs(useAccountsStore());
  const { company, companies: dataCompanies } = storeToRefs(useCompaniesStore());
  const { subjects: dataActivitySubjects} = storeToRefs(useActivitySubjectStore());
  const { activities_types: dataActivityTypes} = storeToRefs(useActivitiesTypeStore());
    
  const props = defineProps({
      show_modal: {
        type: Boolean,
        required: true,
      },
      login_user: {
        type: Object,
        required: true,
      },
  });
  
  const show_modal_here = ref(props.show_modal);

  const priorities = [
                        { key:'bajo', value: 'BAJO' },
                        { key:'medio', value: 'MEDIO' },
                        { key:'alto', value: 'ALTO' },
                        { key:'pendiente', value: 'PENDIENTE' }
                      ];

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

  const data_prospect_activity = reactive({...prospect.value, ...activity.value});

  ////////RULES
  const rules = {
    ////Prospect
    last_name: { required },
    first_name: { required },
    account_id: { required },
    email: { required, email },
    client_origin: { required },
    potential_value: { required },
    priority: { required },
    propecting_mean_id: { required },
    phone_mobile: {
                  required,
                  numeric,
                  minLength: minLength(10),
                  maxLength: maxLength(10) 
                },
    ////Activity
    start_date: { required },
    activity_type_id: { required },
    activity_subject_id: { required }
  }

  const validate = useVuelidate(rules, data_prospect_activity);
  
  const hideModal = () => {
    emit('hideModal');
  }
  
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
      await createProspect(data_prospect_activity);
      show_modal_here.value = false;
      //emit('submit');
    }
  } 

  ////////PROSPECTING SOURCES & MEANS
  const dataProspectingMeans = ref([]);
  const dataProspectingSources = ref([]);
  
  ////////ACTIVITIES TYPES & ACTIVITIES SUBJECTS
  //const dataActivityTypes = ref([]);
  //const dataActivitySubjects = ref([]);

  onMounted(async() => {
    await fetchAccounts();
    await fetchCompanies();
    await fetchActivitiesTypes();
    
    dataProspectingSources.value = await fetchProspectingSources();
        
    await fetchActivities(props.login_user.id, convert_format_date(data_prospect_activity.start_date, 'en'));
  });

  watch(
      () => data_prospect_activity.start_date,
      async () => {
        await fetchActivities(props.login_user.id, convert_format_date(data_prospect_activity.start_date, 'en'));
      }
  );
  watch(
      () => data_prospect_activity.client_origin,
      async () => {
          dataProspectingMeans.value = await fetchProspectingMeans(data_prospect_activity.client_origin);
      }
  );
  watch(
      () => data_prospect_activity.activity_type_id,
      async () => {
          console.log('Valess');
          //dataActivitySubjects.value = await fetchActivitiesSubjects(data_prospect_activity.activity_type_id);
          await fetchActivitiesSubjects(data_prospect_activity.activity_type_id);
      }
  );
   
  const editorConfig = {
    toolbar: {
      items: [],
    },
  };
  
  const format_start_date = ref(data_prospect_activity.start_date);
  format_start_date.value = (format_start_date) => {
    const day = format_start_date.getDate();
    const year = format_start_date.getFullYear();
    const month = format_start_date.getMonth() + 1;
    
    return `${day}/${month}/${year}`;
  }
  
  const show_company_prospect = ref(false);
  const addCompanyButton = () => {
    show_company_prospect.value = true;
  };

  const hideCompany = () => {    
    show_company_prospect.value = false;
  }

  const company_form = reactive({
                                    name: '',
                                    phone: '',
                                    tax_id: '',
                                    address: '',
                                    website: '',
                                    comments: '',
                                    potential_value: ''
                                });

  const submitCompany = async () => {
      await createCompany(company_form);
      data_prospect_activity.potential_value = company_form.potential_value;
      
      setTimeout(async () => { 
        await fetchCompanies();
        data_prospect_activity.company_id = company.value.id;         
      }, 790);
      
      hideCompany();
  }
</script>

<template>
  <!-- BEGIN: Modal Content quick action nuevo prospecto -->
   <Modal :show="show_modal_here" @hidden="hideModal" class="speciallabels" size="modal-xl">
    <ModalHeader>
      <h2 class="mr-auto text-base font-medium">{{$t('prospects.btn-add-new-prospect') }}</h2>
    </ModalHeader>
              
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="grid grid-cols-12 col-span-8 gap-4">
                   
                    <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.account') }}</label>
                      <v-select
                          label="name"
                          class="form-control" 
                          :options="dataAccounts"
                          v-model="data_prospect_activity.account_id"
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
                    </div>

                    <div class="flex col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">{{ $t('add_prospect_details.company') }}</label>
                      <v-select
                          label="name"
                          class="w-full form-control" 
                          :options="dataCompanies"
                          :reduce="name => name.id"
                          v-model="data_prospect_activity.company_id">
                      </v-select>
                      <div class="z-30 flex items-center justify-center w-10 mr-1 border rounded-r bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 addmore" 
                        :class="{ active: show_company_prospect }"
                        @click="show_company_prospect = !show_company_prospect">
                          <PlusIcon class="w-4 h-4" />
                      </div>
                    </div>

                    <div class="col-span-12 input-form intro-y sm:col-span-12 speciallabels speciallabeleds">
                      <CompanyForm
                        v-if="show_company_prospect" show
                        :company="company_form"
                        @submit="submitCompany"
                        @hideCompany="hideCompany" />
                    </div>

                    <div class="col-span-12 sm:col-span-4 forgroup withlabel">
                        <div class="input-group">     
                          <div class="input-group-text">$</div> 
                          <label for="modal-form-3" class="form-label">*{{ $t('add_companies.potential') }}</label>
                          <input 
                            id="modal-form-3" 
                            type="text" 
                            class="form-control" 
                            v-model.number="data_prospect_activity.potential_value"
                            :class="{ 'border-danger': validate.potential_value.$error }">
                          <template v-if="validate.potential_value.$error">
                            <div
                              v-for="(error, index) in validate.potential_value.$errors"
                              :key="index"
                              class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                          </template>
                        </div>
                    </div>
                    
                    <div class="col-span-12 sm:col-span-8 withlabel">
                      <label for="modal-form-1" class="form-label">*{{ $t('add_prospect_details.first_name') }}</label>
                      <input 
                        id="modal-form-1" 
                        type="text" 
                        class="form-control" 
                        v-model="data_prospect_activity.first_name"
                        :class="{ 'border-danger': validate.first_name.$error }"
                        >
                      <template v-if="validate.first_name.$error">
                        <div
                          class="mt-2 text-danger"
                          v-for="(error, index) in validate.first_name.$errors"
                          :key="index">
                            {{ error.$message }}
                        </div>
                      </template>
                    </div>

                    <div class="col-span-12 sm:col-span-8 withlabel">
                        <label for="modal-form-2" class="form-label">*{{ $t('add_prospect_details.last_name') }}</label>
                        <input 
                          id="modal-form-2" 
                          type="text" 
                          class="form-control" 
                          v-model="data_prospect_activity.last_name"
                          :class="{ 'border-danger': validate.last_name.$error }">
                            <template v-if="validate.last_name.$error">
                                <div
                                  v-for="(error, index) in validate.last_name.$errors"
                                  :key="index"
                                  class="mt-2 text-danger">
                                    {{ error.$message }}
                                </div>
                            </template>
                    </div>
                    
                    <div class="col-span-12 sm:col-span-4 withlabel">
                        <label for="modal-form-3" class="form-label">*{{ $t('add_prospect_details.mobile_phone') }}</label>
                        <input 
                          id="modal-form-3" 
                          type="text" 
                          class="form-control" 
                          v-model.number="data_prospect_activity.phone_mobile"
                          :class="{ 'border-danger': validate.phone_mobile.$error }">
                        <template v-if="validate.phone_mobile.$error">
                            <div
                              v-for="(error, index) in validate.phone_mobile.$errors"
                              :key="index"
                              class="mt-2 text-danger">
                              {{ error.$message }}
                            </div>
                          </template>
                    </div>
                    
                    <div class="col-span-12 sm:col-span-8 withlabel">
                        <label for="modal-form-4" class="form-label">*{{ $t('add_prospect_details.email') }}</label>
                        <input
                          type="text"
                          id="modal-form-4"
                          class="form-control" 
                          v-model="data_prospect_activity.email"
                          :class="{ 'border-danger': validate.email.$error }">
                            <template v-if="validate.email.$error">
                              <div
                                v-for="(error, index) in validate.email.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                              </div>
                            </template>
                    </div>

                    <div class="col-span-12 input-form intro-y sm:col-span-4 withlabel">
                      <label class="form-label">*{{ $t('add_prospect_details.priority') }}</label>
                      <v-select 
                        class="form-control" 
                        :options="priorities" 
                        :reduce="value => value.key"
                        label="value"
                        v-model="data_prospect_activity.priority"
                        :class="{ 'border-danger': validate.priority.$error }">
                      </v-select>
                        <template v-if="validate.priority.$error">
                          <div
                            v-for="(error, index) in validate.priority.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                    </div>
                                        
                    <div class="col-span-12 input-form intro-y sm:col-span-4 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.origin') }}</label>
                      <v-select
                          label="name"
                          class="form-control" 
                          :options="dataProspectingSources"
                          :reduce="name => name.id"
                          v-model="data_prospect_activity.client_origin"
                          :class="{ 'border-danger': validate.client_origin.$error }">
                      </v-select>
                      <template v-if="validate.client_origin.$error">
                        <div
                          v-for="(error, index) in validate.client_origin.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                      </template>
                    </div>
                    
                    <div class="col-span-12 input-form intro-y sm:col-span-4 withlabel">
                        <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.medium') }}</label>
                        <v-select 
                            class="form-control" 
                            :options="dataProspectingMeans"
                            :reduce="name => name.id" 
                            label="name"
                            v-model="data_prospect_activity.propecting_mean_id"
                            :class="{ 'border-danger': validate.propecting_mean_id.$error }">
                        </v-select>
                        
                        <template v-if="validate.propecting_mean_id.$error">
                          <div
                            v-for="(error, index) in validate.propecting_mean_id.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                    </div>
                    
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
                        <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
                        <v-select  
                            id="cmbActivityType"
                            class="form-control"
                            :options="dataActivityTypes"
                            :reduce="name => name.id"
                            label="name"                        
                            v-model="data_prospect_activity.activity_type_id"
                            :class="{ 'border-danger': validate.activity_type_id.$error }"
                            >
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
                    
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
                      <label for="cmbActivitySubject" class="form-label">*{{ $t('add_prospect_activity.subject') }}</label>
                      <v-select
                          label="name"
                          id="cmbActivitySubject"
                          class="form-control"
                          :options="dataActivitySubjects"
                          :reduce="name => name.id"
                          v-model="data_prospect_activity.activity_subject_id"
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
                                                            
                    <div class="col-span-12 intro-y sm:col-span-6 withlabel">
                      <label for="crud-form-2" class="form-label">*{{ $t('add_prospect_activity.start_date_activity') }}</label>
                      
                      <Datepicker
                          :placeholder="$t('add_prospect_activity.start_date_activity')"
                          closeOnScroll
                          :format="format_start_date"
                          :enableTimePicker="false"
                          v-model="data_prospect_activity.start_date" />
                      <!--
                      <Datepicker
                          v-model="data_prospect_activity.start_date"
                          :placeholder="$t('add_prospect_activity.start_date_activity')"
                          utc 
                          modelType="yyyy.MM.dd" 
                          closeOnScroll  
                          :enableTimePicker="false" />
                      -->
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
                            v-model="data_prospect_activity.start_time" 
                            :placeholder="$t('add_prospect_activity.start_time')"
                            timePicker />
                    </div>
                    
                    <div class="col-span-12 sm:col-span-12 withlabel">
                      <label for="modal-form-1" class="form-label">{{ $t('add_prospect_activity.comments') }}</label>
                      <ClassicEditor 
                        v-model="data_prospect_activity.comments" 
                        :placeholder="$t('add_prospect_activity.comments')"
                        :config="editorConfig" />
                    </div>
                    
                </div>
                
                <div class="col-span-4 timeline">
                  <!-- Inicio de la linea del tiempo Prospecto -->
                  <div>
                    <div class="grid justify-items-start">
                      <div class="text-center title">
                        <h3 class="text-gray-900 text-md dark:text-white">{{ $t('add_prospect_activity.activities_label') }}</h3>
                        <h4 class="text-gray-400 text-md dark:text-white">{{ $t('add_prospect_activity.activities_label_2') }} {{ convert_format_date(data_prospect_activity.start_date, 'es') }}</h4>
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
                        <!--
                        <li class="mb-10 ml-4">
                          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 class="font-semibold text-gray-900 text-md dark:text-white">Ricardo Martinez Prieto</h3>
                          <p class="mb-4 font-normal text-gray-500 text-md dark:text-gray-400">Seguimiento a Prospecto</p>
                        </li>
                        <li class="mb-10 ml-4">
                          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 class="font-semibold text-gray-900 text-md dark:text-white">Xavier López</h3>
                          <p class="mb-4 font-normal text-gray-500 text-md dark:text-gray-400">Seguimiento a Prospecto</p>
                        </li>
                        <li class="mb-10 ml-4">
                          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 class="font-semibold text-gray-900 text-md dark:text-white">Anastasia Domínguez</h3>
                          <p class="mb-4 font-normal text-gray-500 text-md dark:text-gray-400">Seguimiento a Prospecto</p>
                        </li>
                        -->
                      </ol>
                    </div>
                  </div>
                  <!-- Fin de la linea del tiempo Prospecto -->
                </div>

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