import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./App.css";
const initialState = {
  dragFrom: null,
  draggedTo: null,
  isDragging: false,
  firstOrder: [],
  changeOrder: [],
};
function App() {
  const [data, setData] = useState([]);
  const [dragAndDrop, setDragAndDrop] = useState(initialState);
  const getData = () => {
    fetch("https://api.npoint.io/93bed93a99df4c91044e")
      .then((res) => res.json())
      .then((response) => setData(response.body.Recommendations));
  };
  useEffect(() => {
    getData();
  }, []);

  const onDragStart = (e) => {
    const startPosition = Number(e.currentTarget.dataset.position);
    console.log(startPosition);
    setDragAndDrop({
      ...dragAndDrop,
      dragFrom: startPosition,
      isDragging: true,
      firstOrder: data,
    });
  };
  const onDrop = (e) => {
    setData(dragAndDrop.changeOrder);
    setDragAndDrop({
      ...dragAndDrop,
      dragFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragover = (e) => {
    e.preventDefault();

    let newList = dragAndDrop.firstOrder;
    let draggedFrom = dragAndDrop.dragFrom;
    let draggedTo = Number(e.currentTarget.dataset.position);
    let itemDragged = newList[draggedFrom];
    let leftOver = newList.filter((item, index) => index !== draggedFrom);
    newList = [
      ...leftOver.slice(0, draggedTo),
      itemDragged,
      ...leftOver.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        changeOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };
console.log(initialState)
  return (
    <div className="">
      {/* <h1> React Toggle List Application </h1> */}

      { data.length > 0 ?  data.map((listData, index) => {
        return (
          <details
            draggable="true"
            data-position={index}
            key={listData.RestaurantID}
            onDragStart={onDragStart}
            onDragOver={onDragover}
            onDrop={onDrop}
          >
         
                <summary>{listData.RestaurantName}</summary>
                <br />
             
              {listData.menu.map((menu) => {
                if (menu.type === "sectionheader") {
                  return (
                    <details
                      draggable="true"
                      data-position={menu.id}
                      key={menu.id}
                      onDragStart={onDragStart}
                      onDragover={onDragover}
                      onDrop={onDrop}
                       className="ml-20"
                    >
                                        <summary>{menu.name}</summary> 
                        {menu.children.map((child) => {
                          if (child.type === "item" && child.selected === 1) {
                            return (
                              <details
                                draggable="true"
                                draggable="true"
                                data-position={child.id}
                                key={child.id}
                                onDragStart={onDragStart}
                                onDragOver={onDragover}
                                onDrop={onDrop}
                                 className="ml-20"
                              >
                                
                                  <summary> {child.name} </summary>
                                  {child.children.map((grandChild) => {
                                    if (grandChild.selected === 1) {
                                      return (
                                        <details
                                          draggable="true"
                                          draggable="true"
                                          data-position={grandChild.id}
                                          key={grandChild.id}
                                          onDragStart={onDragStart}
                                          onDragOver={onDragover}
                                          onDrop={onDrop}
                                          className="ml-20"
                                        >
                                       
                                              <summary>
                                                
                                                {grandChild.name}
                                             </summary>{" "}
                                         
                                            {grandChild.children.map(
                                              (legendChild) => {
                                                if (
                                                  legendChild.selected === 1
                                                ) {
                                                  return (
                                                    <details draggable="true"
                                                    draggable="true"
                                                    data-position={legendChild.id}
                                                    key={legendChild.id}
                                                    onDragStart={onDragStart}
                                                    onDragOver={onDragover}
                                                    onDrop={onDrop}
                                                    className="ml-20"> <summary> {legendChild.name} </summary></details>
                                                  );
                                                }
                                              }
                                            )}
                                     
                                        </details>
                                      );
                                    }
                                  })}
                                
                              </details>
                            );
                          }
                        })}
                     
                     </details>
                  );
                }
              })}
           
          </details>
        );
      }): "..loading"}
    </div>
  );
}

export default App;
