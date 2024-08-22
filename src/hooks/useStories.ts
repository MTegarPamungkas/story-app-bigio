import { useEffect, useState } from 'react';
import { StoryService } from '../services/storyService';
import { Story } from '../types/story';

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStories = async () => {
      const data = await StoryService.getStories();
      setStories(data);
      setLoading(false);
    };

    loadStories();
  }, []);

  return { stories, loading };
};
