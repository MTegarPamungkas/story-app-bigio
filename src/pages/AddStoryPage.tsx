import AddStoryForm from "../components/AddStoryForm";
import { Story } from "../types/story";
import { useNavigate } from "react-router-dom";
import { StoryService } from "../services/storyService";
import { Chapter } from "../types/chapter";

const AddStoryPage = () => {
  const navigate = useNavigate();

  const handleAddStory = async (storyData: {
    story: Story;
    chapters: Chapter[];
  }) => {
    try {
      const { story, chapters } = storyData;
      const response = await StoryService.addStory(story);
      const storyId = response._id;

      for (const chapter of chapters) {
        await StoryService.addChapter(storyId as string, chapter);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving story or chapters:", error);
    }
  };

  return (
    <div>
      <h1>Add New Story</h1>
      <AddStoryForm onSubmit={handleAddStory} />
    </div>
  );
};

export default AddStoryPage;
