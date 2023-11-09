import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

export const getUserRoles = (state: StateSchema) => state.user?.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);

export const getUserInited = (state: StateSchema) => state.user?._inited;
export const getUserAuthData = (state: StateSchema) => state.user?.authData;
export const getUserToken = (state: StateSchema) => state.user?.authData?.token;
export const getUserId = (state: StateSchema) => state.user?.authData?.id;
export const getUserName = (state: StateSchema) => state.user?.authData?.username;