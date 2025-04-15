import { useState } from "react"
import emptyMarket from "../assets/empty-market.png"
import { BaseInput } from "../components/BaseInput"
import { useToastify } from "../hooks/useToastify"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigation = useNavigate()
  const [title, setTitle] = useState("")
  const [titleBox, setTitleBox] = useState(false)

  const handleKeepListTitle = () => {
    if (!Text) {
      useToastify("error", "Adicionar um título a lista...")
    }
    localStorage.setItem("listTitle", title)
    navigation("/app/list/add")
  }

  return (
    <>
      <div className="h-full">
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <figure className="flex justify-center items-center flex-col gap-2">
            <img src={emptyMarket} alt="Lista vazia" className="w-[240px] rounded-2xl" />
            <figcaption className="text-gray-400">Nenhuma lista encontrada</figcaption>
          </figure>
          <div>
            <button
              onClick={() => setTitleBox(true)}
              className="bg-red-600 text-white rounded-lg px-4 py-2 cursor-pointer"
            >
              Ir as compras
            </button>
          </div>
        </div>
        {titleBox && (
          <div className="fixed bg-[rgba(0,0,0,0.3)] p-4 top-1/2 left-1/2 -translate-1/2 w-full h-full flex justify-center items-center z-10">
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center justify-center w-[320px] shadow-2xl">
              <h3 className="mt-4 font-semibold">Adicione um título à lista</h3>
              <p className="text-center text-gray-400">Para melhor organização das suas listas de compras, adicione um título a cada uma delas.</p>
              <div className="flex items-center justify-center gap-4">
                <BaseInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título da lista"
                />
                <button onClick={handleKeepListTitle} className="bg-red-600 w-fit text-white rounded-lg mt-4 px-4 py-2 h-11 cursor-pointer">
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}