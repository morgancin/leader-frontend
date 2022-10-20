<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Dashboard</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <!-- <button class="btn btn-primary shadow-md mr-2" :to="`/add-product`">Add New Product</button> -->
      <!-- <router-link class="btn btn-primary shadow-md mr-2" :to="`/add-user`">Add User</router-link> -->
      <!-- BEGIN: Modal Toggle -->
      <div class="text-center">
        <a href="javascript:;" @click="headerFooterModalPreview = true" class="btn btn-primary shadow-md mr-2">Add
          Company</a>
      </div>
      <!-- END: Modal Toggle -->
      <!-- BEGIN: Modal Content -->
      <Modal :show="headerFooterModalPreview" @hidden="headerFooterModalPreview = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">
            Add Company
          </h2>
          <!-- <button class="btn btn-outline-secondary hidden sm:flex">
                  <FileIcon class="w-4 h-4 mr-2" /> Download Docs
              </button> -->
          <Dropdown class="sm:hidden">
            <DropdownToggle class="w-5 h-5 block" href="javascript:;">
              <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>
                <DropdownItem>
                  <FileIcon class="w-4 h-4 mr-2" />
                  Download Docs
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </ModalHeader>
        <ModalBody>
          <form @submit.prevent="addCompany" autocomplete="on">
            <div
              class="mt-5 grid auto-rows-auto grid-flow-dense gap-4 xl:grid-cols-2 lg:grid-cols-2  md:grid-cols-2  sm:grid-cols-1">
              <div class="mt-3">
                <label class="form-label">Company</label>
                <input v-model="name" type="text" class="form-control" placeholder="Company" />
              </div>
              <div class="mt-3">
                <label class="form-label">email</label>
                <input v-model="email" type="email" class="form-control" placeholder="example@gmail.com" />
              </div>
              <div class="mt-3">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="**********" />
              </div>
              <div class="mt-3">
                <label class="form-label">Confirm Password</label>
                <input v-model="password_confirmation" type="password" class="form-control" placeholder="**********" />
              </div>
              <div class="mt-3">
                <label class="form-label">Company Name</label>
                <input v-model="company_name" type="text" class="form-control" placeholder="Company Name" />
              </div>
              <div class="mt-3">
                <label class="form-label">Postal Code</label>
                <input v-model.number="postal_code" type="number" class="form-control" placeholder="Postal Code" />
              </div>
              <div class="mt-3">
                <label class="form-label">State</label>
                <input v-model="state" type="text" class="form-control" placeholder="State" />
              </div>
              <div class="mt-3">
                <label class="form-label">City</label>
                <input v-model="city" type="text" class="form-control" placeholder="City" />
              </div>
             
              <button type="submit" class="btn btn-primary w-20 mt-5">
                Send
              </button>
              <button type="button" @click="headerFooterModalPreview = false"
                class="btn btn-outline-secondary w-20 mr-1">
                Cancel
              </button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div></div>

        </ModalFooter>
      </Modal>
      <Dropdown class="ml-auto sm:ml-0">
        <DropdownToggle class="btn px-2 box">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <FilePlusIcon class="w-4 h-4 mr-2" /> New Category
            </DropdownItem>
            <DropdownItem>
              <UserPlusIcon class="w-4 h-4 mr-2" /> New Group
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5" id="content">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select id="tabulator-html-filter-field" v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="name">Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">email</option>
          </select>
        </div>
        <!-- <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
          <select
            id="tabulator-html-filter-type"
            v-model="filter.type"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="like" selected>like</option>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="!=">!=</option>
          </select>
        </div> -->
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
          <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0" placeholder="Search..." />
        </div>
        <div class="mt-2 xl:mt-0">
          <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16" @click="onFilter">
            Go
          </button>
          <button id="tabulator-html-filter-reset" type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1" @click="onResetFilter">
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> Export
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export CSV
              </DropdownItem>
              <DropdownItem @click="onExportJson">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export JSON
              </DropdownItem>
              <!--
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
              -->
              <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export HTML
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
//import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";

import axios from "axios"
import axiosClient from "./../../axios";

const headerFooterModalPreview = ref(false);

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const company_name = ref('')
const postal_code = ref('')
const state = ref('')
const city = ref('')

async function addCompany(){

// console.log('hello');
const dataCompany = {
   name: name.value, 
   email: email.value, 
   password: password.value, 
   password_confirmation: password_confirmation.value, 
   company_name: company_name.value,
   postal_code: postal_code.value, 
   state: state.value,
   city: city.value,
   role: "company",
}
axiosClient.post('/register', dataCompany)
 .then(({data}) => {
      console.log(data)
      return data;
    })
}
 





