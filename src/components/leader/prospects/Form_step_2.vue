<script>
    export default {
        name: "ProspectStep2Form",
    }
</script>

<script setup>
    import { watch } from 'vue';
    import { storeToRefs } from "pinia";

    import useVuelidate from '@vuelidate/core';
    import { required, integer, minLength, maxLength } from '@vuelidate/validators';
    import Toastify from "toastify-js";
    import dom from "@left4code/tw-starter/dist/js/dom";

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import { useProspectsStore } from "../../../stores/leader/prospects";
    
    const { fetchCp } = useProspectsStore();
    const { dataSuburb } = storeToRefs(useProspectsStore());
    const props = defineProps({
        prospect: {
            type: Object,
            required: true,
        },
    })
    const emit = defineEmits(["submit"]);
    ////////RULES
    const rulesCp = {
        // zipcode: {
        //     integer,
        //     required,
        //     minLength: minLength(5),
        //     maxLength: maxLength(5)
        // },
    }
    ////////////////
    const validate = useVuelidate(rulesCp, props.prospect);
    const fecthZipCodeSubmit = async () => {
      const result = await validate.value.$validate();
      if(result){
        fetchCp();
        // emit('submit')
      }
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
    //   else {
    //     Toastify({
    //       node: dom("#success-notification-content")
    //         .clone()
    //         .removeClass("hidden")[0],
    //       duration: 3000,
    //       newWindow: true,
    //       close: true,
    //       gravity: "top",
    //       position: "right",
    //       stopOnFocus: true,
    //     }).showToast();
    //   }

        const result = await validate.value.$validate();

        if(result){
            emit('submit')
        }

        // emit('submit')
    }
    watch(
        () => props.prospect.zipcode,
        () => {
            fecthZipCodeSubmit();
        }
    );
    /////PRUEBAS
    /*
    const options = [
        {
            title: "HTML5",
            author: {
                firstName: "Remy",
                lastName: "Sharp"
            }
        }
    ];
    */
    const submitStep = async () => {
        step.value = (step.value == 2) ? -1 : 1;
    }

</script>

<template>
    <form @submit.prevent="submitForm()" autocomplete="on">
         <div class="grid grid-cols-4 gap-4 gap-y-5 mt-5">
            <div class="intro-y md:col-span-1">
                <label for="txtZipCode" class="form-label">{{ $t('add_prospect_address.zip_code') }}</label>
                <input
                    type="text"
                    id="txtZipCode"
                    class="form-control"
                    :placeholder="$t('add_prospect_address.zip_code')"
                    v-model="prospect.zipcode" />
            </div>

            <!-- <div class=" intro-y intro-y md:col-span-1">
                <label for="txtZipCode" class="form-label w-full flex flex-col sm:flex-row">
                    *{{ $t('add_prospect_address.zip_code') }}
                <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                    Required, at least 2 characters
                </span>
                </label>
                <input
                    id="txtZipCode"
                    v-model="validate.zipcode.$model"
                    
                    type="text"
                    class="form-control"
                    :class="{ 'border-danger': validate.zipcode.$error  }" 
                    :placeholder="$t('add_prospect_address.zip_code')"/> 
                <template v-if="validate.zipcode.$error">
                    <div
                        v-for="(error, index) in validate.zipcode.$errors"
                        :key="index"
                        class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div> -->
        </div>
        <div class="grid grid-cols-12 gap-4 gap-y-5 mt-5">

            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="cmbSuburb" class="form-label">{{ $t('add_prospect_address.suburb') }}</label>
                <v-select
                    id="cmbSuburb"
                    taggable push-tags
                    class="form-control"
                    :options="dataSuburb"
                    :placeholder="$t('add_prospect_address.suburb')"
                    v-model="prospect.suburb">
                </v-select>
            </div>
            
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtStreet" class="form-label">{{ $t('add_prospect_address.street') }}</label>
                <input
                  type="text"
                  id="txtStreet"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.street')"
                  v-model="prospect.street" />
            </div>
            
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtOutdoor" class="form-label">{{ $t('add_prospect_address.outdoor') }}</label>
                <input
                  type="text"
                  id="txtOutdoor"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.outdoor')"
                  v-model.trim="prospect.outdoor" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtIndoor" class="form-label">{{ $t('add_prospect_address.indoor') }}</label>
                <input
                  type="text"
                  id="txtIndoor"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.indoor')"
                  v-model="prospect.indoor" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtTown" class="form-label">{{ $t('add_prospect_address.town') }}</label>
                <input
                  type="text"
                  id="txtTown"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.town')"
                  v-model="prospect.town" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtCity" class="form-label">{{ $t('add_prospect_address.city') }}</label>
                <input
                  type="text"
                  id="txtCity"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.city')"
                  v-model="prospect.city" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtState" class="form-label">{{ $t('add_prospect_address.state') }}</label>
                <input
                  type="text"
                  id="txtState"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.state')"
                  v-model="prospect.state" />
            </div>
            <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                <label for="txtCountry" class="form-label">{{ $t('add_prospect_address.country') }}</label>
                <input
                  type="text"
                  id="txtCountry"
                  class="form-control"
                  :placeholder="$t('add_prospect_address.country')"
                  v-model="prospect.country" />
            </div>

            <div class="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5" >
                <button 
                    class="btn btn-secondary w-24"
                    
                    @click="submitStep">
                    {{ $t('add_prospect_address.btn-prev') }}
                    </button>
                <button class="btn btn-primary w-24 ml-2">{{ $t('add_prospect_address.btn-next') }}</button>
            </div>
        </div>
    </form>
    <!-- BEGIN: Success Notification Content -->
    <!-- <div
        id="success-notification-content"
        class="toastify-content hidden flex">
        <CheckCircleIcon class="text-success" />
        <div class="ml-4 mr-4">
        <div class="font-medium">{{ $t('add_user.registration_success') }}</div>
        <div class="text-slate-500 mt-1">
            {{ $t('add_user.check_success') }}
        </div>
        </div>
    </div> -->
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