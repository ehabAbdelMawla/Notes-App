import { useCallback, useState } from "react";
import AddItem from "./Components/AddItem";
import Note from "./Components/Note";
import { MuuriComponent } from "muuri-react";
import { getData, updateLocalStorageData, muuriLayout } from "./utils/methods";
import "./App.css";
function App() {
  const [data, setData] = useState(getData());

  const updateData = useCallback(() => {
    setData(getData());
  }, []);

  const reorder = (newItemsOrder) => {
    const items = newItemsOrder
      .map((item) => item._component.key)
      .map((id) => data.find((obj) => obj.id === +id));
    setData(items);
    updateLocalStorageData(items);
  };

  return (
    <div className="App">
      <h1 data-aos="fade-up">My Notes</h1>
      <AddItem updateParentData={updateData} />

      <MuuriComponent
        dragEnabled
        layout={muuriLayout}
        onDragEnd={(e) => {
          reorder(e.getGrid().getItems());
        }}
      >
        {data.map((item, index) => (
          <Note
            id={item.id}
            key={item.id}
            {...{ item, updateData }}
            index={index}
          />
        ))}
      </MuuriComponent>

      {!!!data.length && (
        <p data-aos="zoom-in" className="empty-list-pragraph">
          No Notes To Show
        </p>
      )}
    </div>
  );
}

export default App;
