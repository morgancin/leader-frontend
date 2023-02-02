<script>
    export default {
        name: "QuotesPreview",
    }
</script>

<script setup>
    const props = defineProps({
        send_quote: {
            type: Object,
            required: true,
        }, 
    });
</script>

<template>
    <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
      <!-- <h2 class="mr-auto text-lg font-medium">Quote</h2> -->
      <!--
      <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
        <a
          href="javascript:;"
          @click="newOrderModal = true"
          class="mr-2 shadow-md btn btn-primary">
            New Order
        </a>
        
        <Dropdown class="ml-auto pos-dropdown sm:ml-0">
          <DropdownToggle class="px-2 btn box">
            <span class="flex items-center justify-center w-5 h-5">
              <ChevronDownIcon class="w-4 h-4" />
            </span>
          </DropdownToggle>
          <DropdownMenu class="pos-dropdown__dropdown-menu">
            <DropdownContent>
              <DropdownItem>
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate"
                  >INV-0206020 - {{ $f()[3].users[0].name }}</span
                >
              </DropdownItem>
              <DropdownItem>
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate"
                  >INV-0206022 - {{ $f()[4].users[0].name }}</span
                >
              </DropdownItem>
              <DropdownItem>
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate"
                  >INV-0206021 - {{ $f()[5].users[0].name }}</span
                >
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
      -->
    </div>
    <div class="grid grid-cols-12 gap-5 mt-5 intro-y">
      <!-- BEGIN: Item List -->
      <div class="col-span-12 intro-y lg:col-span-8">
        
        
        <div class="grid grid-cols-12 gap-5 mt-5">
          <a
            v-if="(back_category)"
            @click="back_categories"
            href="javascript:;">
              Atrás
          </a>
          
          <div
            v-for="(category, id) in dataCategories" 
            :key="id"
            @click="get_categories_from_category(category)"
            class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div class="text-base font-medium">{{ category.name }}</div>
              <!-- <div class="text-slate-500" v-if="(category.products_count > 0)">{{ category.products_count }} Items</div> -->
          </div>

          <div
            v-if="(category_products_count.products_count > 0)"
            @click="get_category_products(category_products_count)"
            class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div class="text-base font-medium">PRODUCTOS</div>
              <div class="text-slate-500">{{ category_products_count.products_count }} Items</div>
          </div>
        </div>
        
        <div class="grid grid-cols-12 gap-5 pt-5 mt-5 border-t">
          <!-- @click="addItemModal = true" -->
          <a
            v-for="(product, id) in dataProducts"
            :key="id"
            @click="add_product(product)"
            class="block col-span-12 intro-y sm:col-span-4 2xl:col-span-3">
              <div class="relative p-3 rounded-md box zoom-in">
                <div class="flex-none relative block before:block before:w-full before:pt-[100%]">
                  <div class="absolute top-0 left-0 w-full h-full image-fit">
                    <img
                      :alt="product.name"
                      class="rounded-md" />
                  </div>
                </div>
                <div class="block mt-3 font-medium text-center truncate">{{ product.name }}</div>
              </div>
          </a>
        </div>
      </div>
      <!-- END: Item List -->
      
      <!-- BEGIN: Ticket -->
      <TabGroup class="col-span-12 lg:col-span-4">
        <div class="pr-1 intro-y">
          <div class="p-2 box">
            <TabList class="nav-pills">
              <Tab class="w-full py-2" tag="button">Ticket</Tab>
              <Tab class="w-full py-2" tag="button">Details</Tab>
            </TabList>
          </div>
        </div>
        
        <TabPanels>
          <TabPanel>
            <div class="p-2 mt-5 box">
              <a
                v-for="(product, id) in cart"
                :key="id"
                href="javascript:;"
                @click="addItemModal = true"
                class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">
                
                  <div class="max-w-[50%] truncate mr-1">
                    {{ product.name }}
                  </div>
                  <div class="text-slate-500">x {{ product.quantity }}</div>
                  <EditIcon class="w-4 h-4 ml-2 text-slate-500" />
                  <div class="ml-auto font-medium">${{ product.price }}</div>
              </a>
            </div>
            <div class="p-5 mt-5 box">
              <div class="flex">
                <div class="mr-auto">Subtotal</div>
                <div class="font-medium">$0.00</div>
              </div>
              <div
                class="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div class="mr-auto text-base font-medium">Total</div>
                  <div class="text-base font-medium">$0.00</div>
              </div>
            </div>
            <div class="flex mt-5">
              <button
                class="w-32 btn border-slate-300 dark:border-darkmode-400 text-slate-500">
                  Clear Items
              </button>
              
              <button class="w-32 ml-auto shadow-md btn btn-primary">
                Charge
              </button>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div class="p-5 mt-5 box">
              <div 
                class="flex items-center pb-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_date') }}</div>
                    <div class="mt-1">{{ activity_information.activity_date }}</div>
                  </div>
                  <ClockIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_prospect') }}</div>
                  <div class="mt-1">{{ activity_information.client }}</div>
                </div>
                <UserIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_type') }}</div>
                  <div class="mt-1">{{ activity_information.type }}</div>
                </div>
                <UsersIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-slate-500">{{ $t('add_activity_finalize.label_subject') }}</div>
                  <div class="mt-1">{{ activity_information.subject }}</div>
                </div>
                <MicIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
            </div>
          </TabPanel>

          <!--
          <TabPanel>
            <div class="p-2 mt-5 box">
              <a
                v-for="(faker, fakerKey) in $_.take($f(), 5)"
                :key="fakerKey"
                href="javascript:;"
                @click="addItemModal = true"
                class="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md cursor-pointer dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400">
                <div class="max-w-[50%] truncate mr-1">
                  {{ faker.foods[0].name }}
                </div>
                <div class="text-slate-500">x 1</div>
                <EditIcon class="w-4 h-4 ml-2 text-slate-500" />
                <div class="ml-auto font-medium">${{ faker.totals[0] }}</div>
              </a>
            </div>

            <div class="flex p-5 mt-5 box">
              <input
                type="text"
                class="w-full px-4 py-3 pr-10 form-control bg-slate-100 border-slate-200/60"
                placeholder="Use coupon code..." />
              <button class="ml-2 btn btn-primary">Apply</button>
            </div>
            
            <div class="p-5 mt-5 box">
              <div class="flex">
                <div class="mr-auto">Subtotal</div>
                <div class="font-medium">$0.00</div>
              </div>
              <div class="flex mt-4">
                <div class="mr-auto">Discount</div>
                <div class="font-medium text-danger">$0.00</div>
              </div>
              <div class="flex mt-4">
                <div class="mr-auto">Tax</div>
                <div class="font-medium">15%</div>
              </div>
              <div
                class="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div class="mr-auto text-base font-medium">Total</div>
                  <div class="text-base font-medium">$0.00</div>
              </div>
            </div>
            <div class="flex mt-5">
              <button
                class="w-32 btn border-slate-300 dark:border-darkmode-400 text-slate-500">
                  Clear Items
              </button>
              
              <button class="w-32 ml-auto shadow-md btn btn-primary">
                Charge
              </button>
            </div>
          </TabPanel>

          <TabPanel>
            <div class="p-5 mt-5 box">
              <div
                class="flex items-center pb-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">Time</div>
                  <div class="mt-1">02/06/20 02:10 PM</div>
                </div>
                <ClockIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">Customer</div>
                  <div class="mt-1">{{ $f()[0].users[0].name }}</div>
                </div>
                <UserIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div
                class="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                <div>
                  <div class="text-slate-500">People</div>
                  <div class="mt-1">3</div>
                </div>
                <UsersIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-slate-500">Table</div>
                  <div class="mt-1">21</div>
                </div>
                <MicIcon class="w-4 h-4 ml-auto text-slate-500" />
              </div>
            </div>
          </TabPanel>
        -->
        </TabPanels>
      </TabGroup>
      <!-- END: Ticket -->
    </div>
    
    <!-- BEGIN: New Order Modal -->
    <Modal :show="newOrderModal" @hidden="newOrderModal = false">
      <ModalHeader>
        <h2 class="mr-auto text-base font-medium">New Order</h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="pos-form-1" class="form-label">Name</label>
          <input
            id="pos-form-1"
            type="text"
            class="flex-1 form-control"
            placeholder="Customer name"
          />
        </div>
        <div class="col-span-12">
          <label for="pos-form-2" class="form-label">Table</label>
          <input
            id="pos-form-2"
            type="text"
            class="flex-1 form-control"
            placeholder="Customer table"
          />
        </div>
        <div class="col-span-12">
          <label for="pos-form-3" class="form-label">Number of People</label>
          <input
            id="pos-form-3"
            type="text"
            class="flex-1 form-control"
            placeholder="People"
          />
        </div>
      </ModalBody>
      <ModalFooter class="text-right">
        <button
          type="button"
          @click="newOrderModal = false"
          class="w-32 mr-1 btn btn-outline-secondary"
        >
          Cancel
        </button>
        <button type="button" class="w-32 btn btn-primary">Create Ticket</button>
      </ModalFooter>
    </Modal>
    <!-- END: New Order Modal -->


    <!-- BEGIN: Add Item Modal -->
    <!-- <Modal :show="addItemModal" @hidden="addItemModal = false"> -->
    <Modal :show="addItemModal" @hidden="addItemModal = false">
      <ModalHeader>
        <h2 class="mr-auto text-base font-medium">
          {{ product_modal.name }}
        </h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="pos-form-4" class="form-label">Quantity</label>
          <div class="flex flex-1">
            <button
              type="button"
              class="w-12 mr-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
                -
            </button>
            <input
              type="text"
              id="pos-form-4"
              placeholder="Item quantity"
              class="w-24 text-center form-control"
              v-model="add_product_form.quantity" />
              <button
                type="button"
                class="w-12 ml-1 btn border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500">
                  +
              </button>
          </div>
        </div>

        <div class="col-span-12">
          <label for="pos-form-5" class="form-label">Notes</label>
          <textarea
            id="pos-form-5"
            class="form-control"
            placeholder="Item notes"
            v-model="add_product_form.comments">
          </textarea>
        </div>
      </ModalBody>

      <ModalFooter class="text-right">
        <button
          type="button"
          @click="addItemModal = false"
          class="w-24 mr-1 btn btn-outline-secondary">
          Cancel
        </button>
        <button type="button" class="w-24 btn btn-primary" @click="submit_add_product(null)">Add Item</button>
      </ModalFooter>
    </Modal>
    <!-- END: Add Item Modal -->

  </template>  