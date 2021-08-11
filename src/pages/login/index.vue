<template>
  <q-page
    class="window-height window-width row justify-center items-center"
  >
    <div v-if="login" class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:495px;">

          <q-card-section>
            <q-form class="q-px-sm q-pt-xl" >
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pa-md q-gutter-md">

              <q-btn round color="red-8" >
                <q-icon name="fab fa-google-plus-g" size="1.2rem" placeholder="Google" />
              </q-btn>
              <q-btn round color="light-blue-5" >
                <q-icon name="fas fa-envelope" size="1.2rem" />
              </q-btn>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-lg" >
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Ingresar" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p v-on:click="login=false" class="text-grey-6">Crear una cuenta</p>
            <p class="text-grey-6">Olvido su contraseña?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registrese</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="close" color="purple-4" v-on:click="login=true"/>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Get Started" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Return to login</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      login:true,
      userAndPass:false,
      email: '',
      username: '',
      password: ''
    }
  }
}
</script>
