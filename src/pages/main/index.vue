<template>
  <q-page
    class=" row justify-center "
  >
    <div  class="column q-pa-lg">
      <div class="row" style="">
        <q-card square class="shadow-24" style="width:120vh; ">
          <q-form @submit.prevent="guardarAsistente" >
          <q-card-section>
            <div class="text-h4 text-center">Registre su mentoria</div>
          </q-card-section>
          <q-card-section class="q-px-sm q-pt-xl row">
              <div class="col q-pr-lg">
                <q-input required square clearable v-model="asistente.nombre_empresa" type="text" label="Nombre Empresa">
                  <template v-slot:prepend>
                    <q-icon name="engineering" />
                  </template>
                </q-input>
                <q-input required square clearable v-model="asistente.nombre_contacto" type="text" label="Nombre del Contacto">
                  <template v-slot:prepend>
                    <q-icon name="assignment_ind" />
                  </template>
                </q-input>
                <q-input required square clearable v-model="asistente.email" type="email" label="Email">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
              <div class="col q-pr-lg">
                <q-input required square  v-model="asistente.telefono" type="text"
                         mask="(+###) ## ## ## ##"
                         fill-mask
                         hint="Ej: (+569) 11 22 33 44"
                         label="Telefono Celular">
                  <template v-slot:prepend>
                    <q-icon name="phone_iphone" />
                  </template>
                </q-input>
                <q-input required square clearable v-model="asistente.rubro" type="text" label="Rubro">
                  <template v-slot:prepend>
                    <q-icon name="work" />
                  </template>
                </q-input>
                <q-input required square  v-model="asistente.descripcion"  :rules="[ val => val.length <= 50 || 'Maximo 50 Carácteres']" type="textarea" label="Descripcion de la Problematica">
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-select required label="Mentoria" square v-model="mentoria" :options="mentorias" option-label="nombre" >
                  <template v-slot:prepend>
                    <q-icon name="school" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label v-html="scope.opt.nombre" />
                        <q-item-label caption><q-icon size="sm" name="schedule"/> {{ scope.opt.fecha }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-select v-if="mentoria!==undefined" required label="Horario" square v-model="sesion" :options="mentoria.sesiones.filter(x=>x.asistente.length<3)" option-label="horario_in" >
                  <template v-slot:prepend>
                    <q-icon name="alarm" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        {{scope.opt.horario_in+' - '+scope.opt.horario_fn}}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
          </q-card-section>
          <q-card-actions class="justify-center q-pb-lg" >
            <q-btn  outline type="submit"  size="lg" color="blue-7"  label="Ingresar" />
          </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {db} from 'boot/firebase';
export default {
   name: 'indexMain',
  data(){
     return {
       asistente:{
         nombre_empresa:'',
         nombre_contacto:'',
         email:'',
         telefono:'',
         rubro:'',
         descripcion:'',
       },
       mentoria:undefined,
       sesion:undefined,
       mentorias:[
       ],

     }
  },
  created() {
      this.getMentorias();

  },
  methods:{
     guardarAsistente(){
         let docRef=db.collection( `mentorias`).doc(this.mentoria.doc);
         docRef.get().then((resp)=>{
           if(resp.data().sesiones.find(x=>x.id===this.sesion.id).asistente.length<3){
             db.runTransaction(transaction => {
               return  transaction.get(docRef).then((sfDoc)=>{
                 var sesiones= sfDoc.data().sesiones;
                 sesiones.forEach((el,index)=>{
                   if(el.id===this.sesion.id){
                     sesiones[index].asistente.push(this.asistente)
                   }
                 });
                 transaction.update(docRef,{sesiones:sesiones});
               })
             }).then(()=>{
               this.$q.notify({
                 message: 'Guardado',
                 color: 'primary'
               });
               this.reset();
               this.getMentorias();
             }).catch((err)=>{
               console.log("Error: ",err)
             });
           }else{
             this.$q.notify({
               message: 'ya no quedan cupos',
               color: 'primary'
             });
           }
         });
     },
    reset(){
      this.asistente={
        nombre_empresa:'',
        nombre_contacto:'',
        email:'',
        telefono:'',
        rubro:'',
        descripcion:'',
      };
      this.mentoria=undefined;
      this.sesion=undefined;
    },
     getMentorias(){
       db.collection('mentorias').get().then((data)=>{
         if(!data.empty){
           this.mentorias=[];
           data.forEach((doc)=>{
             this.mentorias.push({doc:doc.id,...doc.data()});
           })
         }else{
           this.createDefaultData();
         }
       });
     },
     createDefaultData(){
       let mentorias=[{
         id:1,
         nombre:"Inversion en empresas sostenibles",
         fecha:'2021-10-26',
         sesiones:[
           {id:1,horario_in:'15:00',horario_fn:'15:15',asistente:[]},
           {id:2,horario_in:'15:20',horario_fn:'15:35',asistente:[]},
           {id:3,horario_in:'15:40',horario_fn:'15:55',asistente:[]},
           {id:4,horario_in:'16:00',horario_fn:'16:15',asistente:[]},
           {id:5,horario_in:'16:20',horario_fn:'16:35',asistente:[]},
           {id:6,horario_in:'16:40',horario_fn:'16:55',asistente:[]},
         ]
       },
         {
           id:2,
           nombre:"Transformacion de modelos de negocio",
           fecha:'2021-10-26',
           sesiones:[
             {id:1,horario_in:'15:00',horario_fn:'15:15',asistente:[]},
             {id:2,horario_in:'15:20',horario_fn:'15:35',asistente:[]},
             {id:3,horario_in:'15:40',horario_fn:'15:55',asistente:[]},
             {id:4,horario_in:'16:00',horario_fn:'16:15',asistente:[]},
             {id:5,horario_in:'16:20',horario_fn:'16:35',asistente:[]},
             {id:6,horario_in:'16:40',horario_fn:'16:55',asistente:[]},
           ]
         },
         {
           id:3,
           nombre:"Eficiencia energetica para Pymes",
           fecha:'2021-10-26',
           sesiones:[
             {id:1,horario_in:'15:00',horario_fn:'15:15',asistente:[]},
             {id:2,horario_in:'15:20',horario_fn:'15:35',asistente:[]},
             {id:3,horario_in:'15:40',horario_fn:'15:55',asistente:[]},
             {id:4,horario_in:'16:00',horario_fn:'16:15',asistente:[]},
             {id:5,horario_in:'16:20',horario_fn:'16:35',asistente:[]},
             {id:6,horario_in:'16:40',horario_fn:'16:55',asistente:[]},
           ]
         },
         {id:4,
           nombre:"Tecnologia para ciudades inteligentes y sostenibles",
           fecha:'2021-10-27',
           sesiones:[
             {id:1,horario_in:'15:00',horario_fn:'15:15',asistente:[]},
             {id:2,horario_in:'15:20',horario_fn:'15:35',asistente:[]},
             {id:3,horario_in:'15:40',horario_fn:'15:55',asistente:[]},
             {id:4,horario_in:'16:00',horario_fn:'16:15',asistente:[]},
             {id:5,horario_in:'16:20',horario_fn:'16:35',asistente:[]},
             {id:6,horario_in:'16:40',horario_fn:'16:55',asistente:[]},
           ]
         },
         {
           id:5,
           nombre:"Modelo de negocio para emprendimiento tecnologico y sostenible",
           fecha:'2021-10-27',
           sesiones:[
             {id:1,horario_in:'15:00',horario_fn:'15:15',asistente:[]},
             {id:2,horario_in:'15:20',horario_fn:'15:35',asistente:[]},
             {id:3,horario_in:'15:40',horario_fn:'15:55',asistente:[]},
             {id:4,horario_in:'16:00',horario_fn:'16:15',asistente:[]},
             {id:5,horario_in:'16:20',horario_fn:'16:35',asistente:[]},
             {id:6,horario_in:'16:40',horario_fn:'16:55',asistente:[]},
           ]
         },
         {id:6,
           nombre:"Transito hacia una industria limentaria sostenible",
           fecha:'2021-10-27',
           sesiones:[
             {id:1,horario_in:'15:00',horario_fn:'15:15',asistente:[]},
             {id:2,horario_in:'15:20',horario_fn:'15:35',asistente:[]},
             {id:3,horario_in:'15:40',horario_fn:'15:55',asistente:[]},
             {id:4,horario_in:'16:00',horario_fn:'16:15',asistente:[]},
             {id:5,horario_in:'16:20',horario_fn:'16:35',asistente:[]},
             {id:6,horario_in:'16:40',horario_fn:'16:55',asistente:[]},
           ]
         }];
       mentorias.forEach((el)=>{
         db.collection('mentorias').add(el);
       });
       this.getMentorias();
     }
  }
}
</script>
