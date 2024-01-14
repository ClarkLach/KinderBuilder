import "./words.css";

// className here shows correct style when word is being dragged with DragOverlay
function Item({value}) {
    return (
      <div className="word">
        {value}
      </div>
    );
  };
  
  export default Item;