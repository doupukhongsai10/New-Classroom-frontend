import React, {useRef, useState} from 'react'
import {CloudinaryWidget} from "@/types";
import {UploadCloud} from "lucide-react";

const UploadWidget = ({ value = null, onChange, disabled = false }) => {
    const widgetRef = useRef<CloudinaryWidget | null>(null)
    const onChangeRef = useRef(onChange);

    const [preview, setPreview] = useState(value);
    const [deleteToken, setDeleteToken] = useState<String | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);

    const openWidget = () =>{
        if(!disabled) widgetRef.current?.open();
    }

    const removeFromCloudinary = async ()=> {}

    return (
        <div className="space-y-2 border h-30 flex flex-col items-center justify-center rounded">
            {preview ? (
                    <div className="upload-preview"></div>
                ):<div className="upload-dropzone" role="button" tabIndex={0}
            onClick={openWidget} onKeyDown={(event)=>{
                if(event.key === 'Enter'){
                    event.preventDefault();
                    openWidget();
                }
            }}>
                <div className="upload-prompt">
                    <UploadCloud className="icon" />
                    <div>
                        <p>Click to upload photo</p>
                        <p>PNG, JPG up to 5MB</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default UploadWidget
