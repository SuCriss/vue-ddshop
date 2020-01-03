import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const P = {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
export default P