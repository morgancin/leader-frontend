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
      addProspectModal: {
        type: Boolean
      }
  });

  const addProspectModal = toRef(props, 'addProspectModal');

  const emit = defineEmits(["submit"]);

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
      //console.log(props.addProspectModal);
      addProspectModal.value = false;
    }
    const result = await validate.value.$validate();
    if(result){
        emit('submit')
    }
  } 

  ////////ORIGINS & ORIGINS MEDIUMS
  const dataOrigins = ref([]);
  const dataOriginsMediums = ref([]);
  
  onMounted(async() => {
      dataOrigins.value = await fetchOrigins();
  });
  watch(
      () => props.prospect.client_origin,
      async () => {
          dataOriginsMediums.value = await fetchOriginsMediums();
      }
  );

  ////////ACTIVITIES TYPES & ACTIVITIES SUBJECTS
  const dataActivitiesTypes = ref([]);
  const dataActivitiesSubjects = ref([]);

  onMounted(async() => {
      dataActivitiesTypes.value = await fetchActivitiesTypes();
  });
  watch(
      () => props.activity.activity_type_id,
      async () => {
          dataActivitiesSubjects.value = await fetchActivitiesSubjects(props.activity.activity_type_id);
      }
  );

</script>

<template>
  <!-- BEGIN: Modal Content quick action nuevo prospecto -->
  <Modal :show="addProspectModal" @hidden="addProspectModal = false">
    
      <!--<div class="modal-dialog">-->
        <!--<form @submit.prevent="submitForm" autocomplete="on">-->
          <!--<div class="modal-content">-->
              <!-- BEGIN: Modal Header -->
              <ModalHeader>
                  <h2 class="font-medium text-base mr-auto">{{$t('prospects.btn-add-new-prospect') }}</h2>                  
              </ModalHeader>
              <!-- END: Modal Header -->
              <!-- BEGIN: Modal Body -->
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                  <div class="col-span-12 sm:col-span-6">
                      <label for="modal-form-1" class="form-label">{{ $t('add_prospect_details.first_name') }}</label>
                      <input 
                      id="modal-form-1" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.first_name"
                      :class="{ 'border-danger': validate.prospect.first_name.$error }"
                      :placeholder="$t('add_prospect_details.first_name')">
                      <template v-if="validate.prospect.first_name.$error">
                          <div
                              v-for="(error, index) in validate.prospect.first_name.$errors"
                              :key="index"
                              class="mt-2 text-danger">
                              {{ error.$message }}
                          </div>
                      </template>
                  </div>
                  <div class="col-span-12 sm:col-span-6">
                      <label for="modal-form-2" class="form-label">{{ $t('add_prospect_details.last_name') }}</label>
                      <input 
                      id="modal-form-2" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.last_name"
                      :class="{ 'border-danger': validate.prospect.last_name.$error }"
                      :placeholder="$t('add_prospect_details.last_name')">
                      <template v-if="validate.prospect.last_name.$error">
                          <div
                              v-for="(error, index) in validate.prospect.last_name.$errors"
                              :key="index"
                              class="mt-2 text-danger">
                              {{ error.$message }}
                          </div>
                      </template>
                  </div>
                  <div class="col-span-12 sm:col-span-4">
                      <label for="modal-form-3" class="form-label">{{ $t('add_prospect_details.mobile_phone') }}</label>
                      <input 
                      id="modal-form-3" 
                      type="text" 
                      class="form-control" 
                      v-model.number="prospect.phone_mobile"
                      :class="{ 'border-danger': validate.prospect.phone_mobile.$error }"
                      :placeholder="$t('add_prospect_details.mobile_phone')">
                      <template v-if="validate.prospect.phone_mobile.$error">
                          <div
                            v-for="(error, index) in validate.prospect.phone_mobile.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                  </div>
                  <div class="col-span-12 sm:col-span-8">
                      <label for="modal-form-4" class="form-label">{{ $t('add_prospect_details.email') }}</label>
                      <input 
                      id="modal-form-4" 
                      type="text" 
                      class="form-control" 
                      v-model="prospect.email"
                      :class="{ 'border-danger': validate.prospect.email.$error }"
                      :placeholder="$t('add_prospect_details.email')">
                      <template v-if="validate.prospect.email.$error">
                        <div
                          v-for="(error, index) in validate.prospect.email.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
                  


                  <div class="col-span-12 input-form intro-y sm:col-span-6">
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

                <div class="col-span-12 input-form intro-y sm:col-span-6">
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


                <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6">
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


                <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6">
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


                <div class="col-span-12 intro-y sm:col-span-6">
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
                <div class="col-span-12 intro-y sm:col-span-6">
                    <label for="crud-form-2" class="form-label">{{ $t('add_prospect_activity.start_time') }}</label>
                    <Datepicker 
                        v-model="activity.start_time" 
                        :placeholder="$t('add_prospect_activity.start_time')"
                        timePicker />
                </div>

                  
              </ModalBody>
              <!-- END: Modal Body -->
              <!-- BEGIN: Modal Footer -->
              <ModalFooter>
                  <button type="button" @click="addItemModal = false" class="btn btn-outline-secondary w-20 mr-1">Cancelar</button>
                  <button type="submit" @click="submitForm" class="btn btn-primary w-20">Guardar</button>
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