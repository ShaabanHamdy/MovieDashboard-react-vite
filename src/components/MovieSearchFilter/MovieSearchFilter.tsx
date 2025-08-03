import { Search } from "@mui/icons-material";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { useContext } from "react";
import { ContainerContext } from "../context/MoviesContext";
const MovieSearchFilter = () => {
  const { setSearch, search, filterField, setFilterField } =
    useContext(ContainerContext);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <TextField
        label="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        select
        label="Filter By"
        value={filterField}
        onChange={(e) => setFilterField(e.target.value)}
        className="min-w-[180px]"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="type">Type</MenuItem>
        <MenuItem value="director">Director</MenuItem>
        <MenuItem value="budget">Budget</MenuItem>
        <MenuItem value="location">Location</MenuItem>
        <MenuItem value="duration">Duration</MenuItem>
        <MenuItem value="year">Year</MenuItem>
      </TextField>
    </div>
  );
};

export default MovieSearchFilter;
