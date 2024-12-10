import { useCartContext } from "../hooks/useCartContext";
import { addCart } from "../api/cartApi";
import { formatRupiah } from "../utils/formatCurrency";
import Badge from "./ui/Badge";
import Button from "./ui/Button/Button";

export default function Card({
  productId,
  imageURL,
  title,
  category,
  tags,
  price,
}) {
  const { setIsUpdate } = useCartContext();

  const addItem = async () => {
    try {
      await addCart(productId, 1);
      setIsUpdate(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow">
      <div className="relative">
        <img
          className="aspect-[4/3] rounded-md"
          src={
            imageURL ||
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
          }
          alt={`${title} image`}
        />
      </div>

      <div className="flex h-full flex-col gap-1">
        <h3 className="text-md font-bold">{title}</h3>
        <p className="text-sm">{category.name}</p>
        <div className="hidden flex-wrap gap-1 text-xs md:flex">
          {tags.map((tag) => (
            <Badge key={tag._id} size="sm">
              {tag.name}
            </Badge>
          ))}
        </div>
        <p className="text-md mt-2 font-bold">{formatRupiah(price)}</p>
        <div className="mt-4 flex h-full">
          <Button className="w-full self-end" size="sm" onClick={addItem}>
            <svg
              className="mr-2 size-4 shrink-0 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
