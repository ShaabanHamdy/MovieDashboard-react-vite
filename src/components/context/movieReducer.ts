import type { Movie } from "../types/movieType";

export interface MovieState {
  movies: Movie[];
}

export const initialState: MovieState = {
  movies: [],
};

type Action =
  | { type: "SET_MOVIES"; payload: Movie[] }
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "DELETE_MOVIE"; payload: string }
  | { type: "UPDATE_MOVIE"; payload: Movie };

export function movieReducer(state: MovieState, action: Action): MovieState {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "ADD_MOVIE":
      return { ...state, movies: [action.payload, ...state.movies] };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((m) => m._id !== action.payload),
      };
    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((m) =>
          m._id === action.payload._id ? action.payload : m
        ),
      };
    default:
      return state;
  }
}
