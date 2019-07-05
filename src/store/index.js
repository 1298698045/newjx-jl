import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0
    },
    mutations:{
        inser(state){
            state.count++;
        }
    },
    actions:{
        getInser(context){
            setTimeout(()=>{
                context.commit('inser');
            },1000)
        }
    },
    getters:{
        getC(state){
            return state.count < 10 ? state.count : 100
        }
    }
})
