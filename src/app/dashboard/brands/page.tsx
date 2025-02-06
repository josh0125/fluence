import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandDropdown } from "@/components/ui/brand";

export default function BrandPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{/* <BrandDropdown /> */}</CardTitle>
                <CardDescription>View brands and their orders.</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
