<script>
    export default {
        name: "ContractStep7Form",
    }
</script>

<script setup>
    import { watch, ref, reactive, toRefs } from 'vue';
    import { storeToRefs } from "pinia";
    import { VueSignaturePad } from "vue-signature-pad";

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
        else {
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
            //emit('submit')
        }
    }
    
    const prevStep = async() => {
      emit('previousStep')
    }    

    const signaturePad = ref(null);

    const save = async(e) => {
        //console.log(signaturePad);
        //console.log(signaturePad.value);
        //alert("save");
        const { isEmpty, data } = signaturePad.value.saveSignature();
        console.log(isEmpty);
        console.log(data);
        e.preventDefault();
    }

    const undo = async(e) => {
        //alert("undo");
        signaturePad.value.undoSignature();
        e.preventDefault();
    }

    

</script>

<template>
    
    <div class="pb0">

        <form @submit.prevent="submitForm()" autocomplete="on">

            <div class="gap-3 mt0">

                <!--inicio de contract holder-->
                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 box">
                    <div class="flex items-center pb-5 text-base border-b  sm:flex-row alert show box bg-secondary text-slate-800 flex items-center mb-6">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.data_holder')}}</div>                      
                    </div>
                    <div class="mt-10 speciallabels withoutborder">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.first_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Ángel Raúl"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.last_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Cobos"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.second_last_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Ortega"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-0 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.gender') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Masculino"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.birth_date') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="10/03/1965"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.place_of_birth') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Aguascalientes"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            CURP                  
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="COCA650310HASBBN07"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-0 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.mobile_phone') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="2291748371"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.home_phone') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Sin información"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.office_phone') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="2291748371"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.extension_phone') }}                          
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="Sin información"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="flex items-center pb-5 text-base sm:flex-row mt-5">
                      <div class="flex items-center mr-auto text-base font-medium text-slate-400 ml-3"> {{$t('contracts.address')}}</div>                      
                    </div>

                    <div class="mt-5 speciallabels withoutborder">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-2 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.zip_code') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="91700"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-6 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.street') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="LAGUNILLA"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-2 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.outdoor') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="123"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-2 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.indoor') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value=""/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-0 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.suburb') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="VERACRUZ CENTRO"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.town') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="VERACRUZ"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.city') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="VERACRUZ"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_address.state') }}                          
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="VERACRUZ"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="flex items-center pb-5 text-base sm:flex-row mt-5">
                      <div class="flex items-center mr-auto text-base font-medium text-slate-400 ml-3"> {{$t('contracts.step6')}}</div>                      
                    </div>

                    <div class="mt-5 speciallabels withoutborder">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-5 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.full_name') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="ANGEL COBOS COBOS"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-3 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            RFC                 
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="COCA230310HAS"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('add_prospect_details.email') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="angelcobos@outlook.com"/> 
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!--fin de contract holder-->
                
                <!--inicio productos-->
                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-5">
                    <div class="flex items-center pb-5 text-base border-b  sm:flex-row alert show box bg-secondary text-slate-800 flex items-center mb-6">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('add_products.products')}}</div>                      
                    </div>
                    <div class="mt-0 speciallabels withoutborder">

                        <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-5">
                            <div class="flex items-center pb-5 text-base border-b  sm:flex-row alert show box bg-success text-slate-800 flex items-center mb-6">
                              <div class="flex items-center mr-auto text-base font-medium"> <ShoppingCartIcon class="w-4 h-4 mr-2" />Producto Uno</div>                      
                              <span class="text-xs">SKU 123456 : <b class="py-1 px-2 rounded-full bg-secondary">$14,560 MXN</b></span>
                            </div>
                            <div class="mt-0 speciallabels withoutborder">

                                <span class="text-xs">1 ASESORÍA Y ATENCIÓN PERSONAL LAS 24 HORAS LOS 365 DIAS DEL AÑO<br>
                                1 TRASLADO EN CARROZA (CIUDAD DE MÉXICO Y ÁREA CONURBADA)<br>
                                1 TRÁMITES GUBERNAMENTALES EN MUERTE NATURAL<br>
                                1 ARREGLO ESTÉTICO DEL CUERPO (MAQUILLAR Y VESTIR)<br>
                                1 EMBALSAMAMIENTO MUERTE NATURAL<br>
                                1 ATAÚD CATEDRAL (METÁLICO), EN DERECHO USO EN CASO DE CREMACION<br>
                                1 RENTA SALA CAPACIDAD 20 PERSONAS<br>
                                1 FACILIDADES PARA CELEBRAR SERVICIOS RELIGIOSOS<br>
                                1 BONO CREMACIÓN<br>
                                1 EN CASO DE INHUMACION ESTA SERA EN UN LOTE DEL PANTEON PROPIEDAD DEL TITULAR Y/O SUS FAMILIARES<br>
                                1 URNA PROVISIONAL (ACRÍLICO)<br>
                                1 ACTA DE DEFUNCIÓN<br>
                                1 VIDEO HOMENAJE<br>
                                1 CAFETERÍA BÁSICA ILIMITADA (AGUA CALIENTE, CAFÉ Y COMPLEMENTOS)<br>
                                1 2DO. TRASLADO TERRESTRE DENTRO CDMX Y ÁREA METROPOLITANA</span>

                            </div>
                        </div>

                        <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-5">
                            <div class="flex items-center pb-5 text-base border-b  sm:flex-row alert show box bg-success text-slate-800 flex items-center mb-6">
                              <div class="flex items-center mr-auto text-base font-medium"> <ShoppingCartIcon class="w-4 h-4 mr-2" />Producto Dos</div>                      
                              <span class="text-xs">SKU 234567 : <b class="py-1 px-2 rounded-full bg-secondary">$0 MXN</b></span>
                            </div>
                            <div class="mt-0 speciallabels withoutborder">

                                <span class="text-xs">1 ATAÚD ALFA (MADERA), EN DERECHO USO SIN COSTO</span>

                            </div>
                        </div>

                    </div>
                </div>
                <!--fin de productos-->


                <!--inicio de plan de pagos-->
                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 box mt-5">
                    <div class="flex items-center pb-5 text-base border-b  sm:flex-row alert show box bg-secondary text-slate-800 flex items-center mb-6">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> Resumen de financiamiento</div>                      
                    </div>
                    <div class="mt-10 speciallabels withoutborder">

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('contracts.amount') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="$41,112.60"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('contracts.conventions') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="$0.00"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('contracts.deadlines') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="3"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                            <div class="flex-1 w-full xl:mt-0 withlabel">
                                <div class="grid grid-cols-12 gap-4 gap-y-5 mtlower">
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            {{ $t('contracts.method') }}                        
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="04 Meses Referencia Bancaria"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            Monto financiado                      
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="$30,834.45"/> 
                                    </div>
                                    <div class="col-span-12 input-form intro-y sm:col-span-12 md:col-span-6 lg:col-span-4 withlabel">
                                        <label for="validation-form-1" class="flex flex-col w-full form-label sm:flex-row">
                                            Monto primera mensualidad                    
                                        </label>
                                        <input
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            class="form-control" value="$10,278.153"/> 
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!--fin de plan de pagos-->


                <!--inicio de aprobación-->
                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 box mt-5">
                    <div class="flex items-center pb-5 text-base border-b sm:flex-row alert show box bg-secondary text-slate-800 flex items-center mb-6">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> Aprobación</div>                      
                    </div>
                    <div class="mt-0 speciallabels withoutborder">
                        <div class="items-center mr-auto">
                            <CheckCircleIcon class="w-7 h-7 mr-4 mb-3 float-left"/>
                            <span class="text-xs">Al firmar acepta
