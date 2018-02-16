# Introduction

As said in the preview this library ship with two default controls bars that you can personnalize quickly in a matter of color and other things.

For each bar you can pass additional props to the `VideoPlayer` component, but please let's drive into this :

## Extending the middle bar

The default middle bar purpose is to display some video controls like the play or the restart action.

For the default middle bar the following attributes are supported by passing an object to the `middleControlsBarProps` props:

- **restartButton** - Whether or not display the restart button that allow to reset video.

Down there is a quick example:

```jsx
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import VideoPlayer from 'react-native-true-sight'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <VideoPlayer 
          source="https://somevideo.mp4"
          middleControlsBarProps={{
            restartButton: false
          }} />
      </View>
    )
  }
}
```

## Extending the bottom bar

The default bottom bar purpose is to display some video indication like the current time, the total time and the timeline.

For the default bottom bar the following attributes are supported by passing an object to the `bottomControlsBarProps` props:

- **navigationAllowed** - Whether or not the user is able to go forward / backward in the timeline.
- **barColor** - The color that should be used to indicate the current completion (Default depends on OS).
- **joyStickColor** - (Android only) - The color for the current time pointer on the timeline.

Down there is a quick example:

```jsx
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import VideoPlayer from 'react-native-true-sight'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <VideoPlayer 
          source="https://somevideo.mp4"
          bottomControlsBarProps={{
            navigationAllowed: false,
            barColor: 'red',
            joyStickColor: 'green'
          }} />
      </View>
    )
  }
}
```

**Note:** If those configuration doesn't fill your needs, please refer to the [“Implement your own controls bar”](./custom-controls-bar.md) chapter.