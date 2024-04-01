import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function clamp(min, value, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function draggable(el) {
  // if(!el.querySelector(".header")){
  // 	return;
  // }
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  function dragMouseDown(event) {
    event = event || window.event;
    event.preventDefault();
    console.log({ event });
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragEl;
    document.onmousemove = elDrag;
  }

  function elDrag(event) {
    event = event || window.event;
    event.preventDefault();
    // console.log({event});
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    const { width, height } = el.getBoundingClientRect();
    el.style.top = clamp(
      0,
      (el.offsetTop - pos2),
      window.innerHeight - height - 2
    ) + "px";
    el.style.left = clamp(
      0,
      (el.offsetLeft - pos1),
      window.innerWidth - width - 2
    ) + "px";
  }

  function closeDragEl() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  el.querySelector(".move").onmousedown = dragMouseDown;
}


function makeResizable(element, minW = 100, minH = 100, size = 20)
{
    const top = document.createElement('div');
    top.style.width = '100%';
    top.style.height = size + 'px';
    top.style.backgroundColor = 'transparent';
    top.style.position = 'absolute';
    top.style.top = - (size/2) + 'px';
    top.style.left = '0px';
    top.style.cursor = 'n-resize';

    top.addEventListener('mousedown',resizeYNegative())

    element.appendChild(top);

    const bottom = document.createElement('div');
    bottom.style.width = '100%';
    bottom.style.height = size + 'px';
    bottom.style.backgroundColor = 'transparent';
    bottom.style.position = 'absolute';
    bottom.style.bottom = - (size/2) + 'px';
    bottom.style.left = '0px';
    bottom.style.cursor = 'n-resize';

    bottom.addEventListener('mousedown',resizeYPositive())

    element.appendChild(bottom);

    const left = document.createElement('div');
    left.style.width = size + 'px';
    left.style.height = '100%';
    left.style.backgroundColor = 'transparent';
    left.style.position = 'absolute';
    left.style.top = '0px';
    left.style.left = - (size/2) + 'px';
    left.style.cursor = 'e-resize';

    left.addEventListener('mousedown',resizeXNegative())

    element.appendChild(left);

    const right = document.createElement('div');
    right.style.width = size + 'px';
    right.style.height = '100%';
    right.style.backgroundColor = 'transparent';
    right.style.position = 'absolute';
    right.style.top = '0px';
    right.style.right = - (size/2) + 'px';
    right.style.cursor = 'e-resize';

    right.addEventListener('mousedown',resizeXPositive())

    element.appendChild(right);


    const corner1 = document.createElement('div');
    corner1.style.width = size + 'px';
    corner1.style.height = size + 'px';
    corner1.style.backgroundColor = 'transparent';
    corner1.style.position = 'absolute';
    corner1.style.top = - (size/2) + 'px';
    corner1.style.left = - (size/2) + 'px';
    corner1.style.cursor = 'nw-resize';

    corner1.addEventListener('mousedown',resizeXNegative())
    corner1.addEventListener('mousedown',resizeYNegative())
    
    element.appendChild(corner1);

    const corner2 = document.createElement('div');
    corner2.style.width = size + 'px';
    corner2.style.height = size + 'px';
    corner2.style.backgroundColor = 'transparent';
    corner2.style.position = 'absolute';
    corner2.style.top = - (size/2) + 'px';
    corner2.style.right = - (size/2) + 'px';
    corner2.style.cursor = 'ne-resize';

    corner2.addEventListener('mousedown',resizeXPositive())
    corner2.addEventListener('mousedown',resizeYNegative())

    element.appendChild(corner2);

    const corner3 = document.createElement('div');
    corner3.style.width = size + 'px';
    corner3.style.height = size + 'px';
    corner3.style.backgroundColor = 'transparent';
    corner3.style.position = 'absolute';
    corner3.style.bottom = - (size/2) + 'px';
    corner3.style.left = - (size/2) + 'px';
    corner3.style.cursor = 'sw-resize';

    corner3.addEventListener('mousedown',resizeXNegative())
    corner3.addEventListener('mousedown',resizeYPositive())

    element.appendChild(corner3);

    const corner4 = document.createElement('div');
    corner4.style.width = size + 'px';
    corner4.style.height = size + 'px';
    corner4.style.backgroundColor = 'transparent';
    corner4.style.position = 'absolute';
    corner4.style.bottom = - (size/2) + 'px';
    corner4.style.right = - (size/2) + 'px';
    corner4.style.cursor = 'se-resize';

    corner4.addEventListener('mousedown',resizeXPositive())
    corner4.addEventListener('mousedown',resizeYPositive())

    element.appendChild(corner4);
    
    function get_int_style(key)
    {
        return parseInt(window.getComputedStyle(element).getPropertyValue(key));
    }

    function resizeXPositive()
    {
        let offsetX
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientX} = e;
            offsetX = clientX - element.offsetLeft - get_int_style('width');
            document.addEventListener('mouseup', closeDragElement)
            document.addEventListener('mousemove', elementDrag)
          }
        
          function elementDrag(e) {
                const {clientX} = e;
                let x = clientX - element.offsetLeft - offsetX
                if(x < minW) x = minW;
                element.style.width =  x + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeYPositive()
    {
        let offsetY
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientY} = e;
            offsetY = clientY - element.offsetTop - get_int_style('height');
    
            document.addEventListener('mouseup',closeDragElement)
            document.addEventListener('mousemove',elementDrag)
          }
        
          function elementDrag(e) {
                const {clientY} = e;
                let y =  clientY - element.offsetTop - offsetY;
                if(y < minH) y = minH;
                element.style.height = y + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeXNegative()
    {
        let offsetX
        let startX
        let startW
        let maxX
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientX} = e;
            startX = get_int_style('left')
            startW = get_int_style('width')
            offsetX = clientX - startX;
            maxX = startX + startW - minW
    
            document.addEventListener('mouseup',closeDragElement)
            document.addEventListener('mousemove',elementDrag)
          }
        
          function elementDrag(e) {
                const {clientX} = e;
                let x = clientX - offsetX
                let w = startW + startX - x
                if(w < minW) w = minW;
                if(x > maxX) x = maxX;
                element.style.left = x + 'px';
                element.style.width = w + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeYNegative()
    {
        let offsetY
        let startY
        let startH
        let maxY
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientY} = e;
            startY = get_int_style('top')
            startH = get_int_style('height')
            offsetY = clientY - startY;
            maxY = startY + startH - minH 
    
            document.addEventListener('mouseup',closeDragElement,false)
            document.addEventListener('mousemove',elementDrag,false)
          }
        
          function elementDrag(e) {
                const {clientY} = e;
                let y =  clientY - offsetY
                let h = startH + startY - y
                if(h < minH) h = minH;
                if(y > maxY) y = maxY;
                element.style.top = y + 'px';
                element.style.height = h + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }
}

