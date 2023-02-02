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
    import { useGetDatasTags } from '../../../composables/getDatas/useGetDatasTags';
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
        gender: { required },
        second_last_name: { required },
        last_name: { required },
        first_name: { required },
        birth_date: { required },
        birth_place: { required },
        email: { required, email },
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
    
    const v$ = useVuelidate(rules, toRefs(props.prospect));
    
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
        const result = await v$.value.$validate();
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
</script>

<template>
    <span v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}<br/>
    </span>
    <span v-for="error in v2$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}<br/>
    </span>
    <!-- <ul id="example-1">
        <li v-for="item in dataOrigins">
          {{ item.description }}
        </li>
      </ul>-->
    <!-- <div class="w-full border-t border-slate-200/60 dark:border-darkmode-400 border-dashed"></div> -->
    <div class="grid gap-3 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
            <!-- <form @submit.prevent="submitForm()" autocomplete="on"> -->
            <form @submit.prevent="submitForm" autocomplete="on">
                <div class="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                    <div class="input-form intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
                            *{{ $t('add_prospect_details.first_name') }}
                        <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <input
                            id="validation-form-1"
                            v-model.trim="v$.first_name.$model"
                            v-model="prospect.first_name"
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': v$.first_name.$error }"
                            :placeholder="$t('add_prospect_details.first_name')" /> 
                        <template v-if="v$.first_name.$error">
                            <div
                                v-for="(error, index) in v$.first_name.$errors"
                                :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                    <div class="input-form intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label w-full flex flex-col sm:flex-row">
                            *{{ $t('add_prospect_details.last_name') }}
                        <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <input
                            v-model.trim="v$.last_name.$model"
                            v-model="prospect.last_name"
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': v$.last_name.$error }"
                            :placeholder="$t('add_prospect_details.last_name')"  /> 
                        <template v-if="v$.last_name.$error">
                            <div
                                v-for="(error, index) in v$.last_name.$errors"
                                :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                    <div class="input-form intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label w-full flex flex-col sm:flex-row">
                            *{{ $t('add_prospect_details.second_last_name')}}
                        <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <input
                            v-model.trim="v$.second_last_name.$model"
                            v-model="prospect.second_last_name"
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': v$.second_last_name.$error }"
                            :placeholder="$t('add_prospect_details.second_last_name')"  /> 
                        <template v-if="v$.second_last_name.$error">
                            <div
                                v-for="(error, index) in v$.second_last_name.$errors"
                                :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                    <div class="input-form intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label w-full flex flex-col sm:flex-row">
                            *{{ $t('add_prospect_details.birth_date') }}
                        <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <input
                            v-model.trim="v$.birth_date.$model"
                            v-model="prospect.birth_date"
                            type="text"
                            name="name"
                            class="form-control"
                            :class="{ 'border-danger': v$.birth_date.$error }"
                            :placeholder="$t('add_prospect_details.birth_date')"  /> 
                        <template v-if="v$.birth_date.$error">
                            <div
                                v-for="(error, index) in v$.birth_date.$errors"
                                :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                    <!-- <div class="intro-y col-span-12 sm:col-span-6 md:col-span-6">
                        <label for="txtEmail" class="form-label">*{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <v-select  
                            class="form-control" 
                            :options="aEntidades" 
                            :reduce="entidad => entidad.clv"
                            label="entidad" 
                            :placeholder="$t('add_prospect_details.place_of_birth')"
                            v-model="prospect.birth_place"
                            
                            v-model.trim="v$.birth_place.$model"
                            :class="{ 'border-danger': v$.birth_place.$error }"
                            >
                        </v-select >
                        <template v-if="v$.birth_place.$error">
                            <div
                                v-for="(error, index) in v$.birth_place.$errors"
                                :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div> -->
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-6">
                        <label for="txtEmail" class="form-label">*{{ $t('add_prospect_details.place_of_birth') }}</label>
                        <v-select 
                            class="form-control" 
                            :options="aEntidades" 
                            :reduce="entidad => entidad.clv"
                            label="entidad" 
                            :placeholder="$t('add_prospect_details.place_of_birth')"
                            v-model="prospect.birth_place">
                        </v-select>
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-2">
                        <label class="form-label">{{ $t('add_prospect_details.age') }}</label>
                        <input type="number" class="form-control" minlength="1" maxlength="2"
                            :placeholder="$t('add_prospect_details.age')" v-model.number="prospect.age" />
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                        <label>*{{ $t('add_prospect_details.gender') }}</label>
                        <div class="flex  mt-2">
                            <div class="form-check mr-2">
                                <!-- flex-col sm:flex-row -->
                                <input 
                                  type="radio" 
                                  value="female" 
                                  class="form-check-input" 
                                  name="horizontal_radio_button"
                                  :placeholder="$t('add_prospect_details.female')" 
                                  v-model="prospect.gender"
                                  v-model.trim="v$.gender.$model" 
                                  :class="{ 'border-danger': v$.gender.$error }" 
                                  />
                                <label class="form-check-label" for="female">{{ $t('add_prospect_details.female') }}</label>
                                <template v-if="v$.gender.$error">
                                  <div 
                                    v-for="(error, index) in v$.gender.$errors" 
                                    :key="index" 
                                    class="text-danger mt-2">
                                    {{ error.$message }}
                                  </div>
                                </template>
                            </div>
                            <div class="form-check mr-2 mt-2 sm:mt-0">
                                <input 
                                  type="radio" 
                                  value="male" 
                                  class="form-check-input" 
                                  name="horizontal_radio_button"
                                  :placeholder="$t('add_prospect_details.male')" 
                                  v-model="prospect.gender"
                                  v-model.trim="v$.gender.$model" 
                                  :class="{ 'border-danger': v$.gender.$error }" 
                                  />
                                <label class="form-check-label" for="male">{{ $t('add_prospect_details.male') }}</label>
                                <template v-if="v$.gender.$error">
                                  <div 
                                    v-for="(error, index) in v$.gender.$errors" 
                                    :key="index" 
                                    class="text-danger mt-2">
                                    {{ error.$message }}
                                </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label">CURP</label>
                        <input type="text" class="form-control" placeholder="CURP" v-model="prospect.curp" disabled="prospect.curp" />
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label">RFC</label>
                        <input type="text" class="form-control" placeholder="RFC" maxlength="16" v-model="prospect.rfc" />
                    </div>
                    <div class="input-form intro-y col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3">
                        <label class="form-label w-full flex flex-col sm:flex-row">
                             *{{ $t('add_prospect_details.email') }}
                        <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                            Required, at least 2 characters
                        </span> -->
                        </label>
                        <input
                          v-model.trim="v$.email.$model"
                          v-model="prospect.email"
                          type="text"
                          name="name"
                          class="form-control"
                          :class="{ 'border-danger': v$.email.$error }"
                          :placeholder="$t('add_prospect_details.email')"  /> 
                        <template v-if="v$.email.$error">
                          <div
                            v-for="(error, index) in v$.email.$errors"
                            :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                          </div>
                        </template>
                    </div>

                    <div class="dark:border-darkmode-400 intro-y col-span-12"> <hr> </div>
    
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.mobile_phone') }}</label>
                        <input type="text" class="form-control w-full"
                            :placeholder="$t('add_prospect_details.mobile_phone')" v-model.number="prospect.phone_mobile" />
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.home_phone') }}</label>
                        <input type="text" class="form-control w-full" :placeholder="$t('add_prospect_details.home_phone')"
                            v-model.number="prospect.phone_home" />
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                        <label for="txtOfficePhone" class="form-label">{{ $t('add_prospect_details.office_phone') }}</label>
                        <input type="text" id="txtOfficePhone" class="form-control"
                            :placeholder="$t('add_prospect_details.office_phone')" v-model="prospect.phone_office" />
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-2">
                        <label class="form-label">{{ $t('add_prospect_details.extension_phone') }}</label>
                        <input type="number" class="form-control" :placeholder="$t('add_prospect_details.extension_phone')"
                            v-model.number="prospect.extension" />
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                        <label class="form-label">*{{ $t('add_prospect_details.service_priority') }}</label>
                        <v-select class="form-control" :options="aServicePriority" :reduce="value => value.key"
                            label="value" :placeholder="$t('add_prospect_details.service_priority')"
                            v-model="prospect.service_priority">
                        </v-select>
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-4">
                        <label class="form-label">{{ $t('add_prospect_details.origin') }}</label>
                        <v-select class="form-control" :options="dataOrigins"
                            :reduce="description => description.id" label="description"
                            :placeholder="$t('add_prospect_details.origin')" v-model="prospect.client_origin">
                        </v-select>
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-3">
                        <label class="form-label">{{ $t('add_prospect_details.medium') }}</label>
                        <v-select class="form-control" :options="dataOriginsMediums"
                            :reduce="description => description.id" label="description"
                            :placeholder="$t('add_prospect_details.medium')" v-model="prospect.client_medium_origin_id">
                        </v-select>
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-4">
                        <label class="form-label">Tags</label>
                        <v-select class="form-control" :options="dataTags_tag" :reduce="name => name.id" label="name">
                        </v-select>
                    </div>
                    <div class="intro-y col-span-12 sm:col-span-6 md:col-span-4">
                        <label class="form-label">List</label>
                        <v-select class="form-control" :options="dataTags_list" :reduce="name => name.id" label="name">
                        </v-select>
                    </div>

                    <div class="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                        <!-- <button class="btn btn-secondary w-24" disabled>Previous</button> -->
                        <button class="btn btn-primary w-24 ml-2">{{ $t('add_prospect_details.btn_prev') }}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>


</template>