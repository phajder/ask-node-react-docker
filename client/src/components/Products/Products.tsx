import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  productName: string;
  price: number;
}

interface ProductProps {
  products: Product[];
}

export default function Products({ products }: ProductProps) {
  return (
    <div className="product-container">
      <Table className="striped centered blue lighten-3">
        <TableCaption>A list of available products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            Object.values(products).map((p) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>{p.productName}</TableCell>
                  <TableCell className="text-right">{p.price}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
