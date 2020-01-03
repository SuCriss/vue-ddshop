const mutations={
    add(state){
        if(state.count===5){
            return;
        }
        state.count++
    },
    sub(state){
        if(state.count===0){
            return;
        }
        state.count--
    },
    getImageUrl(state,idx){
        switch(idx){
            case 0:
                state.imageURL=require("../../../images/login/greeting.png");
                break;
            case 1:
                state.imageURL=require("../../../images/login/blindfold.png");
                break;
            default:state.imageURL=require("../../../images/login/normal.png");
        }
    },
    normalImageUrl(state){
        state.imageURL=require("../../../images/login/normal.png")
    }
}
export default mutations