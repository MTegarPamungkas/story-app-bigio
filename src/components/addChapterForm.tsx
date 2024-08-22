import React, { useState } from "react";
import { Box, TextField, Button, Typography, Modal } from "@mui/material";
import { Chapter } from "../types/chapter";

interface AddChapterFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (chapter: Chapter) => void;
}

const AddChapterForm: React.FC<AddChapterFormProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    const newChapter: Chapter = {
      title,
      content,
      updatedAt: "",
    };
    onSave(newChapter);
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          margin: "auto",
          marginTop: "10%",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h6">Add Chapter</Typography>
        <TextField
          label="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Chapter Content"
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
          Save Chapter
        </Button>
      </Box>
    </Modal>
  );
};

export default AddChapterForm;
