<template>
  <h2 class="intro-y text-lg font-medium mt-10">No interesado</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap justify-between sm:flex-nowrap items-center mt-2">
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input type="text" class="form-control w-56 box pr-10" placeholder="Search..." />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <Litepicker v-model="daterange" :options="{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }" class="form-control w-56 block mx-auto" />
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="whitespace-nowrap">#</th>
            <th class="whitespace-nowrap">First Name</th>
            <th class="whitespace-nowrap">Last Name</th>
            <th class="whitespace-nowrap">Username</th>
            <th class="whitespace-nowrap">Email</th>
            <th class="whitespace-nowrap">Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="whitespace-nowrap">1</td>
            <td class="whitespace-nowrap">Angelina</td>
            <td class="whitespace-nowrap">Jolie</td>
            <td class="whitespace-nowrap">@angelinajolie</td>
            <td class="whitespace-nowrap">angelinajolie@gmail.com</td>
            <td class="whitespace-nowrap">
              260 W. Storm Street New York, NY 10025.
            </td>
          </tr>
          <tr>
            <td class="whitespace-nowrap">2</td>
            <td class="whitespace-nowrap">Brad</td>
            <td class="whitespace-nowrap">Pitt</td>
            <td class="whitespace-nowrap">@bradpitt</td>
            <td class="whitespace-nowrap">bradpitt@gmail.com</td>
            <td class="whitespace-nowrap">
              47 Division St. Buffalo, NY 14241.
            </td>
          </tr>
          <tr>
            <td class="whitespace-nowrap">3</td>
            <td class="whitespace-nowrap">Charlie</td>
            <td class="whitespace-nowrap">Hunnam</td>
            <td class="whitespace-nowrap">@charliehunnam</td>
            <td class="whitespace-nowrap">charliehunnam@gmail.com</td>
            <td class="whitespace-nowrap">
              8023 Amerige Street Harriman, NY 10926.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <th class="whitespace-nowrap">
              <input class="form-check-input" type="checkbox" />
            </th>
            <th class="whitespace-nowrap">PRODUCT</th>
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap">RATING</th>
            <th class="text-center whitespace-nowrap">POSTED TIME</th>
            <th class="text-center whitespace-nowrap">STATUS</th>
            <th class="text-center whitespace-nowrap">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(faker, fakerKey) in $_.take($f(), 9)"
            :key="fakerKey"
            class="intro-x"
          >
            <td class="w-10">
              <input class="form-check-input" type="checkbox" />
            </td>
            <td class="!py-4">
              <div class="flex items-center">
                <div class="w-10 h-10 image-fit zoom-in">
                  <Tippy
                    tag="img"
                    alt="Midone - HTML Admin Template"
                    class="rounded-lg border-1 border-white shadow-md"
                    :src="faker.images[0]"
                    :content="`Uploaded at ${faker.dates[0]}`"
                  />
                </div>
                <a href="" class="font-medium whitespace-nowrap ml-4">{{
                  faker.products[0].name
                }}</a>
              </div>
            </td>
            <td class="whitespace-nowrap">
              <a
                class="flex items-center underline decoration-dotted"
                href="javascript:;"
                >{{ faker.users[0].name }}</a
              >
            </td>
            <td class="text-center">
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon class="text-pending fill-pending/30 w-4 h-4 mr-1" />
                  <StarIcon class="text-pending fill-pending/30 w-4 h-4 mr-1" />
                  <StarIcon class="text-pending fill-pending/30 w-4 h-4 mr-1" />
                  <StarIcon class="text-pending fill-pending/30 w-4 h-4 mr-1" />
                  <StarIcon class="text-slate-400 fill-slate/30 w-4 h-4 mr-1" />
                </div>
                <div class="text-xs text-slate-500 ml-1">(4.5+)</div>
              </div>
            </td>
            <td class="text-center whitespace-nowrap">
              {{ faker.formattedTimes[0] }}
            </td>
            <td class="w-40">
              <div
                class="flex items-center justify-center"
                :class="{
                  'text-success': faker.trueFalse[0],
                  'text-danger': !faker.trueFalse[0],
                }">
                <CheckSquareIcon class="w-4 h-4 mr-2" />
                {{ faker.trueFalse[0] ? "Active" : "Removed" }}
              </div>
            </td>
            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <a class="flex items-center text-primary whitespace-nowrap"
                   href="javascript:;">
                  <CheckSquareIcon class="w-4 h-4 mr-1" /> View Details
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <nav class="w-full sm:w-auto sm:mr-auto">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
      <select class="w-20 form-select box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot
          be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24">Delete</button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>

<script setup>
import { ref } from "vue";

const deleteConfirmationModal = ref(false);
</script>
