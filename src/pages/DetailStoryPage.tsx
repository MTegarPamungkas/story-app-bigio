import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Story } from "../types/story";
import { StoryService } from "../services/storyService";
import DetailStory from "../components/DetailStory";

const DetailStoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (id) {
        const fetchedStory = await StoryService.getStoryById(id);
        setStory(fetchedStory);
      }
    };
    fetchStory();
  }, [id]);

  const handleEditStory = async (updatedStory: Story) => {
    if (id) {
      const formData = new FormData();
      formData.append("title", updatedStory.title);
      formData.append("writer", updatedStory.writer);
      formData.append("synopsis", updatedStory.synopsis);
      formData.append("category", updatedStory.category);
      formData.append("status", updatedStory.status);
      updatedStory.tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("chapters", JSON.stringify(updatedStory.chapters));
      if (updatedStory.coverImage) {
        formData.append("coverImage", updatedStory.coverImage);
      }

      await StoryService.updateStory(id, formData);
      navigate("/");
    }
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div>
      <h1>Detail Story</h1>
      <DetailStory story={story} onSubmit={handleEditStory} />
    </div>
  );
};

export default DetailStoryPage;
