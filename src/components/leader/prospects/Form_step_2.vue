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
    
    <div class="speciallabels pb0">

        <form @submit.prevent="submitForm()" autocomplete="on">

            <div class="grid gap-3">

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.basic-info')}}
                    </div>
                    <div class="mt-5">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_address.zip_code') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_address.zip_code') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0">                      
                              <input
                                  type="text"
                                  name="name"
                                  class="col-span-3 form-control"
                                  v-model="prospect.zipcode" />
                            </div>
                        </div>                        

                    </div>
                </div>

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.complementary-info')}}
                    </div>
                    <div class="mt-5">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_address.suburb') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_address.suburb') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0">                      
                                <v-select
                                    id="cmbSuburb"
                                    taggable push-tags
                                    class="form-control"
                                    :options="dataSuburb"                    
                                    v-model="prospect.suburb">
                                </v-select>
                            </div>
                        </div>
                        
                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_address.address') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_address.address') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtStreet" class="form-label">{{ $t('add_prospect_address.street') }}</label>
                                        <input
                                          type="text"
                                          id="txtStreet"
                                          class="form-control"
                                          v-model="prospect.street" />
                                    </div>
                                    
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-3 lg:col-span-3 withlabel">
                                        <label for="txtOutdoor" class="form-label">{{ $t('add_prospect_address.outdoor') }}</label>
                                        <input
                                          type="text"
                                          id="txtOutdoor"
                                          class="form-control"
                                          v-model.trim="prospect.outdoor" />
                                    </div>
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-3 lg:col-span-3 withlabel">
                                        <label for="txtIndoor" class="form-label">{{ $t('add_prospect_address.indoor') }}</label>
                                        <input
                                          type="text"
                                          id="txtIndoor"
                                          class="form-control"
                                          v-model="prospect.indoor" />
                                    </div>
                                </div>
                            </div>
                        </div>   


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_address.town') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_address.town') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtTown" class="form-label">{{ $t('add_prospect_address.town') }}</label>
                                        <input
                                          type="text"
                                          id="txtTown"
                                          class="form-control"
                                          v-model="prospect.town" />
                                    </div>
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtCity" class="form-label">{{ $t('add_prospect_address.city') }}</label>
                                        <input
                                          type="text"
                                          id="txtCity"
                                          class="form-control"
                                          v-model="prospect.city" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_address.state') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_address.state') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtState" class="form-label">{{ $t('add_prospect_address.state') }}</label>
                                        <input
                                          type="text"
                                          id="txtState"
                                          class="form-control"
                                          v-model="prospect.state" />
                                    </div>
                                    <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtCountry" class="form-label">{{ $t('add_prospect_address.country') }}</label>
                                        <input
                                          type="text"
                                          id="txtCountry"
                                          class="form-control"
                                          v-model="prospect.country" />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>


            <!--
            <div class="grid grid-cols-12 gap-4 mt-5 gap-y-5">

                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-12 lg:col-span-4 withlabel">
                    <label for="cmbSuburb" class="form-label">{{ $t('add_prospect_address.suburb') }}</label>
                    <v-select
                        id="cmbSuburb"
                        taggable push-tags
                        class="form-control"
                        :options="dataSuburb"                    
                        v-model="prospect.suburb">
                    </v-select>
                </div>
                
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                    <label for="txtStreet" class="form-label">{{ $t('add_prospect_address.street') }}</label>
                    <input
                      type="text"
                      id="txtStreet"
                      class="form-control"
                      v-model="prospect.street" />
                </div>
                
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-3 lg:col-span-2 withlabel">
                    <label for="txtOutdoor" class="form-label">{{ $t('add_prospect_address.outdoor') }}</label>
                    <input
                      type="text"
                      id="txtOutdoor"
                      class="form-control"
                      v-model.trim="prospect.outdoor" />
                </div>
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-3 lg:col-span-2 withlabel">
                    <label for="txtIndoor" class="form-label">{{ $t('add_prospect_address.indoor') }}</label>
                    <input
                      type="text"
                      id="txtIndoor"
                      class="form-control"
                      v-model="prospect.indoor" />
                </div>
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                    <label for="txtTown" class="form-label">{{ $t('add_prospect_address.town') }}</label>
                    <input
                      type="text"
                      id="txtTown"
                      class="form-control"
                      v-model="prospect.town" />
                </div>
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                    <label for="txtCity" class="form-label">{{ $t('add_prospect_address.city') }}</label>
                    <input
                      type="text"
                      id="txtCity"
                      class="form-control"
                      v-model="prospect.city" />
                </div>
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                    <label for="txtState" class="form-label">{{ $t('add_prospect_address.state') }}</label>
                    <input
                      type="text"
                      id="txtState"
                      class="form-control"
                      v-model="prospect.state" />
                </div>
                <div class="col-span-12 intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                    <label for="txtCountry" class="form-label">{{ $t('add_prospect_address.country') }}</label>
                    <input
                      type="text"
                      id="txtCountry"
                      class="form-control"
                      v-model="prospect.country" />
                </div>

                <div class="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end " >
                    <button 
                        class="w-24 btn btn-secondary"                    
                        @click="submitStep">
                        {{ $t('add_prospect_address.btn-prev') }}
                        </button>
                    <button class="w-24 ml-2 btn btn-primary">{{ $t('add_prospect_address.btn-next') }}</button>
                </div>
            </div>-->

            <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">     
                <button 
                        class="btn btn-secondary md:w-52"                    
                        @click="submitStep">
                        {{ $t('add_prospect_address.btn-prev') }}
                        </button>               
                <button class="w-full py-3 btn btn-primary md:w-52">
                  {{ $t('add_prospect_details.btn-next') }}
                </button>
            </div>

        </form>
    </div>

    
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
.speciallabels .withlabel label.nolabel{ left:-5px}
.speciallabels .withlabel label.form-check-label{ position:static}
.vs__dropdown-toggle{border-color:rgb(var(--color-slate-200) / var(--tw-border-opacity));}
.border-danger .vs__dropdown-toggle{border-color:rgb(var(--color-danger) / var(--tw-border-opacity))}
.pb0{margin-bottom:-3.5rem}
</style>