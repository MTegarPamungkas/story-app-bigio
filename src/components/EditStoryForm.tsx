import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { Story } from "../types/story";

interface EditStoryFormProps {
  story: Story;
  onSubmit: (story: Story) => void;
}

const EditStoryForm: React.FC<EditStoryFormProps> = ({ story, onSubmit }) => {
  const [title, setTitle] = useState(story.title);
  const [writer, setWriter] = useState(story.writer);
  const [synopsis, setSynopsis] = useState(story.synopsis);
  const [category, setCategory] = useState(story.category);
  const [tags, setTags] = useState<string[]>(story.tags);
  const [status, setStatus] = useState(story.status);
  const [newTag, setNewTag] = useState(""); // State for new tag input
  const [coverImage, setCoverImage] = useState<File | null>(null); // State for file input

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTag.trim()) {
      event.preventDefault(); // Prevent default Enter key action
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag(""); // Clear input field after adding tag
      }
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCoverImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      writer,
      synopsis,
      category,
      tags,
      status,
      coverImage, // Include file in the updated story
    });
  };

  return (
    <Box>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        value={writer}
        onChange={(e) => setWriter(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Synopsis"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Financial">Financial</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Tags"
        value={newTag}
        onChange={handleTagChange}
        onKeyDown={handleAddTag}
        fullWidth
        margin="normal"
        helperText="Press Enter to add tag"
      />
      <Box display="flex" flexWrap="wrap" gap={1}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => setTags(tags.filter((t) => t !== tag))}
          />
        ))}
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="Publish">Publish</MenuItem>
          <MenuItem value="Draft">Draft</MenuItem>
        </Select>
      </FormControl>
      <Box margin="normal">
        <InputLabel>Cover Image</InputLabel>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default EditStoryForm;
