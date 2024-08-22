import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoryService } from "../services/storyService";
import { Story } from "../types/story";

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
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

  if (!story) return <div>Loading...</div>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.synopsis}</p>
      <p>Author: {story.writer}</p>
      <p>Category: {story.category}</p>
      <p>Status: {story.status}</p>
      <p>Tags: {story.tags.join(", ")}</p>
    </div>
  );
};

export default StoryDetailPage;
