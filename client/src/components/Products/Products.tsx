import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  productName: string;
  price: number;
}

const Products: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="product-container">
      <Table className="striped centered blue lighten-3">
        <TableCaption>A list of available products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Id</TableHead>
            <TableHead className="">Product name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            Object.values(products).map((p) => {
              return (
                <TableRow className="hover:text-teal-400">
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell className="">{p.productName}</TableCell>
                  <TableCell className="text-right">{p.price}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
