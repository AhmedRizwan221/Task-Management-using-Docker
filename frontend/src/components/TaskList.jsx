import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, deleteTask, toggleTaskStatus } from "../store/task/taskSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { tasks = [], error, status } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(id));
        }
    };


    // Toggle pending <-> completed
    const handleToggleStatus = (taskId, currentStatus) => {

        const newStatus =
            currentStatus === "pending"
                ? "completed"
                : "pending";

        // console.log(taskId, newStatus);

        dispatch(
            toggleTaskStatus({
                taskId,
                status: newStatus
            }, [dispatch])
        );
    };


    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Task List
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage and track your daily tasks
                    </p>
                </div>


                <button
                    onClick={() => navigate("/addTask")}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-all cursor-pointer shadow-sm"
                >
                    + Create Task
                </button>

            </div>



            {status === "loading" && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}



            {status === "failed" && error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}



            {status === "succeeded" && tasks.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">

                    <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                        No tasks found.
                    </p>

                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                        Get started by creating a new task.
                    </p>

                </div>
            )}




            <div className="grid grid-cols-1 gap-4">

                {tasks.map((taskItem) => {

                    const taskId = taskItem._id || taskItem.id;


                    // Using status from database
                    const isCompleted = taskItem.status === "completed";


                    return (

                        <div
                            key={taskId}
                            className={`p-4 sm:p-5 rounded-xl border bg-white dark:bg-gray-800 transition-all shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isCompleted
                                    ? "border-green-200 dark:border-green-900/50 bg-green-50/30 dark:bg-green-950/10"
                                    : "border-gray-100 dark:border-gray-700"
                                }`}
                        >



                            <div className="flex-1 min-w-0">

                                <div className="flex items-center gap-2 mb-1">

                                    <h3
                                        className={`text-base sm:text-lg font-semibold truncate ${isCompleted
                                                ? "line-through text-gray-400 dark:text-gray-500"
                                                : "text-gray-800 dark:text-white"
                                            }`}
                                    >
                                        {taskItem.task}
                                    </h3>



                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${isCompleted
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                                            }`}
                                    >
                                        {isCompleted ? "Completed" : "Pending"}
                                    </span>

                                </div>



                                {taskItem.description && (

                                    <p
                                        className={`text-sm line-clamp-2 ${isCompleted
                                                ? "line-through text-gray-400 dark:text-gray-500"
                                                : "text-gray-600 dark:text-gray-300"
                                            }`}
                                    >
                                        {taskItem.description}
                                    </p>

                                )}

                            </div>





                            <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700 shrink-0">


                                <button
                                    onClick={() =>
                                        handleToggleStatus(
                                            taskId,
                                            taskItem.status
                                        )
                                    }
                                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${isCompleted
                                            ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                >
                                    {isCompleted
                                        ? "Mark Incomplete"
                                        : "Mark Complete"}
                                </button>



                                <button
                                    onClick={() => navigate(`/editTask/${taskId}`)}
                                    className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all cursor-pointer"
                                >
                                    Edit
                                </button>



                                <button
                                    onClick={() => handleDelete(taskId)}
                                    className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all cursor-pointer"
                                >
                                    Delete
                                </button>


                            </div>


                        </div>

                    );

                })}

            </div>

        </div>
    );
}