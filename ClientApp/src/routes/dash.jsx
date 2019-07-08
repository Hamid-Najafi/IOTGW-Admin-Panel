// import Icons from 'views/Components/Icons.jsx';

import deviceList from 'views/Tables/deviceList.jsx';
import gatewayList from 'views/Tables/gatewayList.jsx';

import addGateway from '../views/Forms/addGateway.jsx';
import addDevice from '../views/Forms/addDevice.jsx';
import addUser from '../views/Forms/addUser.jsx';

import { reactLocalStorage } from 'reactjs-localstorage';

import UsersList from '../views/Tables/usersList.jsx';

import LoginPage from 'views/Pages/LoginPage.jsx';
import messages from 'views/Pages/messages.jsx';


let user = reactLocalStorage.getObject('userInfo')

if (user != undefined) {
    if (user.role == "Admin") {
        console.log(user.role == "Admin")
        var dashRoutes = [
            { path: "/devices/all", name: "Device List", mini: "DD", component: deviceList },
            // { path: "/", name: "Gateways List", mini: "GL", component: gatewayList },

        
            { path: "/pages/messages", name: "Messages", mini: "FD", component: messages },

            { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },

            {
                collapse: true, path: "/admin", name: "Admin", state: "openComponents3", views: [
                    // { path: "/users/edit", name: "Edit Users", mini: "EU", component: editUser },

                    { path: "/gateways/all", name: "Gateways List", mini: "GL", component: gatewayList },
                    { path: "/gateways/add", name: "Add Gateway", mini: "AG", component: addGateway },
                    { path: "/gateways/nodes", name: "Device List", mini: "AG", component: deviceList },

                    { path: "/devices/add", name: "Add Device", mini: "AD", component: addDevice },
                    { path: "/users/all", name: "Users List", mini: "UL", component: UsersList },
                    { path: "/users/add", name: "Add User", mini: "RP", component: addUser }]
            },
        ];

    } else {
        var dashRoutes = [
            { path: "/devices/all", name: "Device List", mini: "DD", component: deviceList },
            { path: "/", name: "Device List", mini: "DD", component: deviceList },
            { path: "/pages/messages", name: "Messages", mini: "FD", component: messages },

           
            { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },


        ];

    }
} else {
    var dashRoutes = [

        { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },


    ];
}


export default dashRoutes;

