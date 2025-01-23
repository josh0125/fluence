import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brand } from "@/app/(dashboard)/brands/brand";

export default function BrandPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Brand />
                </CardTitle>
                <CardDescription>View brands and their orders.</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
