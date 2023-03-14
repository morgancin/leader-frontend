<script>
    export default {
        name: "ContractStep5Form",
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
    const payment_modal = ref({});
    const addPaymentModal = ref(false);
    const addPlanModal = ref(false);
    const add_payment_form = reactive({
                                        method:'',
                                        name:'',
                                        bank:'',
                                        card_type:'',
                                        amount:'',
                                        card_number:'',
                                        card_expire:'',
                                        card_cvv:'',
                                        street:'',
                                        check_reference:'',
                                    });

    const removePayment = payment => {
        remove_beneficiary_car(payment);
    }
    const submit_add_payment = () => {
        
        payment_modal.value = 1;
    
        add_beneficiary_car(
                            payment_modal.value,
                            add_payment_form.method,
                            add_payment_form.amount
        );

        add_payment_form.first_name = '';
        add_payment_form.last_name = '';
        add_payment_form.second_last_name = '';
        add_payment_form.email = '';
        add_payment_form.phone = '';
        add_payment_form.birth = '';
        add_payment_form.genre = '';
        add_payment_form.zip_code = '';
        add_payment_form.street = '';
        add_payment_form.ext_number = '';
        addPaymentModal.value = false;      
      }


      const submit_add_paymentplan = () => {
        addPlanModal.value = false;
        show_plan.value = true; 
      }

      const show_payments = ref(false);
      const show_copyname = ref(false);
      const show_addmissing = ref(false);
      const show_plan = ref(false);

</script>

<template>
    
    <div class="pb0">

        <form @submit.prevent="submitForm()" autocomplete="on">

            <div class="gap-3 mt0">

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex items-center pb-5 text-base border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
                      <div class="flex items-center mr-auto text-base font-medium"> <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.payment_plan')}}</div>
                      <a class="mr-2 text-xs shadow-md btn btn-secondary" @click="addPlanModal = true"> {{$t('contracts.add_payment_plan')}} <PlusIcon class="w-4 h-4" /></a>                      
                    </div>

                    <div class="mt-5">

                        <a v-if="!show_plan" class="block w-full text-xs text-center text-slate-500 mt-3">{{$t('forms.noitems')}}</a>        

                        <div class="overflow-x-auto" v-if="show_plan">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-left">{{$t('contracts.method')}}</th>
                                        <th class="text-left">{{$t('contracts.deadlines')}}</th>
                                        <th class="text-left">{{$t('contracts.conventions')}}</th>
                                        <th class="text-left">{{$t('contracts.additionals')}}</th>
                                        <th class="text-right">{{$t('contracts.amount')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><TrashIcon class="w-4 h-4 mr-2 text-slate-500 cursor-pointer" @click="removePayment('1')"/></td>
                                        <td>Efectivo</td>
                                        <td>03 Meses</td>
                                        <td>10%</td>
                                        <td>N/A</td>
                                        <td class="text-right">40,278.15</td>
                                    </tr>                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mt-5">
                    <div class="flex items-center pb-5 text-base border-b border-slate-200/60 dark:border-darkmode-400 sm:flex-row">
                        <div class="flex items-center mr-auto text-base font-medium mb-5"><ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('contracts.down_payment')}}</div>
                        <a class="mr-2 text-xs shadow-md btn btn-primary" @click="addPaymentModal = true"> {{$t('contracts.add_payment')}} <PlusIcon class="w-4 h-4" /></a>
                    </div>

                    <div class="mt-5">
                        <a v-if="Object.keys(cartBeneficiaries).length === 0" class="block w-full text-xs text-center text-slate-500 mt-3">{{$t('forms.noitems')}}</a>                       

                        <div class="overflow-x-auto" v-if="Object.keys(cartBeneficiaries).length > 0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-left">{{$t('contracts.method')}}</th>
                                        <th class="text-left">{{$t('contracts.card_holder')}}</th>
                                        <th class="text-left">{{$t('contracts.card_number')}}</th>
                                        <th class="text-left">{{$t('contracts.bank')}}</th>
                                        <th class="text-left">{{$t('contracts.expiration')}}</th>
                                        <th class="text-right">{{$t('contracts.amount')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(payment, id) in cartBeneficiaries">
                                        <td><TrashIcon class="w-4 h-4 mr-2 text-slate-500 cursor-pointer" @click="removePayment(payment)"/></td>
                                        <td>Efectivo</td>
                                        <td>Angel Raúl Cobos Ortega</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td class="text-right">10,278.15</td>
                                    </tr>                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-right"><b>10,278.15</b></td>
                                    </tr>
                                </tfoot>
                            </table>
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

    <!-- BEGIN: Add Payment Modal -->
      <Modal :show="addPaymentModal" @hidden="addPaymentModal = false" size="modal-lg" class="speciallabels">
        <ModalHeader>
          <h2 class="mr-auto text-base font-medium">{{ $t('contracts.add_payment') }}</h2>
        </ModalHeader>
        <ModalBody>      
            
            <div class="grid grid-cols-12 gap-4 gap-y-3">
                
                <div class="col-span-12 sm:col-span-12">  
                    <span class="text-slate-500">Su pago por el enganche es por la cantidad de $10,278.15, falta por cubrir <b>$10,278.15</b></span>                                        
                </div>
                <div class="col-span-12 sm:col-span-4 withlabel posrelative">                    
                    <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.method') }}</label>
                      <v-select
                        class="form-control"
                        :options="['Efectivo', 'Cheque', 'Transferencia Electrónica', 'Tarjeta']">
                        </v-select>                      
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-12 withlabel">                    
                    <div class="form-check col-span-6">
                        <input id="vertical-form-3" class="form-check-input" type="checkbox" value="">
                        <label class="form-check-label" for="vertical-form-3" @click="show_copyname = !show_copyname">{{$t("contracts.copyname")}}</label>
                   
                        <input id="vertical-form-4" class="form-check-input ml-5" type="checkbox" value="">
                        <label class="form-check-label" for="vertical-form-4" @click="show_addmissing = !show_addmissing">{{$t("contracts.addmissing")}}</label>
                    </div>                
                </div>
                
                <div class="col-span-12 sm:col-span-12 withlabel">
                    <hr>
                </div>

                <div class="col-span-12">
                    <div class="grid grid-cols-12 gap-4 gap-y-3 posrelative">
                        <div class="col-span-12 sm:col-span-12 withlabel">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.card_holder') }}</label>
                              <input 
                                id="modal-form-1" 
                                type="text" 
                                class="form-control"
                                v-model="add_payment_form.name">
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-5 withlabel posrelative">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.bank') }}</label>
                              <v-select
                                class="form-control"
                                :options="['Actinver', 'Afirme', 'Banamex', 'Banregio']">
                                </v-select>   
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-4 withlabel">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.reference') }}</label>
                              <input 
                                id="modal-form-1" 
                                type="text" 
                                class="form-control"
                                v-model="add_payment_form.reference">
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-3 withlabel">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.amount') }}</label>
                              <input 
                                id="modal-form-1" 
                                type="number" 
                                class="form-control"
                                v-model="add_payment_form.amount">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-6 withlabel">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.card_number') }}</label>
                              <input 
                                id="modal-form-1" 
                                type="number" 
                                class="form-control"
                                v-model="add_payment_form.card_number">
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-3 withlabel">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.expiration') }}</label>
                              <input 
                                id="modal-form-1" 
                                type="text" 
                                class="form-control"
                                v-model="add_payment_form.expiration">
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-3 withlabel">
                            <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                              <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.cvv') }}</label>
                              <input 
                                id="modal-form-1" 
                                type="number" 
                                class="form-control"
                                v-model="add_payment_form.cvv">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>        

        </ModalBody>        
        <ModalFooter class="text-right">
          <button
            type="button"
            class="w-24 btn btn-primary"
            @click="submit_add_payment">
              {{ $t('forms.add') }}
          </button>
        </ModalFooter>
      </Modal>
      <!-- END: Add Payment Modal -->


      <!-- BEGIN: Add Payment Plan Modal -->
      <Modal :show="addPlanModal" @hidden="addPlanModal = false" size="modal-lg" class="speciallabels">
        <ModalHeader>
          <h2 class="mr-auto text-base font-medium">{{ $t('contracts.add_payment_plan') }}</h2>
        </ModalHeader>
        <ModalBody>      
            
            <div class="grid grid-cols-12 gap-4 gap-y-3">
                                                
                
                <div class="col-span-12 sm:col-span-6 withlabel posrelative">
                    <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.method') }}</label>
                      <v-select
                        class="form-control"
                        :options="['Contado', 'Tarjeta', 'Referencia Bancaria']">
                        </v-select>   
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 withlabel posrelative">
                    <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.deadlines') }}</label>
                      <v-select
                        class="form-control"
                        :options="['3 Meses', '6 Meses', '12 Meses']">
                        </v-select>   
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 withlabel">
                    <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.conventions') }}</label>
                      <v-select
                        class="form-control"
                        :options="['10%', '20%']">
                        </v-select>   
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 withlabel">
                    <div class="col-span-12 input-form intro-y sm:col-span-12 withlabel">
                      <label class="flex flex-col w-full form-label sm:flex-row">*{{ $t('contracts.additionals') }}</label>
                      <v-select
                        class="form-control"
                        :options="['Ataúd de acero', 'Ataúd de madera']">
                        </v-select>   
                    </div>
                </div>
                    
                
                
            </div>        

        </ModalBody>        
        <ModalFooter class="text-right">
          <button
            type="button"
            class="w-24 btn btn-primary"
            @click="submit_add_paymentplan">
              {{ $t('forms.add') }}
          </button>
        </ModalFooter>
      </Modal>
      <!-- END: Add Payment Plan Modal -->

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