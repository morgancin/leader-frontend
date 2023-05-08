<template>
  <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
    <h2 class="mr-auto text-lg font-medium">{{ $t('companies.companies') }}</h2>
    <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
      <router-link class="mr-2 shadow-md btn btn-primary" :to="`/add-company`">{{ $t('companies.btn-add-new-companies') }}</router-link>
      <!--<Dropdown class="ml-auto sm:ml-0">
        <DropdownToggle class="px-2 btn box">
          <span class="flex items-center justify-center w-5 h-5">
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
      </Dropdown>-->
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="p-5 mt-5 intro-y box">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="items-center sm:flex sm:mr-4">
          <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial"
            >Field</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="w-full mt-2 form-select sm:w-32 2xl:w-full sm:mt-0 sm:w-auto"
          >
            <option value="name">Name</option>
          </select>
        </div>
        <div class="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
          <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial"
            >Type</label
          >
          <select
            id="tabulator-html-filter-type"
            v-model="filter.type"
            class="w-full mt-2 form-select sm:mt-0 sm:w-auto"
          >
            <option value="like" selected>like</option>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="!=">!=</option>
          </select>
        </div>
        <div class="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
          <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial"
            >Value</label
          >
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="mt-2 form-control sm:w-40 2xl:w-full sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-go"
            type="button"
            class="w-full btn btn-primary sm:w-16"
            @click="onFilter"
          >
            Go
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="w-full mt-2 btn btn-secondary sm:w-16 sm:mt-0 sm:ml-1"
            @click="onResetFilter"
          >
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button
          id="tabulator-print"
          class="w-1/2 mr-2 btn btn-outline-secondary sm:w-auto"
          @click="onPrint"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="w-full btn btn-outline-secondary sm:w-auto">
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
      <div
        id="tabulator"
        ref="tableRef"
        class="mt-5 table-report table-report--tabulator"
      ></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
//import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
//import Tabulator from "tabulator-tables";
import {Tabulator} from 'tabulator-tables';
import dom from "@left4code/tw-starter/dist/js/dom";

import i18n from "../../language/i18n";
const { t } = i18n.global;

/*
import axios from "axios"
import axiosClient from "../../axios";
axiosClient.get('/companies/list')
  .then(({data}) => {
    console.log(data)
    return data;
  })
  .catch(function (error) {
  console.log(error);
})
*/

const tableRef = ref();
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
    //ajaxURL: "https://api.leader.arkanmedia.com/api/activities",
    ajaxURL: `${import.meta.env.VITE_API_BASE}companies`,
    ajaxConfig:{
      method:"GET",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`,
      },
    },
      
    ajaxResponse:function(url, params, response){
      return response.data; //return the tableData property of a response json object
    },
    pagination:true, //enable pagination
    paginationSize:20, //optional parameter to request a certain number of rows per page
    paginationInitialPage:1, //optional parameter to set the initial page to load
    resizableColumnFit:true,
    //paginationMode:"remote", //enable remote pagination
    placeholder: "No matching records found",
    
    /*
    ajaxURL: `${import.meta.env.VITE_API_BASE}companies`,
      ajaxConfig:{
        method:"GET",
        headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`,
                },
    },
    pagination:true, //enable pagination
    paginationSize:20, //optional parameter to request a certain number of rows per page
    paginationInitialPage:1, //optional parameter to set the initial page to load
    resizableColumnFit:true,
    //paginationMode:"remote", //enable remote pagination
    placeholder: "No matching records found",
    */

    /*
    ajaxURL: `${import.meta.env.VITE_API_BASE}companies/list`,
    ajaxConfig:{
      method:"GET",
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`,
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
    */

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
        title: t('list.activities.column_1'),
        minWidth: 200,
        field: "name",
        vertAlign: "middle",
        print: true,
        download: true,
      },
      {
        title: t('list.prospects.column_6'),
        minWidth: 200,
        field: "actions",
        vertAlign: "middle",
        print: false,
        download: false,
        hozAlign: "center",
        headerSort:false,
        formatter(cell) {
          const a = dom(` <div class="flex items-center lg:justify-center">
                            <a class="flex items-center mr-3" href="/company/edit/${cell.getData().id}">
                              <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                            </a>
                            <a class="flex items-center text-danger" @click="deleteCompany(${cell.getData().id})">
                              <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete 
                            </a>
                          </div>`);

          dom(a).on("click", function () {
            // On click actions
          });
              
          return a[0];
        },
      },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
  tabulator.value.on("renderComplete",function(){
      createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
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
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "name";
  filter.type = "like";
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
