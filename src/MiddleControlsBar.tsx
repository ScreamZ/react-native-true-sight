import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import * as PropTypes from 'prop-types'

import PlayerIcon from './PlayerIcon'

import { playerPlay, playerPause, playerRestart } from "./images/index"

interface Props {
  isPaused: boolean;
  restartButton?: boolean;
  setPlaying(): void;
  setPaused(): void;
  setPosition(position: number): void;
}

export default class MiddleControlsBar extends React.PureComponent<Props, null>{
  static propTypes = {
    // Metadata
    isPaused: PropTypes.bool.isRequired,
    restartButton: PropTypes.bool,

    // Controls
    setPlaying: PropTypes.func.isRequired, // Trigger play action
    setPaused: PropTypes.func.isRequired, // Trigger pause action
    setPosition: PropTypes.func.isRequired // Move video to the given time (in seconds).
  }

  static defaultProps = {
    restartButton: true
  }

  public restartVideo

  constructor(props) {
    super(props)

    this.restartVideo = () => this.props.setPosition(0)
  }

  render() {
    return (
      <View style={styles.barWrapper}>
        {this.props.isPaused ? (
          <PlayerIcon iconSource={playerPlay} onPress={this.props.setPlaying} />
        ) : (
            <PlayerIcon iconSource={playerPause} onPress={this.props.setPaused} />
          )}
        {this.props.restartButton && (
          <PlayerIcon iconSource={playerRestart} onPress={this.restartVideo} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 160,
    minWidth: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5
  },
  barItem: {
    margin: 5
  }
})
