<script>
    export default {
        name: "ProspectStepQuickForm",
    }
</script>
<script setup>  
  import { onMounted, ref, watch, toRef, reactive } from 'vue';
  import { storeToRefs } from "pinia";  
  import { required, email, minLength, maxLength, numeric } from '@vuelidate/validators';
  import {useVuelidate} from '@vuelidate/core';
  import Toastify from "toastify-js";
  import dom from "@left4code/tw-starter/dist/js/dom";
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { useProspectsStore } from "@/stores/leader/prospects";
  import { useActivitiesStore } from "@/stores/leader/activities";

  const { fetchOrigins, fetchOriginsMediums } = useProspectsStore();   //ACTIONS
  const { fetchActivitiesTypes, fetchActivitiesSubjects } = useActivitiesStore(); //ACTIONS
  const props = defineProps({
      prospect: {
          type: Object,
          required: true
      },
      activity: {
        type: Object,
        required: true
      },      
      show_modal: {
        type: Boolean
      },
  });
  const aServicePriority = [
        { key:'bajo', value: 'BAJO' },
        { key:'medio', value: 'MEDIO' },
        { key:'alto', value: 'ALTO' },
        { key:'pendiente', value: 'PENDIENTE' },
    ];

  //const show_modal = toRef(props, 'show_modal');
  
  const emit = defineEmits(["submit","hideModal","reset"]);

  ////////RULES
  const rules = {
      prospect:{
        last_name: { required },
        first_name: { required },
        email: { required, email },
        phone_mobile: {         
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10) },
        service_priority: { required },  
        client_origin: { required },
        client_medium_origin_id: { required }
      },
      activity:{
        activity_type_id: { required },
        activity_subject_id: { required },
        start_date: { required }
      }
  }

  const validate = useVuelidate(rules, props );

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
    }
    else{
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
        emit('submit');
    }
  } 

  ////////ORIGINS & ORIGINS MEDIUMS
  const dataOrigins = ref([]);
  const dataOriginsMediums = ref([]);
  
  ////////ACTIVITIES TYPES & ACTIVITIES SUBJECTS
  const dataActivitiesTypes = ref([]);
  const dataActivitiesSubjects = ref([]);

  onMounted(async() => {
    dataOrigins.value = await fetchOrigins();
    dataActivitiesTypes.value = await fetchActivitiesTypes();
  });
  watch(
      () => props.activity.activity_type_id,
      async () => {
          dataActivitiesSubjects.value = await fetchActivitiesSubjects(props.activity.activity_type_id);
      }
  );
  watch(
      () => props.prospect.client_origin,
      async () => {
          dataOriginsMediums.value = await fetchOriginsMediums();
      }
  );

  const editorConfig = {
    toolbar: {
      items: [],
    },
  };
</script>

