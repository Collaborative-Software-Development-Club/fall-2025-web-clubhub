"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";

const linkData = "text-gray-700 hover:text-gray-500 hover:underline active:text-red-700 bold"
const activeLinkData = "text-gray-700 font-bold hover:text-gray-500 hover:underline active:text-red-700 bold"

export default function Header() {
    const [page, setPage] = useState(() => {
        const savedRootPage = localStorage.getItem('rootPageNum')
        return savedRootPage ? JSON.parse(savedRootPage) : 0
    })

    useEffect(() => {
        localStorage.setItem('rootPageNum', JSON.stringify(page))
    }, [page])

    function handleClick(pageNum: number) {
        setPage(pageNum);
    }

    function getClassData(pageNum: number) {
       return ((page == pageNum) && activeLinkData) || linkData
    }

    return (
    <header className=" bg-gray-200 w-screen p-3 fixed">
        <div className="flex justify-between justify-self-center w-19/20 jus">
            <Link href="/" className="font-bold text-center" onMouseDown={e => {handleClick(0)}}>ClubHub</Link>
            <nav className="flex bg-gray-200 gap-4 w-auto justify-between align-middle">
                <Link href="/" className={getClassData(0)} onMouseDown={e => {handleClick(0)}}>Home</Link>
                <Link href="/attendance" className={getClassData(1)} onMouseDown={e => {handleClick(1)}}>Attendance</Link>
                <Link href="/browse" className={getClassData(2)} onMouseDown={e => {handleClick(2)}}>Browse</Link>
                <Link href="/meetings" className={getClassData(3)} onMouseDown={e => {handleClick(3)}}>Meetings</Link>
                <Link href="/clubs/csdc" className={getClassData(4)} onMouseDown={e => {handleClick(4)}}>Sample Club Profile</Link>
            </nav>
        </div> 
    </header>
    )
}