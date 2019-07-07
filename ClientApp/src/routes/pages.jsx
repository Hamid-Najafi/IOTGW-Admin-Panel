import LoginPage from 'views/Pages/LoginPage.jsx';
import RegisterPage from 'views/Pages/RegisterPage.jsx';


var pagesRoutes = [
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/register", name: "Register", mini: "RP", component: RegisterPage },
];

export default pagesRoutes;
