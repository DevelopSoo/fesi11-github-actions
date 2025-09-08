import Product from "../molecules/Product";

export default function Products({
  data,
}: {
  data: {
    title: string;
    description: string;
  }[];
}) {
  // 여기서 요청하면 props 받는게 적어지지 않나?
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Product
          key={item.title}
          title={item.title}
          content={item.description}
        />
      ))}
    </div>
  );
}
