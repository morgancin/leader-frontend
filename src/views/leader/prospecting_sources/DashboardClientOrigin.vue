<script setup>
  //import xlsx from "xlsx";
  //import Tabulator from "tabulator-tables";
  import { ref, reactive, onMounted } from "vue";
  import { createIcons, icons } from "lucide";
  import {TabulatorFull as Tabulator} from 'tabulator-tables';
  import dom from "@left4code/tw-starter/dist/js/dom";

  import i18n from "../../../language/i18n";
  const { t } = i18n.global;
  
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
      ajaxURL: `${import.meta.env.VITE_API_BASE}prospecting-sources`,
      ajaxConfig:{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      },
      ajaxResponse:function(url, params, response){
          //url - the URL of the request
          //params - the parameters passed with the request
          //response - the JSON object returned in the body of the response.

          return response.data; //return the tableData property of a response json object
      },
      layout:"fitColumns",
      pagination:true, //enable pagination
      paginationSize:20, //optional parameter to request a certain number of rows per page
      paginationInitialPage:1, //optional parameter to set the initial page to load
      resizableColumnFit:true,
      //paginationMode:"remote", //enable remote pagination
      placeholder: "No matching records found",
      
      columns: [
        // For HTML table
        {
          title: t('list.catalogs_origins.column_3'),
          minWidth: 200,
          field: "account.name",
          vertAlign: "middle",
          print: true,
          download: true,
          // responsive: 0,
          // hozAlign: "center",
        },
        {
          title: t('list.catalogs_origins.column_1'),
          minWidth: 200,
          field: "name",
          vertAlign: "middle",
          print: true,
          download: true,
          // responsive: 0,
          // hozAlign: "center",
        },
        {
          title: t('list.catalogs_origins.column_2'),
          minWidth: 200,
          field: "actions",
          vertAlign: "middle",
          print: false,
          download: false,
          hozAlign: "center",
          headerSort:false,
          formatter(cell) {
            const a = dom(` <div class="flex items-center lg:justify-center">
                              <a class="flex items-center mr-3" href="/prospecting-sources/edit/${cell.getData().id}">
                                <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                              </a>
                            </div>`);
            
            dom(a).on("click", function () {
              // On click actions
            });
              
            return a[0];
          },
        },
      ]
      /*
      renderComplete() {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      },
      */
    });
    tabulator.value.on("renderComplete",function(){
      createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
    });
  };
  
  /*
  const initTabulator = () => {
    tabulator.value = new Tabulator(tableRef.value, {
      // ajaxURL: "https://dummy-data.left4code.com",
      ajaxURL: `${import.meta.env.VITE_API_BASE}prospecting-sources",
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
          title: "ORIGIN",
          minWidth: 200,
          responsive: 0,
          field: "description",
          vertAlign: "middle",
          print: false,
          download: false,
          // formatter(cell) {
          //   return `<div>
          //         <div class="font-medium whitespace-nowrap">${
          //           cell.getData().name
          //         }</div>
          //         <div class="text-xs text-slate-500 whitespace-nowrap">${
          //           cell.getData().category
          //         }</div>
          //       </div>`;
          // },
        },
        // {
        //   title: "IMAGES",
        //   minWidth: 200,
        //   field: "images",
        //   hozAlign: "center",
        //   vertAlign: "middle",
        //   print: false,
        //   download: false,
        //   formatter(cell) {
        //     return `<div class="flex lg:justify-center">
        //             <div class="w-10 h-10 intro-x image-fit">
        //               <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" src="${
        //                 imageAssets[
        //                   "/src/assets/images/" + cell.getData().images[0]
        //                 ].default
        //               }">
        //             </div>
        //             <div class="w-10 h-10 -ml-5 intro-x image-fit">
        //               <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" src="${
        //                 imageAssets[
        //                   "/src/assets/images/" + cell.getData().images[1]
        //                 ].default
        //               }">
        //             </div>
        //             <div class="w-10 h-10 -ml-5 intro-x image-fit">
        //               <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" src="${
        //                 imageAssets[
        //                   "/src/assets/images/" + cell.getData().images[2]
        //                 ].default
        //               }">
        //             </div>
        //         </div>`;
        //   },
        // },
        // {
        //   title: "REMAINING STOCK",
        //   minWidth: 200,
        //   field: "remaining_stock",
        //   hozAlign: "center",
        //   vertAlign: "middle",
        //   print: false,
        //   download: false,
        // },
        // {
        //   title: "STATUS",
        //   minWidth: 200,
        //   field: "status",
        //   hozAlign: "center",
        //   vertAlign: "middle",
        //   print: false,
        //   download: false,
        //   formatter(cell) {
        //     return `<div class="flex items-center lg:justify-center ${
        //       cell.getData().status ? "text-success" : "text-danger"
        //     }">
        //           <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
        //             cell.getData().status ? "Active" : "Inactive"
        //           }
        //         </div>`;
        //   },
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
        //     const a = dom(`<div class="flex items-center lg:justify-center">
        //           <a class="flex items-center mr-3" href="javascript:;">
        //             <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
        //           </a>
        //           <a class="flex items-center text-danger" href="javascript:;">
        //             <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
        //           </a>
        //         </div>`);
        //     dom(a).on("click", function () {
        //       // On click actions
        //     });
  
        //     return a[0];
        //   },
        // },
  
        // For print format
        {
          title: "ORIGIN",
          field: "description",
          visible: false,
          print: true,
          download: true,
        },
        // {
        //   title: "CATEGORY",
        //   field: "category",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "REMAINING STOCK",
        //   field: "remaining_stock",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "STATUS",
        //   field: "status",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue() ? "Active" : "Inactive";
        //   },
        // },
        // {
        //   title: "IMAGE 1",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[0];
        //   },
        // },
        // {
        //   title: "IMAGE 2",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[1];
        //   },
        // },
        // {
        //   title: "IMAGE 3",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[2];
        //   },
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
  */




  
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



<template>

<div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
    <h2 class="mr-auto text-lg font-medium">{{ $t('catalogs_origins.list_origins') }}</h2>
    <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
      <router-link class="mr-2 shadow-md btn btn-primary" :to="`/add-prospecting-sources`">{{ $t('catalogs_origins.btn_add_new_origins') }}</router-link>
      <!-- <Dropdown class="ml-auto sm:ml-0">
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
      </Dropdown> -->
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="p-5 mt-5 intro-y box">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <!-- <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
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
            <option value="category">Category</option>
            <option value="remaining_stock">Remaining Stock</option>
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
              
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
             
              <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export HTML
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>-->
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