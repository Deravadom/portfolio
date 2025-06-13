type Props<T> = {
  items: T[];
  onReorder: (newOrder: T[]) => void;
  itemComponent: React.ComponentType<T>;
  className?: string;
  itemContainerClassName?: string;
}
const ReorderableGrid = <T extends object>({
  items,
  onReorder,
  itemComponent,
  className,
  itemContainerClassName = "p-2 rounded shadow hover:bg-background",
}: Props<T>) => {
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  }
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (draggedIndex === index) return;
    const newOrder = [...items];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, removed);
    onReorder(newOrder);
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
    <div className={`grid ${className}`}>
      {items.map((item, index) => {
        const ItemComponent = itemComponent;
        return (
          <div
            key={index}
            className={itemContainerClassName}
            onDrop={(e) => handleDrop(e, index)}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            draggable
          >
            <ItemComponent {...item} />
          </div>
        );
      })}
    </div>
  )
}

export default ReorderableGrid;