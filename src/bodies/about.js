/**
 * Created by Chris Di Betta and Nick Benseler on 2018.3.15..
 */
import React, { Component } from 'react';
import{
    Col,
    Panel,
    ButtonGroup,
    Button
} from 'react-bootstrap'
import * as data from './../data'
import * as firebase from 'firebase'

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
            width:window.innerWidth
        };
    }
    resize = () => {
        this.setState({width:window.innerWidth,height:window.innerHeight})
    }


    main(){
        return(
            <div class='App' style={{zIndex:1,width:this.state.width}}>
                <div style={{textAlign:'center'}}>
                    <h1 style={{fontSize:this.state.width>1000?this.state.width/20:18,fontWeight:600,color:"#47525e"}}>About Us</h1>
                </div>
                <div style={{height:this.state.height/13, textAlign:'left'}}>
                    <h1 style={{fontSize:this.state.width>1000?this.state.width/70:18,fontWeight:500,color:"#47525e",padding:0,marginLeft:100, marginRight: 100}}>
                        ProStudent is an app that was created with students in mind. It allows students and professors to communicate in real time.
                        Students can provide live feedback which allows professors to improve their lecture on the fly.
                    </h1>
                </div>
            </div>
        )
    }

    render() {
        return(this.main())
    }
}
export default About
