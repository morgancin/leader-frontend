import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/side-menu/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import DashboardOverview1 from "../views/dashboard-overview-1/Main.vue";
import DashboardOverview2 from "../views/dashboard-overview-2/Main.vue";
import DashboardOverview3 from "../views/dashboard-overview-3/Main.vue";
import DashboardOverview4 from "../views/dashboard-overview-4/Main.vue";
import Categories from "../views/categories/Main.vue";
import ProductList from "../views/product-list/Main.vue";
import ProductGrid from "../views/product-grid/Main.vue";
import TransactionList from "../views/transaction-list/Main.vue";
import TransactionDetail from "../views/transaction-detail/Main.vue";
import SellerList from "../views/seller-list/Main.vue";
import SellerDetail from "../views/seller-detail/Main.vue";
import Reviews from "../views/reviews/Main.vue";
import Inbox from "../views/inbox/Main.vue";
import FileManager from "../views/file-manager/Main.vue";
import PointOfSale from "../views/point-of-sale/Main.vue";
import Chat from "../views/chat/Main.vue";
import Post from "../views/post/Main.vue";
import Calendar from "../views/calendar/Main.vue";
import CrudDataList from "../views/crud-data-list/Main.vue";
import CrudForm from "../views/crud-form/Main.vue";
import UsersLayout1 from "../views/users-layout-1/Main.vue";
import UsersLayout2 from "../views/users-layout-2/Main.vue";
import UsersLayout3 from "../views/users-layout-3/Main.vue";
import ProfileOverview1 from "../views/profile-overview-1/Main.vue";
import ProfileOverview2 from "../views/profile-overview-2/Main.vue";
import ProfileOverview3 from "../views/profile-overview-3/Main.vue";
import WizardLayout1 from "../views/wizard-layout-1/Main.vue";
import WizardLayout2 from "../views/wizard-layout-2/Main.vue";
import WizardLayout3 from "../views/wizard-layout-3/Main.vue";
import BlogLayout1 from "../views/blog-layout-1/Main.vue";
import BlogLayout2 from "../views/blog-layout-2/Main.vue";
import BlogLayout3 from "../views/blog-layout-3/Main.vue";
import PricingLayout1 from "../views/pricing-layout-1/Main.vue";
import PricingLayout2 from "../views/pricing-layout-2/Main.vue";
import InvoiceLayout1 from "../views/invoice-layout-1/Main.vue";
import InvoiceLayout2 from "../views/invoice-layout-2/Main.vue";
import FaqLayout1 from "../views/faq-layout-1/Main.vue";
import FaqLayout2 from "../views/faq-layout-2/Main.vue";
import FaqLayout3 from "../views/faq-layout-3/Main.vue";
import Login from "../views/login/Main.vue";
import Register from "../views/register/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";
import UpdateProfile from "../views/update-profile/Main.vue";
import ChangePassword from "../views/change-password/Main.vue";
import RegularTable from "../views/regular-table/Main.vue";
import Tabulator from "../views/tabulator/Main.vue";
import Modal from "../views/modal/Main.vue";
import SlideOver from "../views/slide-over/Main.vue";
import Notification from "../views/notification/Main.vue";
import Tab from "../views/tab/Main.vue";
import Accordion from "../views/accordion/Main.vue";
import Button from "../views/button/Main.vue";
import Alert from "../views/alert/Main.vue";
import ProgressBar from "../views/progress-bar/Main.vue";
import Tooltip from "../views/tooltip/Main.vue";
import Dropdown from "../views/dropdown/Main.vue";
import Typography from "../views/typography/Main.vue";
import Icon from "../views/icon/Main.vue";
import LoadingIcon from "../views/loading-icon/Main.vue";
import RegularForm from "../views/regular-form/Main.vue";
import Datepicker from "../views/datepicker/Main.vue";
import TomSelect from "../views/tom-select/Main.vue";
import FileUpload from "../views/file-upload/Main.vue";
import WysiwygEditor from "../views/wysiwg-editor/Main.vue";
import Validation from "../views/validation/Main.vue";
import Chart from "../views/chart/Main.vue";
import Slider from "../views/slider/Main.vue";
import ImageZoom from "../views/image-zoom/Main.vue";

import NoInteresados from "../views/no-interesados/Main.vue";
import Reasignados from "../views/reasignados/Main.vue";
import Clientes from "../views/clientes/Main.vue";
import ActualizarUsuario from "../views/actualizar-usuario/Main.vue";
import TableroUsuarios from "../views/tablero-usuarios/Main.vue";