CONTRATACIÓN POR MEDIOS ELECTRÓNICOS. Las partes acuerdan que en lugar de una firma original autógrafa, este contrato, así como cualquier consentimiento, aprobación u otros documentos relacionados con el mismo, podrán ser firmados por medio del uso de firmas electrónicas, digitales, numéricas, alfanuméricas, huellas de voz, biométricas o de cualquier otra forma y que dichos medios alternativos de firma y los registros en donde sean aplicadas dichas firmas, serán consideradas para todos los efectos, incluyendo pero no limitado a la legislación civil, mercantil, protección al consumidor y a la NOM-151-SCFI-2016, con la misma fuerza y consecuencias que la firma autógrafa original física de la parte firmante. Si el contrato o cualquier otro documento relacionado con el mismo es firmado por medios electrónicos o digitales, las Partes acuerdan que los formatos del contrato y los demás documentos firmados de tal modo serán conservados y estarán a disposición del consumidor, por lo que convienen que cada una y toda la información enviada por el Proveedor a la dirección de correo electrónico proporcionada por el Consumidor al momento de celebrar el presente Contrato será considerada como entregada en el momento en que la misma es enviada, siempre y cuando exista confirmación de recepción.</span>
                        </div>

                        <div class="outline outline-dashed mt-5 mb-5 rounded-sm" height="250px">
                            <VueSignaturePad width="100%" height="250px" ref="signaturePad" />
                        </div>
                        <div>
                          <button @click="save" class="btn btn-primary mr-5">Confirm Sign</button>
                          <button @click="undo" class="btn btn-secondary">Undo</button>
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
                    {{ $t('forms.save') }}
                </button>
            </div>

        </form>
    </div>

    
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
.withoutborder .form-control{border-color:transparent; box-shadow:none; pointer-events:none; text-transform:uppercase; font-weight:bold; font-size:0.85rem}
</style>