import React from 'react'

function Rest() {
    return (
        <div>
            <h1> Restarant Application </h1>
        </div>
    )
}

export default Rest
{
    data.map((post) => {
        return (    
            <div>
              <Accordion>
              <AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel1a-content"
id="panel1a-header"
>
                <p>{post.RestaurantName}</p>
                </AccordionSummary>
                {
                    post.menu.map((menu) =>{
                        if(menu.type == "sectionheader")
                        {
                            return (
                                <div>
                                  <Accordion>
                                  <AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls={menu.id}
id={menu.id}
>
                                  <p>----{menu.name}</p>
                                  </AccordionSummary>
                                   {
                                    menu.children.map((child) => 
                                    {
                                        if(child.type=="item" && child.selected == 1)
                                        {
                                            return (
                                                <div>
                                                    <p>----------{child.name}</p> 
                                                    {
                                                        child.children.map((child1) =>{
                                                            if(child1.selected == 1)
                                                            {
                                                               return (<div>
                                                                    <p>---------------------{child1.name}</p> 
                                                                    {
                                                                        child1.children.map((child2) => {
                                                                            if(child2.selected ==1) {
                                                                                return <p>------------------------------{child2.name}</p>
                                                                            }
                                                                        })
                                                                    }
                                                               </div>)  
                                                            }
                                                        })
                                                    }
                                                </div>
                                            ) 
                                        }
                                    } )
                                }
                                </Accordion>
                                </div>
                            )
                            
                        }
                    } )
                }
                </Accordion>
            </div>
        )
    })
}