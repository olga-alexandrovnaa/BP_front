import { FC, lazy } from 'react';
import { UserAuthDataFormProps } from './UserAuthDataForm';

export const UserAuthDataFormAsync = lazy<FC<UserAuthDataFormProps>>(
    () => import('./UserAuthDataForm'),
);
