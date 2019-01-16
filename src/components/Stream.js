import React from 'react';
import { Player } from 'video-react';

import "./Stream.css";

export default (props) => {
    return (
        <Player
            muted={true}
            //playsInline
            src="http://162.246.157.118:8080/hls/test.m3u8"
        />
    );
};