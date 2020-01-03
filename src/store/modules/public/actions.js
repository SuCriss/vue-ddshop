const actions={
    toggleLoadingAsyn({commit},flag){
        setTimeout(()=>{
            commit('toggleLoading',flag)
        })
    }
}
export default actions