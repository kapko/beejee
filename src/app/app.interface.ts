export interface PostDataInterface {
  text: string;
  email: string;
  image: string;
  username: string;
}

export interface Post {
  image_path: string;
  username: string;
  email: string;
  text: string;
  id: number;
  status: number;
}
