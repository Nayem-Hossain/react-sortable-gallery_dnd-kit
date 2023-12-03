import "./App.css";
import { useEffect, useState } from "react";
import { IoCheckbox } from "react-icons/io5";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./components/SortableItem";

function App() {
  const [galleryImageList, setGalleryImageList] = useState([]);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [activeId, setActiveId] = useState(false);
  // console.log(galleryImageList);

  useEffect(() => {
    axios
      .get("../imageGallery.json")
      .then((res) => setGalleryImageList(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSelectCheckBox = (id) => {
    console.log("handleSelectCheckBox", id);
    const updatedGalleryImageList = galleryImageList.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setGalleryImageList(updatedGalleryImageList);
    const selectedImage = updatedGalleryImageList.filter(
      (item) => item.selected
    );
    setSelectedImageCount(selectedImage.length);
    console.log(updatedGalleryImageList);
  };

  const handleDeleteSelectedItems = () => {
    const updatedGalleryImageList = galleryImageList.filter(
      (item) => !item.selected
    );
    setGalleryImageList(updatedGalleryImageList);
    setSelectedImageCount(0); // Reset selected image count
  };

  const handleOnDragEnd = (event) => {
    const { active, over } = event;
    console.log("onDragEnd :", active, over);

    if (active.id !== over.id) {
      setGalleryImageList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="h-screen">
      <div className="mx-4 border-b-2 border-gray-400 py-4">
        {selectedImageCount <= 0 ? (
          <h1 className="text-2xl font-bold">Gallery</h1>
        ) : (
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <IoCheckbox className="text-blue-500" /> {selectedImageCount} File
              Selected
            </div>
            <div>
              <button
                onClick={handleDeleteSelectedItems}
                className="btn-delete"
              >
                Delete Files
              </button>
            </div>
          </div>
        )}
      </div>

      <DndContext onDragEnd={handleOnDragEnd}>
        <SortableContext items={galleryImageList}>
          <div className="absolute grid grid-cols-5 mx-4 my-4 gap-10">
            {galleryImageList.map((item, index) => {
              return (
                <SortableItem
                  key={item.id}
                  item={item}
                  index={index}
                  handleSelectCheckBox={handleSelectCheckBox}
                />
              );
            })}
          </div>
        </SortableContext>
        {/* <DragOverlay>{activeId ? <Item id={activeId} /> : false}</DragOverlay> */}
      </DndContext>
    </div>
  );
}

export default App;
