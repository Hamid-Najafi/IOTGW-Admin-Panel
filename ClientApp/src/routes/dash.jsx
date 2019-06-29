// import Icons from 'views/Components/Icons.jsx';

import deviceList from 'views/Tables/deviceList.jsx';
import gatewayList from 'views/Tables/gatewayList.jsx';

import addGateway from '../views/Forms/addGateway.jsx';
import addDevice from '../views/Forms/addDevice.jsx';
import editDevice from '../views/Forms/editDevice.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import { gatewayListInfo } from 'variables/Variables.jsx';

import LoginPage from 'views/Pages/LoginPage.jsx';
import fakeData from 'views/Pages/fakeData.jsx';

import RegisterPage from 'views/Pages/RegisterPage.jsx';

var dashRoutes = [
    { collapse: true, path: "/gateway", name: "Gateways", state: "openComponents", icon: "pe-7s-plugin", views:[
        { path: "/gateway/all", name: "Gateways List", mini: "GL", component: gatewayList },
        { path: "/gateway/add", name: "Add Gateway", mini: "AG", component: addGateway },
        ]
    },
    { collapse: true, path: "/pages", name: "Pages", state: "openComponents2", icon: "pe-7s-plugin", views:[
        { path: "/device/add", name: "Add Device", icon: "pe-7s-plus", mini: "AD",component: addDevice },
        { path: "/device/edit", name: "Edit Device", icon: "pe-7s-config", mini: "ED",component: editDevice },
        { path: "/user/edit", name: "Edit User", icon: "pe-7s-plus", mini: "EU",component: UserPage },
        { path: "/pages/fake-data", name: "fake data", mini: "FD", component: fakeData },
        { path: "/pages/login-page", name: "Login Page", mini: "LP", component: LoginPage },
        { path: "/pages/register-page", name: "Register", mini: "RP", component: RegisterPage }]
    },
    // { path: "/icon", name: "icon", component: Icons, icon: "pe-7s-bell",},
   ];
Object.keys(gatewayListInfo).forEach(function(key) {
    dashRoutes[0].views.push({ path: "/gateway/" + gatewayListInfo[key].id, name: gatewayListInfo[key].name, mini: gatewayListInfo[key].mini, component: deviceList });
})
  
export default dashRoutes;

