<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Product</h2>
  </div>
  <div class="grid grid-cols-11 pb-20 mt-5 gap-x-6">
    <!-- BEGIN: Notification -->
    <Alert
      class="col-span-11 mb-6 intro-y alert-primary alert-dismissible"
      v-slot="{ dismiss }"
      role="alert"
    >
      <div class="flex items-center">
        <span><InfoIcon class="w-4 h-4 mr-2" /></span>
        <span
          >Starting May 10, 2021, there will be changes to the Terms &
          Conditions regarding the number of products that may be added by the
          Seller.
          <a
            href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
            class="ml-1 underline"
            target="blank"
            >Learn More</a
          ></span
        >
        <button
          type="button"
          class="text-white btn-close"
          @click="dismiss"
          aria-label="Close"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </Alert>
    <!-- BEGIN: Notification -->
    <div class="col-span-11 intro-y 2xl:col-span-9">
      <!-- BEGIN: Uplaod Product -->
      <div class="p-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Upload Product
          </div>
          <div class="mt-5">
            <div class="flex items-center text-slate-500">
              <span><LightbulbIcon class="w-5 h-5 text-warning" /></span>
              <div class="ml-2">
                <span class="mr-1"
                  >Avoid selling counterfeit products / violating Intellectual
                  Property Rights, so that your products are not deleted.</span
                >
                <a
                  href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                  class="font-medium text-primary"
                  target="blank"
                  >Learn More</a
                >
              </div>
            </div>
            <div class="flex-col items-start mt-10 form-inline xl:flex-row">
              <div class="form-label w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Photos</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    <div>
                      The image format is .jpg .jpeg .png and a minimum size of
                      300 x 300 pixels (For optimal images use a minimum size of
                      700 x 700 pixels).
                    </div>
                    <div class="mt-2">
                      Select product photos or drag and drop up to 5 photos at
                      once here. Include min. 3 attractive photos to make the
                      product more attractive to buyers.
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400"
              >
                <div class="grid grid-cols-10 gap-5 pl-4 pr-5">
                  <div
                    v-for="(faker, fakerKey) in $_.take($f(), 5)"
                    :key="fakerKey"
                    class="relative col-span-5 cursor-pointer md:col-span-2 h-28 image-fit zoom-in"
                  >
                    <img
                      class="rounded-md"
                      alt="Midone - HTML Admin Template"
                      :src="faker.photos[0]"
                    />
                    <Tippy
                      content="Remove this image?"
                      class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full tooltip bg-danger"
                    >
                      <XIcon class="w-4 h-4" />
                    </Tippy>
                  </div>
                </div>
                <div
                  class="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer"
                >
                  <ImageIcon class="w-4 h-4 mr-2" />
                  <span class="mr-1 text-primary">Upload a file</span> or drag
                  and drop
                  <input
                    id="horizontal-form-1"
                    type="file"
                    class="absolute top-0 left-0 w-full h-full opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Uplaod Product -->
      <!-- BEGIN: Product Information -->
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Product Information
          </div>
          <div class="mt-5">
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Name</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Include min. 40 characters to make it more attractive and
                    easy for buyers to find, consisting of product type, brand,
                    and information such as color, material, or type.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  id="product-name"
                  type="text"
                  class="form-control"
                  placeholder="Product name"
                />
                <div class="text-right form-help">Maximum character 0/70</div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Category</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="category" class="form-select">
                  <option
                    v-for="(faker, fakerKey) in $_.take($f(), 9)"
                    :key="fakerKey"
                    :value="faker.categories[0].name"
                  >
                    {{ faker.categories[0].name }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Subcategory</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    You can add a new subcategory or choose from the existing
                    subcategory list.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <TomSelect
                  v-model="subcategory"
                  :options="{
                    placeholder: 'Etalase',
                  }"
                  class="w-full"
                  multiple
                >
                  <option
                    v-for="(faker, fakerKey) in $_.take($f(), 2)"
                    :key="fakerKey"
                    :value="faker.categories[0].name"
                  >
                    {{ faker.categories[0].name }}
                  </option>
                </TomSelect>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Product Information -->
      <!-- BEGIN: Product Detail -->
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Product Detail
          </div>
          <div class="mt-5">
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Condition</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-col sm:flex-row">
                  <div class="mr-4 form-check">
                    <input
                      id="condition-new"
                      class="form-check-input"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-chris-evans"
                    />
                    <label class="form-check-label" for="condition-new"
                      >New</label
                    >
                  </div>
                  <div class="mt-2 mr-4 form-check sm:mt-0">
                    <input
                      id="condition-second"
                      class="form-check-input"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-liam-neeson"
                    />
                    <label class="form-check-label" for="condition-second"
                      >Second</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Description</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    <div>
                      Make sure the product description provides a detailed
                      explanation of your product so that it is easy to
                      understand and find your product.
                    </div>
                    <div class="mt-2">
                      It is recommended not to enter info on mobile numbers,
                      e-mails, etc. into the product description to protect your
                      personal data.
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <ClassicEditor v-model="editorData" />
                <div class="text-right form-help">Maximum character 0/2000</div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Video</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Add a video so that buyers are more interested in your
                    product.
                    <a
                      href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                      class="font-medium text-primary"
                      target="blank"
                      >Learn more.</a
                    >
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <button class="w-40 btn btn-outline-secondary">
                  <PlusIcon class="w-4 h-4 mr-2" /> Add Video URL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Product Detail -->
      <!-- BEGIN: Product Variant -->
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Product Variant
          </div>
          <div class="mt-5">
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label sm:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Variant</div>
                  </div>
                  <div class="mt-2 text-xs leading-relaxed text-slate-500">
                    Add variants such as color, size, or more. Choose a maximum
                    of 2 variant types.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0 xl:text-right">
                <button class="btn btn-primary w-44">
                  <PlusIcon class="w-4 h-4 mr-2" /> Add Variant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Product Variant -->
      <!-- BEGIN: Product Variant (Details) -->
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Product Variant (Details)
          </div>
          <div class="mt-5">
            <div
              class="flex-col items-start pt-2 mt-2 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Variant 1</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Add the types of variants and options, you can add up to 5
                    options.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div
                  class="relative py-10 pl-5 pr-5 rounded-md xl:pr-10 bg-slate-50 dark:bg-transparent dark:border"
                >
                  <a
                    href=""
                    class="absolute top-0 right-0 mt-4 mr-4 text-slate-500"
                  >
                    <XIcon class="w-5 h-5" />
                  </a>
                  <div>
                    <div class="mt-5 form-inline first:mt-0">
                      <label class="form-label sm:w-20">Name</label>
                      <div class="flex items-center flex-1 xl:pr-20">
                        <div class="flex-1 input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Size"
                          />
                          <div class="input-group-text">6/14</div>
                        </div>
                      </div>
                    </div>
                    <div class="items-start mt-5 form-inline first:mt-0">
                      <label class="mt-2 form-label sm:w-20">Options</label>
                      <div class="flex-1">
                        <div class="items-center mt-5 xl:flex first:mt-0">
                          <div class="flex-1 input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Small"
                            />
                            <div class="input-group-text">6/14</div>
                          </div>
                          <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                            <a href="" class="xl:ml-5">
                              <MoveIcon class="w-4 h-4" />
                            </a>
                            <a href="" class="ml-3 xl:ml-5">
                              <Trash2Icon class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <div class="items-center mt-5 xl:flex first:mt-0">
                          <div class="flex-1 input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Medium"
                            />
                            <div class="input-group-text">6/14</div>
                          </div>
                          <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                            <a href="" class="xl:ml-5">
                              <MoveIcon class="w-4 h-4" />
                            </a>
                            <a href="" class="ml-3 xl:ml-5">
                              <Trash2Icon class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <div class="items-center mt-5 xl:flex first:mt-0">
                          <div class="flex-1 input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Large"
                            />
                            <div class="input-group-text">6/14</div>
                          </div>
                          <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                            <a href="" class="xl:ml-5">
                              <MoveIcon class="w-4 h-4" />
                            </a>
                            <a href="" class="ml-3 xl:ml-5">
                              <Trash2Icon class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5 xl:ml-20 xl:pl-5 xl:pr-20 first:mt-0">
                      <button
                        class="w-full border-dashed btn btn-outline-primary"
                      >
                        <PlusIcon class="w-4 h-4 mr-2" /> Add New Option
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-2 mt-2 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Variant 2</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Add the types of variants and options, you can add up to 5
                    options.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div
                  class="relative py-10 pl-5 pr-5 rounded-md xl:pr-10 bg-slate-50 dark:bg-transparent dark:border"
                >
                  <a
                    href=""
                    class="absolute top-0 right-0 mt-4 mr-4 text-slate-500"
                  >
                    <XIcon class="w-5 h-5" />
                  </a>
                  <div>
                    <div class="mt-5 form-inline first:mt-0">
                      <label class="form-label sm:w-20">Name</label>
                      <div class="flex items-center flex-1 xl:pr-20">
                        <div class="flex-1 input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Color"
                          />
                          <div class="input-group-text">6/14</div>
                        </div>
                      </div>
                    </div>
                    <div class="items-start mt-5 form-inline first:mt-0">
                      <label class="mt-2 form-label sm:w-20">Options</label>
                      <div class="flex-1">
                        <div class="items-center mt-5 xl:flex first:mt-0">
                          <div class="flex-1 input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Black"
                            />
                            <div class="input-group-text">6/14</div>
                          </div>
                          <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                            <a href="" class="xl:ml-5">
                              <MoveIcon class="w-4 h-4" />
                            </a>
                            <a href="" class="ml-3 xl:ml-5">
                              <Trash2Icon class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <div class="items-center mt-5 xl:flex first:mt-0">
                          <div class="flex-1 input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="White"
                            />
                            <div class="input-group-text">6/14</div>
                          </div>
                          <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                            <a href="" class="xl:ml-5">
                              <MoveIcon class="w-4 h-4" />
                            </a>
                            <a href="" class="ml-3 xl:ml-5">
                              <Trash2Icon class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <div class="items-center mt-5 xl:flex first:mt-0">
                          <div class="flex-1 input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Gray"
                            />
                            <div class="input-group-text">6/14</div>
                          </div>
                          <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                            <a href="" class="xl:ml-5">
                              <MoveIcon class="w-4 h-4" />
                            </a>
                            <a href="" class="ml-3 xl:ml-5">
                              <Trash2Icon class="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5 xl:ml-20 xl:pl-5 xl:pr-20 first:mt-0">
                      <button
                        class="w-full border-dashed btn btn-outline-primary"
                      >
                        <PlusIcon class="w-4 h-4 mr-2" /> Add New Option
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-2 mt-2 xl:ml-64 xl:pl-10 first:mt-0 first:pt-0">
              <button
                class="w-full py-3 border-dashed btn btn-outline-secondary"
              >
                <PlusIcon class="w-4 h-4 mr-2" /> Add New Variant
              </button>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Variant Information</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Apply price and stock on all variants or based on certain
                    variant codes.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="grid-cols-4 gap-2 sm:grid">
                  <div class="input-group">
                    <div class="input-group-text">$</div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Price"
                    />
                  </div>
                  <input
                    type="text"
                    class="mt-2 form-control sm:mt-0"
                    placeholder="Stock"
                  />
                  <input
                    type="text"
                    class="mt-2 form-control sm:mt-0"
                    placeholder="Variant Code"
                  />
                  <button class="mt-2 btn btn-primary sm:mt-0">
                    Apply To All
                  </button>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Variant List</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Set the price and stock for each variant.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="overflow-x-auto">
                  <table class="table border">
                    <thead>
                      <tr>
                        <th
                          class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap"
                        >
                          Size
                        </th>
                        <th
                          class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap"
                        >
                          <div class="flex items-center">
                            Color <HelpCircleIcon class="w-4 h-4 ml-2" />
                          </div>
                        </th>
                        <th
                          class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2"
                        >
                          Price
                        </th>
                        <th
                          class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2"
                        >
                          <div class="flex items-center">
                            <div
                              class="relative w-4 h-4 mr-2 -mt-0.5 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-primary/20 before:rounded-full lg:before:animate-ping after:content-[''] after:absolute after:w-4 after:h-4 after:bg-primary after:rounded-full after:border-4 after:border-white/60 after:dark:border-darkmode-300"
                            ></div>
                            Stock <HelpCircleIcon class="w-4 h-4 ml-2" />
                          </div>
                        </th>
                        <th
                          class="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !pl-2"
                        >
                          Variant Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowspan="3" class="border-r">Small</td>
                        <td>Black</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>White</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gray</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td rowspan="3" class="border-r">Medium</td>
                        <td>Black</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>White</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gray</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td rowspan="3" class="border-r">Large</td>
                        <td>Black</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>White</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gray</td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Stock"
                          />
                        </td>
                        <td class="!pl-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Variant Code"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Wholesale</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Add wholesale price for certain quantity purchases.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="overflow-x-auto">
                  <table class="table border">
                    <thead>
                      <tr>
                        <th class="!pr-2 bg-slate-50 dark:bg-darkmode-800"></th>
                        <th class="bg-slate-50 dark:bg-darkmode-800"></th>
                        <th
                          class="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap"
                        >
                          Min.
                        </th>
                        <th
                          class="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap"
                        >
                          Max.
                        </th>
                        <th
                          class="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap"
                        >
                          Unit Price
                        </th>
                        <th class="!px-2 bg-slate-50 dark:bg-darkmode-800"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="!pr-2">1.</td>
                        <td class="whitespace-nowrap">Wholesale Price 1</td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Min Qty"
                          />
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Max Qty"
                          />
                        </td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!pl-4 text-slate-500">
                          <a href="">
                            <Trash2Icon class="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td class="!pr-2">2.</td>
                        <td class="whitespace-nowrap">Wholesale Price 2</td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Min Qty"
                          />
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Max Qty"
                          />
                        </td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!pl-4 text-slate-500">
                          <a href="">
                            <Trash2Icon class="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td class="!pr-2">3.</td>
                        <td class="whitespace-nowrap">Wholesale Price 3</td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Min Qty"
                          />
                        </td>
                        <td class="!px-2">
                          <input
                            type="text"
                            class="form-control min-w-[6rem]"
                            placeholder="Max Qty"
                          />
                        </td>
                        <td class="!px-2">
                          <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input
                              type="text"
                              class="form-control min-w-[6rem]"
                              placeholder="Price"
                            />
                          </div>
                        </td>
                        <td class="!pl-4 text-slate-500">
                          <a href="">
                            <Trash2Icon class="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  class="w-full mt-4 border-dashed btn btn-outline-primary"
                >
                  <PlusIcon class="w-4 h-4 mr-2" /> Add New Wholesale Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Product Variant (Details) -->
      <!-- BEGIN: Product Management -->
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Product Management
          </div>
          <div class="mt-5">

            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Status</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    If the status is active, your product can be searched for by
                    potential buyers.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="form-check form-switch">
                  <input
                    id="product-status-active"
                    class="form-check-input"
                    type="checkbox" />
                  <label class="form-check-label" for="product-status-active">Active</label>
                </div>
              </div>
            </div>




            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Stock</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  id="product-stock"
                  type="text"
                  class="form-control"
                  placeholder="Input Product Stock"
                />
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">SKU (Stock Keeping Unit)</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Use a unique SKU code if you want to mark your product.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  id="sku"
                  type="text"
                  class="form-control"
                  placeholder="Input SKU"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Product Management -->
      <!-- BEGIN: Weight & Shipping -->
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Weight & Shipping
          </div>
          <div class="mt-5">
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Weight</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Enter the weight by weighing the product after it is
                    <span class="font-medium text-slate-600 dark:text-slate-300"
                      >packaged</span
                    >.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="grid-cols-4 gap-2 sm:grid">
                  <select class="form-select">
                    <option value="Gram (g)">Gram (g)</option>
                    <option value="Kilogram (kg)">Kilogram (kg)</option>
                  </select>
                  <input
                    type="text"
                    id="product-weight"
                    class="mt-2 form-control sm:mt-0"
                    placeholder="Stock"
                  />
                </div>
                <Alert
                  class="mt-5 alert-outline-warning alert-dismissible bg-warning/20 dark:bg-darkmode-400 dark:border-darkmode-400"
                  v-slot="{ dismiss }"
                  role="alert"
                >
                  <div class="flex items-center">
                    <span><AlertTriangleIcon class="w-6 h-6 mr-3" /></span>
                    <span class="text-slate-800 dark:text-slate-500"
                      >Pay close attention to the weight of the product so that
                      there is no difference in data with the shipping courier.
                      <a class="font-medium text-primary" href=""
                        >Learn More</a
                      ></span
                    >
                    <button
                      type="button"
                      class="btn-close dark:text-white"
                      @click="dismiss"
                      aria-label="Close"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </Alert>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Size</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Enter the product size after packing to calculate the volume
                    weight.
                    <a class="font-medium text-primary" href=""
                      >Learn Volume Weight</a
                    >
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="grid-cols-3 gap-2 sm:grid">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Width"
                    />
                    <div class="input-group-text">cm</div>
                  </div>
                  <div class="mt-2 input-group sm:mt-0">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Height"
                    />
                    <div class="input-group-text">cm</div>
                  </div>
                  <div class="mt-2 input-group sm:mt-0">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Length"
                    />
                    <div class="input-group-text">cm</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Shipping Insurance</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Refund product & postage for the seller and buyer in case of
                    damage / loss during shipping.
                    <a class="font-medium text-primary" href="">Learn More</a>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-col sm:flex-row">
                  <div class="mr-4 form-check">
                    <input
                      id="shipping-insurance-required"
                      class="form-check-input"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-chris-evans"
                    />
                    <div class="form-check-label">
                      <div>Required</div>
                      <div
                        class="w-56 mt-1 text-xs leading-relaxed text-slate-500"
                      >
                        You
                        <span
                          class="font-medium text-slate-600 dark:text-slate-300"
                          >require</span
                        >
                        the buyer to activate shipping insurance
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 mr-4 form-check sm:mt-0">
                    <input
                      id="shipping-insurance-optional"
                      class="form-check-input"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-liam-neeson"
                    />
                    <div class="form-check-label">
                      <div>Optional</div>
                      <div
                        class="w-56 mt-1 text-xs leading-relaxed text-slate-500"
                      >
                        You
                        <span
                          class="font-medium text-slate-600 dark:text-slate-300"
                          >give the buyer the option</span
                        >
                        to activate shipping insurance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0"
            >
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Shipping Service</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Configure shipping services according to your product type.
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-col sm:flex-row">
                  <div class="mr-4 form-check">
                    <input
                      id="shipping-service-standard"
                      class="form-check-input"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-chris-evans"
                    />
                    <label
                      class="form-check-label"
                      for="shipping-service-standard"
                      >Standard</label
                    >
                  </div>
                  <div class="mt-2 mr-4 form-check sm:mt-0">
                    <input
                      id="shipping-service-custom"
                      class="form-check-input"
                      type="radio"
                      name="horizontal_radio_button"
                      value="horizontal-radio-liam-neeson"
                    />
                    <label
                      class="form-check-label"
                      for="shipping-service-custom"
                      >Custom</label
                    >
                  </div>
                </div>
                <div class="mt-3 text-xs leading-relaxed text-slate-500">
                  The delivery service for this product will be the same as in
                  the
                  <a class="font-medium text-primary" href=""
                    >Shipping Settings.</a
                  >
                </div>
              </div>
            </div>



            <div
              class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">PreOrder</div>
                  </div>
                </div>
              </div>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="form-check form-switch">
                  <input
                    id="preorder-active"
                    class="form-check-input"
                    type="checkbox" />
                  <label
                    class="text-xs leading-relaxed form-check-label text-slate-500"
                    for="preorder-active">
                      Activate PreOrder if you need a longer shipping process.
                    <a class="font-medium text-primary" href="">Learn more.</a>
                  </label>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
      <!-- END: Weight & Shipping -->
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button
          type="button"
          class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
        >
          Cancel
        </button>
        <button
          type="button"
          class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
        >
          Save & Add New Product
        </button>
        <button type="button" class="w-full py-3 btn btn-primary md:w-52">
          Save
        </button>
      </div>
    </div>
    <div class="hidden col-span-2 intro-y 2xl:block">
      <div class="sticky top-0 pt-10">
        <ul
          class="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]"
        >
          <li
            class="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary"
          >
            <a href="">Upload Product</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Product Information</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Product Detail</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Product Variant</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Product Variant (Details)</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Product Management</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Weight & Shipping</a>
          </li>
        </ul>
        <div
          class="relative p-5 mt-10 border rounded-md bg-warning/20 dark:bg-darkmode-600 border-warning dark:border-0"
        >
          <LightbulbIcon
            class="absolute top-0 right-0 w-12 h-12 mt-5 mr-3 text-warning/80"
          />
          <h2 class="text-lg font-medium">Tips</h2>
          <div class="mt-5 font-medium">Price</div>
          <div
            class="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-500"
          >
            <div>
              The image format is .jpg .jpeg .png and a minimum size of 300 x
              300 pixels (For optimal images use a minimum size of 700 x 700
              pixels).
            </div>
            <div class="mt-2">
              Select product photos or drag and drop up to 5 photos at once
              here. Include min. 3 attractive photos to make the product more
              attractive to buyers.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const subcategory = ref([]);
const editorData = ref("<p>Content of the editor.</p>");
</script>
