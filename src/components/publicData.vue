<template>
    <div class="wrap">
        <span>班型：{{title}}</span>
    </div>
</template>
<script>
export default {
    name:"publicData",
    props:{
        classValue:String
    },
    data(){
        return {
            title:""
        }
    },
    computed:{
        getQuery(classValue){
            this.$httpWX.post({
                url:this.$api.classType.queryClass,
                data:{
                    params:{}
                }
            }).then(res=>{
                console.log(res);
                const item  = res.data.list.find(item =>item.id == classValue.classValue);
                console.log(item);
                this.title = item.title;;
                return item.title;
            })
        }
    }
}
</script>
<style lang="scss">
    
</style>