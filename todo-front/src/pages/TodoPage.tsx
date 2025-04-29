import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "../features/task/taskApi";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const TaskSchema = Yup.object().shape({
  title: Yup.string().min(1, "Can't be empty").required("Required"),
});

const TodoPage = () => {
  const dispatch = useDispatch();
  const { data: tasks = [], refetch } = useGetTasksQuery();

  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [completeTask] = useCompleteTaskMutation();

  useEffect(() => {
    refetch();
  }, [addTask, deleteTask, completeTask, refetch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container py-4">
      <div
        className="bg-light p-4 rounded shadow-sm sticky-top d-flex justify-content-between align-items-center"
        style={{ top: 0, zIndex: 1030 }}
      >
        <h2 className="mb-0">📝 Todo List</h2>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          🚪 Logout
        </button>
      </div>

      <div className="bg-light p-4 rounded shadow-sm mt-3">
        <Formik
          initialValues={{ title: "" }}
          validationSchema={TaskSchema}
          onSubmit={async (values, { resetForm }) => {
            await addTask({ title: values.title }).unwrap();
            refetch();
            resetForm();
          }}
        >
          {() => (
            <Form className="row g-3 align-items-center justify-content-center">
              <div className="col-12 col-md-8">
                <Field
                  name="title"
                  className="form-control form-control-lg"
                  placeholder="Enter your task here..."
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="col-12 col-md-4">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  ➕ Add Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center px-4 py-3"
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              backgroundColor: task.completed ? "#e9ecef" : "#fff",
            }}
          >
            <span className="fs-5">{task.title}</span>
            <div>
              {!task.completed && (
                <button
                  className="btn btn-outline-success btn-sm me-2"
                  onClick={async () => {
                    await completeTask({ id: task.id });
                    refetch();
                  }}
                >
                  ✅ Complete
                </button>
              )}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={async () => {
                  await deleteTask({ id: task.id });
                  refetch();
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoPage;
