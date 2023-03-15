import { defineStore } from "pinia";
import i18n from "../language/i18n";
const { t } = i18n.global;
//i18n.global.locale.value = 'es';

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "UsersIcon",
        pageName: "side-menu-dashboard-user",
        // title: this.$t('settings.language')
        // title: "Users"
        title: 'side-menu.users'
      },
      {
        icon: "MapPinIcon",
        pageName: "side-menu-companies",
        title: 'side-menu.companies',
      },
      {
        icon: "ZoomInIcon",
        pageName: "side-menu-prospects",
        title: 'side-menu.prospects',
      },
      {
        icon: "ActivityIcon",
        pageName: "side-menu-activities",
        title: 'side-menu.activities',
      },
      // "devider",
      /*{
        icon: "TruckIcon",
        pageName: "side-menu-dashboard-companies",
        title: 'side-menu.companies',
        subMenu: [
          {
            icon: "HardDriveIcon",
            pageName: "side-menu-companies",
            title: 'side-menu.companies',
          },
          {
            icon: "GlobeIcon",
            pageName: "side-menu-company-users",
            title: "side-menu.company-users",
          },
        ],
      },*/
      "devider",
      {
        icon: "SettingsIcon",
        pageName: "side-menu-languages",
        title: 'side-menu.settings',
        subMenu: [
          {
            icon: "MicIcon",
            pageName: "side-menu-languages",
            title: 'side-menu.settings-languages',
          },
          {
            icon: "GlobeIcon",
            pageName: "side-menu-currencies",
            title: 'side-menu.currencies',
          },
          {
            icon: "PackageIcon",
            pageName: "side-menu-products",
            title: 'side-menu.products',
          },
          /*{
            icon: "GlobeIcon",
            pageName: "side-menu-prices",
            title: 'side-menu.prices',
          },*/
          {
            icon: "DollarSignIcon",
            pageName: "side-menu-price-lists",
            title: 'side-menu.settings-price-lists',
          },          
          {
            icon: "TagIcon",
            pageName: "side-menu-categories",
            title: 'side-menu.categories',
          },
          {
            icon: "ListIcon",
            pageName: "side-menu-company-catalogs",
            title: 'side-menu.settings-catalogs',
            subMenu: [
              {
                icon: "ActivityIcon",
                pageName: "side-menu-activity-type", //"side-menu-activity",
                title: 'side-menu.settings-catalogs-activity',
              },
              {
                icon: "GitBranchIcon",
                pageName: "side-menu-activities-results",
                title: 'side-menu.settings-activities-results',
              },
              {
                icon: "TargetIcon",
                pageName: "side-menu-subjects",
                title: 'side-menu.settings-catalogs-subjects',
              },
              {
                icon: "RadioIcon",
                pageName: "side-menu-origin",
                title: 'side-menu.settings-catalogs-origin',
              },
              {
                icon: "MessageCircleIcon",
                pageName: "side-menu-medium",
                title: 'side-menu.settings-catalogs-medium',
              },
              {
                icon: "TagIcon",
                pageName: "side-menu-tags",
                title: 'side-menu.settings-catalogs-tags',
              },
            ],
          },
          
        ],
      },
    ],
  }),
});
