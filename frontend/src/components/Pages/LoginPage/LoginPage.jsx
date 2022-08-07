import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import getRoutes from '../../../routes/routes';
import imagePath from './loginPage.jpeg';
import LoginForm from './LoginPageComponents/LoginForm/LoginForm.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={imagePath}
                  className="roundedCircle"
                  alt="Log in page"
                />
              </div>
              <>
                <LoginForm />
              </>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('notAccount')} </span>
                <a href={getRoutes.signUpPage()}>{t('signUp')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
