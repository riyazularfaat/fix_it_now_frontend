
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TakaIcon } from "../icon/taka-icon";

export default function FinancialCard() {
    return (
        <Card className="w-85.7">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                {/* Custom icon seamlessly scales using shadcn styles */}
                <TakaIcon className="h-4 w-4 text-muted-foreground stroke-[2.5]" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">৳ 24,500.00</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
        </Card>
    );
}
