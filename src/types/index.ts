export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  rating: string;
  year: number;
  duration: string;
  genre: string[];
  cast: string[];
  director: string;
  trailer?: string;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  myList: string[];
}

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}