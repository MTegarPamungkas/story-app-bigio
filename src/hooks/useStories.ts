import { useState, useEffect } from 'react';
import { StoryService } from '../services/storyService';
import { Story } from '../types/story';

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = await StoryService.getStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, setStories }; 
};
