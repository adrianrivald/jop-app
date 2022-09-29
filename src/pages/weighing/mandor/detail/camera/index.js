import React, { Component } from 'react';
import FlatButton from '../../../../../components/button/flat';

export class CameraFeed extends Component {
  /**
   * Processes available devices and identifies one by the label
   * @memberof CameraFeed
   * @instance
   */
  processDevices(devices) {
    devices.forEach((device) => {
      this.setDevice(device);
    });
  }

  /**
   * Sets the active device and starts playing the feed
   * @memberof CameraFeed
   * @instance
   */
  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  /**
   * On mount, grab the users connected devices and process them
   * @memberof CameraFeed
   * @instance
   * @override
   */
  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  /**
   * Handles taking a still image from the video feed on the camera
   * @memberof CameraFeed
   * @instance
   */
  takePhoto = () => {
    const { sendFile } = this.props;
    const context = this.canvas.getContext('2d');
    context.drawImage(this.videoPlayer, 0, 0, 680, 360);
    this.canvas.toBlob(sendFile);
    this.props.setIsCamera(!this.props.isCamera);
  };

  render() {
    return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer flex justify-center">
          <video className="relative" ref={(ref) => (this.videoPlayer = ref)} />
          {/* <button className='absolute bottom-0' >Take photo!</button> */}
          <FlatButton
            className="rounded-xl absolute bottom-20"
            role="green"
            text="Tangkap foto"
            onClick={this.takePhoto}
          />
        </div>
        <div className="c-camera-feed__stage">
          <canvas width="400" height="480" ref={(ref) => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}
