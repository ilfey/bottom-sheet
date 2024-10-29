import './App.css'
import {BottomSheet} from "./bottom-sheet/BottomSheet.tsx";
import {useState} from "react";

function App() {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

  return (
    <>
        <button onClick={open}>Open bottom sheet</button>

        <BottomSheet isOpen={isOpen} onClose={close}>
            <button onClick={close}>Close bottom sheet</button>
        </BottomSheet>
    </>
  )
}

export default App
