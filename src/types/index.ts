export type Subject = {
    id: number;
    name: string;
    code: string;
    description: string;
    department: string;
    createdAt: Date;
};

export type Class = {
    id: number;
    name: string;
    description: string;
    subject: Subject;
    teacher: any; // Replace 'any' with a proper 'Teacher' type if you have one
    capacity: number;
    status: "active" | "inactive";
    bannerUrl: string;
    bannerCldPubId: string;
    inviteCode: string;
    schedules: any[]; // Replace 'any' with a proper 'Schedule' type if you have one
};

export interface ListResponse<T = any> {
    data: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export type UploadWidgetProps = {
    value: UploadWidgetValue | null;
    onChange: (value: UploadWidgetValue | null) => void;
    disabled?: boolean;
};

export type UploadWidgetValue = {
    url: string;
    publicId: string;
};

export interface CloudinaryWidget {
    open: () => void;
    close: () => void;
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "teacher" | "student";
    department: string;
    image: string;
    imageCldPubId: string;
};
