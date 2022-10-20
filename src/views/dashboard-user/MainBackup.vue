<template>
<div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Dashboard</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <!-- <button class="btn btn-primary shadow-md mr-2" :to="`/add-product`">Add New Product</button> -->
      <!-- <router-link class="btn btn-primary shadow-md mr-2" :to="`/add-user`">Add User</router-link> -->
      <!-- BEGIN: Modal Toggle -->
      <div class="text-center">
          <a href="javascript:;" @click="headerFooterModalPreview = true" class="btn btn-primary shadow-md mr-2">Add User</a>
      </div>
      <!-- END: Modal Toggle -->
      <!-- BEGIN: Modal Content -->
      <Modal :show="headerFooterModalPreview" @hidden="headerFooterModalPreview = false">
          <ModalHeader>
              <h2 class="font-medium text-base mr-auto">
                  Add User
              </h2>
          </ModalHeader>
          <ModalBody >
            <form @submit.prevent="addUser" autocomplete="on">
              <div class="mt-3">
                  <label class="form-label">Name</label>
                  <input v-model="name" type="text" class="form-control" placeholder="Name" />
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
                  <label class="form-label">Password Confirmation</label>
                  <input v-model="password_confirmation" type="text" class="form-control" placeholder="**********" />
              </div>
              <button type="button" @click="headerFooterModalPreview = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="submit" class="btn btn-primary w-20">
                Send
            </button>
           </form>
          </ModalBody>
          <!-- <ModalFooter>
            <button type="button" @click="headerFooterModalPreview = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" class="btn btn-primary w-20">
                Send
            </button>
          </ModalFooter> -->
      </Modal>
      <!-- END: Modal Content -->
      <!-- <router-link class="btn btn-primary shadow-md mr-2" :to="`/edit-user`">Edit User</router-link> -->
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
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="name">Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">email</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."/>
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-go"
            type="button"
            class="btn btn-primary w-full sm:w-16"
            @click="onFilter">
            Go
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
            @click="onResetFilter">
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
          @click="onPrint">
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
        class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->


  
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";

import axios from "axios"
import axiosClient from "../../axios";

const name = ref('')
const lastname = ref('') 
const role = ref('') 
const email = ref('') 
const password = ref('') 
const password_confirmation = ref('') 

async function addUser() {
  
    const payload = { 
      name: name.value, 
      lastname: lastname.value,
      email: email.value, 
      password: password.value, 
      password_confirmation: password_confirmation.value,
      role: 'leader', 
     };
    axiosClient.post('/register', payload)
    .then (({data}) => {
      console.log(data)
      return data;
    })
     .catch(function (error) {
    console.log(error);
  })
}

const headerFooterModalPreview = ref(false);
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
    ajaxURL: "https://api.leader.arkanmedia.com/api/users/leader",
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
        title: "NAME", // colum title
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
      {
        title: "ACTIONS",
        minWidth: 200,
        field: "actions",
        responsive: 1,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
  //      formatter() {
  //         return `<!-- BEGIN: Delete Confirmation Modal -->
  // <Modal
  //   :show="deleteConfirmationModal"
  //   @hidden="deleteConfirmationModal = false"
  // >
  //   <ModalBody class="p-0">
  //     <div class="p-5 text-center">
  //       <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
  //       <div class="text-3xl mt-5">Are you sure?</div>
  //       <div class="text-slate-500 mt-2">
  //         Do you really want to delete these records? <br />This process cannot
  //         be undone.
  //       </div>
  //     </div>
  //     <div class="px-5 pb-8 text-center">
  //       <button
  //         type="button"
  //         @click="deleteConfirmationModal = false"
  //         class="btn btn-outline-secondary w-24 mr-1"
  //       >
  //         Cancel
  //       </button>
  //       <button type="button" class="btn btn-danger w-24">Delete</button>
  //     </div>
  //   </ModalBody>
  // </Modal>
  // <!-- END: Delete Confirmation Modal -->`;
  //       },
        
  
        formatter() {
          const a = dom(`<div class="flex lg:justify-center items-center">

              <!--<a class="flex items-center mr-3" href="javascript:;" @click="basicModalPreview = true">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>-->
                <!-- BEGIN: Modal Toggle -->

                    <a class="flex items-center mr-3"  @click="basicModalPreview = true">

              <!--                 
                // <a class="flex items-center mr-3" href="javascript:;" @click="basicModalPreview = true">
                //   <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                // </a>-->
                <!-- BEGIN: Modal Toggle -->

                    <a class="flex items-center mr-3" href="javascript:;" @click="basicModalPreview = true">

                      <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                    </a>

                <!-- END: Modal Toggle -->
                <a class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>

              </div>`);
          dom(a).on("click", function () {
            // On click actions
            console.log('hello world');
          
            const basicModalPreview = ref(false);
            const app = document.getElementById("content")
            const modal = document.createElement("div")
            const modalInnerHTML =  
            `
            <!-- BEGIN: Modal Content -->
            <Modal :show="basicModalPreview" @hidden="basicModalPreview = false">
                <ModalBody class="p-10 text-center">
                    This is totally awesome blank modal!
                </ModalBody>
            </Modal>
            <!-- END: Modal Content -->
            `
            modal.innerHTML = modalInnerHTML
            app.appendChild(modal)
          });

          return a[0];
        },
      },
      
      // For print format
      {
        title: "NAME",
        field: "name",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "EMAIL",
        field: "email",
        visible: false,
        print: true,
        download: true,
      },
      // {
      //   title: "STATUS",
      //   field: "status",
      //   visible: false,
      //   print: true,
      //   download: true,
      //   formatterPrint(cell) {
      //     return cell.getValue() ? "Active" : "Inactive";
      //   },
      // }
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

const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
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
