<script>
    export default {
        name: "ContractStep4Form",
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

    
    import { useBeneficiariesCartStore } from "@/stores/leader/beneficiariesCart";
    const { cartBeneficiaries } = storeToRefs(useBeneficiariesCartStore());
    const { add_beneficiary_car, remove_beneficiary_car } = useBeneficiariesCartStore();
    const dataBeneficiaries = ref([]);
    const beneficiary_modal = ref({});
    const addBeneficiaryModal = ref(false);
    const add_beneficiary_form = reactive({
                                        first_name:'',
                                        last_name:'',
                                        second_last_name:'',
                                        email:'',
                                        phone:'',
                                        birth:'',
                                        genre:'',
                                        zip_code:'',
                                        street:'',
                                        ext_number:'',
                                        int_number:'',
                                        suburb:'',
                                        city:'',
                                        town:'',
                                        state:'',
                                        age:'',
                                        percentage:'',
                                        relationship:''
                                    });
    //props.cart_beneficiaries.value = cartBeneficiaries.value;

    const removeBeneficiary = beneficiary => {
        remove_beneficiary_car(beneficiary);
    }
    const submit_add_beneficiary = () => {
        
        beneficiary_modal.value = add_beneficiary_form.first_name+add_beneficiary_form.last_name+add_beneficiary_form.second_last_name;
    
        add_beneficiary_car(
                            beneficiary_modal.value,
                            add_beneficiary_form.first_name,
                            add_beneficiary_form.last_name
        );

        add_beneficiary_form.first_name = '';
        add_beneficiary_form.last_name = '';
        add_beneficiary_form.second_last_name = '';
        add_beneficiary_form.email = '';
        add_beneficiary_form.phone = '';
        add_beneficiary_form.birth = '';
        add_beneficiary_form.genre = '';
        add_beneficiary_form.zip_code = '';
        add_beneficiary_form.street = '';
        add_beneficiary_form.ext_number = '';
        add_beneficiary_form.int_number = '';
        add_beneficiary_form.suburb = '';
        add_beneficiary_form.city = '';
        add_beneficiary_form.state = '';
        add_beneficiary_form.town = '';
        add_beneficiary_form.age = '';
        add_beneficiary_form.percentage = '';
        add_beneficiary_form.relationship = '';
        addBeneficiaryModal.value = false;      
      }

      const show_beneficiaries = ref(false);

</script>

<template>
    
    <div class="pb0">

        <form @submit.prevent="submitForm()" autocomplete="on">

            <div class="gap-3 mt0">

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.life_insurance')}}</div>
                      <a class="mr-2 text-xs shadow-md btn btn-primary" @click="addBeneficiaryModal = true" v-if="show_beneficiaries" show> {{$t('contracts.add_beneficiaries')}} <PlusIcon class="w-4 h-4" /></a>
                    </div>
                    <div class="mt-5">
                        <div class="caracteristicas">
                        <span>Seguro otorgado como beneficio exclusivamente al “Titular” y/o “El Consumidor” <b>ANGEL COBOS COBOS</b> que aparece registrado de primera instancia en el Contrato de Prestación de Servicios Funerarios Integrales a Futuro.
<br>
Seguro con una suma Asegurada por <b>$25,000.00</b>
</span>
<ul>
    <li>Vigencia del seguro GRATIS POR UN AÑO del 13/03/2023 hasta 12/03/2024 Brindado por J. García López, pero podrá ser renovado a solicitud del Titular del Servicio Funerario a Futuro con un costo de recuperación.</li>
    <li><b>Para recibir la suma asegurada</b>, se debe liquidar el costo total del Plan Funerario a Futuro y llevar acabo el Homenaje® en una de nuestras casas funerarias.</li>
    <li>Al momento de otorgar el servicio la póliza del Seguro de Vida debe estar vigente.</li>
    <li><b>EL SEGURO DE VIDA SE CANCELA AUTOMÁTICAMENTE SI</b> se presentan más de tres meses de adeudo en el Plan Funerario a Futuro.</li>
    <li>Para hacer válido el Seguro de Vida, la póliza debe estar firmada por el Titular del Plan Funerario a Futuro.</li>
    <li><b>No es transferible.</b> El Titular no puede ceder los derechos del Seguro de Vida a un tercero. Al utilizar el Plan Funerario a Futuro el seguro pierde vigencia.</li>
    <li>El Titular no puede contar con más de un Seguro de Vida vigente, aún y cuando éste cuente con más de un Servicio Funerario contratado.</li>
    <li>Edad de aceptación de 18 a 60 años, durante el primer año.</li>
    <li>El seguro podrá ser válido: Después de los 30 días naturales de ingresar el contrato de Previsión Final.</li>
    <li>NO SE OTORGA EN SERVICIOS FUNERARIOS DE NECESIDAD INMEDIATA.</li>
</ul>
<div class="form-check mt-5">
    <input id="vertical-form-3" class="form-check-input" type="checkbox" value="">
    <label class="form-check-label" for="vertical-form-3" @click="show_beneficiaries = !show_beneficiaries">{{$t("forms.accept")}} {{$t('contracts.life_insurance')}}</label>
</div>
    </div>
                                                

                        <div v-if="show_beneficiaries">
                            <br>
                            <hr>
                            <br>
                            <a v-if="Object.keys(cartBeneficiaries).length === 0" class="block w-full text-xs text-center text-slate-500">{{$t('forms.noitems')}}</a>                       

                            <div class="overflow-x-auto" v-if="Object.keys(cartBeneficiaries).length > 0">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th class="text-left">{{$t('add_prospect_details.full_name')}}</th>
                                            <th class="text-left">{{$t('contracts.relationship')}}</th>
                                            <th class="text-right">{{$t('contracts.percentage')}}</th>
                                            <th class="text-left">{{$t('add_prospect_details.mobile_phone')}}</th>
                                            <th class="text-left">{{$t('add_prospect_details.age')}}</th>
                                            <th class="text-left">{{$t('add_prospect_details.gender')}}</th>
                                            <th class="text-left">{{$t('add_prospect_address.address')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(beneficiary, id) in cartBeneficiaries">
                                            <td><TrashIcon class="w-4 h-4 mr-2 text-slate-500 cursor-pointer" @click="removeBeneficiary(beneficiary)"/></td>
                                            <td>Angel Raúl Cobos Ortega</td>
                                            <td>Esposo</td>
                                            <td class="text-right">100</td>
                                            <td>2291748371</td>
                                            <td>36</td>
                                            <td>Hombre</td>
                                            <td>Dirección conocida #123, Veracruz</td>
                                        </tr>                                    
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="text-right"><b>100</b></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div v-else>
                            <br>
                            <hr>
                            <br>
                            <a class="block w-full text-md text-center text-red-500 ">{{$t('contracts.unaccepted')}}</a> 
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

    <!-- BEGIN: Add Beneficiary Modal -->
      <Modal :show="addBeneficiaryModal" @hidden="addBeneficiaryModal = false" size="modal-xl" class="speciallabels">
        <ModalHeader>
          <h2 class="mr-auto text-base font-medium">{{ $t('contracts.add_beneficiaries') }}</h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">      
            
            <div class="col-span-12 sm:col-span-4 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.first_name') }}</label>
                  <input 
                    id="modal-form-1" 
                    type="text" 
                    class="form-control"
                    v-model="add_beneficiary_form.first_name">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-4 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.last_name') }}</label>
                  <input 
                    id="modal-form-1" 
                    type="text" 
                    class="form-control"
                    v-model="add_beneficiary_form.last_name">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-4 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.second_last_name') }}</label>
                  <input 
                    id="modal-form-1" 
                    type="text" 
                    class="form-control"
                    v-model="add_beneficiary_form.second_last_name">
                </div>
            </div>


            <div class="col-span-12 sm:col-span-6 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.relationship') }}</label>
                  <v-select
                        id="cmbSuburb"
                        taggable push-tags
                        class="form-control"
                        v-model="add_beneficiary_form.relationship">
                  </v-select>
                </div>
            </div>
            <div class="col-span-12 sm:col-span-6 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.percentage') }}</label>
                  <input 
                    id="modal-form-1" 
                    type="number" 
                    class="form-control"
                    v-model="add_beneficiary_form.percentage">
                </div>
            </div>


            <div class="col-span-12 sm:col-span-8 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.email') }}</label>
                  <input 
                    id="modal-form-1" 
                    type="text" 
                    class="form-control"
                    v-model="add_beneficiary_form.email">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-4 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.mobile_phone') }}</label>
                  <input 
                    id="modal-form-1" 
                    type="number" 
                    class="form-control"
                    v-model="add_beneficiary_form.phone">
                </div>
            </div>
            
            <div class="col-span-12 sm:col-span-4 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.birth_date') }}</label>                  
                  <Datepicker
                      closeOnScroll
                      :enableTimePicker="false"
                      id="txtBirth_date"
                      v-model="add_beneficiary_form.birth"/>
                </div>
            </div>
            <div class="col-span-12 sm:col-span-4 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_details.age') }}</label>                  
                  <input type="number" class="form-control" minlength="1" maxlength="3" disabled v-model="add_beneficiary_form.age"/>
                </div>
            </div>
            <div class="col-span-12 sm:col-span-4 withlabel mt-3">
                <label class="nolabel">*{{ $t('add_prospect_details.gender')}}</label>
                <div class="flex flex-col mt-3 sm:flex-row">
                    <div class="mr-2 form-check">
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="gender" 
                            value="female"  
                            id="female2"/>
                        <label class="form-check-label" for="female2">{{ $t('add_prospect_details.female') }}</label>
                    </div>
                    <div class="mt-2 mr-2 form-check sm:mt-0">
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="gender" 
                            value="male"
                            id="male2"  />
                        <label class="form-check-label" for="male2">{{ $t('add_prospect_details.male') }}</label>
                    </div>
                </div>
            </div>

            <div class="col-span-12 sm:col-span-2 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.zip_code') }}</label>                  
                  <input 
                    id="modal-form-1" 
                    type="number" 
                    class="form-control"
                    v-model="add_beneficiary_form.zip_code">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-6 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.street') }}</label>                  
                  <input 
                    id="modal-form-1" 
                    type="number" 
                    class="form-control"
                    v-model="add_beneficiary_form.street">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-2 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.outdoor') }}</label>                  
                  <input 
                    id="modal-form-1" 
                    type="number" 
                    class="form-control"
                    v-model="add_beneficiary_form.ext_number">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-2 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.indoor') }}</label>                  
                  <input 
                    id="modal-form-1" 
                    type="number" 
                    class="form-control"
                    v-model="add_beneficiary_form.int_number">
                </div>
            </div>

            <div class="col-span-12 sm:col-span-3 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.suburb') }}</label>                  
                  <v-select
                        id="cmbSuburb"
                        taggable push-tags
                        class="form-control"
                        v-model="add_beneficiary_form.suburb">
                  </v-select>
                </div>
            </div>
            <div class="col-span-12 sm:col-span-3 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.town') }}</label>                  
                  <input 
                    id="modal-form-1" 
                    type="text" 
                    class="form-control"
                    v-model="add_beneficiary_form.town">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-3 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.city') }}</label>                  
                  <input 
                    id="modal-form-1" 
                    type="text" 
                    class="form-control"
                    v-model="add_beneficiary_form.city">
                </div>
            </div>
            <div class="col-span-12 sm:col-span-3 withlabel">
                <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                  <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('add_prospect_address.state') }}</label>                  
                  <v-select
                        id="cmbState"
                        taggable push-tags
                        class="form-control">
                  </v-select>
                </div>
            </div>

        </ModalBody>        
        <ModalFooter class="text-right">
          <button
            type="button"
            class="w-24 btn btn-primary"
            @click="submit_add_beneficiary">
              {{ $t('forms.add') }}
          </button>
        </ModalFooter>
      </Modal>
      <!-- END: Add Component Modal -->

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