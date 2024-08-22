import React, { useState, useEffect } from "react";
import { useStories } from "../hooks/useStories";
import StoryTable from "../components/StoryTable";
import FilterModal from "../components/FilterModal";
import { Box, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { stories, loading, setStories } = useStories();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredStories, setFilteredStories] = useState(stories);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setFilteredStories(stories);
  }, [stories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAddStoryClick = () => {
    navigate("/add-story");
  };

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleFilterApply = (category: string, status: string) => {
    let filtered = stories;
    if (category) {
      filtered = filtered.filter((story) => story.category === category);
    }
    if (status) {
      filtered = filtered.filter((story) => story.status === status);
    }
    setFilteredStories(filtered);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Story List</h1>

      <Box>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          mb={2}
        >
          {isMobile && (
            <Box display="flex" flexDirection="row" gap={2} mb={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddStoryClick}
              >
                Add Story
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
              >
                Filter
              </Button>
            </Box>
          )}
          <TextField
            variant="outlined"
            placeholder="Search by name or author"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          {!isMobile && (
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddStoryClick}
              >
                Add Story
              </Button>
            </Box>
          )}
        </Box>
        <StoryTable
          stories={filteredStories}
          search={search}
          setStories={setStories}
        />
      </Box>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default HomePage;
