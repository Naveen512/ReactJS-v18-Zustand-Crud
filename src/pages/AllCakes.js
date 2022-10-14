import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import { useCakeStore } from "../store/cakeStore";

const AllCakes = () => {
  const allCakes = useCakeStore((state) => state.cakesData);
  const callGetAPI = useCakeStore((state) => state.getApi);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(0);
  const callDeleteAPI = useCakeStore((state) => state.deleteCakeAPI);

  useEffect(() => {
    if (allCakes.length == 0) {
      callGetAPI();
    }
  }, []);

  const openDeleteConfirmationModalHandler = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const closeDeleteConfirmationModalHandler = () => {
    setItemIdToDelete(0);
    setShowModal(false);
  };

  const confirmDeleteHandler = async () => {
    await callDeleteAPI(itemIdToDelete);
    setItemIdToDelete(0);
    setShowModal(false);
  };

  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation"
        body="Are you sure to delete the item?"
        closeDeleteConfirmationModalHandler={
          closeDeleteConfirmationModalHandler
        }
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="primary"
              type="button"
              onClick={() => navigate("/add-cake")}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-4">
          {allCakes.map((cake) => (
            <Col key={cake.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={cake.imageUrl}
                  style={{ height: 400, width: "100%" }}
                />
                <Card.Body>
                  <Card.Title>{cake.name}</Card.Title>
                  <Card.Text>Price - {cake.cost}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/edit-cake/${cake.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                      openDeleteConfirmationModalHandler(cake.id);
                    }}
                  >Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllCakes;
