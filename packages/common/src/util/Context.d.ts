import React, { createContext } from 'react';
import { ActionMap } from '../types/Types';
import { defaultSessionContext } from './Context';

declare type SessionInfoType = {
    sessionID: string | undefined,
}

declare type MainContextType = {
    session: SessionInfoType,
}

declare const defaultSessionContext: MainContextType;

declare const MainContext: React.Context<{
    state: MainContextType;
    dispatch: React.Dispatch<SessionActions>;
}>

declare const mainReducer: ({ session, }: MainContextType, action: SessionActions) => {
    session: SessionInfoType;
}

export enum SessionActionTypes {
    SET_ID = 'SET_ID',
    REMOVE_ID = 'REMOVE_ID'
}

export type SessionPayload = {
    [SessionActionTypes.SET_ID]: string;
    [SessionActionTypes.REMOVE_ID]: null;
}

export type SessionActions = ActionMap<SessionPayload>[keyof ActionMap<SessionPayload>];

declare const SessionReducer: (state: SessionInfoType, action: SessionActions) => SessionInfoType;

