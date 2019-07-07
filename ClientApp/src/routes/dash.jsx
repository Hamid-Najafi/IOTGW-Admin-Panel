// import Icons from 'views/Components/Icons.jsx';

import deviceList from 'views/Tables/deviceList.jsx';
import gatewayList from 'views/Tables/gatewayList.jsx';

import addGateway from '../views/Forms/addGateway.jsx';
import addDevice from '../views/Forms/addDevice.jsx';
import addUser from '../views/Forms/addUser.jsx';

import editDevice from '../views/Forms/editDevice.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import UsersList from '../views/Tables/usersList.jsx';

import LoginPage from 'views/Pages/LoginPage.jsx';
import fakeData from 'views/Pages/fakeData.jsx';
import deviceData from 'views/Pages/deviceData.jsx';


var dashRoutes = [
    { path: "/devices/all", name: "Device List", mini: "DD", component: deviceList },

    { collapse: true, path: "/pages", name: "Pages", state: "openComponents2", views:[
        { path: "/devices/edit", name: "Edit Device",  mini: "ED",component: editDevice },
        { path: "/users/edit", name: "Edit User", mini: "EU",component: UserPage },
        { path: "/pages/fake-data", name: "fake data", mini: "FD", component: fakeData },

        { path: "/device/data", name: "device data", mini: "DD", component: deviceData },
        ]
    },
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },

    { collapse: true, path: "/admin", name: "Admin", state: "openComponents3",  views:[
        { path: "/gateways/all", name: "Gateways List", mini: "GL", component: gatewayList },
        { path: "/devices/add", name: "Add Device",  mini: "AD",component: addDevice },
        { path: "/gateways/add", name: "Add Gateway", mini: "AG", component: addGateway },
        { path: "/users/all", name: "Users List",  mini: "UL",component: UsersList },
        { path: "/users/add", name: "Add User", mini: "RP", component: addUser }]
    },
   ];

  
export default dashRoutes;

