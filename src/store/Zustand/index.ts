import { create } from "zustand";

interface UiStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
}

export interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  getPostById: (id: string) => Post | undefined;
  addPost: (post: Post) => void;
  editPost: (post: Post) => void;
  deletePost: (id: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
  error: null,
  setError(value) {
    return set({ error: value });
  },
}));

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [
    {
      id: "6",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
    },
    {
      id: "7",
      title: "magnam facilis autem",
      body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
    },
    {
      id: "8",
      title: "dolorem dolore est ipsam",
      body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    },
    {
      id: "9",
      title: "nesciunt iure omnis dolorem tempora et accusantium",
      body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
    },
  ],
  getPostById: (id) => get().posts.find((p) => p.id === id),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  editPost(post) {
    return set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    }));
  },
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}));
