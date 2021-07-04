import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("https://api.npoint.io/93bed93a99df4c91044e")
      .then((res) => res.json())
      .then((response) => setData(response.body.Recommendations));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      {/* <h1> React Toggle List Application </h1> */}

      {data.map((listData) => {
        return (
          <div key={listData.RestaurantName}>
            <h1>{listData.RestaurantName} </h1>
            {listData.menu.map((menu) => {
              return (
                <div key={menu.id}>
                  <ul>
                    <li> {menu.name + "-->"} </li>
                    {menu.type === "sectionheader"
                      ? menu.children.map((childEl) => {
                          return (
                            <div key={childEl.id}>
                              <ul>
                                <li>
                                  {" "}
                                  {childEl.type === "item" &&
                                  childEl.selected === 1
                                    ? childEl.name + "1-->-->"
                                    : null}{" "}
                                </li>
                                {childEl.children.map((child) => {
                                  return (
                                    <div key={child.id}>
                                      <ul>
                                        <li>
                                          {" "}
                                          {child.selected === 1
                                            ? child.name + "2-->-->-->"
                                            : null}{" "}
                                        </li>{" "}
                                        {child.selected === 1
                                          ? child.children.map((grandChild) => {
                                              return (
                                                <div key={grandChild.id}>
                                                  <ul>
                                                    <li>
                                                      {" "}
                                                      {grandChild.selected === 1
                                                        ? grandChild.name +
                                                          "3-->-->-->-->"
                                                        : null}{" "}
                                                    </li>{" "}
                                                    {grandChild.children.map(
                                                      (legendChild) => {
                                                        return (
                                                          <div
                                                            key={legendChild.id}
                                                          >
                                                            <ul>
                                                              <li>
                                                                {legendChild.selected ===
                                                                  1 &&
                                                                legendChild.length !==
                                                                  0
                                                                  ? legendChild.name +
                                                                    "==>"
                                                                  : null}
                                                              </li>
                                                            </ul>
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  </ul>
                                                </div>
                                              );
                                            })
                                          : null}
                                      </ul>
                                    </div>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })
                      : null}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
