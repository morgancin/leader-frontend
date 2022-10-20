import { defineStore } from "pinia";
import i18n from "../language/i18n";
const { t } = i18n.global;
//i18n.global.locale.value = 'es';

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      // {
      //   icon: "UserIcon",
      //   pageName: "side-menu-ecommerce",
      //   title: "Prospectos",
      //   subMenu: [
      //     {
      //       icon: "UserPlusIcon",
      //       pageName: "side-menu-prospectos",
      //       title: "Prospectos",
      //     }
      //   ],
      // },
      {
        icon: "UsersIcon",
        pageName: "side-menu-dashboard-user",
        // title: this.$t('settings.language')
        // title: "Users"
        title: 'side-menu.users'
      },
      {
        icon: "UserCheckIcon",
        pageName: "side-menu-prospects",
        title: 'side-menu.prospects',
      },
      // "devider",
      {
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
          // {
          //   icon: "GlobeIcon",
          //   pageName: "side-menu-company-catalogues",
          //   title: "Catalogues",
          //   subMenu: [
          //     {
          //       icon: "GlobeIcon",
          //       pageName: "side-menu-add-origins",
          //       title: "Origins",
          //     },
          //     {
          //       icon: "GlobeIcon",
          //       pageName: "side-menu-dashboard-activities",
          //       title: "Activities",
          //     },
          //   ],
          // },
        ],
      },
      "devider",
      {
        icon: "SettingsIcon",
        pageName: "side-menu-languages",
        title: 'side-menu.settings',
        subMenu: [
          {
            icon: "GlobeIcon",
            pageName: "side-menu-languages",
            title: 'side-menu.settings-languages',
          },
          {
            icon: "GlobeIcon",
            pageName: "side-menu-company-catalogs",
            title: 'side-menu.settings-catalogs',
            subMenu: [
              {
                icon: "GlobeIcon",
                pageName: "side-menu-activity",
                title: 'side-menu.settings-catalogs-activity',
              },
              {
                icon: "GlobeIcon",
                pageName: "side-menu-subjects",
                title: 'side-menu.settings-catalogs-subjects',
              },
              {
                icon: "GlobeIcon",
                pageName: "side-menu-origin",
                title: 'side-menu.settings-catalogs-origin',
              },
              {
                icon: "GlobeIcon",
                pageName: "side-menu-medium",
                title: 'side-menu.settings-catalogs-medium',
              },
              {
                icon: "GlobeIcon",
                pageName: "side-menu-tags",
                title: 'side-menu.settings-catalogs-tags',
              },
              // {
              //   icon: "GlobeIcon",
              //   pageName: "side-menu-subjects",
              //   title: "Subjects",
              // },
            ],
            // },
            // {
            //   icon: "GlobeIcon",
            //   pageName: "side-menu-dashboard-origin",
            //   title: "Origins",
            // },

            // ],
          },
          
        ],
      },
    ],
  }),
});
