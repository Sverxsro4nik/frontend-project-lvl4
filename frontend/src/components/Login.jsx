import LoginForm from "./LoginForm.jsx";

const Login = () => {
  return (
    <div className="row justify-content-center align-content-center">
      <div className="col-12 col-md-8 col-xx-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src="" className="rounded-circle" alt="Войти" />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <span>Нет аккаунта</span>
            <a href="/signup">Регистрация</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;