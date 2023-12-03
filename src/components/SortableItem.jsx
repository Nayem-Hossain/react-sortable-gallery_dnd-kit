import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ item, index, handleSelectCheckBox}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`image-container border rounded-2xl overflow-hidden ${
        index === 0 && "col-span-2 row-span-2"
      }`}
    >
      <img src={item.img} alt="" className="border rounded-2xl" />
      <div>
        <div className="image-select-overlay"></div>
        <input
          onChange={() => handleSelectCheckBox(item.id)}
          checked={item.selected}
          type="checkbox"
          name=""
          id=""
          className="image-checkbox"
        />
      </div>
    </div>
  );
};

export default SortableItem;
