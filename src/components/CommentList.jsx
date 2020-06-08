import React from "react";
import { Badge, ListGroup,Spinner } from "react-bootstrap";

class CommentList extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      comments : [],
      id:this.props.movieId,
      loading : true
    }
  }
 
  componentDidMount=async() =>{
    let movieID = this.state.id
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    let response = await fetch(commentsUrl + movieID,{
      method:'GET',
      headers : new Headers({
        'Authorization': 'Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU='
      })
    })
    let comments = await response.json()
    this.setState({comments})
    this.setState({loading : false})
  }
  componentWillUnmount(){
    console.log('bye bye')
  }
  render() {
    return (
      <div>
        {this.state.loading
        ? 
            <div style={{ width: "10%", height: "auto",margin:'0 auto' }}>
               <Spinner animation="grow" variant="dark" />
            </div>
          :this.state.comments.map((comment) => (
          <ListGroup key={comment._id}>
            <ListGroup.Item>
              <Badge pill variant="info" className="mr-3">
                {comment.rate}
              </Badge>
              {comment.comment}
             
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    )
  }
}

export default CommentList;
