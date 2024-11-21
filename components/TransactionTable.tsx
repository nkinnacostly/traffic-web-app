import { Card } from "./ui/card";

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow 
} from "./ui/table";


type TransactionProps ={
    status:string
}

interface TransactionTableData {
    sn: number;
    name: string;
    productDetails: string;
    amount:number;
    unit:string;
    total: number;
}

const customerDemoData: TransactionTableData[] = [
    {
        sn: 1,
        name: "Jesse Amos",
        productDetails: "Orange Diva Suit",
        amount:40000,
        unit:"1pc",
        total: 40000
    },
    {
        sn: 1,
        name: "Jesse Amos",
        productDetails: "Orange Diva Suit",
        amount:40000,
        unit:"1pc",
        total: 40000
    },   {
        sn: 1,
        name: "Jesse Amos",
        productDetails: "Orange Diva Suit",
        amount:40000,
        unit:"1pc",
        total: 40000
    },   {
        sn: 1,
        name: "Jesse Amos",
        productDetails: "Orange Diva Suit",
        amount:40000,
        unit:"1pc",
        total: 40000
    },   {
        sn: 1,
        name: "Jesse Amos",
        productDetails: "Orange Diva Suit",
        amount:40000,
        unit:"1pc",
        total: 40000
    },   {
        sn: 1,
        name: "Jesse Amos",
        productDetails: "Orange Diva Suit",
        amount:40000,
        unit:"1pc",
        total: 40000
    },
];

export default function TransactionTable({status}:TransactionProps) {
    return (
        <Card className="w-full py-6 px-4 bg-[#F9F9F9] shadow-none border-[#f9f9f9]">
            <>
             <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                             S/N  
                            </TableHead>
                            <TableHead>
                             Name
                            </TableHead>
                            <TableHead>
                             Product details 
                            </TableHead>
                            <TableHead>
                             Amount 
                            </TableHead>
                            <TableHead>
                             Unit 
                            </TableHead>
                            <TableHead>
                             Total 
                            </TableHead>
                          
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customerDemoData.map((item,index) => (
                            <TableRow key={index} className="border-[#f9f9f9]">
                                <TableCell className=" text-[#030803B2]">{item.sn}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell >{item.productDetails}</TableCell>
                                <TableCell >N{item.amount.toLocaleString()}</TableCell>
                                <TableCell >{item.unit}</TableCell>
                                <TableCell >{item.total.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
             </Table>
            </>
            
        </Card>
    );
}
