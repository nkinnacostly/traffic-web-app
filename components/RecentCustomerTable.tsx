import { Card } from "./ui/card";
import Link from "next/link";
import { 
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow 
} from "./ui/table";
import { H3, H4, Span } from "./ui/typography";

interface CustomersDemoDataTypes {
    sn: number;
    name: string;
    amount: number;
    lastTransaction: string;
}

const customerDemoData: CustomersDemoDataTypes[] = [
    {
        sn: 1,
        name: "Jesse Amos",
        amount: 400,
        lastTransaction: "24th May, 2023"
    },
    {
        sn: 2,
        name: "Alex Smith",
        amount: 250,
        lastTransaction: "1st June, 2023"
    },
    {
        sn: 3,
        name: "John Doe",
        amount: 500,
        lastTransaction: "15th July, 2023"
    },
    {
        sn: 4,
        name: "Jane Doe",
        amount: 320,
        lastTransaction: "30th July, 2023"
    }
];

export default function CustomerTable() {
    return (
        <Card className="w-full py-6 px-4 bg-[#F9F9F9] shadow-none border-[#f9f9f9]">
            <>
            <H3 className="mb-5 text-[]">Recent Customers</H3>
             <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                            S/N  
                            </TableHead>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead className="text-center">
                            Amount 
                            </TableHead>
                            <TableHead className="text-right">
                            Last Transaction
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customerDemoData.map((item) => (
                            <TableRow key={item.sn} className="border-[#f9f9f9]">
                                <TableCell className=" text-[#030803B2]">{item.sn}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-center">₦{item.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{item.lastTransaction}</TableCell>
                            </TableRow>
                        ))}
                        <TableFooter className="border-none ">
                            <Link href="/customers">
                            <Span className="text-[#B42824] font-semibold"> See more</Span>
                            </Link>
                            </TableFooter>
                    </TableBody>
             </Table>
            </>
            
        </Card>
    );
}
