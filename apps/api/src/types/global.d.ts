//For the Response
declare type ApiResponse<T = any> = {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}

//File Middleware
declare type FileValidationOptions = {
    limits: { fileSize: number } // in bytes;
    allowedTypes: string[];
}

//Create User
declare type CreateUserInput = {
    emailAddress: string;
    fullName: string;
    phoneNumber: string;
    story: string;
    videoBuffer: Buffer;
    mimeType: string;
}