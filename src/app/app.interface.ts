export interface PostDataInterface {
  text: string;
  email: string;
  image: string;
  username: string;
  status: number;
}

export interface Post {
  image_path: string;
  username: string;
  email: string;
  text: string;
  id: number;
  status: number;
}
