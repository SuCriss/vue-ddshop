const actions={
    subAsyn({commit}){
        setTimeout(()=>{
            commit('sub')
        })
    }
}
export default actions