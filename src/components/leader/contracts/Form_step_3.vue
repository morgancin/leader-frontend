<script>
    export default {
        name: "ContractStep3Form",
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

    import { useActivitiesStore } from "../../../stores/leader/activities";
    const { activity_information } = storeToRefs(useActivitiesStore());
    import QuotesForm from "../../../components/leader/quotes/Form.vue";

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

    const send_quote = reactive({
      cart: {},
      activity: {},
    });    
    

</script>

<template>
    
    <div class="speciallabels pb0">

        <form @submit.prevent="submitForm()" autocomplete="on">
            <div class="gap-3 mt0-1">        
                <QuotesForm    
                :send_quote="send_quote"
                :activity_information="activity_information"/>
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
.mt0{margin-top:-1rem}
.mt0-1{margin-top:-2.5rem}
</style>