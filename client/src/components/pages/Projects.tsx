import { useState } from "react";
import ReorderableGrid from "../draggable/ReorderableGrid";
import Col from "../flex/Col";
import { Link } from "react-router";

type ProjectItem = {
  id: string;
  name: string;
  description: string;
  link?: string;
  className?: string;
}
const Projects = () => {
  const [items, setItems] = useState<ProjectItem[]>([
    {
      id: "1",
      name: "Events Discovery",
      description: "Highlight of some contract work I did for an events discovery platform.",
      link: undefined
    },
    {
      id: "2",
      name: "Housemate",
      description: "Personal project designed to help you be a better roommate. It features a shared, recurring ToDo list, a leftovers tracker, and a distaster preparedness checklist.",
      className: "col-span-2",
      link: undefined
    },
    {
      id: "1",
      name: "Lawmatics",
      description: "Highlight of some of the work I did for Lawmatics, a legal CRM.",
      link: undefined
    },
    {
      id: "1",
      name: "Restuarant Load Balancer",
      description: "Load balancer system for a client's restaurants. It's designed to help restaurants manage their orders and deliveries more efficiently by coordinating stations' start times and order assignments.",
      link: undefined
    },
    {
      id: "1",
      name: "QuotaPath",
      description: "Highlight of some of the work I did for QuotaPath, a commissions tracking platform. Includes a Django Admin interface for generating realistic test/demo data.",
      link: undefined
    },
    {
      id: "3",
      name: "Video Penpals",
      description: "Drexel University senior capstone project designed to connect people through video messages. It allows users to send and receive video messages, fostering connections and communication.",
      link: "https://github.com/Conteo-Inc/conteo"
    },
    {
      id: "4",
      name: "Post Quantum Cryptography",
      description: "Drexel University independent study project focused on post-quantum cryptography. It explores cryptographic algorithms that are resistant to quantum computing attacks.",
      link: "https://github.com/Deravadom/PostQuantumComputation"
    },
  ]);

  const handleReorder = (newOrder: ProjectItem[]) => {
    setItems(newOrder);
    console.log("New order:", newOrder);
  };
  return (
    <Col className="items-center justify-center w-full h-full p-4">
      <h1 className="text-3xl font-bold mb-4 text-component">Projects</h1>
      <ReorderableGrid
        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-scrollbar p-4 items-center justify-center"
        items={items}
        onReorder={handleReorder}
        itemComponent={({ id, name, description, link }) => (
          <div className="p-4 bg-background rounded" key={id}>
            <h2 className="text-xl font-semibold text-component">{name}</h2>
            <p className="text-sm text-variable">{description}</p>
            {link && (
              <Link to={link}>
                <span className="text-string hover:underline">View Project</span>
              </Link>
            )}
            {!link && <span className="text-variable cursor-not-allowed">Coming Soon!</span>}
          </div>
        )}
      />
    </Col>
  );
}
export default Projects;