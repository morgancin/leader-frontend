<script>
    export default {
        name: "ContractStep6Form",
    }
</script>

<script setup>
    import { watch, ref, reactive } from 'vue';
    import { storeToRefs } from "pinia";

    import useVuelidate from '@vuelidate/core';
    import { required, integer, minLength, maxLength } from '@vuelidate/validators';
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
            required: true
        }
    })
    const emit = defineEmits(["submit","previousStep"]);
    ////////RULES
    const rules = {
    }
    ////////////////
    const validate = useVuelidate(rules, props.contract);
    
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

        if(result){
            emit('submit')
        }
    }
    
    const prevStep = async() => {
      emit('previousStep')
    }    

            
    const show_invoicing = ref(false);
    const show_copyname = ref(false);

</script>

<template>
    
    <div class="pb0">

        <form @submit.prevent="submitForm()" autocomplete="on">

            <div class="gap-3 mt0">

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.step6')}}</div>                      
                    </div>
                    <div class="mt-5">

                        <div class="caracteristicas">                        
                            <div class="form-check mt-5">
                                <input id="vertical-form-invoicing" class="form-check-input" type="checkbox" value="">
                                <label class="form-check-label" for="vertical-form-invoicing" @click="show_invoicing = !show_invoicing">{{$t("contracts.want_invoice")}}</label>
                            </div>
                            <div class="form-check mt-5">
                                <input id="vertical-form-copyname" class="form-check-input" type="checkbox" value="">
                                <label class="form-check-label" for="vertical-form-copyname" @click="show_copyname = !show_copyname">{{$t("contracts.copyname")}}</label>
                            </div>
                        </div>
                                                
                        <div v-if="show_invoicing" class="mt-7 speciallabels">
                            <hr>
                            <div class="flex-col items-start pt-5 mt-3 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-72 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('contracts.step6') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('contracts.step6') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full xl:mt-0 withlabel">
                                    <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                        <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                            <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                                *RFC                        
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
                                    </div>
                                </div>
                            </div>
                            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                                <div class="form-label xl:w-72 xl:!mr-10">
                                  <div class="text-left">
                                    <div class="flex items-center">
                                      <div class="font-medium">{{ $t('add_user.email') }}</div>
                                      <div
                                        class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                          {{ $t('forms.required') }}
                                      </div>
                                    </div>
                                    <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                      {{ $t('add_user.email') }}
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-1 w-full xl:mt-0">
                                    <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                        <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-12 withlabel">
                                            <input
                                                id="validation-form-1"
                                                type="text"
                                                name="name"
                                                class="form-control"/> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        

                    </div>
                </div>

                

            </div>
            

            <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">     
                <button 
                    class="btn btn-secondary md:w-52"                    
                    @click="prevStep">
                    {{ $t('add_prospect_address.btn-prev') }}
                    </button>               
                <button 
                    class="w-full py-3 btn btn-primary md:w-52"
                    @click="submitStep">
                    {{ $t('add_prospect_details.btn-next') }}
                </button>
            </div>

        </form>
    </div>

    
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
.speciallabels .withlabel label.nolabel{ left:-5px}
.speciallabels .withlabel label.form-check-label{ position:static}
.vs__dropdown-toggle{border-color:rgb(var(--color-slate-200) / var(--tw-border-opacity));}
.border-danger .vs__dropdown-toggle{border-color:rgb(var(--color-danger) / var(--tw-border-opacity))}
.pb0{margin-bottom:-3.5rem}
.caracteristicas span,.caracteristicas ul li{ line-height:1.7}
.caracteristicas ul{ margin:1.25rem}
.caracteristicas ul li{ list-style-type:circle; display:list-item}
</style>