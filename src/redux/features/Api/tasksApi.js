import baseApi from "./baseApi";

const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (apiName) => `${apiName}`,
            providesTags: <div></div>
        }),
        updateTasks: builder.mutation({
            query: ({ apiName, data }) => ({
                url: `${apiName}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['tasks']
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: "task",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ['tasks']
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetTasksQuery, useUpdateTasksMutation, useAddTaskMutation, useDeleteTaskMutation } = taskApi;