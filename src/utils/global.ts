import { FormDataValueType, UserType } from '~/components/Auth/lib/types';

//
// Constants
//

//
// App URLs
//
//
export const DB_URL = 'http://localhost:5002';
export const REGISTER_URL = `${DB_URL}/register`;
export const LOGIN_URL = `${DB_URL}/login`;
export const USERS_URL = `${DB_URL}/600/users`;
export const CATEGORY_URL = `${DB_URL}/640/categories`;
export const TASKS_URL = `${DB_URL}/640/tasks`;

//
// Functions
//
export const isStringEmpty = (str: string): boolean => !str;

export const getProgressValue = (amount: number, amountOfCompleted: number): number => {
    const percentage = Math.round((amountOfCompleted / amount) * 100);

    return (amountOfCompleted === 0) ? 0 : percentage;
};

export const isEmailValid = (value: FormDataValueType): boolean => {
    /* eslint-disable-next-line */
    const validRegex = /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

    if (typeof value === 'string') {
        if (value.match(validRegex)) {
            return true;
        }
    }

    return false;
};

//
// Classes
//

export type CookieNameType = 'accessToken';

export class Cookie {
    static setCookie(name: CookieNameType, value: string, timeSec: number): void {
        const now = new Date();
        let time = now.getTime();
        time += timeSec * 1000;
        now.setTime(time);

        document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
    }

    static getCookie(name: CookieNameType): string | undefined {
        const matches = document.cookie.match(new RegExp(
            /* eslint-disable-next-line */
            `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static deleteCookie(name: CookieNameType): void {
        this.setCookie(name, '', -1);
    }
}

export class LocalStorage {
    static getUser(): UserType | null {
        const jsonData = window.localStorage.getItem('user');

        return jsonData ? JSON.parse(jsonData) : null;
    }

    static setUser(user: UserType) {
        const jsonData = JSON.stringify(user);

        window.localStorage.setItem('user', jsonData);
    }

    static removeUser() {
        window.localStorage.removeItem('user');
    }
}
