import "./ListItem.css";

export default function ListItem({
  id,
  title,
  itemIndex,
  onDelete,
  onToggle,
  completed,
}) {
  return (
    <div className="list-item">
      <div className="list-item-left">
        <input
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <p
          id="isComplete"
          className={completed ? "completed" : ""}
          onClick={() => onToggle(id)}
        >
          {title}
        </p>
      </div>
      <button onClick={() => onDelete(itemIndex)}>x</button>
    </div>
  );
}
