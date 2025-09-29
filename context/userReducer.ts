export interface initialStateType {
    firstName: string;
    lastName: string;
    email: string;
};

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
};


const userReducer = (state: initialStateType, action: {type: string, payload: initialStateType}) => {
    const { type, payload } = action;

    switch (type) {
        case "UPDATE_USER_INFO":
            return {
                ...state,
                ...payload
            }
    
        default:
            throw new Error(`No case for type ${type} in userReducer`);
    }
};

export default userReducer;

