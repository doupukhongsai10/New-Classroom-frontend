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
    teacher: User;
    capacity: number;
    status: "active" | "inactive";
    bannerUrl: string;
    bannerCldPubId: string;
    inviteCode: string;
    schedules: Schedule[];
};

export type Schedule = {
    day: string;
    startTime: string;
    endTime: string;
};

export interface ListResponse<T = unknown> {
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
