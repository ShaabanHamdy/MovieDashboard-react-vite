export interface Movie {
  _id?: string;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  movieImage: { path: string }[];
}
export const initialMovie: Movie = {
  title: "",
  type: "",
  director: "",
  budget: "",
  location: "",
  duration: "",
  year: "",
  movieImage: [],
};
