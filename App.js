import React,{Component} from 'react';
import { View,Text,Image } from 'react-native';
import Transaction from './Screens/transactions';
import Search from './Screens/search'; 


import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'

export default class App extends Component{
    render(){
        return(
           <AppContainer/>
        )
    }
}

const TabNavigator = createBottomTabNavigator({
    TransactionScreen : {screen : Transaction},
    SearchScreen : {screen : Search}
},
{
defaultNavigationOptions : ({navigation})=>({
    tabBarIcon : ()=>{
        const route_Name = navigation.state.routeName
        if(route_Name === "TransactionScreen"){
            return(
                <Image 

                source = {require("./assets/book.png")}

                style = {{
                    width : 30,
                    height : 30,                    
                }}
                
                />
            )
        }
        else if(route_Name === "SearchScreen" ) {
            return(
                <Image 
                
                source = {require("./assets/searchingbook.png")}

                style = {{
                    width : 30,
                    height : 30,                    
                }}

                />
            )
        }
    }
})
}
)

const AppContainer = createAppContainer(TabNavigator)


