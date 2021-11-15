import React, { createContext, useReducer } from 'react';
import Firebase from 'firebase';
import { ActionMap } from '../types/Types';

export type SessionContextType = {
    user: Firebase.UserInfo | undefined,
    sessionID: string | undefined,
}

const defaultSessionContext: SessionContextType = {
    user: undefined,
    sessionID: undefined,
}

export const SessionContext = createContext<{
    state: SessionContextType;
    dispatch: React.Dispatch<UserActions | SessionActions>;
}>({
    state: defaultSessionContext,
    dispatch: () => null
});

const mainReducer = ({ user, sessionID, }: SessionContextType, action: UserActions | SessionActions) => ({
    user: UserReducer(user, action as UserActions),
    sessionID: SessionReducer(sessionID, action as SessionActions),
});

interface ProviderProps {
    children: React.ReactNode;
}
export const SessionProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(mainReducer, defaultSessionContext);

    return (
        <SessionContext.Provider value={{ state, dispatch }}>
            {children}
        </SessionContext.Provider>
    );
}

export enum UserActionTypes {
    SET = 'SET',
    REMOVE = 'REMOVE'
}

export type UserTaskSet = {
    user: Firebase.UserInfo,
}

export type UserPayload = {
    [UserActionTypes.SET]: UserTaskSet;
    [UserActionTypes.REMOVE]: null;
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const UserReducer = (state: Firebase.UserInfo | undefined, action: UserActions): Firebase.UserInfo | undefined => {
    switch (action.type) {
        case UserActionTypes.SET: {
            return action.payload.user;
        }
        case UserActionTypes.REMOVE: {
            return undefined;
        }
        default: {
            return state;
        }
    }
}

export enum SessionActionTypes {
    SET = 'SET',
    REMOVE = 'REMOVE'
}

export type SessionTaskSet = {
    sessionID: string,
}

export type SessionPayload = {
    [SessionActionTypes.SET]: SessionTaskSet;
    [SessionActionTypes.REMOVE]: null;
}

export type SessionActions = ActionMap<SessionPayload>[keyof ActionMap<SessionPayload>];

export const SessionReducer = (state: string | undefined, action: SessionActions): string | undefined => {
    switch (action.type) {
        case SessionActionTypes.SET: {
            return action.payload.sessionID;
        }
        case SessionActionTypes.REMOVE: {
            return undefined;
        }
        default: {
            return state;
        }
    }
}