const StyleEditor = ({ styleTemplate, setStyleTemplate }) => {

  const updateValue = (event, control) => {
    control.value = event.target.value;
    setStyleTemplate([...styleTemplate]);
  };

  return (
    <div className="style-config">
      {styleTemplate.map((entry) => {
        return (
          <div className="block">
            <h4>{entry.title}</h4>
            <div className="controls">
              {entry.controls.map((control) => {
                return (
                  <div className="control">
                    <label>{control.label}</label>
                    <div className="control-wrapper">
                    {control.type === "number" && (
                      <>
                        <input type="number" value={control.value} onChange={(e) => updateValue(e, control)} />
                        {control.unit && <span>{control.unit}</span>}
                      </>
                    )}
                    {control.type === "color" && (
                      <input type="color" value={control.value} onChange={(e) => updateValue(e, control)} />
                    )}
                    {control.type === "select" && (
                      <select value={control.value} onChange={(e) => updateValue(e, control)}>
                        {control.options.map((option) => {
                          return (
                            <option value={option}>{option}</option>
                          )
                        })}
                      </select>
                    )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Element = ({ name, styleTemplate, setSelectedElement, deleteElementFromBoard }) => {

  console.log({ styleTemplate });

  const ref = useRef(null);

  useEffect(() => {
    ref.current && draggable(ref.current);
    makeResizable(ref.current);
  }, []);

  const styles = useMemo(() => {
    const style = {};

    styleTemplate.forEach((entry) => {
      entry.controls.forEach((control) => {
        style[control.cssProperty] = control.value + (control.unit || "");
      });
    });

    return style;
  });

  return (
    <div className="element-wrapper" ref={ref}>
      <div className="controls">
        <button className="move">
          <i className="fa fa-arrows-alt"></i>
        </button>
        <button className="lock">
          <i className="fa fa-lock"></i>
        </button>
        <button className="delete" onClick={()=>deleteElementFromBoard(name)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
      <div style={styles} onClick={()=>setSelectedElement(name)} className="element"></div>
    </div>
  )
};

const TextElement = ({ styleTemplate }) => {

  console.log({ styleTemplate });

  const ref = useRef(null);

  useEffect(() => {
    ref.current && draggable(ref.current);
  }, []);

  const styles = useMemo(() => {
    const style = {};

    styleTemplate.forEach((entry) => {
      entry.controls.forEach((control) => {
        style[control.cssProperty] = control.value + (control.unit || "");
      });
    });

    return style;
  });

  return (
    <div className="element-wrapper" ref={ref}>
      {/* <div className="controls">
        <div className="move">M</div>
      </div> */}
      <div style={styles} className="move element" contentEditable>
      </div>
    </div>
  )
};



const ElementsList = ({addElementToBoard}) => {

  const handleClick = (e) => {
    const type = e.target.getAttribute("data-element");
    addElementToBoard(type);
  };

  return (
    <div className="element-list">
      <div className="element" data-element="square" onClick={handleClick}>
        <div className="icon icon-square"></div>
        <div className="label">Square</div>
      </div>
      <div className="element" data-element="rectangle" onClick={handleClick}>
        <div className="icon icon-rectangle"></div>
        <div className="label">Rectangle</div>        
      </div>
      <div className="element" data-element="circle" onClick={handleClick}>
        <div className="icon icon-circle"></div>
        <div className="label">Circle</div>   
      </div>
      <div className="element" data-element="circle" onClick={handleClick}>
        <div className="icon icon-circle"></div>
        <div className="label">X Line</div>   
      </div>
      <div className="element" data-element="circle" onClick={handleClick}>
        <div className="icon icon-circle"></div>
        <div className="label">Y Line</div>   
      </div>
      <div className="element" data-element="text" onClick={handleClick}>
        <div className="icon icon-text">
          <i className="fa fa-font"></i>
        </div>
        <div className="label">Text</div>           
      </div>
      <div className="element" data-element="image" onClick={handleClick}>
        <div className="icon icon-text">
          <i className="fa fa-image"></i>
        </div>
        <div className="label">Image</div>         
      </div>
    </div>
  );


};


const __styleTemplate =[
  {
    title: "Appearance",
    controls: [
      {
        label: "Background",
        cssProperty: "background",
        type: "color",
        defaultValue: "#fff",
        value: "#fff"
      },
      {
        label: "Curve border",
        cssProperty: "borderRadius",
        type: "number",
        defaultValue: "0",
        unit: "px",
        value: "#fff"
      },
      {
        label: "Border",
        cssProperty: "border-width",
        type: "number",
        defaultValue: "1",
        unit: "px",
        value: "1"
      },
      {
        label: "Border",
        cssProperty: "border-color",
        type: "color",
        defaultValue: "#ddd",
        value: "#ddd"
      },
      {
        label: "Border",
        cssProperty: "border-style",
        type: "select",
        defaultValue: "solid",
        value: "solid",
        options: ["solid", "dashed", "dotted", "none"]
      },
    ]
  },
  {
    title: "Dimmension",
    controls: [
      // {
      //   label: "Width",
      //   cssProperty: "width",
      //   type: "number",
      //   defaultValue: "100",
      //   value: "100",
      //   unit:"px"
      // },
      // {
      //   label: "Height",
      //   cssProperty: "height",
      //   type: "number",
      //   defaultValue: "100",
      //   value: "100",
      //   unit:"px"
      // },
    ]
  }
];

const App = () => {


  const [elements, setElements] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);

  const addElementToBoard = (type) => {
    debugger;
    const data = {...elements};
    const key = "" + (+new Date());
    data[key] = {
      type,
      styleTemplate: JSON.parse(JSON.stringify(__styleTemplate))
    }
    setElements(data);
  };

  const deleteElementFromBoard = (key) => {
    const data = {...elements};
    delete data[key];
    if(selectedElement === key){
      setSelectedElement(null);
    }
    setElements(data);
  };

  const styleTemplate = selectedElement && elements[selectedElement].styleTemplate;

  const setStyleTemplate = (value) => {
    const data = {...elements};
    data[selectedElement] = {
      ...data[selectedElement],
      styleTemplate: value
    }
    setElements(data);
  }

  const width = 800;
  const height = 480;

  const gridOutlineWidth = 20;

  const exportToImage = () => {
    window.html2canvas(document.querySelector(".board")).then(function (canvas) {
      var anchorTag = document.createElement("a");
      anchorTag.download = "filename.jpg";
      anchorTag.href = canvas.toDataURL();
      anchorTag.target = '_blank';
      anchorTag.click();
    });
  }

  

  return (
    <div className="app">
      <header>
        <div className="container">
          <div className="logo">Logo</div>
          <div className="controls">
            <button onClick={exportToImage}>Export</button>
          </div>
        </div>
      </header>

      <div className="app-container">
        <aside>
          <ElementsList addElementToBoard={addElementToBoard}/>
        </aside>
        <main>

          <div className="board">
            <div className="grid-outline">
              {new Array(width/gridOutlineWidth).fill(0).map((i,index) => (
                index !== 0 ? <div className="y" style={{
                  left: `${ index*gridOutlineWidth}px`
                }}></div> : null                
              ))}
              {new Array(height/gridOutlineWidth).fill(0).map((i,index) => (
                index !== 0 ? <div className="x" style={{
                  top: `${ index*gridOutlineWidth}px`
                }}></div> : null          
              ))}
            </div>
            {Object.entries(elements).map(([key, element])=>{
              return (
                <Element 
                  key={key} 
                  name={key} 
                  styleTemplate={element.styleTemplate} 
                  setSelectedElement={setSelectedElement} 
                  deleteElementFromBoard={deleteElementFromBoard}
                />
              );
            })}
            {/* <TextElement styleTemplate={styleTemplate} /> */}
          </div>
        </main>
        <aside>
          {selectedElement && (
            <StyleEditor {...({ styleTemplate, setStyleTemplate })} />
          )}
        </aside>
      </div>
    </div>
  );
};

export default App;