import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { Chapter } from "../types/chapter";

interface EditChapterFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (chapter: Chapter) => void;
  chapter: Chapter;
}

const EditChapterForm: React.FC<EditChapterFormProps> = ({
  open,
  onClose,
  onSave,
  chapter,
}) => {
  const [title, setTitle] = useState(chapter.title);
  const [content, setContent] = useState(chapter.content);

  const handleSave = () => {
    const updatedChapter: Chapter = {
      ...chapter,
      title,
      content,
    };
    onSave(updatedChapter);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogContent>
        <TextField
          label="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapterForm;
