import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getMusic } from '../../reducer/music-reduser.js';
import Music from './Music.jsx';

class MusicContainer extends React.Component {
    componentDidMount() {
        this.props.getMusic()
    }
    
    render() {
        return (
            <div>
                <Music music={this.props.music} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        music: state.Music.music,  
    }
}

export default compose (
    connect(mapStateToProps, 
        {
            getMusic,
        })
) (MusicContainer);