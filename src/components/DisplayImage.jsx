import React from 'react'
import axios from 'axios'

export default class DisplayImage extends React.Component{
    constructor(props){
        super(props)
        this.state={src:null}
        this.imgRef = React.createRef()
    }

    onClick(){
        axios.get('/base64_data')
             .then((response)=>{
                const img_data = response.data.img 
                const img_dataURL = 'data:image/jpeg;base64,' + img_data
                this.setState({src:img_dataURL})
             }).catch(err=>console.log(err))
    }

    onClick2(){
        axios.get('/base64_data', { responseType: 'blob' })
        .then((response)=>{
           const img_data = response.data
           let reader = new FileReader();
           reader.readAsDataURL(img_data); // converts the blob to base64 and calls onload
           let set_state = this.setState.bind(this)
           reader.onload = function() {
               set_state({src:reader.result})
           }
        }).catch(err=>console.log(err))
    }

    onClick3(){
        axios.get('/base64_data', { responseType: 'blob'})
        .then((response)=>{
           const img_data = response.data
           const imgURL = URL.createObjectURL(response.data)
           this.setState({src:imgURL})
        }).catch(err=>console.log(err))
    }

    render(){
        return (
            <div>
                <img src={this.state.src}/>
                <button onClick={this.onClick2.bind(this)}>Get An Image</button>
            </div>
        )
    }
}