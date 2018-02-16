<h1 align="center">
  React Native True Sight
</h1>
<p align="center">
  <img src="./assets/screen-ios.png" alt="" width=300>
</p>
<h4 align="center">A cross-platform video player with customizable controls.</h4>

<br>

This library provide a fully customisable video player that work both on Android and iOS. It also come with common use case documentation of things that you would like to implements.

By default there are two commands bar that are displayed respectively on different part of the parent container:

- **Middle**. Contain by default a grid display two buttons:
    - One with play / pause alternating.
    - Another that will restart the video.
- **Bottom**. Contain the video current time, a progress bar and the total duration.
- **Loader**. There is also a loader that will trigger while video is charging (network issues, bootstraping, ...).

## Documentation

- [Installation chapter](./doc/install.md)
- [Personnalize default commands bar](./doc/personnalize-default-cmd-bar.md)
- [Render a FullScreen Video player](./doc/full-screen-player.md)
- [Implement your own controls bar](./doc/custom-controls-bar.md)

# Quick documentation

This is simple as that. 

VideoPlayer accept the following props.

- **source** - An url that target the MP4 file.
- **autoStart** - Whether or not the video should start when rendered (Default to true).
- **onError** - A callback that will be called when an error occured, if the resource is not reachable for example.
- **onProgress** - A callback called each time the cursor advance in the video, receiving an object as following:
  - currentTime - The current time in seconds.
  - playableDuration - The playable duration in seconds, dependings on the buffer load.
  - maximumDuration - The maximum duration of the video in seconds.
- **onEnd** - A callback that will be called when the video reach the end.

For advanced configuration, such as infinite loop, check the rest of the documentation and custom controls bar.

```jsx
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import VideoPlayer from 'react-native-true-sight'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <VideoPlayer source="https://somevideo.mp4" />
      </View>
    )
  }
}
```