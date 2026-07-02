declare global {
    interface Window {
        cloudinary: {
            createUploadWidget: (
                options: CloudinaryUploadWidgetOptions,
                callback: (
                    error: Error | null,
                    result: CloudinaryUploadResult
                ) => void
            ) => CloudinaryUploadWidget;
        };
    }

    interface CloudinaryUploadWidgetOptions {
        cloudName: string;
        uploadPreset: string;
        multiple?: boolean;
        folder?: string;
    }

    interface CloudinaryUploadResult {
        event: string;
        info?: {
            secure_url?: string;
            public_id?: string;
        };
    }

    interface CloudinaryUploadWidget {
        open: () => void;
        close?: () => void;
    }
}

export {};