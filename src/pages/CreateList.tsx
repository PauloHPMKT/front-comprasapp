import React, { useState } from "react";
import { BaseInput } from "../components/BaseInput";
import { FaPlus } from "react-icons/fa";
import emptyList from "../assets/empty.webp";

interface Item {
  localId: number;
  name: string;
  quantity: string | number;
  price: string;
  isEditing: boolean;
  isEditingPrice?: boolean;
}

export function CreateList() {
  const listTitle = localStorage.getItem("listTitle");

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "1" });
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [draggedItem, setDraggedItem] = useState<{ id: number; x: number } | null>(null);


  const handleTouchStart = (e: React.TouchEvent, id: number) => {
    setTouchStartX(e.touches[0].clientX);
    setDraggedItem({ id, x: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent, id: number) => {
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;

    if (draggedItem?.id === id) {
      setDraggedItem({ ...draggedItem, x: deltaX });
    }
  };

  const handleTouchEnd = (id: number) => {
    if (draggedItem?.id === id && draggedItem.x > 100) {
      handleDelete(id);
    }
    setDraggedItem(null);
  };

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.localId !== id));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;

    setItems((prevItems) => [
      ...prevItems,
      {
        localId: prevItems.length + 1,
        name: newItem.name,
        quantity: Number(newItem.quantity),
        price: "",
        isEditing: false,
      },
    ]);
    setNewItem({ name: "", quantity: "1" });
  }

  const handleToggleFieldEdit = (id: number, field?: string) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.localId === id && field !== "price") {
          return { ...item, isEditing: true }
        }

        if (item.localId === id && field === "price") {
          return { ...item, isEditingPrice: true }
        }

        return item;
      });
    }
    );
  };

  const handleSetItem = (id: number, field: keyof Item, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.localId === id
          ? { ...item, [field]: value, isEditing: false, isEditingPrice: false }
          : item
      )
    );
  };

  return (
    <div className="h-full relative">
      <div className="text-start">
        <h1 className="text-2xl font-semibold">{listTitle}</h1>
        <p className="text-gray-500 text-[14px]">
          Insira os dados e preencha sua lista de compras
        </p>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2 pb-4 border-b-2 border-gray-300">
          <BaseInput
            type="text"
            placeholder="Nome do item"
            customStyle="w-full h-10"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <BaseInput
            type="text"
            placeholder="Quantidade"
            customStyle="w-[45%] h-10"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          />
          <button
            onClick={handleAddItem}
            className="bg-red-600 text-white rounded-lg px-6 w-fit h-10 mt-4"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex justify-center items-center mt-4 rounded-lg">
          {!items.length ? (
            <div className="flex flex-col mt-14 items-center justify-center gap-4 h-full">
              <img src={emptyList} alt="" className="w-39" />
              <h4 className="font-semibold text-[14px]">Nenhum item adicionado.</h4>
            </div>
          ) : (
          <ul className="flex flex-col gap-2 bg-slate-50 w-full">
            {items.map((item) => (
              <li
              key={item.localId}
              onTouchStart={(e) => handleTouchStart(e, item.localId)}
              onTouchMove={(e) => handleTouchMove(e, item.localId)}
              onTouchEnd={() => handleTouchEnd(item.localId)}
              style={{
                transform:
                  draggedItem?.id === item.localId
                    ? `translateX(${draggedItem.x}px)`
                    : "translateX(0)",
                transition: draggedItem?.id === item.localId ? "none" : "transform 0.2s ease",
              }}
                className="h-11 text-[14px] flex justify-between items-center bg-white rounded-lg px-2 py-4 shadow-sm"
              >
                <div
                  onClick={() => handleToggleFieldEdit(item.localId)}
                  className="flex justify-between items-center w-[80%]"
                >
                  <div className="flex items-center w-1/2">
                    {item.isEditing ? (
                      <BaseInput
                        type="text"
                        customStyle="w-full mt-0 h-8"
                        placeholder="Nome do item"
                        value={item.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setItems((prevItems) =>
                            prevItems.map((i) =>
                              i.localId === item.localId ? { ...i, name: newName } : i
                            )
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSetItem(item.localId, "name", e.currentTarget.value);
                          }
                        }}
                      />
                    ) : (
                      <span>
                        {item.name}
                      </span>
                    )}
                  </div>
                  <div className="pr-4">
                  {item.isEditing ? (
                      <BaseInput
                        type="text"
                        customStyle="mt-0 h-8 w-10"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = e.target.value;
                          setItems((prevItems) =>
                            prevItems.map((i) =>
                              i.localId === item.localId ? { ...i, quantity: newQuantity } : i
                            )
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSetItem(item.localId, "quantity", e.currentTarget.value);
                          }
                        }}
                      />
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {item.isEditing && item.price || item.isEditingPrice ? (
                      <BaseInput
                        type="text"
                        placeholder="preço"
                        customStyle="w-[55px] m-0 h-8"
                        value={item.price}
                        onChange={(e) => {
                          const price = e.target.value;
                          setItems((prevItems) =>
                            prevItems.map((i) =>
                              i.localId === item.localId ? { ...i, price } : i
                            )
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSetItem(item.localId, "price", e.currentTarget.value);
                          }
                        }}
                      />
                    ) : (
                      !item.price && (
                        <button
                          onClick={() => handleToggleFieldEdit(item.localId, "price")}
                          className="bg-red-700 flex items-center text-white rounded-lg px-2 w-fit h-8"
                        >
                          <FaPlus size={10} />
                          <p className="pl-1">R$</p>
                        </button>
                      )
                    )}
                    {item.price && (
                      <span
                        onClick={() => handleToggleFieldEdit(item.localId)}
                        className={`text-gray-800 text-[12px] font-semibold ${item.isEditing || item.isEditingPrice ? "hidden" : ""}`}
                      >
                        R$ {item.price}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
      <button className="bg-red-600 text-white rounded-lg px-6 w-full h-11 absolute bottom-0">
        Salvar lista
      </button>
    </div>
  );
}