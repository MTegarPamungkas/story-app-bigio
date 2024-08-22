// src/pages/HomePage.tsx
import React, { useState } from "react";
import { useStories } from "../hooks/useStories";
import StoryTable from "../components/StoryTable";
import { Box, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { stories, loading, setStories } = useStories(); // Get setStories from useStories
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAddStoryClick = () => {
    navigate("/add-story");
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
              <Button variant="outlined" startIcon={<FilterListIcon />}>
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
              <Button variant="outlined" startIcon={<FilterListIcon />}>
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
        <StoryTable stories={stories} search={search} setStories={setStories} />
      </Box>
    </div>
  );
};

export default HomePage;
