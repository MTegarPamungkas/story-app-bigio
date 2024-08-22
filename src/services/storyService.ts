import axios from 'axios';
import { Story } from '../types/story'; 
import { Chapter } from '../types/chapter'; 

const API_URL = 'https://backend-story-app-bigio.vercel.app/api/story';
// const API_URL = 'http://127.0.0.1:5000/api/story';

export class StoryService {
  // Fetch all stories
  public static async getStories(): Promise<Story[]> {
    const response = await axios.get<Story[]>(API_URL);
    return response.data;
  }

  public static async getStoryById(id: string): Promise<Story> {
    const response = await axios.get<Story>(`${API_URL}/${id}`);
    return response.data;
  }

  public static async addStory(story: Story): Promise<{
      [x: string]: unknown; id: string 
}> {
    const formData = new FormData();
    formData.append('title', story.title || '');
    formData.append('writer', story.writer || '');
    formData.append('synopsis', story.synopsis || '');
    formData.append('category', story.category || '');
    formData.append('status', story.status || '');
    
    (story.tags || []).forEach(tag => formData.append('tags[]', tag));

    if (story.coverImage) {
      formData.append('coverImage', story.coverImage);
    }

    const response = await axios.post<{ id: string }>(`${API_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  
  public static async addChapter(storyId: string, chapter: Chapter): Promise<void> {
    const chapterData = {
      title: chapter.title || '',
      content: chapter.content || '',
    };

    await axios.post(`${API_URL}/${storyId}/chapter`, chapterData);
  }

  public static async updateStory(id: string, formData: FormData): Promise<void> {
    await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public static async deleteChapter(storyId: string, chapterId: string): Promise<void> {
    await axios.delete(`${API_URL}/${storyId}/chapter/${chapterId}`);
  }
  

  public static async deleteStory(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }

}
