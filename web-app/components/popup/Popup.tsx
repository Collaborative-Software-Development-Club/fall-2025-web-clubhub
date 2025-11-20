"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PopupProps = {
    width?: number;
    height?: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
    title?: string;
}

export default function Popup({ 
    width = 400, 
    height, 
    open,
    onOpenChange,
    children, 
    title 
}: PopupProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "sm:max-w-[425px]",
                    "backdrop-blur-sm"
                )}
                style={{ 
                    width: `${width}px`, 
                    minHeight: height ? `${height}px` : 'auto',
                    maxHeight: '90vh',
                    maxWidth: '90vw'
                }}
            >
                {title && (
                    <DialogHeader>
                        <DialogTitle className="text-center">{title}</DialogTitle>
                    </DialogHeader>
                )}
                
                <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}