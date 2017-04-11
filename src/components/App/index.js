import React from 'react';
import classnames from 'classnames';
import NavBar from '../NavBar';
import Map from '../Map';
import PostCreateModal from '../Post';
import PostCreateSuccessModal from '../PostCreateSuccessModal';
import PostInfoModal from '../PostInfoModal';
import PostModal from '../PostModal';
import io from 'socket.io-client';
import swal from 'sweetalert';


class App extends React.Component {

  constructor() {
    super();

    this.socket = io('http://localhost:3000');

    let post = {
      firstName:'',
      lastName:'',
      contactNumber:'',
      email:'',
      address:'',
      bloodGroup:''
    }

  
    this.state = {
      markers:[],
      showModal: false,
      showSuccess : false,
      post: post,
      isDonor: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }

  newPost(post){
    this.setState({
      post:post,
      showSuccess:true,
      showModal:false,
      showMyInfo:false
    })
    console.log(post)
    this.socket.emit('new post',post);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  closeSuccess(){
    this.setState({showSuccess:false})
  }

  getPost(post){
    this.setState({showPostModal:true,post:post});
  }

  showInfo(id){
      fetch("/api/posts/"+id)
      .then((response)=>{
        return response.json().then((data) => {
          if(data.post)  this.setState({showMyInfo:true,post:data.post});
          else  swal("Not Found!", "Post not found!", "error")

        });

      })
  }

  render() {
      return (

        <div>
          <PostInfoModal open={this.state.showPostModal} close = {() => this.postSuccess()}  post={this.state.post} />
          <PostCreateSuccessModal open={this.state.showSuccess} close = { () => this.closeSuccess() } post={this.state.post}/>
          <PostCreateModal open={this.state.showModal} close ={this.close} post = { (post) => this.newPost(post) } />
          <PostModal socket={this.socket} post={this.state.post} open={this.state.showMyInfo} />
          <NavBar/>
          <Map socket={this.socket} open={() => this.open() } close={ () => this.close()} getPost={(post)=> this.getPost(post) } showMyInfo={ (id)=> this.showInfo(id) } />
        </div>
      );
   }
}

export default App;
