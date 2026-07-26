export default function About() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">About Kiln</h1>
      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
            alt="The wood-fired hearth at Kiln"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <p>
            Kiln opened with a single rule: if it can't be cooked over an open flame,
            it doesn't go on the menu. The hearth runs hot from open to close, fed by
            oak and apple wood.
          </p>
          <p>
            The menu is short on purpose and changes with what's in season.
            Everything is fired to order nothing sits under a heat lamp.
          </p>
        </div>
      </div>
    </div>
  )
}