<script>
    export default {
        name: "CompanyForm",
    }
</script>

<script setup>
  import { ref, provide, toRefs } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import {
    required,
    minLength,
    maxLength,
    email,
    numeric
  } from "@vuelidate/validators";
  import Toastify from "toastify-js";
  import dom from "@left4code/tw-starter/dist/js/dom";
  
  const props = defineProps({
        company: {
            type: Object,
            required: true,
        },
        // textButton: {
        //     type: String,
        //     default: "Save",
        // },
    })

    const emit = defineEmits(["submit"]);

    const rules = {
      name: {
        required,
      },
    };

  const v$ = useVuelidate(rules, toRefs(props.company));

  const submitForm = async () => {

    v$.value.$touch();
    if (v$.value.$invalid) {
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

    const result = await v$.value.$validate()
      if(result) {
        emit('submit')
      } 
  } 
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    
    <form class="validate-form" @submit.prevent="submitForm">
      <div class="p-5 intro-y box">
    
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
            <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('add_companies.add_company')}}
            </div>
            <div class="mt-5 fieldscontainer">  
                <!-- BEGIN: Form Layout -->
                <!-- <form @submit.prevent="submitForm()" autocomplete="on"> -->
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.name') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('forms.required') }}
                          </div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Nombre de la compañía, espacio para caracteres alfanúmericos.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel">
                      <label class="form-label">{{$t('add_companies.name')}} *</label>
                      <input 
                        id="validation-form-1" 
                        v-model.trim="v$.name.$model" 
                        v-model="company.name" 
                        type="text" 
                        name="name"
                        class="form-control" 
                        :class="{ 'border-danger': v$.name.$error }" />
                      <!--<div class="text-right form-help">
                        Deben ser al menos 2 caracteres.
                      </div>-->
                      <template v-if="v$.name.$error">
                        <div 
                          v-for="(error, index) in v$.name.$errors" 
                          :key="index" 
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>
                  
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.tax') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          RFC
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel">
                      <label class="form-label">{{$t('add_companies.tax')}}</label>
                      <input
                        type="text"
                        class="w-full form-control"
                        v-model.number="company.tax_id" />                      
                    </div>
                  </div>

                  
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.phone') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Teléfono.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel">
                      <label class="form-label">{{$t('add_companies.phone')}}</label>
                      <input 
                      v-model.number="company.phone" 
                      type="text" class="w-full form-control"/>
                      <!--<div class="text-right form-help">
                          Deben ser 5 caracteres.
                      </div>-->
                    </div>
                  </div>

                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.website') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Sitio Web.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel">
                      <label class="form-label">{{$t('add_companies.website')}}</label>
                      <input 
                      v-model.number="company.website" 
                      type="text" class="w-full form-control"/>
                      <!--<div class="text-right form-help">
                          Deben ser 5 caracteres.
                      </div>-->
                    </div>
                  </div>

                 <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.address') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Dirección.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel">
                      <label class="form-label">{{$t('add_companies.address')}}</label>
                      <input 
                      v-model.number="company.adress" 
                      type="text" class="w-full form-control"/>
                      <!--<div class="text-right form-help">
                          Deben ser 5 caracteres.
                      </div>-->
                    </div>
                  </div>


                  

                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.potential') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          {{ $t('add_companies.potential') }}
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel forgroup">
                      <label class="form-label">{{$t('add_companies.potential')}}</label>
                      <div class="input-group">     
                        <div class="input-group-text">$</div>               
                        <input
                          type="number"
                          class="w-full form-control"
                          v-model.number="company.potential_value" />                        
                      </div>
                                            
                    </div>
                  </div>

                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.comments') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Comentarios.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0 withlabel">
                      <label class="form-label">{{$t('add_companies.comments')}}</label>
                      <input
                        type="text"
                        class="w-full form-control"
                        v-model.number="company.comments" />
                        <!--
                        <div class="text-right form-help">
                            Deben ser 5 caracteres.
                        </div>
                        -->
                    </div>
                  </div>


              </div>
              <!-- END: Form Layout -->
          </div>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button
          type="button"
          class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
            {{ $t('add_companies.btn_cancel') }}
        </button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">
          {{ $t('add_companies.btn_save') }}
        </button>
      </div>
    </form>

    <!--<div>
      <p>Errors:</p>
      <span v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}
      </span>
    </div>-->
    <!-- BEGIN: Success Notification Content -->
    <div
      id="success-notification-content"
      class="flex hidden toastify-content">
      <CheckCircleIcon class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ $t('add_companies.registration_success') }}</div>
        <div class="mt-1 text-slate-500">
          {{ $t('add_companies.check_success') }}
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
        <div class="font-medium">{{ $t('add_companies.registration_failed') }}</div>
        <div class="mt-1 text-slate-500">
          {{ $t('add_companies.check_failed') }}
        </div>
      </div>
    </div>
    <!-- END: Failed Notification Content -->

  </div>

</template>
<style>
  .withlabel label{display:none}  
  .speciallabels.speciallabeleds .col-span-12.intro-y{border:2px dashed rgb(var(--color-slate-200) / 1); border-radius:0.375rem; 
  background:rgb(var(--color-slate-50) / var(--tw-bg-opacity)); box-shadow:0px 3px 20px #0000000b; background:#fff}
  .speciallabels.speciallabeleds label{background:rgb(var(--color-slate-50) / var(--tw-bg-opacity))!important; background:#fff!important;
   border-radius:4px}
    .speciallabels.speciallabeleds .form-control{ background:#fff}
  .speciallabels .withlabel label.form-label,.speciallabels .withlabel label.form-check-label,.speciallabels .withlabel label.nolabel{display:block}
  .speciallabels.speciallabeleds .form-label{display:none}
  .speciallabels.speciallabeleds .p-5.intro-y.box{ background-color:transparent; box-shadow:none; padding-bottom:0px}
    .speciallabels.speciallabeleds .p-5.intro-y.box .p-5.border{background:transparent; padding:0px; border:0px none}
  .speciallabels.speciallabeleds .fieldscontainer{ display:grid!important; grid-template-columns: repeat(2, 1fr); grid-column-gap: 1rem;}
  .speciallabels.speciallabeleds .first\:mt-0{ padding-top:0px; margin-top:0px; margin-bottom:20px}
  .speciallabels.speciallabeleds .first\:mt-0:nth-child(7){ width:calc(200% + 1rem)}
  .speciallabels.speciallabeleds .flex.items-center.pb-5.text-base.font-medium.border-b{ padding-bottom:1rem; font-size:0.7rem}
  .speciallabels.speciallabeleds .btn{ margin-bottom:1.25rem; width:5rem; padding:0.35rem; display:none}
  .speciallabels.speciallabeleds .btn.btn-primary{margin-right:1.25rem; display:block}
  .speciallabels.speciallabeleds .flex.flex-col.justify-end.gap-2.mt-5{ margin-top:0px}
  .speciallabels .forgroup.withlabel label{ left:40px; z-index:99}
</style>
