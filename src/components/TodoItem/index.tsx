// src/components/TodoItem/index.tsx
export default function TodoItem({
  task,
  completed,
}: {
  task: string;
  completed: boolean;
}) {
  return (
    // completed 라는 클래스가 있으면
    // CSS를 변경하는 놈
    <li className={completed ? "completed" : ""}>
      <input type="checkbox" checked={completed} disabled={completed} />
      <span>{task}</span>
      <button disabled={completed}>수정</button>
    </li>
  );
}
