import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <>
        <div className="flex justify-center p-5">
            <Button variant="destructive">Skip</Button>
            <Button className="ml-5">Join</Button>
        </div>
        <div className="flex justify-center h-screen pb-10">
            <Card className="text-center w-full max-w-[720px] h-[480px] bg-white rounded-xl shadow-2xl border border-gray-100">
                Example Club
            </Card>
        </div>
        </>

    );
}
