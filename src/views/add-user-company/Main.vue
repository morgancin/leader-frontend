<template>
    <h2 class="intro-y text-lg font-medium mt-10">Add Company User</h2>
    <router-link class="btn btn-primary shadow-md mr-2" :to="`/dashboard-user`">Prev</router-link>
  <!-- <div class="mt-5 flex flex-row flex-wrap gap-4"> -->
  <div class="mt-5 grid auto-rows-auto grid-flow-dense gap-4 xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2  sm:grid-cols-1">
    <div class="mt-3">
      <input
        id="regular-form-1"
        type="text"
        class="form-control"
        placeholder="Nombre *"/>
    </div>
    <div class="mt-3">
      <input
        id="regular-form-2"
        type="text"
        class="form-control"
        placeholder="Apellido paterno *"/>
    </div>
    <div class="mt-3">
      <input
        id="regular-form-3"
        type="text"
        class="form-control"
        placeholder="Apellido materno"/>
    </div>
    <div class="mt-3">
      <input
        id="regular-form-1"
        type="text"
        class="form-control"
        placeholder="email *"/>
    </div>
    <div class="mt-3">
      <input
        id="regular-form-1"
        type="text"
        class="form-control"
        placeholder="Password *"/>
    </div>
    <button class="btn btn-primary mt-5">Guardar</button>
  </div>
</template>
