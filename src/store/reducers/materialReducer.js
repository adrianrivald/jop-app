import { MATERIAL_CODE, MATERIAL_NAME } from '../actions/types';

const initialState = [{
    id: null,
    code: '',
    name: ''
}]

export default function materialReducer(state = initialState, action){

    const { type, payload } = action
    switch(type){
        case MATERIAL_CODE: 
            return payload
        case MATERIAL_NAME: 
            return {
                ...state,
                name: payload
            }
        default:
            return state
    }
 }