import { authenticateActions } from '../reducers/authenticateReducer'

function setUsers(loginId, loginPassword) {
    return async (dispatch) => {
        //let url = `http://localhost:5000/profile/${loginId}`;
        let url = `https://my-json-server.typicode.com/GentleK/gentlix/profile/${loginId}`
        let response = await fetch(url);
        let data = await response.json();

        if (data.id && data.password === loginPassword) {
            dispatch(authenticateActions.setUser({ data }));
        } else {
            alert('로그인에 실패하였습니다. \n\n사용자 id나 암호를 확인하세요');
        }
    }
}

function logoutUser() {
    return (dispatch) => {
        dispatch(authenticateActions.logoutUser());
    }
}

export const authenticateAction = {
    setUsers, logoutUser
}