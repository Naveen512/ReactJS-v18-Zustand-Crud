import { useRef } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCakeStore } from "../store/cakeStore";

const AddCake = () => {
  const name = useRef("");
  const imageUrl = useRef("");
  const cost = useRef("");

  const createAPICall = useCakeStore((state) => state.createCakeAPI);

  const navigate = useNavigate();

  const createHanlder = async () => {
    let payload = {
      name: name.current.value,
      imageUrl: imageUrl.current.value,
      cost: Number(cost.current.value)
    };
    await createAPICall(payload);
    navigate("/");
  };
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Create A New Cake</legend>
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
            <Button
              variant="primary"
              type="button"
              onClick={createHanlder}
            >Add</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AddCake;
