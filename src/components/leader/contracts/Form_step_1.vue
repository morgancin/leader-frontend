<script>
    export default {
        name: "ContractStep1Form",
    }
</script>

<script setup>    
    import { onMounted, ref, watch, toRefs, reactive } from 'vue';
    import { storeToRefs } from "pinia";

    import { numeric, required, email, minLength, maxLength } from '@vuelidate/validators';
    import {useVuelidate} from '@vuelidate/core';
    import Toastify from "toastify-js";
    import dom from "@left4code/tw-starter/dist/js/dom";
    
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    
    import { useContractsStore } from "../../../stores/leader/contracts";
    
    const props = defineProps({
        contract: {
            type: Object,
            required: true,
        }
    });
    const emit = defineEmits(["submit","previousStep"]);

    ////////RULES
    const rules = {
        ////Prospect
        //prospect_id: { required }
    }
        
    const validate = useVuelidate(rules, toRefs(props.contract));

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

        const result = await validate.value.$validate();
        
        if(result) {
            emit('submit');
        }
    }        
</script>

<template>
      
    <div class="speciallabels pb0">

        <form @submit.prevent="submitForm" autocomplete="on"> 
            <div class="grid gap-3 mt0">
                

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.seller')}}
                    </div>
                    <div class="mt-5">
                                               
                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('contracts.seller') }}</div>
                                  <div
                                    class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('contracts.seller') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('contracts.id_seller') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('add_prospect_details.full_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('contracts.sell_date') }}                        
                                        </label>
                                        <Datepicker
                                          closeOnScroll
                                          :enableTimePicker="false"
                                          id="txtBirth_date"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.client')}}
                    </div>
                    <div class="mt-5">
                        
                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.company') }}</div>
                                  <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.company') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0 companycontainer">
                              <div class="flex w-full">                      
                                  <v-select
                                    label="name"
                                    class="form-control" 
                                    :reduce="name => name.id">
                                  </v-select>
                              </div>                              
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.full_name') }}</div>
                                  <div
                                    class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.full_name') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('add_prospect_details.first_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('add_prospect_details.last_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('add_prospect_details.second_last_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.place_of_birth') }}</div>
                                  <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.place_of_birth') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0">                      
                              <v-select
                                    id="cmbEntidad"
                                    class="form-control"  
                                    :reduce="entidad => entidad.clv"
                                    label="entidad">
                                </v-select>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.profile') }}</div>
                                  <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.profile') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-5 md:col-span-4 lg:col-span-4 withlabel">
                                        <label class="nolabel">*{{ $t('add_prospect_details.gender')}}</label>
                                        <div class="flex flex-col mt-3 sm:flex-row">
                                            <div class="mr-2 form-check">
                                                <input 
                                                    class="form-check-input" 
                                                    type="radio" 
                                                    name="gender" 
                                                    value="female"  
                                                    id="female"/>
                                                <label class="form-check-label" for="female">{{ $t('add_prospect_details.female') }}</label>
                                            </div>
                                            <div class="mt-2 mr-2 form-check sm:mt-0">
                                                <input 
                                                    class="form-check-input" 
                                                    type="radio" 
                                                    name="gender" 
                                                    value="male"
                                                    id="male"  />
                                                <label class="form-check-label" for="male">{{ $t('add_prospect_details.male') }}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-5 md:col-span-4 lg:col-span-4 withlabel">
                                        <label for="txtBirth_date" class="form-label">*{{ $t('add_prospect_details.birth_date') }}</label>
                                        <Datepicker
                                          closeOnScroll
                                          :enableTimePicker="false"
                                          id="txtBirth_date"/>
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-2 md:col-span-4 lg:col-span-4 withlabel">
                                        <label class="form-label">{{ $t('add_prospect_details.age') }}</label>
                                        <input type="number" class="form-control" minlength="1" maxlength="3" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.id-documents') }}</div>
                                  <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.id-documents') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">*CURP</label>
                                        <input type="text" class="form-control"  />
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">*RFC</label>
                                        <input type="text" class="form-control" maxlength="16" />
                                    </div>
                                </div>
                            </div>
                        </div>                        


                    </div>
                </div>  


                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-3">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.contact')}}
                    </div>
                    <div class="mt-5">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.email') }}</div>
                                  <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.email') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0">                      
                                <input
                                  type="text"
                                  name="name"
                                  class="form-control"/>                               
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.personal_phone') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.personal_phone') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">*{{$t('add_prospect_details.mobile_phone')}}</label>
                                        <input
                                            type="number"
                                            name="name"
                                            class="form-control" />
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">{{$t('add_prospect_details.home_phone')}}</label>
                                        <input
                                        type="number"
                                        class="w-full form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.office_phone') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.office_phone') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">{{$t('add_prospect_details.office_phone')}}</label>
                                        <input
                                            type="number"
                                            id="txtOfficePhone"
                                            class="form-control" />
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">{{$t('add_prospect_details.extension_phone')}}</label>
                                        <input
                                        type="number"
                                        class="w-full form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-3">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.address')}}
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
                                  class="form-control col-span-3" />
                            </div>
                        </div>

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
                                    class="form-control">
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
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtStreet" class="form-label">{{ $t('add_prospect_address.street') }}</label>
                                        <input
                                          type="text"
                                          id="txtStreet"
                                          class="form-control"/>
                                    </div>
                                    
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 withlabel">
                                        <label for="txtOutdoor" class="form-label">{{ $t('add_prospect_address.outdoor') }}</label>
                                        <input
                                          type="text"
                                          id="txtOutdoor"
                                          class="form-control" />
                                    </div>
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 withlabel">
                                        <label for="txtIndoor" class="form-label">{{ $t('add_prospect_address.indoor') }}</label>
                                        <input
                                          type="text"
                                          id="txtIndoor"
                                          class="form-control" />
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
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtTown" class="form-label">{{ $t('add_prospect_address.town') }}</label>
                                        <input
                                          type="text"
                                          id="txtTown"
                                          class="form-control" />
                                    </div>
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtCity" class="form-label">{{ $t('add_prospect_address.city') }}</label>
                                        <input
                                          type="text"
                                          id="txtCity"
                                          class="form-control" />
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
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtState" class="form-label">{{ $t('add_prospect_address.state') }}</label>
                                        <input
                                          type="text"
                                          id="txtState"
                                          class="form-control" />
                                    </div>
                                    <div class="intro-y col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="txtCountry" class="form-label">{{ $t('add_prospect_address.country') }}</label>
                                        <input
                                          type="text"
                                          id="txtCountry"
                                          class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                

            </div>

            <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">                    
                <button class="w-full py-3 btn btn-primary md:w-52">
                  {{ $t('forms.next') }}
                </button>
            </div>

        </form>
                                           
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

    </div>

</template>

<style>
    .speciallabels .withlabel label.nolabel{ left:-5px}
    .speciallabels .withlabel label.form-check-label{ position:static}
    .vs__dropdown-toggle{border-color:rgb(var(--color-slate-200) / var(--tw-border-opacity));}
    .border-danger .vs__dropdown-toggle{border-color:rgb(var(--color-danger) / var(--tw-border-opacity))}
    @media (min-width: calc(1280px)){
        .mtlower{ margin-top:-20px}
    }
    .pb0{margin-bottom:-3.5rem}
    .companycontainer.flex .vs__dropdown-toggle{ border-radius:0.25rem 0px 0px 0.25rem}
    .speciallabels .vs__selected{ padding:0 .25em}
    .withmultiple .vs__dropdown-option--selected{ display:none} 
    .withlabel [disabled]{ background:#fff}
</style>