/* eslint-disable react-hooks/exhaustive-deps */
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchPosts, PostData } from "./store/Api/ReactQuery";
import type { Post } from "./store/Zustand";
import toast from "react-hot-toast";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
const Posts = () => {
  const { data: posts, error } = useSuspenseQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) =>
      PostData<void, void>(`http://localhost:3000/posts/${id}`, undefined, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      await qc.invalidateQueries();
      toast.success("Post Deleted Successfully");
    },
    onError: () => toast.error("Some Thing Went Wrong "),
  });
  function handleEdit(post: Post) {
    console.log(post);
  }

  function handleDelete(post: Post): void {
    mutation.mutate(post.id);
  }

  if (error) return <Error error={error.message} />;

  return (
    <div>
      Posts
      {mutation.isPending ? (
        <div className="mt-2">
          <Loader loading={true} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Body
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts &&
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {post.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.title}
                      </td>
                      <td className="px-6 py-4  text-sm text-gray-500">
                        {post.body}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-yellow-600 hover:text-white mr-4"
                          onClick={() => {
                            handleEdit(post);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-300 hover:text-white"
                          onClick={() => handleDelete(post)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
