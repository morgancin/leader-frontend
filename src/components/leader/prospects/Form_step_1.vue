<script>
    export default {
        name: "ProspectStep1Form",
    }
</script>

<script setup>    
    import { onMounted, ref, watch, reactive } from 'vue';
    import { storeToRefs } from "pinia";

    import { numeric, required, email, minLength, maxLength } from '@vuelidate/validators';
    import {useVuelidate} from '@vuelidate/core';
    import Toastify from "toastify-js";
    import dom from "@left4code/tw-starter/dist/js/dom";
    
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    //Forms
    import CompanyForm from "@/components/leader/companies/Form.vue";
    
    //Stores
    import { useAccountsStore } from "../../../stores/leader/accounts";
    import { useCompaniesStore } from "../../../stores/leader/companies";
    import { useProspectsStore } from "../../../stores/leader/prospects";

    //Store methods
    import { useGetDatasTags } from '../../../composables/getData/useGetDatasTags';
    import { useGetDataProspectingSources } from '../../../composables/getData/useGetDataProspectingSources';

    const { fetchTags } = useGetDatasTags();
    const { fetchCurp } = useProspectsStore();
    const { fetchAccounts } = useAccountsStore();
    const { createCompany } = useCompaniesStore();
    const { fetchCompanies } = useCompaniesStore();
    const { fetchProspectingSources, fetchProspectingMeans, fetchProspectingMean } = useGetDataProspectingSources();
    
    //Catalogs
    const { accounts } = storeToRefs(useAccountsStore());
    const { companies } = storeToRefs(useCompaniesStore());
    const catalogs = ref({});
    
    onMounted(async() => {
        await fetchAccounts();
        await fetchCompanies();
        catalogs.value.tags = await fetchTags();
        catalogs.value.prospecting_sources = await fetchProspectingSources();
        if (props.prospect.prospecting_mean_id) {
          await fetchProspectingMean(props.prospect.prospecting_mean_id).then(async mean => {
            props.prospect.prospecting_source_id = mean.prospecting_source_id;
          })
        }
    });
    //////////
    
    const props = defineProps({
        prospect: {
            type: Object,
            required: true,
        }
    });
    const emit = defineEmits(["submit"]);
    
    ////////RULES
    const rules = {
        account_id: { required },
        last_name: { required },
        first_name: { required },
        email: { required, email },
        client_origin: { required },
        second_last_name:{ required },
        priority: { required },
        propecting_mean_id: { required },
        phone_mobile: {
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10)
        },
    }
    
    const rulesCurp = {
        first_name: {
            required,
            minLength: minLength(3),
        },
        last_name: {
            required,
            minLength: minLength(3),
        },
        gender: {
            required
        },        
        birth_date: {
            required
            //minLength: minLength(9),
            //maxLength: maxLength(10)
        },        
        birth_place: {
            required
        },
    }
    ////////////////
    
    const validate = useVuelidate(rules, props.prospect);

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
            /*
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
            */
        }

        const result = await validate.value.$validate();
        
        if (result) {
            //await createProspectActivity(data_prospect_activity);
            emit('submit');
        }
    }
    
    ////////ORIGINS & ORIGINS MEDIUMS
    watch(
        () => props.prospect.prospecting_source_id,
        async () => {
            catalogs.value.prospecting_means = await fetchProspectingMeans(props.prospect.prospecting_source_id);
        }
    );
    ////////////////
    
    ////////FETCH CURP
    const v2$ = useVuelidate(rulesCurp, props.prospect);
    const fecthCurpSubmit = async () => {
        const result = await v2$.value.$validate();

        if(result){
            fetchCurp();
        }
    }
    
    watch(
        () => props.prospect.first_name || props.prospect.last_name,
        () => {
            fecthCurpSubmit();
        }
    );
    watch(
        () => props.prospect.gender,
        () => {
            fecthCurpSubmit();
        }
    );
    watch(
        () => props.prospect.birth_date,
        () => {
            props.prospect.age = new Date(new Date() - new Date(props.prospect.birth_date)).getFullYear() - 1970;
            fecthCurpSubmit();
        }
    );
    watch(
        () => props.prospect.birth_place,
        () => {
            fecthCurpSubmit();
        }
    );
    watch(
        () => props.prospect.second_last_name,
        () => {
            fecthCurpSubmit();
        }
    );
    ////////////////
    const aEntidades = [
        { clv:'01', entidad: 'AGUASCALIENTES' },
        { clv:'02', entidad: 'BAJA CALIFORNIA' },
        { clv:'03', entidad: 'BAJA CALIFORNIA SUR' },
        { clv:'04', entidad: 'CAMPECHE' },
        { clv:'05', entidad: 'COAHUILA' },
        { clv:'06', entidad: 'COLIMA' },
        { clv:'07', entidad: 'CHIAPAS' },
        { clv:'08', entidad: 'CHIHUAHUA' },
        { clv:'09', entidad: 'DISTRITO FEDERAL' },
        { clv:'10', entidad: 'DURANGO' },
        { clv:'11', entidad: 'GUANAJUATO' },
        { clv:'12', entidad: 'GUERRERO' },
        { clv:'13', entidad: 'HIDALGO' },
        { clv:'14', entidad: 'JALISCO' },
        { clv:'15', entidad: 'ESTADO DE MEXICO' },
        { clv:'16', entidad: 'MICHOACAN' },
        { clv:'17', entidad: 'MORELOS' },
        { clv:'18', entidad: 'NAYARIT' },
        { clv:'19', entidad: 'NUEVO LEON' },
        { clv:'20', entidad: 'OAXACA' },
        { clv:'21', entidad: 'PUEBLA' },
        { clv:'22', entidad: 'QUERETARO' },
        { clv:'23', entidad: 'QUINTANA ROO' },
        { clv:'24', entidad: 'SAN LUIS POTOSI' },
        { clv:'25', entidad: 'SINALOA' },
        { clv:'26', entidad: 'SONORA' },
        { clv:'27', entidad: 'TABASCO' },
        { clv:'28', entidad: 'TAMAULIPAS' },
        { clv:'29', entidad: 'TLAXCALA' },
        { clv:'30', entidad: 'VERACRUZ' },
        { clv:'31', entidad: 'YUCATAN' },
        { clv:'32', entidad: 'ZACATECAS' },
        { clv:'87', entidad: 'DOBLE NACIONALIDAD' },
        { clv:'88', entidad: 'NACIDO EXTRANJERO O NATURALIZADO' },
    ];

    const priorities = [
        { key:'bajo', value: 'BAJO' },
        { key:'medio', value: 'MEDIO' },
        { key:'alto', value: 'ALTO' },
        { key:'pendiente', value: 'PENDIENTE' },
    ];
    
    //const format_start_date = ref(data_prospect_activity.start_date);
    const format_start_date = ref(new Date());
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
    const formCompanyData = reactive({
        name: '',
        phone: '',
        tax_id: '',
        address: '',
        website: '',
        comments: '',
        potential_value: ''
    });

    const submitCompany = async () => {
          await createCompany(formCompanyData)
    }
