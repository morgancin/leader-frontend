import { createI18n, useI18n } from "vue-i18n";
import messages from '@intlify/unplugin-vue-i18n/messages';

//const { t } = useI18n();

const i18n = new createI18n({
    legacy: false,
    globalInjection: true,
    //locale:'es',
    locale:((sessionStorage.getItem("language")) ? sessionStorage.getItem("language") : 'en'),
    messages
});

export default i18n;