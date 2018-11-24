import React, { Component } from 'react';
import { storage } from '../firebase'
import './imageupload.css'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageUrl: null,
            uploading: false,
            percent: 0,
        }
    }


    handleChange = (event) => {
        this.setState({
            image: event.target.files[0],

        })
    }

    handleClick = () => {
        const { image } = this.state
        this.setState({ uploading: true })
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshop) => {
                // progrss function ....
                const progress = (snapshop.bytesTransferred / snapshop.totalBytes * 100)
                this.setState({ percent: progress })


            },
            (error) => {
                // error function ....
                alert(error)

            },
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    this.setState({
                        imageUrl: url,
                        uploading: false
                    })
                }
                )
            }
        )
    }


    render() {
        return (
            <div>
                <input type='file' onChange={this.handleChange} multiple></input>
                <button onClick={this.handleClick}>Upload</button>
                <div>

                    {this.state.uploading ?
                        <div> <span className="load-bar" >Uploading: {this.state.percent}%</span>
                        </div> : null
                    }
                    {
                        this.state.imageUrl ? (
                            <div className="preview-image">
                                <img src={this.state.imageUrl} alt=''></img>
                            </div>
                        ) : null
                    }
                </div>

            </div>
        );
    }
}

export default ImageUpload;