</script>

<template>
    <div class="speciallabels pb0">
        <form @submit.prevent="submitForm" autocomplete="on"> 
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
                                  <div class="font-medium">{{ $t('add_prospect_details.account') }}</div>
                                  <div
                                    class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                      {{ $t('forms.required') }}
                                  </div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.account') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0">
                              <v-select
                                label="name"
                                class="form-control"
                                :options="accounts"
                                v-model="prospect.account_id"
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
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.company') }}</div>
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
                                    :options="companies"
                                    :reduce="name => name.id"
                                    v-model="prospect.company_id">
                                  </v-select>
                                  <div class="z-30 flex items-center justify-center w-10 mr-1 border rounded-r bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 addmore" 
                                  :class="{ active: show_company_prospect }"
                                  @click="show_company_prospect = !show_company_prospect"><PlusIcon class="w-4 h-4" /></div>
                              </div>
                              <div class="col-span-12 input-form intro-y sm:col-span-12 speciallabels speciallabeleds">
                                  <CompanyForm
                                  :company="formCompanyData"
                                  @submit="submitCompany"
                                  @hideCompany="hideCompany"
                                  v-if="show_company_prospect" show />
                                </div>
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
                            <div class="flex-1 w-full mt-3 xl:mt-0">  
                                <div class="input-group">     
                                    <div class="input-group-text">$</div>                    
                                    <input
                                      type="number"
                                      name="name"
                                      class="form-control"
                                      v-model="prospect.email" />
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
                                            class="form-control"
                                            v-model="prospect.first_name"
                                            :class="{ 'border-danger': validate.first_name.$error }"/> 
                                        <template v-if="validate.first_name.$error">
                                            <div
                                                v-for="(error, index) in validate.first_name.$errors"
                                                :key="index"
                                                class="mt-2 text-danger">
                                                {{ error.$message }}
                                            </div>
                                        </template>
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            *{{ $t('add_prospect_details.last_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"
                                            v-model="prospect.last_name"
                                            :class="{ 'border-danger': validate.last_name.$error }"/> 
                                        <template v-if="validate.last_name.$error">
                                            <div
                                                v-for="(error, index) in validate.last_name.$errors"
                                                :key="index"
                                                class="mt-2 text-danger">
                                                {{ error.$message }}
                                            </div>
                                        </template>
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.second_last_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control"
                                            v-model="prospect.second_last_name"/> 
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.place_of_birth') }}</div>
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
                                    :options="aEntidades" 
                                    :reduce="entidad => entidad.clv"
                                    label="entidad"
                                    v-model="prospect.birth_place">
                                </v-select>
                            </div>
                        </div>



                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.profile') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.profile') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-5 md:col-span-4 lg:col-span-4 withlabel">
                                        <label class="nolabel">{{ $t('add_prospect_details.gender')}}</label>
                                        <div class="flex flex-col mt-3 sm:flex-row">
                                            <div class="mr-2 form-check">
                                                <input 
                                                    class="form-check-input" 
                                                    type="radio" 
                                                    name="female" 
                                                    value="female"  
                                                    id="female"
                                                    v-model="prospect.gender"/>
                                                <label class="form-check-label" for="female">{{ $t('add_prospect_details.female') }}</label>
                                            </div>
                                            <div class="mt-2 mr-2 form-check sm:mt-0">
                                                <input 
                                                    class="form-check-input" 
                                                    type="radio" 
                                                    name="male" 
                                                    value="male"
                                                    id="male" 
                                                    v-model="prospect.gender" />
                                                <label class="form-check-label" for="male">{{ $t('add_prospect_details.male') }}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-5 md:col-span-4 lg:col-span-4 withlabel">
                                        <label for="txtBirth_date" class="form-label">{{ $t('add_prospect_details.birth_date') }}</label>
                                        <Datepicker
                                          closeOnScroll
                                          :format="format_start_date"
                                          :enableTimePicker="false"
                                          id="txtBirth_date"
                                          v-model="prospect.birth_date" />
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-2 md:col-span-4 lg:col-span-4 withlabel">
                                        <label class="form-label">{{ $t('add_prospect_details.age') }}</label>
                                        <input type="number" class="form-control" minlength="1" maxlength="3" v-model="prospect.age" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.id-documents') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.id-documents') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">CURP</label>
                                        <input type="text" class="form-control" v-model="prospect.curp"  />
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">RFC</label>
                                        <input type="text" class="form-control" maxlength="16" v-model="prospect.rfc" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.email') }}</div>
                                  <div
                                    class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
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
                                  class="form-control"
                                  :class="{ 'border-danger': validate.email.$error }"
                                  v-model="prospect.email" />
                                <template v-if="validate.email.$error">
                                  <div
                                    v-for="(error, index) in validate.email.$errors"
                                    :key="index"
                                    class="mt-2 text-danger">
                                    {{ error.$message }}
                                  </div>
                                </template>
                            </div>
                        </div>


                    </div>
                </div>  


                <div class="col-span-12 p-5 mt-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                      <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.complementary-info')}}
                    </div>
                    <div class="mt-5">

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
                                            class="form-control"
                                            :class="{ 'border-danger': validate.phone_mobile.$error }"
                                            v-model.number="prospect.phone_mobile" />
                                        <template v-if="validate.phone_mobile.$error">
                                          <div
                                            v-for="(error, index) in validate.phone_mobile.$errors"
                                            :key="index"
                                            class="mt-2 text-danger">
                                            {{ error.$message }}
                                          </div>
                                        </template>
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">{{$t('add_prospect_details.home_phone')}}</label>
                                        <input
                                        type="number"
                                        class="w-full form-control"
                                        v-model.number="prospect.phone_home" />
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
                                            class="form-control"
                                            v-model="prospect.phone_office" />
                                    </div>

                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-6 withlabel">
                                        <label class="form-label">{{$t('add_prospect_details.extension_phone')}}</label>
                                        <input
                                        type="number"
                                        class="w-full form-control"
                                        v-model.number="prospect.phone_extension" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_prospect_details.priority') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_prospect_details.priority') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4 withlabel">
                                        <label class="form-label">*{{ $t('add_prospect_details.priority') }}</label>
                                        <v-select 
                                            class="form-control" 
                                            :options="priorities" 
                                            :reduce="value => value.key"
                                            label="value"
                                            v-model="prospect.priority"
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
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4 withlabel">
                                        <label class="form-label">*{{ $t('add_prospect_details.origin') }}</label>
                                        <v-select
                                            class="form-control"
                                            label="name"
                                            :options="catalogs.prospecting_sources"                            
                                            :reduce="object => object.id"
                                            v-model="prospect.prospecting_source_id"
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
                                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4 withlabel">
                                        <label class="form-label">*{{ $t('add_prospect_details.medium') }}</label>
                                        <v-select
                                            class="form-control"
                                            label="name"
                                            :options="catalogs.prospecting_means"
                                            :reduce="object => object.id"
                                            v-model="prospect.prospecting_mean_id"
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
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="form-label xl:w-72 xl:!mr-10">
                              <div class="text-left">
                                <div class="flex items-center">
                                  <div class="font-medium">{{ $t('add_tags.tags') }}</div>
                                </div>
                                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                  {{ $t('add_tags.tags') }}
                                </div>
                              </div>
                            </div>
                            <div class="flex-1 w-full mt-3 xl:mt-0 withmultiple">                      
                              <v-select
                                  multiple
                                  class="form-control"
                                  label="name"
                                  :options="catalogs.tags"
                                  :reduce="tag => tag.id"
                                  v-model="prospect.tags">
                              </v-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">                    
                <button class="w-full py-3 btn btn-primary md:w-52">
                  {{ $t('add_prospect_details.btn-next') }}
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
</style>