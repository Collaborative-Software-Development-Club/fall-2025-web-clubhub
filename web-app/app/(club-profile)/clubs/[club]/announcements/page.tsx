"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Plus, MoreHorizontal, Trash2, Edit, Pin } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
}from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import { useAnnouncements, useCreateAnnouncement, useUpdateAnnouncement, useDeleteAnnouncement }  from "@/services/club-profile/clubs-hooks/useClubProfileData";

type Announcement = {
    id: number;
    clubId: number;
    userId: string;
    title: string;
    content: string;
    pinned: boolean | null;
    lastModified: Date | null;
};

const ANN_ID = 0;
const clubId = 1;

const isLeader = true; //replace with actual authentication logic

export default function AnnouncementsPage() {
	const {data: announcements, isLoading, error} = useAnnouncements(clubId); //Gets the annoucnements at this clubId from the db


	const { mutate: createAnnouncement} = useCreateAnnouncement();
	const { mutate: updateAnnouncement } = useUpdateAnnouncement();
	const { mutate: deleteAnnouncementMutation} = useDeleteAnnouncement();

	const [formOpen, setFormOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author,setAuthor] = useState("");
	const [editingAnn, setEditingAnn] = useState<Announcement |null>(null);


	const handleSubmit = () => {
		if(!title) return;
		
		if(editingAnn) {
			updateAnnouncement({
				announcementId: editingAnn.id,
				clubId: editingAnn.clubId,
				authorId: author,
				title: title,
				content: body,
				pinned: editingAnn.pinned ?? false,
			});

			return;
		}else{
			createAnnouncement({
				clubId: clubId,
				authorId: author,
				title: title,
				content: body,
				pinned: false,
			});
		}
		setEditingAnn(null);
		setTitle("");
		setBody("");
		setAuthor("");
		setFormOpen(false);
	};

	const editAnnouncement = (id: number) => {
		const annToEdit = announcements?.find((a) => a.id == id);
		if(!annToEdit) return;

		setTitle(annToEdit.title);
		setBody(annToEdit.content || "");
		setAuthor(annToEdit.userId || "");
		setEditingAnn(annToEdit);
		setFormOpen(true); //reopens the original form used to create the announcement

		//small delay so dropdown menu can close before the popover opens
		setTimeout(()=> setFormOpen(true), 0);
	};

	// Callback function that takes the previous state of the announcements array and returns a new array. Deletes the array with the id from the parameter by keeping all of the other ones
	const deleteAnnouncement = (a: Announcement) => {
		//setAnnouncements((prev: Announcement[]) => prev.filter((a) => a.id !== id));
		deleteAnnouncementMutation({
			announcementId: a.id,
			clubId: a.clubId,
			authorId: a.userId,
			title: a.title,
			content:a.content,
			pinned:a.pinned ?? false,
		});
	};

	//toggle pin handler
	const togglePin = (a:Announcement) => {
		updateAnnouncement({
			announcementId: a.id,
			clubId: a.clubId,
			authorId: a.userId,
			title: a.title,
			content: a.content,
			pinned: !a.pinned,
		});
	}

	if (isLoading) return <p>Loading Announcements...</p>
	if (error) return <p>Error Loading Announcements</p>

	return (
		<main className="container mx-auto max-w-4xl py-8">
			<h1 className="text-2xl font-bold mb-6">Announcements</h1>

			{/* Creates the popout box for adding an announcement sets the states accordingly */}
			{/* Checks if the user is a leader or member if not a leader then the create announcement button does not appear */}
			{isLeader && (
				<Dialog open={formOpen} onOpenChange={setFormOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" className="mb-2 cursor-pointer">
						<Plus /> {editingAnn ? "Edit Announcement" : "Create Announcement"}
					</Button>
				</DialogTrigger>

				{/* Box for creating the new Announcement */}
				<DialogContent className="w-[640px] p-6">
					<DialogHeader>
						<DialogTitle>{editingAnn ? "Edit Announcement" : "New Announcement"}</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-3">
						<Input
							placeholder="Title"
							value={title}
							className="text-lg py-3"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
						/>

						<Input
							placeholder="Author"
							value={author}
							className="text-lg py-3"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
						/>

						<Textarea
							placeholder="Body"
							value={body}
							className="h-48"
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
						/>

						<Button onClick={handleSubmit} className="mt-2 cursor-pointer" disabled={!title}>
							{editingAnn ? (
								<>
									<Edit className="w-4 h-4 mr-2" /> Update Announcement
								</>
							) : (
								<>
									<Plus className="w-4 h-4 mr-2" /> Post Announcement
								</>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>)}


				<div className="space-y-6 mt-6">
				{!announcements?.length && (
					<p className="text-muted-foreground">No announcements yet.</p>
				)}

				{announcements
					?.slice()
					.sort((a, b) => {
						// pinned first
						if ((a.pinned ? 1 : 0) !== (b.pinned ? 1 : 0)) {
							return a.pinned ? -1 : 1;
						}
						return new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime();
					})
					.map((a) => (
					<Card key={a.id} className="p-6">
						<CardHeader className="flex items-start justify-between gap-4">
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<CardTitle className="text-base">{a.title}</CardTitle>
									{a.pinned && <Badge className="ml-2">Pinned</Badge>}
								</div>
								<p className="text-sm text-muted-foreground">{a.userId ?? "Name"} • {a.lastModified ? format(new Date(a.lastModified), "PPP p"): ""}</p>
							</div>
							{isLeader && (
								<div className="flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="cursor-pointer">
											<MoreHorizontal />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem className="cursor-pointer" onClick={() => togglePin(a)}>
											<Pin className="w-4 h-4 mr-2" />
											{a.pinned ? "Unpin" : "Pin"}
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer" onClick={() => editAnnouncement(a.id)}>
											<Edit className="w-4 h-4 mr-2" />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer" onClick={() => deleteAnnouncement(a)}>
											<Trash2 className="w-4 h-4 mr-2" />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							)}

						</CardHeader>

						{a.content && (
							<CardContent className="py-6">
								<p className="text-sm text-muted-foreground">{a.content}</p>
							</CardContent>
						)}
					</Card>
				))}
			</div>
		</main>
	);
}



