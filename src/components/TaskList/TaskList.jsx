import ListItem from "../ListItem/ListItem";
import "./TaskList.css";

export default function TaskList({
  error,
  isLoaded,
  tasks,
  deleteTask,
  toggleStatus,
}) {
  if (error) return <p className="empty-todo">{error} Error</p>;
  if (!isLoaded) return <p className="empty-todo">Loading Tasks...</p>;
  if (tasks?.length === 0)
    return (
      <p className="empty-todo">Looks like you're absolutely free today!</p>
    );
  else
    return (
      <>
        {tasks?.map((task, index) => (
          <ListItem
            id={task.id}
            title={task.title}
            key={index}
            onDelete={deleteTask}
            onToggle={toggleStatus}
            itemIndex={index}
            completed={task.completed}
          />
        ))}
      </>
    );
}
