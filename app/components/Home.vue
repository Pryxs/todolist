<template>
    <Page>
        <ActionBar title='Liste à faire'>
            <ActionItem @tap="toCreateComponant" android.systemIcon="ic_input_add" android.position="right"></ActionItem>  
        </ActionBar>
        <FlexboxLayout flexDirection="column">
             <FlexboxLayout class="filter" backgroundColor="#efefef" alignItems="center" justifyContent="flex-end">
                <label text="trier"/>  
                <Switch class="switch" checked="false" v-model="itemEnabled"></Switch>
             </FlexboxLayout>
            <ListView class="list" for="(item, index) in filteredItem" @itemTap="navigate">
                <v-template>
                    <FlexboxLayout justifyContent="space-between">
                        <GridLayout columns="100px, auto">
                            <Label col="0" class="todo" v-if="item.done !== true" text="à faire" />
                            <Label col="0" class="done" v-if="item.done === true" text="fait" />
                            <label col="1" :text="item.name"/>  
                        </GridLayout>
                        <label color="red" v-if="item.done == true" @tap="toDelete(index)" text="Supprimer" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
             <!-- <ListView  v-show="itemEnabled == true" class="list" for="item in items" @itemTap="navigate">
                <v-template>
                    <label :text="item.done"/>
                </v-template>
            </ListView> -->
        </FlexboxLayout>
    </Page>
</template>

<script> 

import Create from "./Create";
import Detail from './Detail';

import Data from '../data/liste.json';

export default {
        props: ['newItem'],
    components:{Detail, Create},
      data: () => {
        return {
            items: [],
            itemEnabled : false,
            //todoList : this.$store.state.todos
            };

    },

    computed: {
		filteredItem: function() {			
			if(this.itemEnabled === false) {
				return this.$store.state.todos;
			} else {
				return this.$store.state.todos.filter(function(item) {
					return item.done === true;
				});
			}
		}
	},

    
    methods:{
        navigate(event){
            this.$navigateTo(Detail, {props:{todoItem : event.item}}).catch(error => console.log(error));
        },

        toCreateComponant(){
            //this.$navigateTo(Create, {props:{item:new Todo()}})
            this.$navigateTo(Create).catch(error => console.log(error));
        },

        toDelete(index){
            confirm('Voulez vous supprimer cette tâche ?')
                .then(result => {
                    if(result == true){
                        this.$store.commit('deleteItem', index)
                      //this.$store.splice(index, 1);
                    }
                });
            }


       

    },
    // watch:{

    //     itemEnabled :  function (event){

    //         if(this.itemEnabled === true){
    //             alert('true')
    //         }else{/home/corentinroy/Documents/nativeScript/test1/app/App_Resources/Android/src/main/res/values-v21
    //             alert('false')
    //         }

    //     }

    // },
    mounted(){
        //this.items = Data.items;
        if(this.newItem){
            this.items.unshift(this.newItem);
        }

        //axios.get()

        //alert(this.$store.state.todos)
    }
};



</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }
    .todo,.done{
        border-width: 1;
        width: 150px;
    }

    .todo{
        background-color: #eee;
    }

    .done{
        background-color: rgb(98, 233, 98);
    }

    .filter{
        height: 100;
    }


</style>
