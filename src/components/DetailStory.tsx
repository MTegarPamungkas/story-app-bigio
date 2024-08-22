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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Story } from "../types/story";
import { Chapter } from "../types/chapter";

interface DetailStoryProps {
  story: Story;
  onSubmit: (story: Story) => void;
}

const DetailStory: React.FC<DetailStoryProps> = ({ story }) => {
  const [title, setTitle] = useState(story.title);
  const [writer, setWriter] = useState(story.writer);
  const [synopsis, setSynopsis] = useState(story.synopsis);
  const [category, setCategory] = useState(story.category);
  const [tags, setTags] = useState<string[]>(story.tags);
  const [status, setStatus] = useState(story.status);
  const [newTag, setNewTag] = useState("");

  const [coverImageName] = useState(story.coverImage || "");
  const [chapters] = useState<Chapter[]>(story.chapters || []);

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

  return (
    <Box>
      <Card sx={{ padding: 2, margin: "auto" }}>
        <CardContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="Author"
            value={writer}
            disabled
            onChange={(e) => setWriter(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Synopsis"
            value={synopsis}
            disabled
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
                  disabled
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
                  disabled
                  fullWidth
                >
                  {typeof coverImageName === "string"
                    ? coverImageName
                    : coverImageName.name}
                  <input type="file" hidden disabled />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tags"
                value={newTag}
                onChange={handleTagChange}
                onKeyDown={handleAddTag}
                disabled
                fullWidth
                margin="normal"
                helperText="Press Enter to add tag"
              />
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} />
                ))}
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  disabled
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

      {/* Chapter Section */}
      <Box mt={3}>
        <Typography variant="h6">Chapters</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chapter Title</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapters.map((chapter) => (
              <TableRow key={chapter._id}>
                <TableCell>{chapter.title}</TableCell>
                <TableCell>{chapter.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DetailStory;
