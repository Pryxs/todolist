<template>
    <Page>
        <ActionBar title="Créer"/>
        <GridLayout rows="*,60, 60">
            <StackLayout class="form" row="0">
                <TextField class="input" hint="nom" v-model="name"/>
                <TextField class="input" hint="description" v-model="content"/>  
                <Button text="Camera" @tap="takePicture"/>
                
            </StackLayout>          
                <Button row="1" text='valider' class="validate" @tap="Validate"></Button>
                <Button row="2" text="andonner" @tap="$navigateBack"/>
            </GridLayout>
    </Page>
</template>

<script>

import Todo from '../models/Todo';
import Home from './Home';
const camera = require("nativescript-camera");
const imageModule = require("tns-core-modules/ui/image");

export default {
        components:{Home},

        data: () => {
        return {
                name:"",
                content:"",
                image:''
            };

        },

         methods:{
            Validate(){
            let item = new Todo(this.name, this.content)
            if(item.name){
                this.$navigateTo(Home, {props:{newItem : item}}).catch(error => console.log(error));
                this.$store.commit('saveTodo', item)
            } else {
                alert("Il faut donner un nom !");
            }
            },

            takePicture(){
               camera.requestPermissions().then(
                    function success() {
                            camera.takePicture()   
                                .then(function (imageAsset) {
                                    //let img = new imageModule.Image();
                                    //img.src = imageAsset;
                                    //this.image = img;
                                    alert('img');

                                }).catch(function (err) {
                                    console.log("Error -> " + err.message);
                                });                  
                            }, 
                    function failure() {
                        alert("fail")
                    }
                );
            }
        }
    };
</script> 

<style scoped lang="scss">

.input{
    margin: 50px;
}

.form{
    margin-top: 30%;
}

.validate{
    background-color: #0b5bd4; 
    color: white;
}
   
    
</style>
