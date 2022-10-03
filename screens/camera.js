import * as React from "react"
import {Button, View, Image, Platform} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default class PickImage extends React.Component{
    state = {image: null}

    render(){
        let {image} = this.state
        return(
            <View style = {{flex:1, alignItems:"center", justifyContent:"center"}}>
                <Button title = "Pick an Image" onPress = {this.pickImage}/>
            </View>
        )
    }

    ComponentDidMount(){
        this.getPermissionAsync()
    }

    getPermissionAsync = async()=>{
        if(Platform.OS!=="web"){
            const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status!=="granted"){
                alert("We apologize but this app doesnt not operate without camera roll permissions")
            }
         }
    }

    uploadImage = async(uri)=>{
        const data = new FormData()
        let fileName = uri.split("/")[uri.split("/").length-1]
        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`

        const fileToUpload = {
            uri : uri,
            name : fileName,
            type : type
        };

        data.append("alphabet", fileToUpload)
        fetch("https://", {
             method: "POST", 
             body: data, 
             headers: { "content-type": "multipart/form-data", 
            }, 
        })

        .then((response)=>response.json())
        .then((result)=>{
            console.log("Successly Uploaded:", result)
        })
        .catch((error)=>{
            console.error("Error:", error)
        })
    }
}