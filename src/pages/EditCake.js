import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getcakeById, useCakeStore } from "../store/cakeStore";
import { useRef } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
const EditCake = () => {
  const name = useRef("");
  const imageUrl = useRef("");
  const cost = useRef("");
  const { id } = useParams();
  const cakeToEdit = useCakeStore(getcakeById(id));
  const updateAPICall = useCakeStore((state) => state.updateCakeAPI);
  const navigate = useNavigate();

  useEffect(() => {
    if (cakeToEdit) {
      name.current.value = cakeToEdit.name;
      imageUrl.current.value = cakeToEdit.imageUrl;
      cost.current.value = cakeToEdit.cost;
    }
  }, []);

  const updateHandle = async () => {
    let payload = {
      name: name.current.value,
      imageUrl: imageUrl.current.value,
      cost: Number(cost.current.value),
      id: Number(id),
    };
    await updateAPICall(payload);
    navigate("/");
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Update A New Cake</legend>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCost">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="text" ref={cost} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" ref={imageUrl} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={updateHandle}>
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditCake;
