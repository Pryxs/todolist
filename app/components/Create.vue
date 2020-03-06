<template>
    <Page>
        <ActionBar title="Créer"/>
        <GridLayout rows="*,60, 60">
            <StackLayout class="form" row="0">
                <TextField class="input" hint="nom" v-model="name"/>
                <TextField class="input" hint="description" v-model="content"/>  
                <Button text="Camera" @tap="takePicture"/>
                <WrapLayout>
                     <Image v-for="img in images" :src="img.src" width="75" height="75" ></Image>
                </WrapLayout>
            </StackLayout>          
                <Button row="1" text='valider' class="validate" @tap="Validate"></Button>
                <Button row="2" text="abandonner" @tap="$navigateBack"/>
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
                images:[]
            };

        },
      
        mounted(){
            //alert(this.image)
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
            
                camera.requestPermissions().then(() => {
				    camera.takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery:false, allowsEditing:false}).then(imageAsset => {
					    let img = new imageModule.Image();
					    img.src = imageAsset;
					    this.images.push(img);
					    console.log('ive got '+this.images.length+' images now.');
				    })
				.catch(e => {
					console.log('Error:', e);
				});
			})
			.catch(e => {
				console.log('Error requesting permission');
			});
            
                    
            }
        }
       
}

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
