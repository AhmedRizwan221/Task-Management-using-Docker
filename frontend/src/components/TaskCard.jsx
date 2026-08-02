import { useState } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { updateTask } from "../store/task/taskSlice";

export default function TaskCard() {
    const [task, setTask] = useState("");
    const [description, setDiscription] = useState("");
    const [error, setError] = useState("");

    const { taskId } = useParams();
    const dispatch = useDispatch();


    const submitTask = async (e) => {
        e.preventDefault();

        try {
            await dispatch(updateTask({
                taskId, data: {
                    task,
                    description
                }
            }))
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all">
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Edit Task</h1>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                        {error}
                    </p>
                </div>
            )}

            <form onSubmit={submitTask} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Task ..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm sm:text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        placeholder="Enter Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-3.5 py-2.5 text-sm sm:text-base text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-y"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full sm:w-auto self-end px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm sm:text-base rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all cursor-pointer"
                >
                    Update Task
                </button>
            </form>
        </div>
    )
}