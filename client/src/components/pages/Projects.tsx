import { useState } from "react";
import ReorderableGrid from "../draggable/ReorderableGrid";
import Col from "../flex/Col";

type ProjectItem = {
  id: string;
  name: string;
  description: string;
  link: string;
}
const Projects = () => {
  const [items, setItems] = useState<ProjectItem[]>([
    { id: "1", name: "Project A", description: "Description A", link: "#" },
    { id: "2", name: "Project B", description: "Description B", link: "#" },
    { id: "3", name: "Project C", description: "Description C", link: "#" },
    { id: "4", name: "Project D", description: "Description D", link: "#" },
  ]);

  const handleReorder = (newOrder: ProjectItem[]) => {
    setItems(newOrder);
    console.log("New order:", newOrder);
  };
  return (
    <Col className="items-center justify-center w-full h-full p-4">
      <h1 className="text-3xl font-bold mb-4 text-component">Projects</h1>
      <ReorderableGrid
        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-scrollbar p-4"
        items={items}
        onReorder={handleReorder}
        itemComponent={({ id, name, description, link }) => (
          <div className="p-4 bg-background rounded" key={id}>
            <h2 className="text-xl font-semibold text-component">{name}</h2>
            <p className="text-sm text-variable">{description}</p>
            <a href={link} className="text-variable hover:underline">View Project</a>
          </div>
        )}
      />
    </Col>
  );
}
export default Projects;