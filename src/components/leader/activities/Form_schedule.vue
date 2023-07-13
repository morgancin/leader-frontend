<script>
    export default {
        name: "ScheduleForm",
    }
</script>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';

  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  import { useActivitiesStore } from "@/stores/leader/activities";
  import { useActivitiesTypeStore } from "@/stores/leader/activities-type";
  import { useActivitySubjectStore } from "@/stores/leader/activities-subjects";

  const { fetchActivitiesTypes } = useActivitiesTypeStore();
  const { fetchActivitiesSubjects } = useActivitySubjectStore();

  const { subjects: dataActivitySubjects} = storeToRefs(useActivitySubjectStore());
  const { activities_types: dataActivityTypes} = storeToRefs(useActivitiesTypeStore());
  
  const props = defineProps({
      form_data: {
        type: Object,
        required: true,
      }
  });
  
  const editorConfig = {
    toolbar: {
      items: [],
    },
  };

  const activity_type_id = ref(null);

  ////////ACTIVITIES TYPES & ACTIVITIES SUBJECTS
  const dataActivitiesSubjects = ref([]);

  onMounted(async() => {
    await fetchActivitiesTypes();
  });

  watch(
      () => activity_type_id.value,
      async () => {
        await fetchActivitiesSubjects(activity_type_id.value);
      }
  );

  const format_start_date = ref(props.form_data.start_date);
  format_start_date.value = (format_start_date) => {
    const day = format_start_date.getDate();
    const year = format_start_date.getFullYear();
    const month = format_start_date.getMonth() + 1;
    
    return `${day}/${month}/${year}`;
  }
</script>

<template>
    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
        <label for="cmbActivityType" class="form-label">*{{ $t('prospects.form.labels.fields.activity') }}</label>

        <v-select
            label="name"
            id="cmbActivityType"
            class="form-control"
            :options="dataActivityTypes"
            :reduce="name => name.id"
            v-model="activity_type_id">
        </v-select>
    </div>
    
    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
        <label for="cmbActivitySubject" class="form-label">*{{ $t('prospects.form.labels.fields.subject') }}</label>

        <v-select
            label="name"
            class="form-control"
            id="cmbActivitySubject"
            :options="dataActivitySubjects"
            :reduce="name => name.id"
            v-model="props.form_data.activity_subject_id">
        </v-select>
        <!--
        :class="{ 'border-danger': validate.activity_subject_id.$error }"
        <template v-if="validate.activity_subject_id.$error">
        <div
        v-for="(error, index) in validate.activity_subject_id.$errors"
        :key="index"
        class="mt-2 text-danger">
        {{ error.$message }}
        </div>
        </template>
        -->
    </div>
                
    <div class="col-span-12 intro-y sm:col-span-6 withlabel">
        <label for="crud-form-2" class="form-label">*{{ $t('activities.form.labels.fields.start_date') }}</label>

        <Datepicker
            closeOnScroll
            :enableTimePicker="false"
            :format="format_start_date"
            :placeholder="$t('activities.form.placeholders.start_date')"
            v-model="props.form_data.start_date" />
        <!--
        <template v-if="validate.start_date.$error">
        <div
        v-for="(error, index) in validate.start_date.$errors"
        :key="index"
        class="mt-2 text-danger">
        {{ error.$message }}
        </div>
        </template>
        -->
    </div>
                
    <div class="col-span-12 intro-y sm:col-span-6 withlabel">
        <label for="crud-form-2" class="form-label">*{{ $t('activities.form.labels.fields.start_time') }}</label>

        <Datepicker
            timePicker
            :placeholder="$t('activities.form.placeholders.start_time')"
            v-model="props.form_data.start_time" />
    </div>

    <div class="col-span-12 sm:col-span-12 withlabel">
        <label for="modal-form-1" class="form-label">{{ $t('prospects.form.labels.fields.comments') }}</label>

        <ClassicEditor
            :config="editorConfig"
            :placeholder="$t('prospects.form.placeholders.comments')"
            v-model="props.form_data.comments" />
    </div>
</template>