import DashboardCompanies from "../views/dashboard-companies/Main.vue";
import AddUser from "../views/add-user/Main.vue";
import AddProspect from "../views/add-prospect/Main.vue";
import AddCompany from "../views/add-company/Main.vue";
import Companies from "../views/companies/Main.vue";
import AddCompanyUser from "../views/add-company-user/Main.vue";
import CompanyUsers from "../views/company-users/Main.vue";
import EditUser from "../views/edit-user/Main.vue";
import Settings from "../views/settings/Main.vue";
import Languages from "../views/languages/Main.vue";

//import Prospects from "../views/prospects/Main.vue";
//import Activities from "../views/Activities/Main.vue";
//import DashboardUser from "../views/dashboard-user/Main.vue";
//import AddProduct from "../views/add-product/Main.vue";

const requireAuth = async (to, from, next) => {
  if (sessionStorage.getItem("TOKEN")) {
      next();
  } else {
      next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: SideMenu,
    children: [
      {
        path: "dashboard-overview-2",
        name: "side-menu-dashboard-overview-2",
        component: DashboardOverview2,
      },
      {
        path: "dashboard-overview-3",
        name: "side-menu-dashboard-overview-3",
        component: DashboardOverview3,
      },
      {
        path: "dashboard-overview-4",
        name: "side-menu-dashboard-overview-4",
        component: DashboardOverview4,
      },
      /*
      {
        path: "categories",
        name: "side-menu-categories",
        component: Categories,
      },
      {
        path: "add-product",
        name: "side-menu-add-product",
        component: AddProduct,
      },
      */
      {
        path: "product-list",
        name: "side-menu-product-list",
        component: ProductList,
      },
      {
        path: "reasignados",
        name: "side-menu-reasignados",
        component: Reasignados,
      },
      {
        path: "product-grid",
        name: "side-menu-product-grid",
        component: ProductGrid,
      },
      {
        path: "clientes",
        name: "side-menu-clientes",
        component: Clientes,
      },
      {
        path: "transaction-list",
        name: "side-menu-transaction-list",
        component: TransactionList,
      },
      {
        path: "transaction-detail",
        name: "side-menu-transaction-detail",
        component: TransactionDetail,
      },
      {
        path: "seller-list",
        name: "side-menu-seller-list",
        component: SellerList,
      },
      {
        path: "seller-detail",
        name: "side-menu-seller-detail",
        component: SellerDetail,
      },
      {
        path: "reviews",
        name: "side-menu-reviews",
        component: Reviews,
      },
      {
        path: "no-interesados",
        name: "side-menu-no-interesados",
        component: NoInteresados,
      },
      {
        path: "inbox",
        name: "side-menu-inbox",
        component: Inbox,
      },
      {
        path: "file-manager",
        name: "side-menu-file-manager",
        component: FileManager,
      },
      {
        path: "point-of-sale",
        name: "side-menu-point-of-sale",
        component: PointOfSale,
      },
      {
        path: "chat",
        name: "side-menu-chat",
        component: Chat,
      },
      {
        path: "post",
        name: "side-menu-post",
        component: Post,
      },
      {
        path: "calendar",
        name: "side-menu-calendar",
        component: Calendar,
      },
      {
        path: "crud-data-list",
        name: "side-menu-crud-data-list",
        component: CrudDataList,
      },
      {
        path: "crud-form",
        name: "side-menu-crud-form",
        component: CrudForm,
      },
      {
        path: "users-layout-1",
        name: "side-menu-users-layout-1",
        component: UsersLayout1,
      },
      {
        path: "dashboard-companies",
        name: "side-menu-dashboard-companies",
        component: DashboardCompanies,
      },
      // {
      //   path: "add-company-user",
      //   name: "side-menu-add-company-user",
      //   component: AddCompanyUser,
      // },

      //////AGREGADOS
      //USERS
      {
        path: "users",
        name: "side-menu-dashboard-user",
        //path: "dashboard-user",
        //component: DashboardUser,
        component: () => import('../views/leader/users/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-user',
        name: 'side-menu-add-user',
        component: () => import('../views/leader/users/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/user/edit/:id',
        name: 'user-edit',
        component: () => import('../views/leader/users/Edit.vue'),
        beforeEnter: requireAuth
      },
      ////

      //TEAMS
      {
        path: "teams",
        name: "side-menu-teams",
        component: () => import('../views/leader/teams/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-team',
        name: 'side-menu-add-team',
        component: () => import('../views/leader/teams/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/team/edit/:id',
        name: 'side-menu-edit-team',
        component: () => import('../views/leader/teams/Edit.vue'),
        beforeEnter: requireAuth
      },      
      ////

      //COMPANIES
      {
        path: 'add-company',
        name: 'side-menu-add-company',
        component: () => import('../views/leader/companies/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/company/edit/:id',
        name: 'company-edit',
        component: () => import('../views/leader/companies/Edit.vue'),
        beforeEnter: requireAuth
      },
      {
        path: "add-company-user",
        name: "side-menu-add-company-user",
        component: AddCompanyUser,
        component: () => import('../views/leader/companyUser/Create.vue'),
        beforeEnter: requireAuth
      },
      ////

      //PROSPECTS
      {
        path: "prospects",
        name: "side-menu-prospects",
        component: () => import('../views/leader/prospects/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-prospect',
        name: 'side-menu-add-prospect',
        component: () => import('../views/leader/prospects/Edit.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/prospect/edit/:id',
        name: 'side-menu-edit-prospect',
        component: () => import('../views/leader/prospects/Edit.vue'),
        beforeEnter: requireAuth
      },
      
      //ACTIVITIES
      {
        path: "activities",
        name: "side-menu-activities",
        component: () => import('../views/leader/activities/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-activity',
        name: 'side-menu-add-activity',
        component: () => import('../views/leader/activities/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/activities/reschedule/:id',         //'/activities/create/:id', '/lead/create/:id'
        name: 'side-menu-add-activity-reschedule',  //'side-menu-add-lead'
        component: () => import('../views/leader/activities/Create_reschedule.vue'),
        beforeEnter: requireAuth
      },

      //PROSPECTS CATALOGUE ACTIVITIES
      {
        path: 'activities-types',
        name: 'side-menu-activity-type',
        component: () => import('../views/leader/activities_types/DashboardActivities.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-activities-types',
        name: 'side-menu-add-activities-types',
        component: () => import('../views/leader/activities_types/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/activities-types/edit/:id',
        name: 'side-menu-edit-activities-types',
        component: () => import('../views/leader/activities_types/Edit.vue'),
        beforeEnter: requireAuth
      },

      {
        path: 'activity-results',
        name: 'side-menu-activities-results',
        component: () => import('../views/leader/activities_results/DashboardActivitiesResults.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-activity-result',
        name: 'side-menu-add-activities-results',
        component: () => import('../views/leader/activities_results/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/activities-results/edit/:id',
        name: 'side-menu-edit-activities-results',
        component: () => import('../views/leader/activities_results/Edit.vue'),
        beforeEnter: requireAuth
      },

      {
        path: 'subjects',
        name: 'side-menu-subjects',
        component: () => import('../views/leader/subjects/DashboardSubjects.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-subjects',
        name: 'side-menu-add-subjects',
        component: () => import('../views/leader/subjects/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/subjects/edit/:id',
        name: 'side-menu-edit-subjects',
        component: () => import('../views/leader/subjects/Edit.vue'),
        beforeEnter: requireAuth
      },

      //QUOTES
      {
        path: '/quotes/create/:id',
        name: 'side-menu-add-quote',
        component: () => import('../views/leader/quotes/Create.vue'),
        beforeEnter: requireAuth
      },

      //QUOTES
      {
        path: '/contract/create/:id',
        name: 'side-menu-add-contract',
        component: () => import('../views/leader/contracts/Create.vue'),
        beforeEnter: requireAuth
      },
      
      //PROSPECTS CATALOGUE ORIGINS
      {
        path: 'prospecting-sources',
        name: 'side-menu-prospecting-sources',
        component: () => import('../views/leader/prospecting_sources/DashboardClientOrigin.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-prospecting-sources',
        name: 'side-menu-add-prospecting-sources',
        component: () => import('../views/leader/prospecting_sources/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/prospecting-sources/edit/:id',
        name: 'side-menu-edit-prospecting-sources',
        component: () => import('../views/leader/prospecting_sources/Edit.vue'),
        beforeEnter: requireAuth
      },

      //CURRENCIES
      {
        path: 'currencies',
        name: 'side-menu-currencies',
        component: () => import('../views/leader/currencies/DashboardCurrencies.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-currency',
        name: 'side-menu-add-currency',
        component: () => import('../views/leader/currencies/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/currencies/edit/:id',
        name: 'side-menu-edit-currency',
        component: () => import('../views/leader/currencies/Edit.vue'),
        beforeEnter: requireAuth
      },

      //ACCOUNTS
      {
        path: 'accounts',
        name: 'side-menu-accounts',
        component: () => import('../views/leader/accounts/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-account',
        name: 'side-menu-add-account',
        component: () => import('../views/leader/accounts/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/accounts/edit/:id',
        name: 'side-menu-edit-account',
        component: () => import('../views/leader/accounts/Edit.vue'),
        beforeEnter: requireAuth
      },

      //PIPELINES
      {
        path: 'pipelines',
        name: 'side-menu-pipelines',
        component: () => import('../views/leader/pipelines/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-pipeline',
        name: 'side-menu-add-pipeline',
        component: () => import('../views/leader/pipelines/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/pipelines/edit/:id',
        name: 'side-menu-edit-pipeline',
        component: () => import('../views/leader/pipelines/Edit.vue'),
        beforeEnter: requireAuth
      },
      
      //PRODUCTS
      {
        path: 'products',
        name: 'side-menu-products',
        component: () => import('../views/leader/products/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-product',
        name: 'side-menu-add-product',
        component: () => import('../views/leader/products/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/products/edit/:id',
        name: 'side-menu-edit-product',
        component: () => import('../views/leader/products/Edit.vue'),
        beforeEnter: requireAuth
      },

      //PRICES
      {
        path: 'prices',
        name: 'side-menu-prices',
        component: () => import('../views/leader/prices/DashboardPrices.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-price',
        name: 'side-menu-add-price',
        component: () => import('../views/leader/prices/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/prices/edit/:id',
        name: 'side-menu-edit-price',
        component: () => import('../views/leader/prices/Edit.vue'),
        beforeEnter: requireAuth
      },

      //CATEGORIES
      {
        path: 'categories',
        name: 'side-menu-categories',
        component: () => import('../views/leader/categories/DashboardCategories.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-category',
        name: 'side-menu-add-category',
        component: () => import('../views/leader/categories/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/categories/edit/:id',
        name: 'side-menu-edit-category',
        component: () => import('../views/leader/categories/Edit.vue'),
        beforeEnter: requireAuth
      },

      //PRICE LISTS
      {
        path: 'price-lists',
        name: 'side-menu-price-lists',
        component: () => import('../views/leader/priceLists/DashboardPriceLists.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-price-list',
        name: 'side-menu-add-price-list',
        component: () => import('../views/leader/priceLists/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/price-lists/edit/:id',
        name: 'side-menu-edit-price-list',
        component: () => import('../views/leader/priceLists/Edit.vue'),
        beforeEnter: requireAuth
      },

      //PROSPECTS CATALOGUE MEDIUMS
      {
        path: 'prospecting-means',  //'means'
        name: 'side-menu-prospecting-means', //'side-menu-medium'
        component: () => import('../views/leader/prospecting_means/Index.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-prospecting-means', //'add-medium'
        name: 'side-menu-add-prospecting-means', //'side-menu-add-medium'
        component: () => import('../views/leader/prospecting_means/Create.vue'),
        beforeEnter: requireAuth
      },
      {
        path: '/prospecting-means/edit/:id',      //'/medium/edit/:id'
        name: 'side-menu-edit-prospecting-means', //'side-menu-edit-medium'
        component: () => import('../views/leader/prospecting_means/Edit.vue'),
        beforeEnter: requireAuth
      },

       //PROSPECTS CATALOGUE TAGS
       {
        path: 'tags',
        name: 'side-menu-tags',
        component: () => import('../views/leader/tags/DashboardTag.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'add-tag',
        name: 'side-menu-add-tag',
        component: () => import('../views/leader/tags/Create.vue'),
        beforeEnter: requireAuth
      ////
      //////////////////////////////
      },
      {
        path: '/tags/edit/:id',
        name: 'side-menu-edit-tag',
        component: () => import('../views/leader/tags/Edit.vue'),
        beforeEnter: requireAuth
      },
      
      {
        path: "company-users",
        name: "side-menu-company-users",
        component: CompanyUsers,
        beforeEnter: requireAuth
      },
      
      //COMPANIES
      {
        path: 'companies',
        name: 'side-menu-companies',
        component: () => import('../views/leader/companies/Index.vue'),
        beforeEnter: requireAuth
      },
      
      {
        path: "/",
        name: "side-menu-dashboard-overview-1",
        component: DashboardOverview1,
        beforeEnter: requireAuth
      },

      //LEADS
      {
        path: 'leads',
        name: 'side-menu-leads',
        component: () => import('../views/leader/leads/Index.vue'),
        beforeEnter: requireAuth
      },
      
      

      {
        path: "edit-user",
        name: "side-menu-edit-user",
        component: EditUser,
      },
      {
        path: "settings",
        name: "side-menu-settings",
        component: Settings,
      },
      {
        path: "languages",
        name: "side-menu-languages",
        component: () => import('../views/leader/settings/Edit.vue'),
        beforeEnter: requireAuth
      },

      /*
      {
        path: 'origin',
        name: 'side-menu-origin',
        component: () => import('../views/leader/origins/DashboardClientOrigin.vue'),
        beforeEnter: requireAuth
      },
      */
      // {
      //   path: "activities",
      //   name: "side-menu-activities",
      //   component: Activities,
      // },
      {
        path: "users-layout-2",
        name: "side-menu-users-layout-2",
        component: UsersLayout2,
      },
      {
        path: "users-layout-3",
        name: "side-menu-users-layout-3",
        component: UsersLayout3,
      },
      {
        path: "tablero-usuarios",
        name: "side-menu-tablero-usuarios",
        component: TableroUsuarios,
      },
      {
        path: "profile-overview-1",
        name: "side-menu-profile-overview-1",
        component: ProfileOverview1,
      },
      {
        path: "profile-overview-2",
        name: "side-menu-profile-overview-2",
        component: ProfileOverview2,
      },
      {
        path: "profile-overview-3",
        name: "side-menu-profile-overview-3",
        component: ProfileOverview3,
      },
      {
        path: "wizard-layout-1",
        name: "side-menu-wizard-layout-1",
        component: WizardLayout1,
      },
      {
        path: "wizard-layout-2",
        name: "side-menu-wizard-layout-2",
        component: WizardLayout2,
      },
      {
        path: "wizard-layout-3",
        name: "side-menu-wizard-layout-3",
        component: WizardLayout3,
      },
      {
        path: "blog-layout-1",
        name: "side-menu-blog-layout-1",
        component: BlogLayout1,
      },
      {
        path: "blog-layout-2",
        name: "side-menu-blog-layout-2",
        component: BlogLayout2,
      },
      {
        path: "blog-layout-3",
        name: "side-menu-blog-layout-3",
        component: BlogLayout3,
      },
      {
        path: "pricing-layout-1",
        name: "side-menu-pricing-layout-1",
        component: PricingLayout1,
      },
      {
        path: "pricing-layout-2",
        name: "side-menu-pricing-layout-2",
        component: PricingLayout2,
      },
      {
        path: "invoice-layout-1",
        name: "side-menu-invoice-layout-1",
        component: InvoiceLayout1,
      },
      {
        path: "invoice-layout-2",
        name: "side-menu-invoice-layout-2",
        component: InvoiceLayout2,
      },
      {
        path: "faq-layout-1",
        name: "side-menu-faq-layout-1",
        component: FaqLayout1,
      },
      {
        path: "faq-layout-2",
        name: "side-menu-faq-layout-2",
        component: FaqLayout2,
      },
      {
        path: "faq-layout-3",
        name: "side-menu-faq-layout-3",
        component: FaqLayout3,
      },
      {
        path: "update-profile",
        name: "side-menu-update-profile",
        component: UpdateProfile,
      },
      {
        path: "actualizar-usuario",
        name: "side-menu-actualizar-usuario",
        component: ActualizarUsuario,
      },
      {
        path: "change-password",
        name: "side-menu-change-password",
        component: ChangePassword,
      },
      {
        path: "regular-table",
        name: "side-menu-regular-table",
        component: RegularTable,
      },
      {
        path: "tabulator",
        name: "side-menu-tabulator",
        component: Tabulator,
      },
      {
        path: "modal",
        name: "side-menu-modal",
        component: Modal,
      },
      {
        path: "slide-over",
        name: "side-menu-slide-over",
        component: SlideOver,
      },
      {
        path: "notification",
        name: "side-menu-notification",
        component: Notification,
      },
      {
        path: "tab",
        name: "side-menu-tab",
        component: Tab,
      },
      {
        path: "accordion",
        name: "side-menu-accordion",
        component: Accordion,
      },
      {
        path: "button",
        name: "side-menu-button",
        component: Button,
      },
      {
        path: "alert",
        name: "side-menu-alert",
        component: Alert,
      },
      {
        path: "progress-bar",
        name: "side-menu-progress-bar",
        component: ProgressBar,
      },
      {
        path: "tooltip",
        name: "side-menu-tooltip",
        component: Tooltip,
      },
      {
        path: "dropdown",
        name: "side-menu-dropdown",
        component: Dropdown,
      },
      {
        path: "typography",
        name: "side-menu-typography",
        component: Typography,
      },
      {
        path: "icon",
        name: "side-menu-icon",
        component: Icon,
      },
      {
        path: "loading-icon",
        name: "side-menu-loading-icon",
        component: LoadingIcon,
      },
      {
        path: "regular-form",
        name: "side-menu-regular-form",
        component: RegularForm,
      },
      {
        path: "datepicker",
        name: "side-menu-datepicker",
        component: Datepicker,
      },
      {
        path: "tom-select",
        name: "side-menu-tom-select",
        component: TomSelect,
      },
      {
        path: "file-upload",
        name: "side-menu-file-upload",
        component: FileUpload,
      },
      {
        path: "wysiwyg-editor",
        name: "side-menu-wysiwyg-editor",
        component: WysiwygEditor,
      },
      {
        path: "validation",
        name: "side-menu-validation",
        component: Validation,
      },
      {
        path: "chart",
        name: "side-menu-chart",
        component: Chart,
      },
      {
        path: "slider",
        name: "side-menu-slider",
        component: Slider,
      },
      {
        path: "image-zoom",
        name: "side-menu-image-zoom",
        component: ImageZoom,
      },
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "dashboard-overview-1",
        name: "simple-menu-dashboard-overview-1",
        component: DashboardOverview1,
      },
      {
        path: "dashboard-overview-2",
        name: "simple-menu-dashboard-overview-2",
        component: DashboardOverview2,
      },
      {
        path: "dashboard-overview-3",
        name: "simple-menu-dashboard-overview-3",
        component: DashboardOverview3,
      },
      {
        path: "dashboard-overview-4",
        name: "simple-menu-dashboard-overview-4",
        component: DashboardOverview4,
      },
      {
        path: "product-list",
        name: "simple-menu-product-list",
        component: ProductList,
      },
      {
        path: "product-grid",
        name: "simple-menu-product-grid",
        component: ProductGrid,
      },
      {
        path: "transaction-list",
        name: "simple-menu-transaction-list",
        component: TransactionList,
      },
      {
        path: "transaction-detail",
        name: "simple-menu-transaction-detail",
        component: TransactionDetail,
      },
      {
        path: "seller-list",
        name: "simple-menu-seller-list",
        component: SellerList,
      },
      {
        path: "seller-detail",
        name: "simple-menu-seller-detail",
        component: SellerDetail,
      },
      {
        path: "reviews",
        name: "simple-menu-reviews",
        component: Reviews,
      },
      {
        path: "inbox",
        name: "simple-menu-inbox",
        component: Inbox,
      },
      {
        path: "file-manager",
        name: "simple-menu-file-manager",
        component: FileManager,
      },
      {
        path: "point-of-sale",
        name: "simple-menu-point-of-sale",
        component: PointOfSale,
      },
      {
        path: "chat",
        name: "simple-menu-chat",
        component: Chat,
      },
      {
        path: "post",
        name: "simple-menu-post",
        component: Post,
      },
      {
        path: "calendar",
        name: "simple-menu-calendar",
        component: Calendar,
      },
      {
        path: "crud-data-list",
        name: "simple-menu-crud-data-list",
        component: CrudDataList,
      },
      {
        path: "crud-form",
        name: "simple-menu-crud-form",
        component: CrudForm,
      },
      {
        path: "users-layout-1",
        name: "simple-menu-users-layout-1",
        component: UsersLayout1,
      },
      {
        path: "users-layout-2",
        name: "simple-menu-users-layout-2",
        component: UsersLayout2,
      },
      {
        path: "users-layout-3",
        name: "simple-menu-users-layout-3",
        component: UsersLayout3,
      },
      {
        path: "profile-overview-1",
        name: "simple-menu-profile-overview-1",
        component: ProfileOverview1,
      },
      {
        path: "profile-overview-2",
        name: "simple-menu-profile-overview-2",
        component: ProfileOverview2,
      },
      {
        path: "profile-overview-3",
        name: "simple-menu-profile-overview-3",
        component: ProfileOverview3,
      },
      {
        path: "wizard-layout-1",
        name: "simple-menu-wizard-layout-1",
        component: WizardLayout1,
      },
      {
        path: "wizard-layout-2",
        name: "simple-menu-wizard-layout-2",
        component: WizardLayout2,
      },
      {
        path: "wizard-layout-3",
        name: "simple-menu-wizard-layout-3",
        component: WizardLayout3,
      },
      {
        path: "blog-layout-1",
        name: "simple-menu-blog-layout-1",
        component: BlogLayout1,
      },
      {
        path: "blog-layout-2",
        name: "simple-menu-blog-layout-2",
        component: BlogLayout2,
      },
      {
        path: "blog-layout-3",
        name: "simple-menu-blog-layout-3",
        component: BlogLayout3,
      },
      {
        path: "pricing-layout-1",
        name: "simple-menu-pricing-layout-1",
        component: PricingLayout1,
      },
      {
        path: "pricing-layout-2",
        name: "simple-menu-pricing-layout-2",
        component: PricingLayout2,
      },
      {
        path: "invoice-layout-1",
        name: "simple-menu-invoice-layout-1",
        component: InvoiceLayout1,
      },
      {
        path: "invoice-layout-2",
        name: "simple-menu-invoice-layout-2",
        component: InvoiceLayout2,
      },
      {
        path: "faq-layout-1",
        name: "simple-menu-faq-layout-1",
        component: FaqLayout1,
      },
      {
        path: "faq-layout-2",
        name: "simple-menu-faq-layout-2",
        component: FaqLayout2,
      },
      {
        path: "faq-layout-3",
        name: "simple-menu-faq-layout-3",
        component: FaqLayout3,
      },
      {
        path: "update-profile",
        name: "simple-menu-update-profile",
        component: UpdateProfile,
      },
      {
        path: "change-password",
        name: "simple-menu-change-password",
        component: ChangePassword,
      },
      {
        path: "regular-table",
        name: "simple-menu-regular-table",
        component: RegularTable,
      },
      {
        path: "tabulator",
        name: "simple-menu-tabulator",
        component: Tabulator,
      },
      {
        path: "modal",
        name: "simple-menu-modal",
        component: Modal,
      },
      {
        path: "slide-over",
        name: "simple-menu-slide-over",
        component: SlideOver,
      },
      {
        path: "notification",
        name: "simple-menu-notification",
        component: Notification,
      },
      {
        path: "tab",
        name: "simple-menu-tab",
        component: Tab,
      },
      {
        path: "accordion",
        name: "simple-menu-accordion",
        component: Accordion,
      },
      {
        path: "button",
        name: "simple-menu-button",
        component: Button,
      },
      {
        path: "alert",
        name: "simple-menu-alert",
        component: Alert,
      },
      {
        path: "progress-bar",
        name: "simple-menu-progress-bar",
        component: ProgressBar,
      },
      {
        path: "tooltip",
        name: "simple-menu-tooltip",
        component: Tooltip,
      },
      {
        path: "dropdown",
        name: "simple-menu-dropdown",
        component: Dropdown,
      },
      {
        path: "typography",
        name: "simple-menu-typography",
        component: Typography,
      },
      {
        path: "icon",
        name: "simple-menu-icon",
        component: Icon,
      },
      {
        path: "loading-icon",
        name: "simple-menu-loading-icon",
        component: LoadingIcon,
      },
      {
        path: "regular-form",
        name: "simple-menu-regular-form",
        component: RegularForm,
      },
      {
        path: "datepicker",
        name: "simple-menu-datepicker",
        component: Datepicker,
      },
      {
        path: "tom-select",
        name: "simple-menu-tom-select",
        component: TomSelect,
      },
      {
        path: "file-upload",
        name: "simple-menu-file-upload",
        component: FileUpload,
      },
      {
        path: "wysiwyg-editor",
        name: "simple-menu-wysiwyg-editor",
        component: WysiwygEditor,
      },
      {
        path: "validation",
        name: "simple-menu-validation",
        component: Validation,
      },
      {
        path: "chart",
        name: "simple-menu-chart",
        component: Chart,
      },
      {
        path: "slider",
        name: "simple-menu-slider",
        component: Slider,
      },
      {
        path: "image-zoom",
        name: "simple-menu-image-zoom",
        component: ImageZoom,
      },
    ],
  },
  {
    path: "/top-menu",
    component: TopMenu,
    children: [
      /*
      {
        path: "add-product",
        name: "top-menu-add-product",
        component: AddProduct,
      },
      */
      {
        path: "dashboard-overview-1",
        name: "top-menu-dashboard-overview-1",
        component: DashboardOverview1,
      },
      {
        path: "dashboard-overview-2",
        name: "top-menu-dashboard-overview-2",
        component: DashboardOverview2,
      },
      {
        path: "dashboard-overview-3",
        name: "top-menu-dashboard-overview-3",
        component: DashboardOverview3,
      },
      {
        path: "dashboard-overview-4",
        name: "top-menu-dashboard-overview-4",
        component: DashboardOverview4,
      },
      {
        path: "product-list",
        name: "top-menu-product-list",
        component: ProductList,
      },
      {
        path: "product-grid",
        name: "top-menu-product-grid",
        component: ProductGrid,
      },
      {
        path: "transaction-list",
        name: "top-menu-transaction-list",
        component: TransactionList,
      },
      {
        path: "transaction-detail",
        name: "top-menu-transaction-detail",
        component: TransactionDetail,
      },
      {
        path: "seller-list",
        name: "top-menu-seller-list",
        component: SellerList,
      },
      {
        path: "seller-detail",
        name: "top-menu-seller-detail",
        component: SellerDetail,
      },
      {
        path: "reviews",
        name: "top-menu-reviews",
        component: Reviews,
      },
      {
        path: "inbox",
        name: "top-menu-inbox",
        component: Inbox,
      },
      {
        path: "file-manager",
        name: "top-menu-file-manager",
        component: FileManager,
      },
      {
        path: "point-of-sale",
        name: "top-menu-point-of-sale",
        component: PointOfSale,
      },
      {
        path: "chat",
        name: "top-menu-chat",
        component: Chat,
      },
      {
        path: "post",
        name: "top-menu-post",
        component: Post,
      },
      {
        path: "calendar",
        name: "top-menu-calendar",
        component: Calendar,
      },
      {
        path: "crud-data-list",
        name: "top-menu-crud-data-list",
        component: CrudDataList,
      },
      {
        path: "crud-form",
        name: "top-menu-crud-form",
        component: CrudForm,
      },
      {
        path: "users-layout-1",
        name: "top-menu-users-layout-1",
        component: UsersLayout1,
      },
      {
        path: "users-layout-2",
        name: "top-menu-users-layout-2",
        component: UsersLayout2,
      },
      {
        path: "users-layout-3",
        name: "top-menu-users-layout-3",
        component: UsersLayout3,
      },
      {
        path: "profile-overview-1",
        name: "top-menu-profile-overview-1",
        component: ProfileOverview1,
      },
      {
        path: "profile-overview-2",
        name: "top-menu-profile-overview-2",
        component: ProfileOverview2,
      },
      {
        path: "profile-overview-3",
        name: "top-menu-profile-overview-3",
        component: ProfileOverview3,
      },
      {
        path: "wizard-layout-1",
        name: "top-menu-wizard-layout-1",
        component: WizardLayout1,
      },
      {
        path: "wizard-layout-2",
        name: "top-menu-wizard-layout-2",
        component: WizardLayout2,
      },
      {
        path: "wizard-layout-3",
        name: "top-menu-wizard-layout-3",
        component: WizardLayout3,
      },
      {
        path: "blog-layout-1",
        name: "top-menu-blog-layout-1",
        component: BlogLayout1,
      },
      {
        path: "blog-layout-2",
        name: "top-menu-blog-layout-2",
        component: BlogLayout2,
      },
      {
        path: "blog-layout-3",
        name: "top-menu-blog-layout-3",
        component: BlogLayout3,
      },
      {
        path: "pricing-layout-1",
        name: "top-menu-pricing-layout-1",
        component: PricingLayout1,
      },
      {
        path: "pricing-layout-2",
        name: "top-menu-pricing-layout-2",
        component: PricingLayout2,
      },
      {
        path: "invoice-layout-1",
        name: "top-menu-invoice-layout-1",
        component: InvoiceLayout1,
      },
      {
        path: "invoice-layout-2",
        name: "top-menu-invoice-layout-2",
        component: InvoiceLayout2,
      },
      {
        path: "faq-layout-1",
        name: "top-menu-faq-layout-1",
        component: FaqLayout1,
      },
      {
        path: "faq-layout-2",
        name: "top-menu-faq-layout-2",
        component: FaqLayout2,
      },
      {
        path: "faq-layout-3",
        name: "top-menu-faq-layout-3",
        component: FaqLayout3,
      },
      {
        path: "update-profile",
        name: "top-menu-update-profile",
        component: UpdateProfile,
      },
      {
        path: "change-password",
        name: "top-menu-change-password",
        component: ChangePassword,
      },
      {
        path: "regular-table",
        name: "top-menu-regular-table",
        component: RegularTable,
      },
      {
        path: "tabulator",
        name: "top-menu-tabulator",
        component: Tabulator,
      },
      {
        path: "modal",
        name: "top-menu-modal",
        component: Modal,
      },
      {
        path: "slide-over",
        name: "top-menu-slide-over",
        component: SlideOver,
      },
      {
        path: "notification",
        name: "top-menu-notification",
        component: Notification,
      },
      {
        path: "tab",
        name: "top-menu-tab",
        component: Tab,
      },
      {
        path: "accordion",
        name: "top-menu-accordion",
        component: Accordion,
      },
      {
        path: "button",
        name: "top-menu-button",
        component: Button,
      },
      {
        path: "alert",
        name: "top-menu-alert",
        component: Alert,
      },
      {
        path: "progress-bar",
        name: "top-menu-progress-bar",
        component: ProgressBar,
      },
      {
        path: "tooltip",
        name: "top-menu-tooltip",
        component: Tooltip,
      },
      {
        path: "dropdown",
        name: "top-menu-dropdown",
        component: Dropdown,
      },
      {
        path: "typography",
        name: "top-menu-typography",
        component: Typography,
      },
      {
        path: "icon",
        name: "top-menu-icon",
        component: Icon,
      },
      {
        path: "loading-icon",
        name: "top-menu-loading-icon",
        component: LoadingIcon,
      },
      {
        path: "regular-form",
        name: "top-menu-regular-form",
        component: RegularForm,
      },
      {
        path: "datepicker",
        name: "top-menu-datepicker",
        component: Datepicker,
      },
      {
        path: "tom-select",
        name: "top-menu-tom-select",
        component: TomSelect,
      },
      {
        path: "file-upload",
        name: "top-menu-file-upload",
        component: FileUpload,
      },
      {
        path: "wysiwyg-editor",
        name: "top-menu-wysiwyg-editor",
        component: WysiwygEditor,
      },
      {
        path: "validation",
        name: "top-menu-validation",
        component: Validation,
      },
      {
        path: "chart",
        name: "top-menu-chart",
        component: Chart,
      },
      {
        path: "slider",
        name: "top-menu-slider",
        component: Slider,
      },
      {
        path: "image-zoom",
        name: "top-menu-image-zoom",
        component: ImageZoom,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
