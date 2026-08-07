import TaskList from "../components/TaskList"

export default function Home() {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

            <div className="max-w-5xl mx-auto p-6">

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Task Management App
                </h1>

                <TaskList />
            </div>

        </div>
    );
}