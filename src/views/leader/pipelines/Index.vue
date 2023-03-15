<script setup>
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
      ajaxURL: `${import.meta.env.VITE_API_BASE}pipelines`,
      ajaxResponse:function(url, params, response){
          return response.data; 
      },
      ajaxConfig:{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      },
      layout:"fitColumns",
      pagination:true, //enable pagination
      paginationSize:20, //optional parameter to request a certain number of rows per page
      paginationInitialPage:1, //optional parameter to set the initial page to load
      resizableColumnFit:true,
      placeholder: "No matching records found",
      columns: [
        // For HTML table
        {
          title: t('list.pipelines.column_1'),
          minWidth: 200,
          field: "name",
          vertAlign: "middle",
          print: true,
          download: true
        },
        {
          title: t('list.pipelines.column_2'),
          minWidth: 200,
          field: "is_default",
          vertAlign: "middle",
          print: true,
          download: true,
          formatter(cell) {

            var value = cell.getValue();
            if(value==1){
              return ` <div class="flex items-center lg:justify-center">${t('forms.yes')}</div>`;
            }
            else{
              return ` <div class="flex items-center lg:justify-center">${t('forms.no')}</div>`;
            }
                          
          },
        },
        {
          title: t('list.pipelines.column_3'),
          minWidth: 200,
          field: "stages",
          vertAlign: "middle",
          print: true,
          download: true,
          formatter(cell) {
            return "0";
          }
        },
        {
          title: t('list.pipelines.column_4'),
          minWidth: 200,
          field: "actions",
          vertAlign: "middle",
          print: false,
          download: false,
          hozAlign: "center",
          headerSort:false,
          formatter(cell) {
            const a = dom(` <div class="flex items-center lg:justify-center">
                              <a class="flex items-center mr-3" href="/pipelines/edit/${cell.getData().id}">
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
    <h2 class="mr-auto text-lg font-medium">{{ $t('add_pipelines.pipelines') }}</h2>
    <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
      <router-link class="mr-2 shadow-md btn btn-primary" :to="`/add-pipeline`">{{ $t('add_pipelines.btn_add_new_pipeline') }}</router-link>      
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
              
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
             
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

