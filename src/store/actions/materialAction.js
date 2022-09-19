import { MATERIAL_CODE, MATERIAL_NAME } from "./types"

export const addMaterialCode = (state) => async(dispatch) => {
    dispatch({
        type: MATERIAL_CODE,
        payload: state
    })
}

export const addMaterialName = (state) => async(dispatch) => {
    dispatch({
        type: MATERIAL_NAME,
        payload: state
    })
}