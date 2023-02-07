<script>
    export default {
        name: "ProspectStep1Form",
    }
</script>

<script setup>    
    import { onMounted, ref, watch, toRefs } from 'vue';
    import { storeToRefs } from "pinia";

    import { required, email, minLength, maxLength } from '@vuelidate/validators';
    import {useVuelidate} from '@vuelidate/core';
    import Toastify from "toastify-js";
    import dom from "@left4code/tw-starter/dist/js/dom";
    
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    
    import { useProspectsStore } from "../../../stores/leader/prospects";

    /////
    import { useGetDatasTags } from '../../../composables/getData/useGetDatasTags';

    // const selectMultiple = ref(["1", "3"]);
	
    const { fetchTags, results, error } = useGetDatasTags();
    
    const dataTags_tag = ref([]);
    const dataTags_list = ref([]);
    
    onMounted(async() => {
        await fetchTags('tag');
        dataTags_tag.value = results.value;
        await fetchTags('list');
        dataTags_list.value = results.value;
    });
    //////////

    const { fetchOrigins, fetchOriginsMediums, fetchCurp } = useProspectsStore();   //ACTIONS
    
    const props = defineProps({
        prospect: {
            type: Object,
            required: true,
        }
    });
    const emit = defineEmits(["submit"]);

    ////////RULES
    const rules = {
        // curp: { required },
        // gender: { required },
         // birth_date: { required },
        // birth_place: { required },
        // second_last_name: { required },
        last_name: { required },
        first_name: { required },
        email: { required, email },
        phone_mobile: { required },
        service_priority: { required },
        //client_origin: { required },
        //client_medium_origin_id: { required }
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
            required,
            minLength: minLength(10),
            maxLength: maxLength(10)
        },
        birth_place: {
            required
        },
    }
    ////////////////
    
    const validate = useVuelidate(rules, toRefs(props.prospect));
    
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
        () => props.prospect.first_name,
        () => {
            fecthCurpSubmit();
        }
    );
    watch(
        () => props.prospect.last_name,
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
    const aServicePriority = [
        { key:'bajo', value: 'BAJO' },
        { key:'medio', value: 'MEDIO' },
        { key:'alto', value: 'ALTO' },
        { key:'pendiente', value: 'PENDIENTE' },
    ];
    
    // const bod = () => {
    //     // const anioActual = ref('2022-01-01');
    //     const anioActual = 2022
    //     const calAge = props.prospect.birth_date
    //     // const calAge = 1900
    //     const result = anioActual - calAge
    //     console.log(result);
    // }
</script>

<template>
    <!-- <span v-for="error in validate.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}<br/>
    </span>
    <span v-for="error in v2$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}<br/>
    </span> -->

    <!-- <button class="w-24 ml-2 btn btn-primary" @click="bod">bod</button> -->
    <!-- <ul id="example-1">
        <li v-for="item in dataOrigins">
          {{ item.description }}
        </li>
      </ul>-->
    <!-- <div class="w-full border-t border-dashed border-slate-200/60 dark:border-darkmode-400"></div> -->
    <div class="grid gap-3 mt-5">
        <div class="col-span-12 intro-y lg:col-span-6">
            <!-- <form @submit.prevent="submitForm()" autocomplete="on"> -->
            <form @submit.prevent="submitForm" autocomplete="on">
                <div class="grid grid-cols-12 gap-4 mt-5 gap-y-5">
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                            *{{ $t('add_prospect_details.first_name') }}
                        <!-- <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <!-- v-model.trim="validate.first_name.$model"
                            v-model="validate.first_name.$model"
                             -->
                        <input
                            id="validation-form-1"
                            type="text"
                            name="name"
                            class="form-control"
                            v-model="prospect.first_name"
                            :class="{ 'border-danger': validate.first_name.$error }"
                            :placeholder="$t('add_prospect_details.first_name')" /> 
                        <template v-if="validate.first_name.$error">
                            <div
                                v-for="(error, index) in validate.first_name.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">
                            *{{ $t('add_prospect_details.last_name') }}
                        <!-- <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <input
                            type="text"
                            name="name"
                            class="form-control"
                            :placeholder="$t('add_prospect_details.last_name')"
                            :class="{ 'border-danger': validate.last_name.$error }"
                            v-model="prospect.last_name"/> 
                            <!-- v-model.trim="validate.last_name.$model"
                            v-model="prospect.last_name" -->
                        <template v-if="validate.last_name.$error">
                            <div
                                v-for="(error, index) in validate.last_name.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.second_last_name')}}</label>
                        <input
                            type="text"
                            class="w-full form-control"
                            :placeholder="$t('add_prospect_details.second_last_name')"
                            v-model="prospect.second_last_name" />
                    </div>

                    <!-- <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">
                            *{{ $t('add_prospect_details.second_last_name')}}
                        <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                        </span>
                        </label>
                        <input
                            v-model="validate.second_last_name.$model"
                            
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': validate.second_last_name.$error }"
                            :placeholder="$t('add_prospect_details.second_last_name')"  /> 
                        <template v-if="validate.second_last_name.$error">
                            <div
                                v-for="(error, index) in validate.second_last_name.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div> -->
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label for="txtBirth_date" class="form-label">{{ $t('add_prospect_details.birth_date') }}</label>
                        <input
                            type="text"
                            id="txtBirth_date"
                            class="w-full form-control"
                            :placeholder="$t('add_prospect_details.birth_date')"
                            v-model="prospect.birth_date" />
                    </div>
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                        <label for="cmbEmail" class="form-label">{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <v-select
                            id="cmbEmail"
                            class="form-control" 
                            :options="aEntidades" 
                            :reduce="entidad => entidad.clv"
                            label="entidad"
                            :placeholder="$t('add_prospect_details.place_of_birth')"
                            v-model="prospect.birth_place">
                        </v-select>
                    </div>

                    <!-- <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">
                            *{{ $t('add_prospect_details.birth_date') }}
                        <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                        </span>
                        </label>
                        <input
                            v-model="validate.birth_date.$model"
                            id="bod"
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': validate.birth_date.$error }"
                            :placeholder="$t('add_prospect_details.birth_date')"  /> 
                        <template v-if="validate.birth_date.$error">
                            <div
                                v-for="(error, index) in validate.birth_date.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div> -->

                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <input type="text" class="w-full form-control"
                            :placeholder="$t('add_prospect_details.place_of_birth')" v-model="prospect.birth_place" />
                    </div> -->

                    <!-- BEGIN: Nested Select -->
                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                        <label class="form-label">{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <div class="mt-2">
                            <TomSelect 
                            v-model="prospect.birth_place" >
                                <optgroup :label="$t('add_prospect_details.place_of_birth')">
                                    <option 
                                    :placeholder="$t('add_prospect_details.service_priority')" 
                                    v-for="option in aEntidades" 
                                    :key="option" 
                                    :value="option.entidad">{{ option.entidad }}</option>
                                </optgroup>
                            </TomSelect>
                        </div>
                    </div> -->
                     <!-- END: Nested Select -->
                     
                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                        <label for="txtEmail" class="form-label">*{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <v-select  
                            class="form-control" 
                            :options="aEntidades" 
                            :reduce="entidad => entidad.clv"
                            label="entidad" 
                            :placeholder="$t('add_prospect_details.place_of_birth')"
                            v-model="validate.birth_place.$model"
                            :class="{ 'border-danger': validate.birth_place.$error }"
                            >
                        </v-select >
                        <template v-if="validate.birth_place.$error">
                            <div
                                v-for="(error, index) in validate.birth_place.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div> -->

                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6">
                        <label for="txtEmail" class="form-label">*{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <v-select 
                            class="form-control" 
                            :options="aEntidades" 
                            :reduce="entidad => entidad.clv"
                            label="entidad" 
                            :placeholder="$t('add_prospect_details.place_of_birth')"
                            v-model="prospect.birth_place">
                        </v-select>
                    </div> -->

                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label>{{ $t('add_prospect_details.gender')}}</label>
                        <div class="flex flex-col mt-2 sm:flex-row">
                            <div class="mr-2 form-check">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="horizontal_radio_button" 
                                    value="female"  
                                    v-model="prospect.gender"/>
                                <label class="form-check-label" for="female">{{ $t('add_prospect_details.female') }}</label>
                            </div>
                            <div class="mt-2 mr-2 form-check sm:mt-0">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="horizontal_radio_button" 
                                    value="male" 
                                    v-model="prospect.gender" />
                                <label class="form-check-label" for="male">{{ $t('add_prospect_details.male') }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4 lg:col-span-3">
                        <label>*{{ $t('add_prospect_details.gender') }}</label>
                        <div class="flex mt-2">
                            <div class="mr-2 form-check">
                                
                                <input 
                                  type="radio" 
                                  value="female" 
                                  class="form-check-input" 
                                  name="horizontal_radio_button"
                                  :placeholder="$t('add_prospect_details.female')" 
                                  v-model="validate.gender.$model" 
                                  :class="{ 'border-danger': validate.gender.$error }" 
                                  />
                                <label class="form-check-label" for="female">{{ $t('add_prospect_details.female') }}</label>
                                <template v-if="validate.gender.$error">
                                  <div 
                                    v-for="(error, index) in validate.gender.$errors" 
                                    :key="index" 
                                    class="mt-2 text-danger">
                                    {{ error.$message }}
                                  </div>
                                </template>
                            </div>
                            <div class="mt-2 mr-2 form-check sm:mt-0">
                                <input 
                                  type="radio" 
                                  value="male" 
                                  class="form-check-input" 
                                  name="horizontal_radio_button"
                                  :placeholder="$t('add_prospect_details.male')" 
                                  v-model="validate.gender.$model" 
                                  :class="{ 'border-danger': validate.gender.$error }" 
                                  />
                                <label class="form-check-label" for="male">{{ $t('add_prospect_details.male') }}</label>
                                <template v-if="validate.gender.$error">
                                  <div 
                                    v-for="(error, index) in validate.gender.$errors" 
                                    :key="index" 
                                    class="mt-2 text-danger">
                                    {{ error.$message }}
                                </div>
                                </template>
                            </div>
                        </div>
                    </div> -->

                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-2">
                        <label class="form-label">{{ $t('add_prospect_details.age') }}</label>
                        <input type="number" class="form-control" minlength="1" maxlength="2"
                            :placeholder="$t('add_prospect_details.age')" v-model.number="prospect.age" />
                    </div>
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label">CURP</label>
                        <input type="text" class="form-control" placeholder="CURP" v-model="prospect.curp"  />
                    </div>
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label">RFC</label>
                        <input type="text" class="form-control" placeholder="RFC" maxlength="16" v-model="prospect.rfc" />
                    </div>
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">
                             *{{ $t('add_prospect_details.email') }}
                        <!-- <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                        </span>
                        v-model="validate.email.$model" -->
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="form-control"
                          :class="{ 'border-danger': validate.email.$error }"
                          :placeholder="$t('add_prospect_details.email')"
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

                    <div class="col-span-12 dark:border-darkmode-400 intro-y"> <hr> </div>
    
                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">*{{ $t('add_prospect_details.mobile_phone') }}</label>
                        <input type="text" class="w-full form-control"
                            :placeholder="$t('add_prospect_details.mobile_phone')" v-model.number="prospect.phone_mobile" />
                    </div>
                    v-model.number="validate.phone_mobile.$model" -->

                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">
                             *{{ $t('add_prospect_details.mobile_phone') }}
                        </label>
                        <input
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': validate.phone_mobile.$error }"
                            :placeholder="$t('add_prospect_details.mobile_phone')"
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

                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.home_phone') }}</label>
                        <input
                            type="text"
                            class="w-full form-control"
                            :placeholder="$t('add_prospect_details.home_phone')"
                            v-model.number="prospect.phone_home" />
                    </div>
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label for="txtOfficePhone" class="form-label">{{ $t('add_prospect_details.office_phone') }}</label>
                        <input
                            type="text"
                            id="txtOfficePhone"
                            class="form-control"
                            :placeholder="$t('add_prospect_details.office_phone')"
                            v-model="prospect.phone_office" />
                    </div>
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-2">
                        <label class="form-label">{{ $t('add_prospect_details.extension_phone') }}</label>
                        <input
                            type="number"
                            class="form-control"
                            :placeholder="$t('add_prospect_details.extension_phone')"
                            v-model.number="prospect.extension" />
                    </div>
                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">*{{ $t('add_prospect_details.service_priority') }}</label>
                        <v-select class="form-control" :options="aServicePriority" :reduce="value => value.key"
                            label="value" :placeholder="$t('add_prospect_details.service_priority')"
                            v-model="prospect.service_priority">
                        </v-select>
                    </div>
                    v-model="validate.service_priority.$model" -->
                    <!-- /el bueno -->

                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">*{{ $t('add_prospect_details.service_priority') }}</label>
                        <v-select 
                            class="form-control" 
                            :options="aServicePriority" 
                            :reduce="value => value.key"
                            label="value"
                            v-model="prospect.service_priority"
                            :class="{ 'border-danger': validate.service_priority.$error }">
                        </v-select>
                        <template v-if="validate.service_priority.$error">
                          <div
                            v-for="(error, index) in validate.service_priority.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                    </div>
                    <!-- /el bueno -->
                    <!-- BEGIN: Basic Select -->
                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">
                            {{ $t('add_prospect_details.service_priority') }} prueba tom-select</label>
                        <div class="mt-2">
                            <TomSelect
                                v-model="validate.service_priority"
                                :class="{ 'border-danger': validate.service_priority.$error }">
                                <option 
                                    :placeholder="$t('add_prospect_details.service_priority')" 
                                    v-for="option in aServicePriority" 
                                    :key="option" 
                                    :value="option.key">
                                        {{ option.value }}
                                </option>
                            </TomSelect>
                            <template v-if="validate.service_priority.$error">
                            <div
                                v-for="(error, index) in validate.service_priority.$errors"
                                :key="index"
                                class="mt-2 text-danger">
                                {{ error.$message }}
                            </div>
                            </template>
                        </div>
                    </div> -->
                    <!-- END: Basic Select -->
                    
                        <!-- BEGIN: Multiple Select -->
                        <!-- <PreviewComponent class="mt-5 intro-y box" >
                            <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                <h2 class="mr-auto text-base font-medium">{{ $t('add_prospect_details.service_priority') }}</h2>
                            <div class="w-full mt-3 form-check form-switch sm:w-auto sm:ml-auto sm:mt-0">
                                
                                v-model="validate.service_priority.$model"
                            :class="{ 'border-danger': validate.service_priority.$error }"
                            
                            </div>
                            </div>
                            <div class="p-5">
                            <Preview>
                                <TomSelect
                                    selectMultiple
                                    v-model="selectMultiple"
                                    :placeholder="$t('add_prospect_details.service_priority')"
                                    class="w-full"
                                    multiple>
                                v-model="selectMultiple"
                                <option v-for="option in aServicePriority" :key="option" :value="option.value">{{ option.value }}</option>
                                </TomSelect>
                            </Preview>
                            </div>
                        </PreviewComponent> -->
                        <!-- END: Multiple Select -->

                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4">
                        <label class="form-label">{{ $t('add_prospect_details.origin') }}</label>
                        <v-select class="form-control" :options="dataOrigins"
                            :reduce="description => description.id" label="description"
                            :placeholder="$t('add_prospect_details.origin')" v-model="prospect.client_origin">
                        </v-select>
                    </div>
                    v-model="validate.client_origin.$model" -->
                    <!--
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.origin') }}</label>
                        <v-select
                            label="description"
                            class="form-control" 
                            :options="dataOrigins"
                            :reduce="description => description.id"
                            v-model="prospect.client_origin"
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
                    -->

                    <!-- <div class="col-span-12 intro-y sm:col-span-6 md:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.medium') }}</label>
                        <v-select class="form-control" :options="dataOriginsMediums"
                            :reduce="description => description.id" label="description"
                            :placeholder="$t('add_prospect_details.medium')" v-model="prospect.client_medium_origin_id">
                        </v-select>
                    </div>
                    v-model="validate.client_medium_origin_id.$model" -->
                    <!--
                    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-3">
                        <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.medium') }}</label>
                        <v-select 
                            class="form-control" 
                            :options="dataOriginsMediums"
                            :reduce="description => description.id" 
                            label="description"
                            v-model="prospect.client_medium_origin_id"
                            :class="{ 'border-danger': validate.client_medium_origin_id.$error }">
                        </v-select>
                        
                        <template v-if="validate.client_medium_origin_id.$error">
                          <div
                            v-for="(error, index) in validate.client_medium_origin_id.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                    </div>
                -->

                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4">
                        <label class="form-label">Tags</label>
                        <v-select
                            class="form-control"
                            :options="dataTags_tag"
                            :reduce="name => name.id"
                            label="name">
                        </v-select>
                    </div>
                    <div class="col-span-12 intro-y sm:col-span-6 md:col-span-4">
                        <label class="form-label">List</label>
                        <v-select
                            class="form-control"
                            :options="dataTags_list"
                            :reduce="name => name.id"
                            label="name">
                        </v-select>
                    </div>
                    
                    <div class="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end">
                        <!-- <button class="w-24 btn btn-secondary" disabled>Previous</button> -->
                        <button class="w-24 ml-2 btn btn-primary">{{ $t('add_prospect_details.btn_prev') }}</button>
                    </div>
                </div>
            </form>
            <!-- BEGIN: Success Notification Content -->
            <!-- <div
              id="success-notification-content"
              class="flex hidden toastify-content">
              <CheckCircleIcon class="text-success" />
              <div class="ml-4 mr-4">
                <div class="font-medium">{{ $t('add_user.registration_success') }}</div>
                <div class="mt-1 text-slate-500">
                  {{ $t('add_user.check_success') }}
                </div>
              </div>
            </div> -->
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
        </div>
    </div>


</template>