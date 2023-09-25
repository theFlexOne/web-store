function FilterSidebar() {
  return (
    <aside className="border border-black/50 p-4">
      <div className="flex flex-col border-t">
        <div className="text-lg font-medium">Brands</div>
        <ul className="flex flex-col">
          <li>Brand 1</li>
          <li>Brand 2</li>
          <li>Brand 3</li>
          <li>Brand 4</li>
        </ul>
      </div>
    </aside>
  );
}

export default FilterSidebar;
