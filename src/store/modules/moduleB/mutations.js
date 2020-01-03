const mutations={
    add(state,e){
        if(state.count===5){
            e.preventDefault();
            return;
        }
        state.count++
    },
    sub(state,e){
        if(state.count===0){
            e.preventDefault()
            return;
        }
        state.count--
    }
}
export default mutations