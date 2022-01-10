import { listTags } from "../services/tags.api";
import { createContext, useEffect, useState } from "react";

const TagsContext = createContext();

const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    listTags().then(data => setTags(data));
  }, []);

  const handleTagsChange = () => listTags().then(data => setTags(data));

  const value = {
    tags, 
    handleTagsChange,
  }

  return (
    <TagsContext.Provider value={value}>
      { children }
    </TagsContext.Provider>
  )
};

export { TagsContext, TagsProvider }