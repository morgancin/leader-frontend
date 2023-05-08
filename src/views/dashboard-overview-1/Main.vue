<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Dashboard principal</h2>
            <a href="" class="flex items-center ml-auto text-primary">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Recargar
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="p-5 box">
                  <div class="flex">
                    <ShoppingCartIcon class="report-box__icon text-primary" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="cursor-pointer report-box__indicator bg-success"
                        content="33% Higher than last month">
                          33%
                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">4.710</div>
                  <div class="mt-1 text-base text-slate-500">Ventas</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="p-5 box">
                  <div class="flex">
                    <CreditCardIcon class="report-box__icon text-pending" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="cursor-pointer report-box__indicator bg-danger"
                        content="2% Lower than last month">
                          2%
                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">3.721</div>
                  <div class="mt-1 text-base text-slate-500">New Orders</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="p-5 box">
                  <div class="flex">
                    <MonitorIcon class="report-box__icon text-warning" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="cursor-pointer report-box__indicator bg-success"
                        content="12% Higher than last month"
                      >
                        12% <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">2.149</div>
                  <div class="mt-1 text-base text-slate-500">
                    Products
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="p-5 box">
                  <div class="flex">
                    <UserIcon class="report-box__icon text-success" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="cursor-pointer report-box__indicator bg-success"
                        content="22% Higher than last month">
                          22% <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">152.040</div>
                  <div class="mt-1 text-base text-slate-500">
                    Clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- BEGIN: Pipelines -->
        <div class="col-span-12 mt-6">
          <div class="items-center block h-10 intro-y sm:flex">
            <div class="flex items-center mt-3 sm:ml-auto sm:mt-0">
              <button
                class="flex items-center btn box text-slate-600 dark:text-slate-300">
                <FileTextIcon class="hidden w-4 h-4 mr-2 sm:block" />
                  Exportar a Excel
              </button>
              <button
                class="flex items-center ml-3 btn box text-slate-600 dark:text-slate-300">
                <FileTextIcon class="hidden w-4 h-4 mr-2 sm:block" />
                Exportar a PDF
              </button>
            </div>
          </div>

          <!-- BEGIN: Pipeline -->
          <div class="grid grid-cols-12 overflow-x-scroll 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
            <div
              class="col-span-4 mt-3 mr-3 md:col-span-6 xl:col-span-4 2xl:col-span-4 2xl:mt-8"
              v-for="stage in pipelineStages"
              :key="stage.id">
                <div class="flex items-center h-10 intro-x">
                  <h2 class="mr-5 text-lg font-medium truncate">{{ stage.name }}</h2>
                </div>
                <div class="mt-5">
                  <div
                    v-for="prospect in stage.prospects"
                    :key="prospect.id"
                    class="intro-x">
                  <div class="flex items-center px-5 py-3 mb-3 box zoom-in">
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">
                        {{ prospect.first_name }}
                      </div>
                      <div class="text-slate-500 text-xs mt-0.5">
                        {{ prospect.phone_mobile }}
                      </div>
                    </div>
                    <div class="text-success">
                      ${{ prospect.potential_value }}
                    </div>
                  </div>
                </div>
                <a
                  href=""
                  class="block w-full py-3 text-center border border-dotted rounded-md intro-x border-slate-400 dark:border-darkmode-300 text-slate-500">
                    Ver más
                </a>
              </div>
            </div>
          </div>
          <!-- END: Pipeline -->
      
        </div>
        <!-- END: Pipelines -->
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-3">
      <div class="pb-10 -mb-10 2xl:border-l">
        <div class="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
          <!-- BEGIN: Recent Activities -->
          <div
            class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12"
          >
            <div class="flex items-center h-10 intro-x">
              <h2 class="mr-5 text-lg font-medium truncate">
                Actividades recientes
              </h2>
              <a href="" class="ml-auto truncate text-primary">Ver más</a>
            </div>
            <div
              class="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5"
            >
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="$f()[9].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ $f()[9].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="mt-1 text-slate-500">Has joined the team</div>
                </div>
              </div>
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="$f()[8].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ $f()[8].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="text-slate-500">
                    <div class="mt-1">Added 3 new photos</div>
                    <div class="flex mt-2">
                      <Tippy
                        tag="div"
                        class="w-8 h-8 mr-1 image-fit zoom-in"
                        :content="$f()[0].products[0].name"
                      >
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          class="border border-white rounded-md"
                          :src="$f()[8].images[0]"
                        />
                      </Tippy>
                      <Tippy
                        tag="div"
                        class="w-8 h-8 mr-1 image-fit zoom-in"
                        :content="$f()[1].products[0].name"
                      >
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          class="border border-white rounded-md"
                          :src="$f()[8].images[1]"
                        />
                      </Tippy>
                      <Tippy
                        tag="div"
                        class="w-8 h-8 mr-1 image-fit zoom-in"
                        :content="$f()[2].products[0].name"
                      >
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          class="border border-white rounded-md"
                          :src="$f()[8].images[2]"
                        />
                      </Tippy>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-4 text-xs text-center intro-x text-slate-500">
                12 November
              </div>
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="$f()[7].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ $f()[7].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="mt-1 text-slate-500">
                    Has changed
                    <a class="text-primary" href="">{{
                      $f()[7].products[0].name
                    }}</a>
                    price and description
                  </div>
                </div>
              </div>
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="$f()[6].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ $f()[6].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="mt-1 text-slate-500">
                    Has changed
                    <a class="text-primary" href="">{{
                      $f()[6].products[0].name
                    }}</a>
                    description
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- BEGIN: Schedules -->
          <div
            class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto"
          >
            <div class="flex items-center h-10 intro-x">
              <h2 class="mr-5 text-lg font-medium truncate">Agenda</h2>
              <a
                href=""
                class="flex items-center ml-auto truncate text-primary"
              >
                <PlusIcon class="w-4 h-4 mr-1" /> Agregar prospecto
              </a>
            </div>
            <div class="mt-5">
              <div class="intro-x box">
                <div class="p-5">
                  <div class="flex">
                    <ChevronLeftIcon class="w-5 h-5 text-slate-500" />
                    <div class="mx-auto text-base font-medium">April</div>
                    <ChevronRightIcon class="w-5 h-5 text-slate-500" />
                  </div>
                  <div class="grid grid-cols-7 gap-4 mt-5 text-center">
                    <div class="font-medium">Su</div>
                    <div class="font-medium">Mo</div>
                    <div class="font-medium">Tu</div>
                    <div class="font-medium">We</div>
                    <div class="font-medium">Th</div>
                    <div class="font-medium">Fr</div>
                    <div class="font-medium">Sa</div>
                    <div class="py-0.5 rounded relative text-slate-500">29</div>
                    <div class="py-0.5 rounded relative text-slate-500">30</div>
                    <div class="py-0.5 rounded relative text-slate-500">31</div>
                    <div class="py-0.5 rounded relative">1</div>
                    <div class="py-0.5 rounded relative">2</div>
                    <div class="py-0.5 rounded relative">3</div>
                    <div class="py-0.5 rounded relative">4</div>
                    <div class="py-0.5 rounded relative">5</div>
                    <div
                      class="py-0.5 bg-success/20 dark:bg-success/30 rounded relative"
                    >
                      6
                    </div>
                    <div class="py-0.5 rounded relative">7</div>
                    <div class="py-0.5 bg-primary text-white rounded relative">
                      8
                    </div>
                    <div class="py-0.5 rounded relative">9</div>
                    <div class="py-0.5 rounded relative">10</div>
                    <div class="py-0.5 rounded relative">11</div>
                    <div class="py-0.5 rounded relative">12</div>
                    <div class="py-0.5 rounded relative">13</div>
                    <div class="py-0.5 rounded relative">14</div>
                    <div class="py-0.5 rounded relative">15</div>
                    <div class="py-0.5 rounded relative">16</div>
                    <div class="py-0.5 rounded relative">17</div>
                    <div class="py-0.5 rounded relative">18</div>
                    <div class="py-0.5 rounded relative">19</div>
                    <div class="py-0.5 rounded relative">20</div>
                    <div class="py-0.5 rounded relative">21</div>
                    <div class="py-0.5 rounded relative">22</div>
                    <div
                      class="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative"
                    >
                      23
                    </div>
                    <div class="py-0.5 rounded relative">24</div>
                    <div class="py-0.5 rounded relative">25</div>
                    <div class="py-0.5 rounded relative">26</div>
                    <div
                      class="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative"
                    >
                      27
                    </div>
                    <div class="py-0.5 rounded relative">28</div>
                    <div class="py-0.5 rounded relative">29</div>
                    <div class="py-0.5 rounded relative">30</div>
                    <div class="py-0.5 rounded relative text-slate-500">1</div>
                    <div class="py-0.5 rounded relative text-slate-500">2</div>
                    <div class="py-0.5 rounded relative text-slate-500">3</div>
                    <div class="py-0.5 rounded relative text-slate-500">4</div>
                    <div class="py-0.5 rounded relative text-slate-500">5</div>
                    <div class="py-0.5 rounded relative text-slate-500">6</div>
                    <div class="py-0.5 rounded relative text-slate-500">7</div>
                    <div class="py-0.5 rounded relative text-slate-500">8</div>
                    <div class="py-0.5 rounded relative text-slate-500">9</div>
                  </div>
                </div>
                <div class="p-5 border-t border-slate-200/60">
                  <div class="flex items-center">
                    <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                    <span class="truncate">UI/UX Workshop</span>
                    <span class="font-medium xl:ml-auto">23th</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                    <span class="truncate">VueJs Frontend Development</span>
                    <span class="font-medium xl:ml-auto">10th</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                    <span class="truncate">Laravel Rest API</span>
                    <span class="font-medium xl:ml-auto">31th</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Schedules -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, provide, watch, toRefs, reactive } from 'vue';
  import ReportLineChart from "@/components/report-line-chart/Main.vue";
  import ReportDonutChart from "@/components/report-donut-chart/Main.vue";
  import ReportPieChart from "@/components/report-pie-chart/Main.vue";
  import ReportMap from "@/components/report-map/Main.vue";
  import ReportDonutChart1 from "@/components/report-donut-chart-1/Main.vue";
  import SimpleLineChart1 from "@/components/simple-line-chart-1/Main.vue";
  import { useDashboardStore } from "../../stores/leader/dashboard";
  const { fetchPipeline, fetchPipelineStages, fetchPipelineStageProspects } = useDashboardStore();
  
  const pipeline = ref({});
  const pipelineStages = ref([]);
  
  onMounted(async() => {
    pipeline.value = await fetchPipeline(2);
    pipelineStages.value = await fetchPipelineStages(pipeline.value.id);

    pipelineStages.value.map(async (stage) => {
      stage.prospects = await fetchPipelineStageProspects(pipeline.value.id, stage.id);
    });
  });
  
  const salesReportFilter = ref();
  const importantNotesRef = ref();
  provide("bind[importantNotesRef]", (el) => {
    importantNotesRef.value = el;
  });
  
  const prevImportantNotes = () => {
    const el = importantNotesRef.value;
    el.tns.goTo("prev");
  };
  
  const nextImportantNotes = () => {
    const el = importantNotesRef.value;
    el.tns.goTo("next");
  };
</script>
