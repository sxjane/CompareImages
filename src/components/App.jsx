import React from 'react'
import ButtonImage from './ButtonImage'
import axios from 'axios'
import './styles.css'

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state={
            firstURL:null,
            firstId: '',
            secondURL:null,
            secondId: ''
        }

        this.getImages = this.getImages.bind(this)
        this.onClick = this.onClick.bind(this)
        this.getImages()
    }

    getImages(){
        axios.get('/next').then((response)=>{
                const first_id = response.data[0]._id
                const first_chip = response.data[0].chip
                const second_id = response.data[1]._id 
                const second_chip = response.data[1].chip
                const first_URL = 'data:image/png;base64,' + first_chip
                const second_URL = 'data:image/png;base64,' + second_chip
                this.setState({firstURL:first_URL, secondURL:second_URL, firstId:first_id, secondId:second_id})
             }).catch(err=>console.log(err))
    }
    onClick(e){
        let result = e.target.id === 'first' ? 0 : 1
        let post_string = '/result/' + this.state.firstId + '/' + this.state.secondId + '/' + result
        console.log(post_string)
        axios.post(post_string)
        .then((response)=>{
            console.log('result has been sent')
            this.getImages()
        }).catch((error)=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div className='top'>
                <h3>Which one do you think is better?</h3>
                <div className='two_images'>
                    <ButtonImage id={'first'} src={this.state.firstURL} onClick={this.onClick} />
                    <ButtonImage id={'second'} src={this.state.secondURL} onClick={this.onClick}/>
                </div>
                <button onClick={this.getImages}>Next</button>
            </div>
           
        )
    }
}