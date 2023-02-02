<script>
    export default {
      name: "UserForm",
    }
    </script>
    
    <script setup>
    import { ref, provide } from "vue";
    import i18n from "@/language/i18n";
    const { t } = i18n.global;
    defineProps({
      user: {
        type: Object,
        required: true,
      },
      // textButton: {
      //     type: String,
      //     default: "Save",
      // },
    })
    
    // Success notification
    const successNotification = ref();
    provide("bind[successNotification]", (el) => {
      // Binding
      successNotification.value = el;
    });
    const successNotificationToggle = () => {
      // Show notification
      successNotification.value.showToast();
    };
    
    
    
    
    
    
    
    
    defineEmits(["submit"]);
    </script>
    
    
    <template>
      <div class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <form @submit.prevent="$emit('submit')" autocomplete="on">
          <div class="intro-y box p-5">
            <div class="mt-3">
              <label class="form-label">{{ $t('add_user.name') }}</label>
              <input 
                v-model="user.name" 
                :placeholder="$t('add_user.name')"
                type="text" 
                class="form-control w-full"/>
            </div>
            <div class="mt-3">
              <label class="form-label">{{ $t('add_user.email') }}</label>
              <input 
                v-model="user.email" 
                :placeholder="$t('add_user.email')"
                type="text" 
                class="form-control w-full"/>
            </div>
            <div class="mt-3">
              <label class="form-label">{{ $t('add_user.password') }}</label>
              <input 
                v-model="user.password" 
                :placeholder="$t('add_user.password')"
                type="password" 
                class="form-control w-full"/>
            </div>
            <div class="mt-3">
              <label class="form-label">{{ $t('add_user.password_confirmation') }}</label>
              <input 
                v-model="user.password_confirmation" 
                :placeholder="$t('add_user.password_confirmation')"
                type="password" 
                class="form-control w-full"/>
            </div>
            <div class="text-right mt-5">
              <button type="button" class="btn btn-outline-secondary w-24 mr-1">{{ $t('add_user.btn_cancel') }}</button>
              <button type="submit" class="btn btn-primary w-24" @click="successNotificationToggle">{{ $t('add_user.btn_save') }}</button>
              
              
              <!-- BEGIN: Notification Content -->
              <Notification refKey="successNotification" class="flex" :options="{
                      duration: 5000,
                    }">
                  <CheckCircleIcon class="text-success" />
                  <div class="ml-4 mr-4">
                      <div class="font-medium">{{ $t('add_user.notification_save') }}</div>
                      <div class="text-slate-500 mt-1">
                        {{ $t('add_user.notification_msg') }}
                      </div>
                  </div>
              </Notification>
              <!-- END: Notification Content -->
              <!-- BEGIN: Notification Toggle -->
              <!-- <button class="btn btn-primary" @click="successNotificationToggle">
                  Show Notification
              </button> -->
              <!-- END: Notification Toggle -->
    
    
            </div>
          </div>
        </form>
        <!-- END: Form Layout -->
      </div>
    </template>