<template>
    <Page>
      <ActionBar title="Detail"/>
      <GridLayout rows="*,60">
        <StackLayout class="content" row="0">
          <Label class="title" :text="todoItem.name" />
          <TextView class="desc" v-model="todoItem.content"></TextView>
          <FlexboxLayout class="switch" alignItems="center" justifyContent="center">
            <Label width="150px" v-if="todoItem.done !== true" text="à faire" />
            <Label width="150px" v-if="todoItem.done === true" text="fait" />
            <Switch class="switch" checked="false" v-model="todoItem.done"></Switch>
          </FlexboxLayout>
        </StackLayout>
        <Button backgroundColor="#eee" row="1" @tap="$navigateBack" text="Close" />
      </GridLayout>
    </Page>
    
</template>

<script>
import Todo from '../models/Todo';

export default {
    props: ['todoItem'],

    data: () => {
      return {
          todo: '',
          edit: false
      }
    }
}
</script>
<style> 
  .content{
    margin-top: 30%;
  }

  .title{
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin-bottom: 50px;
  }

  .desc{
    height: 300px;
    border-width: 1px;
    border-color: rgb(158, 158, 158);
    padding: 20px;
  }

</style>