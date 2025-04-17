import { useEffect, useState } from "react";
import EditableImage from '../../../components/layout/EditableImage/EditableImage';
import MenuItemPriceProps from '../../../components/layout/menuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [price, setPrice] = useState(menuItem?.price || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image,
          name,
          description,
          price,
          extraIngredientPrices,
          sizes,
          category
        })
      }
      className='mt-8 max-w-2xl mx-auto'
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>

        <div className='grow'>
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            required
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={ev => setCategory(ev.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories?.length > 0 &&
              categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label  className=" grid "> 

              Base price
          <input
           
            type="number"
            value={price}
            onChange={ev => setPrice(ev.target.value)}
            required
            min="0"
            step="0.01"
            />
            </label>

          <MenuItemPriceProps
            name={'Sizes'}
            addLable={'Add item size'}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={'Extra ingredients'}
            addLable={'Add ingredients prices'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button type="submit" className="button mt-4">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}