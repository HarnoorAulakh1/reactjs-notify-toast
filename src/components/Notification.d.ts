import React from 'react';
export declare const notificationContext: React.Context<{
    data: {
        show: boolean;
        notification: string;
    };
    setter: React.Dispatch<React.SetStateAction<{
        show: boolean;
        notification: string;
    }>>;
}>;
export declare function Notifications({ children, }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Notification.d.ts.map