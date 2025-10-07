"use client";

import type React from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useRef, type DragEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";

//Components, Actions, Utils
import Input from "../ui/Input";
import Button from "../ui/Button";
import { checkAllField } from "@/utils/checkForm";

//Stores
import { useCompetitorFormStore } from '@/stores/useCompetitorForm';

//Icons and Images
import gallery from "../../public/gallery.svg";
import axios from "axios";
// import { uploadWithFetch } from "@/lib/uploadToS3";

export function Form() {

    //Store
    const { data, updateField } = useCompetitorFormStore();

    return (
        <div className='flex flex-col gap-y-5'>
            <Input type="text" placeholder='Enter your name' label='Full Name' id='fullName' value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} required />
            <Input type="email" placeholder='e.g johndoes@gmail.com' label='Email Address' id='email' value={data.emailAddress} onChange={(e) => updateField("emailAddress", e.target.value)} required />
            <Input type="tel" placeholder='080 000 00 000' label='Phone Number' id='phoneNumber' value={data.phoneNumber} onChange={(e) => updateField("phoneNumber", e.target.value)} required />
        </div>
    )
}


export function Form1() {

    //Store and states
    const { data, updateField } = useCompetitorFormStore();
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (file: File | null) => {
        setError(null);
        if (!file) return toast.error("Kindly select a video");

        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 50) {
            toast.info("Video must less than 50MB");
            return;
        }

        if (!file.type.startsWith("video/")) {
            toast.error("You can only upload a video");
            setError("Please upload a video file");
            return;
        }

        if (typeof document !== "undefined") {
            const videoEl = document.createElement("video");
            videoEl.preload = "metadata";
            videoEl.src = URL.createObjectURL(file);

            videoEl.onloadedmetadata = () => {
                if (videoEl.duration > 120) {
                    setError("Video must be less than 2 minutes");
                    URL.revokeObjectURL(videoEl.src);
                    return;
                }

                updateField("danceVideo", file);
                URL.revokeObjectURL(videoEl.src);
            };
        };
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        handleFileChange(file)
    }

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0] || null
        handleFileChange(file)
    }

    return (
        <div>
            <p className="mb-2 text-[#958E9F] text-[10px] md:text-xs xl:text-sm">Upload dance video (Individual or Group)</p>
            <div className={`relative w-full h-80 rounded-md border-2 border-dashed ${isDragging ? "border-[#958E9F] bg-gray-300" : "bg-[#F2F1F3] border-[#B9B5C0]"
                } flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors`}
                onClick={handleBrowseClick} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                {data.danceVideo ? (
                    <div className="relative flex flex-col justify-center items-center w-full h-full">
                        <video src={URL.createObjectURL(data.danceVideo)} className="rounded max-w-full max-h-40" controls />
                        <p className="mt-2 text-black">{data.danceVideo?.name}</p>
                        <button onClick={(e) => { e.stopPropagation(); if (fileInputRef.current) { fileInputRef.current.value = "" }; updateField("danceVideo", null) }} className="mt-2 text-[10px] text-red-500 hover:text-red-700 md:text-xs xl:text-sm">
                            Remove video
                        </button>
                    </div>
                ) : (
                    <>
                        <Image src={gallery} alt="Video Icon" />
                        <p className="text-[#716A7C] text-center">
                            Drag and drop video or <span className="font-medium text-primaryPurple">Browse</span>
                        </p>
                        <p className="mt-1 text-[#958E9F] [8px]">(not more than 2 mins)</p>
                        {error && <p className="mt-2 text-red-500">{error}</p>}
                    </>
                )}

                <input type="file" ref={fileInputRef} onChange={handleInputChange} accept="video/*" className="hidden" aria-label="Upload dance video" />
            </div>
        </div>
    )
}

export function Form2() {

    //Store
    const { data, updateField } = useCompetitorFormStore();
    const maxText = 1500;

    return (
        <main>
            <label htmlFor="story" className="block text-[#4E4955] cursor-pointer">The story behind the video <span className="text-red-500">*</span></label>
            <textarea value={data.story} onChange={(e) => updateField("story", e.target.value)} placeholder="Write your story" required name="story" id="story" className="bg-inherit mt-2 px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple w-full h-60 placeholder:text-[#A7A1AF] duration-300 resize-none" disabled={data.story.length === maxText}></textarea>
            <span className="flex justify-end text-[#A7A1AF] text-[10px] md:text-xs xl:text-sm">{data.story.length}/{maxText}</span>
        </main>
    )
}


export function Form3() {

    const { data } = useCompetitorFormStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [uploadFailed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    //Next page function
    const updatePage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', "4");
        router.push(`?${params.toString()}`);
    };

    const handleFinalRegistration = async () => {
        try {
            toast.info("Uploading Details...");
            if (!data.danceVideo) return toast.error("No video selected");
            if (!checkAllField()) return toast.warning("Kindly fill all the required fields.");

            setLoading(true);
            setProgress(0);

            const formData = new FormData();
            formData.append("danceVideo", data.danceVideo);
            formData.append(
                "userDetails",
                JSON.stringify({
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    emailAddress: data.emailAddress,
                    story: data.story,
                })
            );

            await axios.post(`${API_URL}user/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                maxBodyLength: Infinity,
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setProgress(percent);
                },
            });

            toast.success("Your registration was successful!");
            updatePage();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Upload failed, kindly check your details and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div className="space-y-4 mt-4">
                <Button type="submit" text={uploadFailed ? "Retry Upload & Register" : "I'm ready to win!"} loading={loading} onClick={handleFinalRegistration} />
                {loading && (
                    <div className="bg-gray-200 mt-4 rounded-full w-full">
                        <div className="bg-green-500 p-0.5 rounded-full font-medium text-white text-xs text-center leading-none" style={{ width: `${progress}%` }}>
                            {progress}%
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
