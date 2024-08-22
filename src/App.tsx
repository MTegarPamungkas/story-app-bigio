import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStoryPage from "./pages/AddStoryPage";
import EditStoryPage from "./pages/EditStoryPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import Sidebar from "./components/Sidebar";
import DetailStoryPage from "./pages/DetailStoryPage";

const App = () => {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-story" element={<AddStoryPage />} />
          <Route path="/edit-story/:id" element={<EditStoryPage />} />
          <Route path="/detail-story/:id" element={<DetailStoryPage />} />
          <Route path="/story/:id" element={<StoryDetailPage />} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default App;
