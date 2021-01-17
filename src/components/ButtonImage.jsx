import React from 'react'
import './styles.css'

export default class ButtonImage extends React.Component{
   render(){
       return(
           <input id={this.props.id} className='single_image' type='image' src={this.props.src} onClick={this.props.onClick} alt='Loading'/>
       )
   }
}