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
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Story } from "../types/story";
import { Chapter } from "../types/chapter";
import AddChapterForm from "./addChapterForm";
import EditChapterForm from "./EditChapterForm";
import { StoryService } from "../services/storyService";

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
  const [newTag, setNewTag] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageName, setCoverImageName] = useState(story.coverImage || "");
  const [chapters, setChapters] = useState<Chapter[]>(story.chapters || []);
  const [isChapterFormOpen, setIsChapterFormOpen] = useState(false);
  const [isEditChapterFormOpen, setIsEditChapterFormOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTag.trim()) {
      event.preventDefault();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag("");
      }
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setCoverImage(file);
      setCoverImageName(file.name);
    } else {
      setCoverImage(null);
      setCoverImageName("");
    }
  };

  const handleOpenChapterForm = () => {
    setIsChapterFormOpen(true);
  };

  const handleCloseChapterForm = () => {
    setIsChapterFormOpen(false);
  };

  const handleOpenEditChapterForm = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setIsEditChapterFormOpen(true);
  };

  const handleCloseEditChapterForm = () => {
    setIsEditChapterFormOpen(false);
  };

  const handleSaveChapter = (chapter: Chapter) => {
    setChapters([...chapters, chapter]);
    handleCloseChapterForm();
  };

  const handleEditChapter = (chapter: Chapter) => {
    setChapters(chapters.map((ch) => (ch._id === chapter._id ? chapter : ch)));
    handleCloseEditChapterForm();
  };

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      setChapters(chapters.filter((chapter) => chapter._id !== chapterId));

      if (story._id) {
        await StoryService.deleteChapter(story._id, chapterId);
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleSubmit = () => {
    const storyData: Story = {
      title,
      writer,
      synopsis,
      category,
      tags,
      status,
      coverImage: coverImage || undefined,
      chapters,
    };
    onSubmit(storyData);
  };

  return (
    <Box>
      <Card sx={{ padding: 2, margin: "auto" }}>
        <CardContent>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Financial">Financial</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  {typeof coverImageName === "string"
                    ? coverImageName
                    : coverImageName.name}
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tags"
                value={newTag}
                onChange={handleTagChange}
                onKeyDown={handleAddTag}
                fullWidth
                margin="normal"
                helperText="Press Enter to add tag"
              />
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
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
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Publish">Publish</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={3}>
        <Typography variant="h6">Chapters</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenChapterForm}
          sx={{ mt: 2, mb: 2 }}
        >
          Add Chapter
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chapter Title</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapters.map((chapter) => (
              <TableRow key={chapter._id}>
                <TableCell>{chapter.title}</TableCell>
                <TableCell>{chapter.updatedAt}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenEditChapterForm(chapter)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteChapter(chapter._id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AddChapterForm
          open={isChapterFormOpen}
          onClose={handleCloseChapterForm}
          onSave={handleSaveChapter}
        />

        {currentChapter && (
          <EditChapterForm
            open={isEditChapterFormOpen}
            onClose={handleCloseEditChapterForm}
            onSave={handleEditChapter}
            chapter={currentChapter}
          />
        )}
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditStoryForm;
