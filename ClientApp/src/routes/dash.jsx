// import Icons from 'views/Components/Icons.jsx';

import deviceList from 'views/Tables/deviceList.jsx';
import gatewayList from 'views/Tables/gatewayList.jsx';

import addGateway from '../views/Forms/addGateway.jsx';
import addDevice from '../views/Forms/addDevice.jsx';
import editDevice from '../views/Forms/editDevice.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import UsersList from '../views/Tables/usersList.jsx';

import { gatewayListInfo } from 'variables/Variables.jsx';

import LoginPage from 'views/Pages/LoginPage.jsx';
import fakeData from 'views/Pages/fakeData.jsx';
import deviceData from 'views/Pages/deviceData.jsx';

import RegisterPage from 'views/Pages/RegisterPage.jsx';

var dashRoutes = [
    { collapse: true, path: "/gateways", name: "Gateways", state: "openComponents", icon: "pe-7s-plugin", views:[
        { path: "/gateways/all", name: "Gateways List", mini: "GL", component: gatewayList },
        ]
    },
    { collapse: true, path: "/pages", name: "Pages", state: "openComponents2", icon: "pe-7s-plugin", views:[
        { path: "/devices/add", name: "Add Device", icon: "pe-7s-plus", mini: "AD",component: addDevice },
        { path: "/device/edit", name: "Edit Device", icon: "pe-7s-config", mini: "ED",component: editDevice },
        { path: "/users/all", name: "Users List", icon: "pe-7s-plus", mini: "UL",component: UsersList },
        { path: "/users/edit", name: "Edit User", icon: "pe-7s-plus", mini: "EU",component: UserPage },
        { path: "/pages/fake-data", name: "fake data", mini: "FD", component: fakeData },
        { path: "/device/data", name: "device data", mini: "DD", component: deviceData },
        ]
    },
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/register", name: "Register", mini: "RP", component: RegisterPage },

    { collapse: true, path: "/admin", name: "Admin", state: "openComponents3", icon: "pe-7s-plugin", views:[
        { path: "/devices/add", name: "Add Device", icon: "pe-7s-plus", mini: "AD",component: addDevice },
        { path: "/gateways/add", name: "Add Gateway", mini: "AG", component: addGateway },
        { path: "/users/all", name: "Users List", icon: "pe-7s-plus", mini: "UL",component: UsersList },
        { path: "/pages/register-page", name: "Register", mini: "RP", component: RegisterPage }]
    },
    // { path: "/icon", name: "icon", component: Icons, icon: "pe-7s-bell",},
   ];
Object.keys(gatewayListInfo).forEach(function(key) {
    dashRoutes[0].views.push({ path: "/gateways/" + gatewayListInfo[key].id, name: gatewayListInfo[key].name, mini: gatewayListInfo[key].mini, component: deviceList });
})
  
export default dashRoutes;

