import React,{Component} from 'react';
import { View,Text,TouchableOpacity,StyleSheet,TextInput,Image,Alert } from 'react-native';

import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Transaction extends Component{
    constructor(){
        super();

        this.state = {
            hasCameraPermission : null,
            scanned : false,
            scannedBookID : "",
            scannedStudentID : "",
            buttonState : "normal",

        }
    }
    getCameraPermission=async(id)=>{
        console.log("Asking Camera Permission");
        const {status} = await Permissions.askAsync(Permissions.CAMERA) // allow or deny status = "granted" status = "denied"
        this.setState({
            hasCameraPermission : status === "granted",
            buttonState : id,
            scanned : false,        
        }) 
        console.log(this.state.hasCameraPermission);
    }
    scannedBarCode = async({type,data})=>{
        if(this.state.buttonState === "BookID"){
            Alert.alert("Scanning the data:" + this.state.buttonState)
        this.setState({
            scannedBookID : data,
            scanned : true,
            buttonState : "normal"
        })
    }

    else if(this.state.buttonState === "StudentID"){
        Alert.alert("Scanning the data:" + this.state.buttonState)
            this.setState({
                scannedStudentID : data,
                scanned : true,
                buttonState : "normal"
            })
    }
 
}
    render(){
        if(this.state.hasCameraPermission && this.state.buttonState !== "normal"){
            
            return(
                <BarCodeScanner
                onBarCodeScanned = {this.state.scanned ? undefined : this.scannedBarCode }
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        
        else if(this.state.buttonState === "normal"){

        
        return(
            <View style = {{flex : 1,alignItems : "center", justifyContent : "center"}}>
               <View>
            <Image 
            source = {require("../assets/booklogo.jpg")}
            style = {{
                width : 100,
                height : 100
            }}
            />
            <Text style = {{
                textAlign : "center",
                fontSize : 30,
                fontFamily : "coolvetica"
            }}>
                Wily App
            </Text>
               </View>
            <View style = {
                styles.inputView
            }>
                <TextInput 
                style = {styles.inputBox}
                placeholder = "Enter the Book ID"
                value = {this.state.scannedBookID}
                >
                </TextInput>
                <TouchableOpacity
                style = {styles.scanButton}
                onPress = {()=>{
                    this.getCameraPermission("BookID")
                }}
                > 
                <Text style = {styles.buttonText}>Scan</Text>
                </TouchableOpacity>
            </View>
            <View style = {
                styles.inputView
            }>
                <TextInput 
                style = {styles.inputBox}
                placeholder = "Enter the Student ID"
                value = {this.state.scannedStudentID}
                >
                </TextInput>
                <TouchableOpacity
                style = {styles.scanButton}
                onPress = {()=>{
                    this.getCameraPermission("StudentID")
                }}
                > 
                <Text style = {styles.buttonText}>Scan</Text>
                </TouchableOpacity>
            </View>

            
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
      },
      inputView:{
        flexDirection: 'row',
        margin: 20
      },
      inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
      }
    
});