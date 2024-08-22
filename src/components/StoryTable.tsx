import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { Story } from "../types/story";
import { StoryService } from "../services/storyService";

interface StoryTableProps {
  stories: Story[];
  search: string;
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}

const StoryTable: React.FC<StoryTableProps> = ({
  stories,
  search,
  setStories,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>, story: Story) => {
    setAnchorEl(event.currentTarget);
    setSelectedStory(story);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDetail = () => {
    if (selectedStory) {
      navigate(`/detail-story/${selectedStory._id}`);
    }
    handleClose();
  };

  const handleEdit = () => {
    if (selectedStory) {
      navigate(`/edit-story/${selectedStory._id}`);
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedStory && selectedStory._id) {
      try {
        await StoryService.deleteStory(selectedStory._id);
        setStories((prevStories) =>
          prevStories.filter((story) => story._id !== selectedStory._id)
        );
        setSnackbarMessage("Story deleted successfully.");
        setOpenSnackbar(true);
      } catch (error: unknown) {
        setSnackbarMessage(`Failed to delete the story. ${error}`);
        setOpenSnackbar(true);
      }
      handleClose();
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stories
              .filter((story) =>
                story.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((story, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{story.title}</TableCell>
                  <TableCell>{story.writer}</TableCell>
                  <TableCell>{story.category}</TableCell>
                  <TableCell>
                    {story.tags.map((tag, idx) => (
                      <Chip key={idx} label={tag} />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={story.status}
                      color={story.status === "Publish" ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleClick(e, story)}
                      size="small"
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu for actions */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>View Details</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StoryTable;
