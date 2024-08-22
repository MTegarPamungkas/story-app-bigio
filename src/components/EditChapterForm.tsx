import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Modal, Typography } from "@mui/material";
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

  useEffect(() => {
    setTitle(chapter.title);
    setContent(chapter.content);
  }, [chapter]);

  const handleSave = () => {
    onSave({ ...chapter, title, content });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Chapter
        </Typography>
        <TextField
          label="Title"
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
      </Box>
    </Modal>
  );
};

export default EditChapterForm;