<template>
  <!-- BEGIN: Modal Content quick action nuevo prospecto -->
  <!-- <Modal :show="addProspectModal" @hidden="addProspectModal = false"> -->
  <Modal :show="show_modal" @hidden="hideModal" class="speciallabels" size="modal-xl">
    <!--<div class="modal-dialog">-->
        <!--<form @submit.prevent="submitForm" autocomplete="on">-->
          <!--<div class="modal-content">-->
              <!-- BEGIN: Modal Header -->
              <ModalHeader>
                  <h2 class="mr-auto text-base font-medium">{{$t('prospects.btn-add-new-prospect') }}</h2>                  
              </ModalHeader>
              <!-- END: Modal Header -->
              <!-- BEGIN: Modal Body -->
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">

                <div class="col-span-8 grid-cols-12 grid gap-4">
                  <div class="col-span-12 sm:col-span-6 withlabel">
                    <label for="modal-form-1" class="form-label">{{ $t('add_prospect_details.first_name') }}</label>
                    <input 
                      id="modal-form-1" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.first_name"
                      :class="{ 'border-danger': validate.prospect.first_name.$error }"
                      >
                    <template v-if="validate.prospect.first_name.$error">
                      <div
                        class="mt-2 text-danger"
                        v-for="(error, index) in validate.prospect.first_name.$errors"
                        :key="index">
                          {{ error.$message }}
                      </div>
                    </template>
                  </div>

                  <div class="col-span-12 sm:col-span-6 withlabel">
                      <label for="modal-form-2" class="form-label">{{ $t('add_prospect_details.last_name') }}</label>
                      <input 
                      id="modal-form-2" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.last_name"
                      :class="{ 'border-danger': validate.prospect.last_name.$error }"
                      >
                      <template v-if="validate.prospect.last_name.$error">
                          <div
                              v-for="(error, index) in validate.prospect.last_name.$errors"
                              :key="index"
                              class="mt-2 text-danger">
                              {{ error.$message }}
                          </div>
                      </template>
                  </div>

                  <div class="col-span-12 sm:col-span-4 withlabel">
                      <label for="modal-form-3" class="form-label">{{ $t('add_prospect_details.mobile_phone') }}</label>
                      <input 
                      id="modal-form-3" 
                      type="text" 
                      class="form-control" 
                      v-model.number="prospect.phone_mobile"
                      :class="{ 'border-danger': validate.prospect.phone_mobile.$error }"
                      >
                      <template v-if="validate.prospect.phone_mobile.$error">
                          <div
                            v-for="(error, index) in validate.prospect.phone_mobile.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                  </div>

                  <div class="col-span-12 sm:col-span-8 withlabel">
                      <label for="modal-form-4" class="form-label">{{ $t('add_prospect_details.email') }}</label>
                      <input 
                      id="modal-form-4" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.email"
                      :class="{ 'border-danger': validate.prospect.email.$error }"
                      >
                      <template v-if="validate.prospect.email.$error">
                        <div
                          v-for="(error, index) in validate.prospect.email.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>

                  <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                    <label class="flex flex-col w-full form-label sm:flex-row">{{ $t('add_prospect_details.company') }}</label>
                    <v-select
                        label="description"
                        class="form-control" 
                        :options="dataOrigins"
                        :reduce="description => description.id"
                        v-model="prospect.client_origin"
                        :class="{ 'border-danger': validate.prospect.client_origin.$error }">
                    </v-select>
                    <template v-if="validate.prospect.client_origin.$error">
                      <div
                        v-for="(error, index) in validate.prospect.client_origin.$errors"
                        :key="index"
                        class="mt-2 text-danger">
                          {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  
                  <div class="col-span-12 input-form intro-y sm:col-span-4 withlabel">
                      <label class="form-label">{{ $t('add_prospect_details.service_priority') }}</label>
                      <v-select 
                          class="form-control" 
                          :options="aServicePriority" 
                          :reduce="value => value.key"
                          label="value"
                          v-model="prospect.service_priority"
                          :class="{ 'border-danger': validate.prospect.service_priority.$error }">
                      </v-select>
                      <template v-if="validate.prospect.service_priority.$error">
                        <div
                          v-for="(error, index) in validate.prospect.service_priority.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>

                  <div class="col-span-12 input-form intro-y sm:col-span-4 withlabel">
                    <label class="flex flex-col w-full form-label sm:flex-row">{{ $t('add_prospect_details.origin') }}</label>
                    <v-select
                        label="description"
                        class="form-control" 
                        :options="dataOrigins"
                        :reduce="description => description.id"
                        v-model="prospect.client_origin"
                        :class="{ 'border-danger': validate.prospect.client_origin.$error }">
                    </v-select>
                    <template v-if="validate.prospect.client_origin.$error">
                      <div
                        v-for="(error, index) in validate.prospect.client_origin.$errors"
                        :key="index"
                        class="mt-2 text-danger">
                          {{ error.$message }}
                      </div>
                    </template>
                  </div>

                  <div class="col-span-12 input-form intro-y sm:col-span-4 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">{{ $t('add_prospect_details.medium') }}</label>
                      <v-select 
                          class="form-control" 
                          :options="dataOriginsMediums"
                          :reduce="description => description.id" 
                          label="description"
                          v-model="prospect.client_medium_origin_id"
                          :class="{ 'border-danger': validate.prospect.client_medium_origin_id.$error }">
                      </v-select>
                      
                      <template v-if="validate.prospect.client_medium_origin_id.$error">
                        <div
                          v-for="(error, index) in validate.prospect.client_medium_origin_id.$errors"
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
                          :options="dataActivitiesTypes"
                          :reduce="name => name.id"
                          label="name"                        
                          v-model="activity.activity_type_id"
                          :class="{ 'border-danger': validate.activity.activity_type_id.$error }"
                          >
                      </v-select >
                      <template v-if="validate.activity.activity_type_id.$error">
                          <div
                              v-for="(error, index) in validate.activity.activity_type_id.$errors"
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
                        :options="dataActivitiesSubjects"
                        :reduce="name => name.id"
                        v-model="activity.activity_subject_id"
                        :class="{ 'border-danger': validate.activity.activity_subject_id.$error }">
                    </v-select >
                    <template v-if="validate.activity.activity_subject_id.$error">
                        <div
                            v-for="(error, index) in validate.activity.activity_subject_id.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                  </div>

                  <div class="col-span-12 intro-y sm:col-span-6 withlabel">
                    <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_date_activity') }}</label>
                    <Datepicker 
                        v-model="activity.start_date" 
                        :placeholder="$t('add_prospect_activity.start_date_activity')"
                        utc 
                        modelType="yyyy.MM.dd" 
                        closeOnScroll  
                        :enableTimePicker="false" />
                    <template v-if="validate.activity.start_date.$error">
                        <div
                            v-for="(error, index) in validate.activity.start_date.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                        </div>
                    </template>
                  </div>

                  <div class="col-span-12 intro-y sm:col-span-6 withlabel">
                      <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_time') }}</label>
                      <Datepicker 
                          v-model="activity.start_time" 
                          :placeholder="$t('add_prospect_activity.start_time')"
                          timePicker />
                  </div>

                  <div class="col-span-12 sm:col-span-12 withlabel">
                    <label for="modal-form-1" class="form-label">{{ $t('add_prospect_activity.comments') }}</label>
                    <ClassicEditor 
                      v-model="activity.comments" 
                      :placeholder="$t('add_prospect_activity.comments')"
                      :config="editorConfig" />
                    <!--
                    <input 
                      id="modal-form-1" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.first_name"
                      :class="{ 'border-danger': validate.prospect.first_name.$error }"
                      :placeholder="$t('add_prospect_details.first_name')">
                    <template v-if="validate.prospect.first_name.$error">
                      <div
                        class="mt-2 text-danger"
                        v-for="(error, index) in validate.prospect.first_name.$errors"
                        :key="index">
                          {{ error.$message }}
                      </div>
                    </template>
                    -->
                  </div>
                  
                  <!--
                  <div class="col-span-12 intro-y ">
                    <label>{{ $t('add_prospect_activity.comments') }}</label>
                    <div class="mt-2">
                        <ClassicEditor 
                            v-model="activity.comments" 
                            :placeholder="$t('add_prospect_activity.comments')"
                            :config="editorConfig"/>
                    </div>
                  </div>
                  -->
                </div>

                <div class="col-span-4 timeline">
                   <!-- Inicio de la linea del tiempo Prospecto -->
                   <div>
                      <div  class="grid justify-items-start">
                          <div class="text-center title">
                              <h3 class="text-md text-gray-900 dark:text-white">Actividades Programadas</h3>
                              <h4 class="text-md text-gray-400 dark:text-white">para el dia 01/01/2023</h4>
                          </div>
                          <p>&nbsp</p>
                          <p>&nbsp</p>

                          <ol class="relative border-l border-sky-800 dark:border-sky-800">                  
                              <li class="mb-10 ml-4">
                                  <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  <h3 class="text-md font-semibold text-gray-900 dark:text-white">Ricardo Martinez Prieto</h3>
                                  <p class="mb-4 text-md font-normal text-gray-500 dark:text-gray-400">Seguimiento a Prospecto</p>
                                  
                              </li>
                              <li class="mb-10 ml-4">
                                  <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  <h3 class="text-md font-semibold text-gray-900 dark:text-white">Xavier López</h3>
                                  <p class="mb-4 text-md font-normal text-gray-500 dark:text-gray-400">Seguimiento a Prospecto</p>
                                  
                              </li>
                              <li class="mb-10 ml-4">
                                  <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  <h3 class="text-md font-semibold text-gray-900 dark:text-white">Anastasia Domínguez</h3>
                                  <p class="mb-4 text-md font-normal text-gray-500 dark:text-gray-400">Seguimiento a Prospecto</p>
                                  
                              </li>
                          </ol>
                      </div>
                  </div>
                  <!-- Fin de la linea del tiempo Prospecto -->
                </div>

              </ModalBody>
              <!-- END: Modal Body -->
              <!-- BEGIN: Modal Footer -->
              <ModalFooter>
                  <button type="button" @click="hideModal" class="w-20 mr-1 btn btn-outline-secondary">Cancelar</button>
                  <button type="submit" @click="submitForm" class="w-20 btn btn-primary">Guardar</button>
              </ModalFooter>
              <!-- END: Modal Footer -->

          <!--</div>-->
        <!--</form>-->
      <!--</div>-->
    
  </Modal>
  <!-- END: Modal Content -->
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
</style>