const tableRef = ref(false);
const tabulator = ref();
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);
const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    // ajaxURL: "https://dummy-data.left4code.com",
    // ajaxURL: "https://jsonplaceholder.typicode.com/users",
    ajaxURL: "https://api.leader.arkanmedia.com/api/users/company",
    ajaxConfig:{
        // method:"GET",
        headers: {
            "Authorization": 'Bearer 18|UfNhj4XaWqmdt29OYA9ApctrnHPWkUbWxMxHK9YQ',
        },
    },
    
    ajaxFiltering: true,
    ajaxSorting: true,
    printAsHtml: true,
    printStyled: true,
    // pagination: "remote",
    // paginationSize: 10,
    // paginationSizeSelector: [10, 20, 30, 40],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "Company", // colum title
        minWidth: 200,
        responsive: 0,
        field: "name",
        vertAlign: "middle",
        print: false,
        download: false,
        // formatter(cell) {
        //   return `<div>
        //         <div class="font-medium whitespace-nowrap">${
        //           cell.getData().name
        //         }</div>
        //         <div class="text-slate-500 text-xs whitespace-nowrap">${
        //           cell.getData().username
        //         }</div>
        //       </div>`;
        // },
      },
      {
        title: "EMAIL",
        minWidth: 200,
        field: "email",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      // {
      //   title: "PASSWORD",
      //   minWidth: 200,
      //   field: "password",
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "PASSWORD CONFIRMATION",
      //   minWidth: 200,
      //   field: "password_confirmation",
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "COMPANY NAME",
      //   minWidth: 200,
      //   field: "company_name",
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "POSTAL CODE",
      //   minWidth: 200,
      //   field: "postal_code",
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "STATE",
      //   minWidth: 200,
      //   field: "state",
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "CITY",
      //   minWidth: 200,
      //   field: "city",
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "ACTIONS",
      //   minWidth: 200,
      //   field: "actions",
      //   responsive: 1,
      //   hozAlign: "center",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      //   formatter() {
      //     const a = dom(`<div class="flex lg:justify-center items-center">
      //         <!--                 
      //           // <a class="flex items-center mr-3" href="javascript:;" @click="basicModalPreview = true">
      //           //   <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
      //           // </a>-->
      //           <!-- BEGIN: Modal Toggle -->

      //               <a class="flex items-center mr-3" href="javascript:;" @click="basicModalPreview = true">
      //                 <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
      //               </a>

      //           <!-- END: Modal Toggle -->
      //           <a class="flex items-center text-danger" href="javascript:;">
      //             <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
      //           </a>

      //         </div>`);
      //     dom(a).on("click", function () {
      //       // On click actions
      //       console.log('hello world');
          
      //       const basicModalPreview = ref(false);
      //       const app = document.getElementById("content")
      //       const modal = document.createElement("div")
      //       const modalInnerHTML =  
      //       `
      //       <!-- BEGIN: Modal Content -->
      //       <Modal :show="basicModalPreview" @hidden="basicModalPreview = false">
      //           <ModalBody class="p-10 text-center">
      //               This is totally awesome blank modal!
      //           </ModalBody>
      //       </Modal>
      //       <!-- END: Modal Content -->
      //       `
      //       modal.innerHTML = modalInnerHTML
      //       app.appendChild(modal)
      //     });

      //     return a[0];
      //   },
      // },
      
      // For print format
      {
        title: "NAME",
        minWidth: 200,
        field: "name",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "EMAIL",
        minWidth: 200,
        field: "email",
        visible: false,
        print: true,
        download: true,
      },
      // {
      //   title: "PASSWORD",
      //   minWidth: 200,
      //   field: "password",
      //   visible: false,
      //   print: true,
      //   download: true,
      // },
      // {
      //   title: "PASSWORD CONFIRMATION",
      //   minWidth: 200,
      //   field: "password_confirmation",
      //   visible: false,
      //   print: true,
      //   download: true,
      // },
      // {
      //   title: "COMPANY NAME",
      //   minWidth: 200,
      //   field: "company_name",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "POSTAL CODE",
      //   minWidth: 200,
      //   field: "postal_code",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "STATE",
      //   minWidth: 200,
      //   field: "state",
      //   print: false,
      //   download: false,
      // },
      // {
      //   title: "CITY",
      //   minWidth: 200,
      //   field: "city",
      //   print: false,
      //   download: false,
      // },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
};

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Filter function
const onFilter = () => {
  // tabulator.value.setFilter(filter.field, filter.type, filter.value);
  tabulator.value.setFilter(filter.field, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "name";
  // filter.type = "like";
  filter.value = "";
  onFilter();
};

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onExportJson = () => {
  tabulator.value.download("json", "data.json");
};

/*
const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};
*/

const onExportHtml = () => {
  tabulator.value.download("html", "data.html", {
    style: true,
  });
};

// Print
const onPrint = () => {
  tabulator.value.print();
};

onMounted(() => {
  initTabulator();
  reInitOnResizeWindow();
});
</script>
