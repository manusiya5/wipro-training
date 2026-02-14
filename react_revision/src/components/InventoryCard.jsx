import { useState } from "react";
import { Card, Button } from "react-bootstrap";

function InventoryCard({ name, price, category }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Card className="mb-4 ">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Category: {category}
          <br />
          Price: ₹{price}
        </Card.Text>

        <Button
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? "Favorite" : "Add to Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default InventoryCard;
