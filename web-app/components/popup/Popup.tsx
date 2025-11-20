"use client"

import { X } from 'lucide-react';

type PopupProps = {
    width?: number;
    height?: number;
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
}

export default function Popup({ width = 400, height, onClose, children, title }: PopupProps) {
    return (
        // Backdrop - covers entire screen with blur effect
        <div 
            className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
        >
            {/* Popup content - centered */}
            <div 
                className="bg-white rounded-lg shadow-2xl p-6 relative border-2 border-black animate-in zoom-in-95 duration-200"
                style={{ 
                    width: `${width}px`, 
                    minHeight: height ? `${height}px` : 'auto',
                    maxHeight: '90vh',
                    maxWidth: '90vw'
                }}
            >
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Title */}
                {title && (
                    <h2 className="text-xl font-bold mb-4 pr-8 text-center">{title}</h2>
                )}

                {/* Content */}
                <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}