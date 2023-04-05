import React from 'react';

export type textFieldEventType = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export enum FetchStatusType {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
}

export enum PromiseStatusType {
    pending = 'pending',
    rejected = 'rejected',
    fulfilled = 'fulfilled',
}
