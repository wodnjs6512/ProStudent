/**
 * Created by jaewonlee on 2018. 2. 10..
 */

import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import * as firebase from "firebase";

class AdminListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel:false,
      color_blue: false,
      comments:[]
    };

    this.comment = this.comment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  changeColor() {
    this.setState({color_blue: !this.state.color_blue});
  }

  componentDidMount() {
    firebase.database().ref('/classes/'+this.props.item.key+'/feedback').orderByChild("list").on('value',(snapshot) =>{
      //console.log(snapshot.val())
      var comments = this.state.comments;
      comments =[];

      snapshot.forEach(function(item) {
        comments.push(item);
      });

      comments.sort((a, b)=>{
        if(b.val().up && a.val().up && b.val().down && a.val().down) {
          return ((b.val().up.length - b.val().down.length) - (a.val().up.length - a.val().down.length));
        } else {
          return null;
        }
      });

      this.setState({comments})
      //console.log(comments + this.props.item.key)
    })
  }

  deleteComment(item) {
    firebase.database().ref('/classes/'+this.props.item.key+'/feedback/'+item.key).remove(()=>alert('removed')).catch(()=>('failed'));
  }

  getRating(item) {
    var rating = 0;
    if (item.val().up && item.val().down){
      rating = item.val().up.list.length - item.val().down.list.length;
    } else if (item.val().up) {
      rating = item.val().up.list.length;
    } else if (item.val().down) {
      rating = -item.val().down.list.length;
    }

    return(rating);
  }

  comment(item, i) {
    return(
      <div className="commentWrapper">
        <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
          <p className="commentAuthor">{item.val().studentID ? item.val().studentID : "ID Not Recorded"}</p>
        </Col>
        <Col lg={7} md={7} sm={7} xs={7} className="center commentCol">
          <p className="comment">{item.val().comment}</p>
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} className="center commentCol">
          <p className="rating">Rating: {this.getRating(item)}</p>
        </Col>

        <Col lg={1} md={1} sm={1} xs={1} className='center'>
          <img src={require('./../../image/delete.svg')} alt="Del" style={{position:'absolute',top: 10, right : 10, width:10,height:10}} onClick={()=>{
             var r = window.confirm("Are you sure?")
             if (r) {
               this.deleteComment(item,i);
             }
          }}/>
        </Col>
      </div>
    )
  }

  render() {
    let bgColor = this.state.color_blue ? "#3D99D4" : "#FFFFFF";
    let fontColor = this.state.color_blue ? "#FFFFFF" : "#3D99D4";
    return (
      <div>
        <div className="listing" style={{background: bgColor}} onClick={()=>this.setState({showPanel: !this.state.showPanel}, this.changeColor.bind(this))}>
          <p className="listingTitle" style={{color: fontColor}}>{this.props.item.val().course.title}</p>
          <p className="listingProf" style={{color: fontColor}}>{this.props.item.val().professor.name}</p>
        </div>
        {
          this.state.showPanel ?
            <div>
              {this.state.comments.map((item,i)=>this.comment(item, i))}
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default AdminListing;
