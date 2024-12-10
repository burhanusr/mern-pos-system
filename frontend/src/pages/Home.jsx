import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Badge from "../components/ui/Badge";
import SideCart from "../components/SideCart";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { getAllCategories } from "../api/categoryApi";
import { getAllTags } from "../api/tagsApi";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [query, setQuery] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await getAllProducts(query);
        const categories = await getAllCategories();
        const tags = await getAllTags();

        setProducts(productsRes.data);
        setCategories(categories.data);
        setTags(tags.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
      <Sidebar categories={categories} setCategory={setQuery} />
      <div className="xl:pl-56">
        <main
          className={`mx-auto max-w-3xl py-8 xl:ml-0 xl:max-w-none xl:px-4 ${auth && "xl:mr-96"}`}
        >
          <div className="flex flex-wrap gap-1 text-xs md:text-sm">
            {tags &&
              tags.map((tag) => (
                <Badge
                  key={tag._id}
                  size="sm"
                  onClick={() => setQuery({ tag: { query: tag.name } })}
                >
                  {tag.name}
                </Badge>
              ))}
          </div>

          <div
            className={`grid grid-cols-2 gap-4 pt-6 ${auth ? "md:grid-cols-3" : "md:grid-cols-5"}`}
          >
            {products &&
              products.map((product) => (
                <Card
                  key={product._id}
                  productId={product._id}
                  imageURL={product.imageUrl}
                  title={product.name}
                  category={product.category}
                  tags={product.tags}
                  price={product.price}
                />
              ))}
          </div>
          {auth && <SideCart />}
        </main>
      </div>
    </div>
  );
}
