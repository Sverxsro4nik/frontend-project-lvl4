import { Card, Col, Container, Row } from 'react-bootstrap';
import imagePath from './loginPage.jpeg';
import LoginForm from "../LoginForm/LoginForm.jsx";

const LoginPage = () => {
  return (
    <Container className='h-100' fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img src={imagePath} className="roundedCircle" alt="Log in page" />
              </div>
              <>
                <LoginForm />
              </>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href='/'>Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;