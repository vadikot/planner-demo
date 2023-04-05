export interface UserWithoutIdType {
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserType extends UserWithoutIdType {
    id: number
}

export interface AuthResponseType {
    user: UserType,
    accessToken: string
}

//
// Registration
//
export interface RegisterFormValidationType {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    repeatPassword: boolean;
}

export type FormDataValueType = File | string | null;
export type FormFieldsType = Record<string, FormDataValueType>;

export interface RegisterFormErrorsType {
    main: string;
    email: string;
    password: string;
}
