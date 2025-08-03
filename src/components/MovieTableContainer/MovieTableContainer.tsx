import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { ContainerContext } from "../context/MoviesContext";
import { type Movie } from "../types/movieType";
const MovieTableContainer = () => {
  const {
    handleEdit,
    filteredMovies,
    paginatedMovies,
    handleDelete,
    page,
    setPage,
    rowsPerPage,
  } = useContext(ContainerContext);

  return (
    <div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-blue-100 ">
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Year/Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMovies.map((movie: Movie) => (
              <TableRow key={movie._id} className="hover:bg-gray-50 ">
                  {/* {console.log(movie)} */}
                <TableCell>
                  
                  <div className=" max-w-[100px] flex flex-col items-center space-y-2">
                    <img
                      className="w-30 h-30 object-cover rounded"
                      alt={movie.title}
                      src={`${movie?.movieImage|| ""}`}
                    />
                    <span>{movie.title}</span>
                  </div>
                </TableCell>
                <TableCell>{movie.type}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>{movie.budget}</TableCell>
                <TableCell>{movie.location}</TableCell>
                <TableCell>{movie.duration}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEdit(movie)}
                    className="mr-5"
                    sx={{ marginRight: 3 }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(movie._id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredMovies.length / rowsPerPage)}
        page={page}
        onChange={(_event, value) => setPage(value)}
        className="mt-4 flex justify-center"
        color="primary"
      />
    </div>
  );
};

export default MovieTableContainer;
