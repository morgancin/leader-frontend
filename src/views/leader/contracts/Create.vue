<script>
  export default {
    name: "ContractCreateView"
  }
</script>

<script setup>
  import { storeToRefs } from "pinia";
  import { useContractsStore } from "../../../stores/leader/contracts";
  import ContractStep1Form from "../../../components/leader/contracts/Form_step_1.vue";
  import ContractStep2Form from "../../../components/leader/contracts/Form_step_2.vue";
  import ContractStep3Form from "../../../components/leader/contracts/Form_step_3.vue";
  import ContractStep4Form from "../../../components/leader/contracts/Form_step_4.vue";
  import ContractStep5Form from "../../../components/leader/contracts/Form_step_5.vue";
  import ContractStep6Form from "../../../components/leader/contracts/Form_step_6.vue";
  import ContractStep7Form from "../../../components/leader/contracts/Form_step_7.vue";

  const { contract: form, step } = storeToRefs(useContractsStore());  

  const submitStep = async () => {
    step.value = step.value + 1;
  }
  
  const submit = async () => {
    //const data_contract = {...form.value};
    //await createContract(data_contract);
  }

  const previousStep = async() => {
  }

  const prevStep = async() => {
      step.value = (step.value) - 1;
  }

  const goToSetp = async(stepreceived) => {
      step.value = stepreceived;
  }


</script>

<template>
  <div class="flex items-center mt-8">
    <h2 class="mr-auto text-lg font-medium intro-y">{{ $t('contracts.contract') }}</h2>
  </div>
  <!-- BEGIN: Wizard Layout -->
  <div class="py-10 mt-5 intro-y box sm:py-20">
    <div class="relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">

      <div class="z-10 flex items-center flex-1 intro-x lg:text-center lg:block" v-if="(step >= 1)">
        <button class="w-10 h-10 rounded-full btn btn-primary" @click="goToSetp(1)">1</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto">
          <span v-if="(step>=1)" class="font-medium">{{ $t('contracts.step1') }}</span>
          <span v-if="(step<1)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step1') }}</span>
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 2)" @click="goToSetp(2)">2</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>2</button>
        <div class='ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto' >
          <span v-if="(step>=2)" class="font-medium">{{ $t('contracts.step2') }}</span>
          <span v-if="(step<2)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step2') }}</span>
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 3)" @click="goToSetp(3)">3</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>3</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto">
         <span v-if="(step>=3)" class="font-medium">{{ $t('contracts.step3') }}</span>
          <span v-if="(step<3)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step3') }}</span>
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 4)" @click="goToSetp(4)">4</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>4</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto">
          <span v-if="(step>=4)" class="font-medium">{{ $t('contracts.step4') }}</span>
          <span v-if="(step<4)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step4') }}</span>
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 5)" @click="goToSetp(5)">5</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>5</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto">
          <span v-if="(step>=5)" class="font-medium">{{ $t('contracts.step5') }}</span>
          <span v-if="(step<5)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step5') }}</span>
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 6)" @click="goToSetp(6)">6</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>6</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto">
          <span v-if="(step>=6)" class="font-medium">{{ $t('contracts.step6') }}</span>
          <span v-if="(step<6)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step6') }}</span>
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 7)" @click="goToSetp(7)">7</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>7</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto">
          <span v-if="(step>=7)" class="font-medium">{{ $t('contracts.step7') }}</span>
          <span v-if="(step<7)" class="text-slate-600 dark:text-slate-400">{{ $t('contracts.step7') }}</span>
        </div>
      </div>

    </div>
    
    <div class="px-5 pt-10 mt-10 border-t border-slate-200/60 dark:border-darkmode-400">

      <ContractStep1Form
        v-if="(step == 1)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form" />

      <ContractStep2Form
        v-if="(step == 2)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form" />

      <ContractStep3Form
        v-if="(step == 3)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form"/>

      <ContractStep4Form
        v-if="(step == 4)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form"/>

      <ContractStep5Form
        v-if="(step == 5)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form"/>

      <ContractStep6Form
        v-if="(step == 6)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form"/>

      <ContractStep7Form
        v-if="(step == 7)"
        @submit="submitStep"
        @previousStep="prevStep"
        :contract="form"/>

    </div>
  </div>
  <!-- END: Wizard Layout -->
</template>
<style>
  /*.vs--open{ z-index:99999999; position:relative}
  .vs__dropdown-menu{ z-index:9999}
  .posrelative{ z-index:0; position:relative}*/
  .posrelative{ z-index:9999}
</style>