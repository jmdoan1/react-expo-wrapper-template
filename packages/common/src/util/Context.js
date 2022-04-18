import { createContext } from 'react';

export const defaultSessionContext = {
    session: {
        sessionID: undefined,
    },
}

export const MainContext = createContext({
    state: defaultSessionContext,
    dispatch: () => null
});

export const mainReducer = ({ sessionID, }, action) => ({
    session: SessionReducer(sessionID, action),
});

export const SessionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ID': {
            return {
                ...state,
                sessionID: action.payload.sessionID,
            };
        }
        case 'REMOVE_ID': {
            return {
                sessionID: undefined,
            };
        }
        default: {
            return state;
        }
    }
}
