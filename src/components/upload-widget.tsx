import React, { useEffect, useRef, useState } from 'react';
import { UploadWidgetProps, UploadWidgetValue } from "@/types";
import { UploadCloud, Trash2 } from "lucide-react";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/constants';

const UploadWidget: React.FC<UploadWidgetProps> = ({ value = null, onChange, disabled = false }) => {
    const widgetRef = useRef<CloudinaryUploadWidget | null>(null);
    const onChangeRef = useRef(onChange);

    const [preview, setPreview] = useState<UploadWidgetValue | null>(value);

    useEffect(() => {
        setPreview(value);
    }, [value]);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializeWidget = () => {
            if (!window.cloudinary || widgetRef.current) return false;
            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                multiple: false,
                folder: 'uploads',
                maxFileSize: 5 * 1024 * 1024,
                allowedFormats: ['jpg', 'jpeg', 'png', 'webp']
            }, (error, result) => {
                if (!error && result.event === 'success' && result.info && typeof result.info === 'object') {
                    const payload: UploadWidgetValue = {
                        url: result.info.secure_url ?? '',
                        publicId: result.info.public_id ?? '',
                    };

                    setPreview(payload);
                    
                    onChangeRef.current(payload);
                }
            });
            return true;
        };

        if (initializeWidget()) return;

        const intervalId = window.setInterval(() => {
            if (initializeWidget()) {
                window.clearInterval(intervalId);
            }
        }, 500);
        return () => window.clearInterval(intervalId);
    }, []);

    const openWidget = () => {
        if (!disabled) widgetRef.current?.open();
    };

    const removeFromCloudinary = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onChangeRef.current(null);
    };

    return (
        <div className={`relative border flex flex-col items-center justify-center rounded overflow-hidden bg-muted/10 transition-all duration-300 ${preview ? 'h-auto w-full' : 'h-30'}`}>
            {preview ? (
                <div className="relative w-full h-full group flex items-center justify-center">
                    <img 
                        src={preview.url} 
                        alt="Uploaded file" 
                        className="w-full h-auto max-h-[300px] object-contain block rounded"
                    />
                    <button
                        type="button"
                        onClick={removeFromCloudinary}
                        disabled={disabled}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 p-1.5 rounded transition shadow-sm cursor-pointer opacity-0 group-hover:opacity-100"
                        title="Remove Image"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div 
                    className="upload-dropzone w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/20 transition"
                    role="button" 
                    tabIndex={0}
                    onClick={openWidget} 
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            openWidget();
                        }
                    }}
                >
                    <div className="upload-prompt flex flex-col items-center gap-1.5 p-4 text-center">
                        <UploadCloud className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Click to upload photo</p>
                            <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadWidget;
