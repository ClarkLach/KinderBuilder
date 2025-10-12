import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import './words.css'

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.value});
  
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  listeners.onClick = () => {
    const index = props.sentence.indexOf(props.value); // Get the index of the word
    props.onWordClick(index);
    console.log(props.sentence);
  }

  attributes.className = "word in-sentence"


  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.value}
    </div>
  );
}