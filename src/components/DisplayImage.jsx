import React from 'react'
import axios from 'axios'
import './styles.css'

export default class DisplayImage extends React.Component{
    constructor(props){
        super(props)
        this.state={first:null,second:null}
    }

    onClick(){
        axios.get('/next').then((response)=>{
                const first_id = response.data[0]._id
                const first_chip = response.data[0].chip
                const second_id = response.data[1]._id 
                const second_chip = response.data[1].chip
                const first_URL = 'data:image/jpeg;base64,' + first_chip
                const second_URL = 'data:image/jpeg;base64,' + second_chip
                this.setState({first:first_URL, second:second_URL})
             }).catch(err=>console.log(err))
    }

    onClick2(){
        axios.get('/images', { responseType: 'blob' })
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
        axios.get('/images', { responseType: 'blob'})
        .then((response)=>{
           const img_data = response.data
           const imgURL = URL.createObjectURL(response.data)
           this.setState({src:imgURL})
        }).catch(err=>console.log(err))
    }

    render(){
        return (
            <div>
                <img src={this.state.first}/>
                <img src={this.state.second} />
                <button onClick={this.onClick.bind(this)}>Get Images</button>
            </div>
        )
    }
}