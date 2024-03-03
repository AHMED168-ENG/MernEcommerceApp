export interface UploadResult {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    eager: EagerTransformationResult[];
}

export interface EagerTransformationResult {
    transformation: string;
    width: number;
    height: number;
    bytes: number;
    url: string;
    secure_url: string;
}