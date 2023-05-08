<script>
    export default {
        name: "ScheduleForm",
    }
</script>

<script setup>
  import { onMounted, ref, watch } from 'vue';

  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';

  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  import { useActivitiesStore } from "@/stores/leader/activities";
  
  const { fetchActivitiesTypes, fetchActivitiesSubjects } = useActivitiesStore();
  
  const props = defineProps({
      data_activity: {
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
  const dataActivitiesTypes = ref([]);
  const dataActivitiesSubjects = ref([]);

  onMounted(async() => {
    dataActivitiesTypes.value = await fetchActivitiesTypes();
  });

  watch(
      () => activity_type_id.value,
      async () => {
        dataActivitiesSubjects.value = await fetchActivitiesSubjects(activity_type_id.value);
      }
  );

  const format_start_date = ref(props.data_activity.start_date);
  format_start_date.value = (format_start_date) => {
    const day = format_start_date.getDate();
    const year = format_start_date.getFullYear();
    const month = format_start_date.getMonth() + 1;
    
    return `${day}/${month}/${year}`;
  }
</script>

<template>
    <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
        <label for="cmbActivityType" class="form-label">*{{ $t('add_prospect_activity.activity') }}</label>
        <v-select
            label="name"
            id="cmbActivityType"
            class="form-control"
            :options="dataActivitiesTypes"
            :reduce="name => name.id"
            v-model="activity_type_id">
        </v-select>
    </div>                
                <div class="col-span-12 input-form intro-y sm:col-span-6 md:col-span-6 withlabel">
                    <label for="cmbActivitySubject" class="form-label">*{{ $t('add_prospect_activity.subject') }}</label>
                    <v-select
                        label="name"
                        class="form-control"
                        id="cmbActivitySubject"
                        :options="dataActivitiesSubjects"
                        :reduce="name => name.id"
                        v-model="props.data_activity.activity_subject_id">
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
                    <label for="crud-form-2" class="form-label">*{{ $t('add_prospect_activity.start_date_activity') }}</label>
                    <Datepicker
                        closeOnScroll
                        :enableTimePicker="false"
                        :format="format_start_date"
                        :placeholder="$t('add_prospect_activity.start_date_activity')"
                        v-model="props.data_activity.start_date" />
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
                    <label for="crud-form-2" class="form-label">*{{ $t('add_prospect_activity.start_time') }}</label>
                    <Datepicker
                        timePicker
                        :placeholder="$t('add_prospect_activity.start_time')"
                        v-model="props.data_activity.start_time" />
                </div>
                <div class="col-span-12 sm:col-span-12 withlabel">
                    <label for="modal-form-1" class="form-label">{{ $t('add_prospect_activity.comments') }}</label>
                    <ClassicEditor
                        :config="editorConfig"
                        :placeholder="$t('add_prospect_activity.comments')"
                        v-model="props.data_activity.comments" />
                </div>
</template>