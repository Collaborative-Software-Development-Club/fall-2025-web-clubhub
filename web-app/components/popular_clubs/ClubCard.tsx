"use client"
import React from "react";
import { Card, CardContent } from "../ui/card";
import "./embla.css";

type ClubCardProps = {
    clubTitle: string;
};
// Need to add to these props.
/*
We should have an image, title, and some other information that would be useful
to display on the main page. I was thinking we could make some kind of clickable or hover
popout to show additional information but we need to define those types before I can
add it into this ClubCard.
*/

export default function ClubCard(props: ClubCardProps) {
    const { clubTitle } = props;

    // TODO: make a popout with the extra information
    return (
        <Card className="h-full">
            <CardContent className="flex items-center justify-center p-6 h-full">
                <h3 className="text-lg font-semibold text-center">
                    {clubTitle}
                </h3>
            </CardContent>
        </Card>
    );
}
